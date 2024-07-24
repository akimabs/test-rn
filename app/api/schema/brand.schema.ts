import { z } from "zod";

const BrandImageItemSchema = z.object({
  _id: z.string(),
  name: z.string(),
  featured_text: z.string(),
  logo: z.string(),
  slug: z.string(),
});

const BrandsImageResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(BrandImageItemSchema),
  processingTimes: z.object({
    overall: z.object({
      startTime: z.array(z.number()),
      currentTime: z.string(),
      timeTaken: z.number(),
    }),
    middlewareLocale: z.object({
      startTime: z.array(z.number()),
      currentTime: z.string(),
      timeTaken: z.number(),
    }),
    attach: z.object({
      startTime: z.array(z.number()),
      currentTime: z.string(),
      timeTaken: z.number(),
    }),
    middlewareCheckAccess: z.object({
      startTime: z.array(z.number()),
      currentTime: z.string(),
      timeTaken: z.number(),
    }),
    middlewareModifyRequest: z.object({
      startTime: z.array(z.number()),
      currentTime: z.string(),
      timeTaken: z.number(),
    }),
    middlewareModifyResponse: z.object({
      startTime: z.array(z.number()),
      currentTime: z.string(),
      timeTaken: z.number(),
    }),
  }),
});

const BrandImageRequestSchema = z.object({
  filter: z.string().optional(),
  fields: z.string().optional(),
  skip: z.number().optional(),
  limit: z.number().optional(),
  sort: z.string().optional(),
});

const BrandLetterItemSchema = z.object({
  _id: z.string(),
  my_soco_sql_id: z.number().optional(),
  my_sociolla_sql_id: z.number().optional(),
  name: z.string(),
  logo: z.string().url(),
  url: z.string().url().optional(),
  country: z.string(),
  country_tag_id: z.number(),
  flag: z.string().url().optional(),
  slug: z.string().optional(),
});

const BrandCategoryLetterSchema = z.record(z.string(), z.array(BrandLetterItemSchema));

const BrandsLetterResponseSchema = z.object({
  success: z.boolean(),
  data: BrandCategoryLetterSchema,
});

const BrandLetterRequestSchema = z.object({
  fields: z.string().optional(),
  limit: z.number().optional(),
  sort: z.string().optional(),
});

const BrandAPISchema = {
  BrandImage: {
    Request: BrandImageRequestSchema,
    Response: BrandsImageResponseSchema,
  },
  BrandLetter: {
    Request: BrandLetterRequestSchema,
    Response: BrandsLetterResponseSchema,
  },
};

export default BrandAPISchema;
