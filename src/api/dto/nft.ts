import { z } from "zod/v4";

export const NFT_VALIDATION_SCHEMA = z.object({
	token_address: z.string(),
	token_id: z.string(),
	token_uri: z.string(),
	amount: z.string(),
	owner_of: z.string(),
	name: z.string(),
	symbol: z.string(),
	blockchain: z.string(),
	chain_id: z.string(),
});

export const PAGINATION_VALIDATION_SCHEMA = z.object({
	total: z.number(),
	page: z.number(),
	offset: z.number(),
	limit: z.number(),
});

export const WalletNFTsResponseSchema = z.object({
	data: z.array(NFT_VALIDATION_SCHEMA),
	pagination: PAGINATION_VALIDATION_SCHEMA,
});

export type NFTResponse = z.input<typeof NFT_VALIDATION_SCHEMA>;
export type WalletNFTsResponse = z.infer<typeof WalletNFTsResponseSchema>;
