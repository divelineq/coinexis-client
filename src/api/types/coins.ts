import { z } from "zod/v4";

export const MANY_COINS_VALIDATION_SCHEMA = z.object({
	id: z.number(),
	name: z.string(),
	symbol: z.string().optional(),
	logo: z.string().nullable().optional(),
	price: z.number().transform((value) => (value === null ? 0 : value)),
	price_change_1h: z.number().optional(),
	price_change_24h: z.number().optional(),
	price_change_7d: z.number().optional(),
	price_change_1m: z.number(),
	price_change_1y: z.number().optional(),
	market_cap: z.number().optional(),
	liquidity: z.number().optional(),
	volume: z.number(),
	blockchains: z.array(z.string()).optional(),
	contracts: z.array(z.string()).optional(),
	decimals: z.array(z.number()).optional(),
	website: z.string().nullable().optional(),
	twitter: z.string().nullable().optional(),
	chat: z.string().nullable().optional(),
});

export const ONE_COIN_VALIDATION_SCHEMA = z.object({
	id: z.number(),
	name: z.string(),
	symbol: z.string(),
	decimals: z.number(),
	logo: z.string().nullable(),
	rank: z.number(),
	price: z.number(),
	market_cap: z.number(),
	market_cap_diluted: z.number(),
	volume: z.number(),
	volume_change_24h: z.number(),
	volume_7d: z.number(),
	liquidity: z.number(),
	ath: z.number(),
	atl: z.number(),
	off_chain_volume: z.number(),
	is_listed: z.boolean(),
	price_change_1h: z.number(),
	price_change_24h: z.number(),
	price_change_7d: z.number(),
	price_change_1m: z.number(),
	price_change_1y: z.number(),
	total_supply: z.number(),
	circulating_supply: z.number(),
	contracts: z.array(
		z.object({
			address: z.string(),
			blockchainId: z.string(),
			blockchain: z.string(),
			decimals: z.number(),
		}),
	),
});

export const SORTED_COINS_VALIDATION_SCHEMA = z.object({
	id: z.number(),
	name: z.string(),
	symbol: z.string(),
	logo: z.string().nullable(),
	rank: z.number().nullable(),
	price: z.number(),
	market_cap: z.number(),
	volume: z.number(),
	off_chain_volume: z.number(),
	liquidity: z.number(),
	price_change_1h: z.number(),
	price_change_24h: z.number(),
	price_change_7d: z.number(),
	categories: z.array(z.string()),
	contracts: z.array(
		z.object({
			address: z.string(),
			blockchain: z.string(),
			blockchainId: z.string(),
			decimals: z.number(),
		}),
	),
});

export type ManyCoinsType = z.infer<typeof MANY_COINS_VALIDATION_SCHEMA>;
export type OneCoinType = z.infer<typeof ONE_COIN_VALIDATION_SCHEMA>;
export type SortedCoinsType = z.infer<typeof SORTED_COINS_VALIDATION_SCHEMA>;
