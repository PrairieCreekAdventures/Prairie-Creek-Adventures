import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    author: z.string().default('Margaret Ellison'),
    date: z.coerce.date(),
    category: z.string().default('Field Notes'),
    excerpt: z.string(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    author: z.string().default('Margaret Ellison'),
    date: z.coerce.date(),
    cookTime: z.string(),
    season: z.string(),
    servings: z.string().optional(),
    image: z.string().optional(),
    number: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const seasons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/seasons' }),
  schema: z.object({
    title: z.string(),
    volume: z.string(),
    description: z.string(),
    order: z.number(),
    current: z.boolean().default(false),
  }),
});

export const collections = { posts, recipes, seasons };
