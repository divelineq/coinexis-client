import { z } from "zod/v4";

export const SPARKLINE_VALIDATION_SCHEMA = z.object({ url: z.url() });

export type SparklineType = z.infer<typeof SPARKLINE_VALIDATION_SCHEMA>;
