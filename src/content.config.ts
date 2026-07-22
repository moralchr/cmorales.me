import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    kicker: z.string().optional(),
    tech: z.array(z.string()).optional(),
    // Short bare-fact bullets shown on the project's deck slide.
    highlights: z.array(z.string()).optional(),
    // Photos: drop files in public/images/projects/ and list them here.
    // Omit the field entirely to show placeholder frames; set images: []
    // to show no gallery at all.
    images: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        })
      )
      .optional(),
    url: z.string().optional(),
    github: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { writing, projects };
