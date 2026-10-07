import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    readTime: z.string(),
    /** Optional origin marker, e.g. "telegram-bot" for automated posts. */
    source: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    github: z.string().url(),
    /** Live demo URL; use "#" to hide the Live link on /projects. */
    demo: z.string().default('#'),
    image: z.string().optional(),
    /** Lower numbers appear first on /projects. */
    order: z.number().optional(),
  }),
});

export const collections = { blog, projects };
