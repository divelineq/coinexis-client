import { NFT_VALIDATION_SCHEMA, PAGINATION_VALIDATION_SCHEMA } from "@api";
import { z } from "zod/v4";

export const NFT_METADATA_VALIDATION_SCHEMA = z.object({
	name: z.string(),
	description: z.string().optional(),
	image: z.url().optional(),
	url: z.url().optional(),
	external_url: z.url().optional(),
	animation_url: z.url().optional(),
	background_color: z
		.string()
		.regex(/^([\dA-Fa-f]{6})$/, {
			message: "Must be a 6-char hex color without #",
		})
		.optional(),
	youtube_url: z.url().optional(),
	attributes: z
		.array(
			z.object({
				trait_type: z.string(),
				value: z.union([z.string(), z.number(), z.boolean()]),
				display_type: z
					.enum(["boost_number", "boost_percentage", "number", "date"])
					.optional(),
				max_value: z.number().optional(),
			}),
		)
		.optional(),
});

export const MERGE_METADATA_NTF_VALIDATION_SCHEMA = z.object({
	data: z.array(
		z.object({
			...NFT_VALIDATION_SCHEMA.shape,
			...NFT_METADATA_VALIDATION_SCHEMA.shape,
		}),
	),
	pagination: PAGINATION_VALIDATION_SCHEMA,
});

export type ServiceOutput = z.infer<
	typeof MERGE_METADATA_NTF_VALIDATION_SCHEMA
>;
export type NftMetadata = z.infer<typeof NFT_METADATA_VALIDATION_SCHEMA>;
