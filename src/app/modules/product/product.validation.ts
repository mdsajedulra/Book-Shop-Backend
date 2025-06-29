import { z } from 'zod';

export const ProductValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    cover: z.string(),
    author: z.string(),
    price: z.number(),
    category: z.enum([
      'Fiction',
      'Science',
      'SelfDevelopment',
      'Poetry',
      'Religious',
    ]),
    description: z.string(),
    quantity: z.number(),
    inStock: z.boolean(),
  }),
});
