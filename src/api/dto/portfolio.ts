import { z } from "zod/v4";

const ASSET_VALIDATION_SCHEMA = z.object({
	id: z.number(),
	logo: z.string().optional(),
	name: z.string(),
	symbol: z.string(),
	decimals: z.array(z.string()),
	contracts: z.array(z.string()),
	blockchains: z.array(z.string()),
});

const CONTRACTS_BALANCES_VALIDATION_SCHEMA = z.array(
	z.object({
		address: z.string(),
		balance: z.number(),
		balanceRaw: z.string(),
		chainId: z.string(),
		decimals: z.number(),
	}),
);

const CROSS_CHAIN_BALANCES_VALIDATION_SCHEMA = z.record(
	z.string(),
	z.object({
		address: z.string(),
		balance: z.number(),
		balanceRaw: z.string(),
		chainId: z.string(),
	}),
);

const ASSETS_VALIDATION_SCHEMA = z.array(
	z.object({
		asset: ASSET_VALIDATION_SCHEMA,
		contracts_balances: CONTRACTS_BALANCES_VALIDATION_SCHEMA,
		cross_chain_balances: CROSS_CHAIN_BALANCES_VALIDATION_SCHEMA,
		price: z.number(),
		allocation: z.number(),
		token_balance: z.number(),
		wallets: z.array(z.string()),
		price_change_24h: z.number(),
		estimated_balance: z.number(),
	}),
);

export const MANY_PORTFOLIO_VALIDATION_SCHEMA = z.object({
	balances_length: z.number(),
	wallets: z.array(z.string()),
	total_wallet_balance: z.number(),
	assets: ASSETS_VALIDATION_SCHEMA,
});

export type PortfolioResponse = z.input<
	typeof MANY_PORTFOLIO_VALIDATION_SCHEMA
>;
