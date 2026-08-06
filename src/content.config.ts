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

export const collections = { blog };
