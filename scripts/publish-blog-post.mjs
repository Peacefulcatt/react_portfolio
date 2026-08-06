#!/usr/bin/env node
/**
 * Validate a blog post payload and write Astro content-collection Markdown.
 *
 * Usage:
 *   node scripts/publish-blog-post.mjs path/to/post.json
 *   echo '{...}' | node scripts/publish-blog-post.mjs --stdin
 *
 * Expected JSON:
 * {
 *   "slug": "my-post",
 *   "title": "My Post",
 *   "excerpt": "Short summary",
 *   "date": "2026-08-06",
 *   "tags": ["AI", "Engineering"],
 *   "readTime": "5 min read",
 *   "body": "Markdown body without frontmatter",
 *   "source": "telegram-bot"   // optional
 * }
 */

import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function estimateReadTime(body) {
  const words = String(body).trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function yamlEscape(value) {
  const text = String(value);
  if (/[:#\[\]{},&*!|>'"%@`]/.test(text) || /^\s|\s$/.test(text)) {
    return JSON.stringify(text);
  }
  return text;
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    fail(`Invalid date: ${value}`);
  }
  return date.toISOString().slice(0, 10);
}

function validatePayload(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    fail('Payload must be a JSON object');
  }

  const title = String(raw.title || '').trim();
  const excerpt = String(raw.excerpt || '').trim();
  const body = String(raw.body || '').trim();
  const tags = Array.isArray(raw.tags)
    ? raw.tags.map((tag) => String(tag).trim()).filter(Boolean)
    : [];

  if (!title) fail('title is required');
  if (!excerpt) fail('excerpt is required');
  if (!body) fail('body is required');
  if (tags.length === 0) fail('tags must be a non-empty array');

  const slug = slugify(raw.slug || title);
  if (!slug) fail('slug could not be derived from title');

  return {
    slug,
    title,
    excerpt,
    date: formatDate(raw.date || new Date().toISOString()),
    tags,
    readTime: String(raw.readTime || estimateReadTime(body)).trim(),
    body,
    source: raw.source ? String(raw.source).trim() : undefined,
  };
}

function toMarkdown(post) {
  const tagList = post.tags.map((tag) => JSON.stringify(tag)).join(', ');
  const lines = [
    '---',
    `title: ${yamlEscape(post.title)}`,
    `excerpt: ${yamlEscape(post.excerpt)}`,
    `date: ${post.date}`,
    `tags: [${tagList}]`,
    `readTime: ${yamlEscape(post.readTime)}`,
  ];

  if (post.source) {
    lines.push(`source: ${yamlEscape(post.source)}`);
  }

  lines.push('---', '', post.body.replace(/\r\n/g, '\n').trim(), '');
  return lines.join('\n');
}

async function readPayload() {
  const args = process.argv.slice(2);
  if (args.includes('--stdin') || args.length === 0) {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    const text = Buffer.concat(chunks).toString('utf8').trim();
    if (!text) fail('No JSON received on stdin');
    return JSON.parse(text);
  }

  const filePath = path.resolve(args[0]);
  const text = await readFile(filePath, 'utf8');
  return JSON.parse(text);
}

async function main() {
  let raw;
  try {
    raw = await readPayload();
  } catch (error) {
    fail(`Could not parse JSON: ${error.message}`);
  }

  const post = validatePayload(raw);
  await mkdir(BLOG_DIR, { recursive: true });

  const outPath = path.join(BLOG_DIR, `${post.slug}.md`);
  try {
    await access(outPath, constants.F_OK);
    if (!process.argv.includes('--force')) {
      fail(`Post already exists: ${path.relative(ROOT, outPath)} (pass --force to overwrite)`);
    }
  } catch {
    // file does not exist — good
  }

  const markdown = toMarkdown(post);
  await writeFile(outPath, markdown, 'utf8');

  const relative = path.relative(ROOT, outPath);
  console.log(
    JSON.stringify(
      {
        ok: true,
        path: relative,
        slug: post.slug,
        href: `/blog/${post.slug}`,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => fail(error.message));
