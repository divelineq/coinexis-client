import { z } from "zod/v4";

const ALL_ASSETS_VALIDATION_SCHEMA = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.url(),
  price: z.number().nonnegative(),
  volume: z.number().nonnegative(),
  price_change_1h: z.number(),
  price_change_24h: z.number(),
  price_change_7d: z.number(),
  price_change_1m: z.number(),
  price_change_1y: z.number(),
});

export type allAssetsTypes = z.infer<typeof ALL_ASSETS_VALIDATION_SCHEMA>