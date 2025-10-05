import { z } from "zod/v4";

const RAW_VALIDATION_SCHEMA = z.object({
	chain_id: z.union([z.string(), z.number()]),
	block_number: z.string(),
	transaction_hash: z.string(),
	transaction_index: z.number(),
	from_address: z.string().optional(),
	to_address: z.string().optional(),
	value: z.string().optional(),
	gas: z.string().optional(),
	gas_price: z.string().optional(),
	gas_used: z.string().optional(),
	input: z.string().optional(),
	nonce: z.string().optional(),
	timestamp: z.string(),
	block_hash: z.string().optional(),
	transaction_fee: z.string().optional(),
	transaction_type: z.string().optional(),
	max_fee_per_gas: z.string().optional(),
	max_priority_fee_per_gas: z.string().optional(),
	effective_gas_price: z.string().optional(),
});

const ASSET_VALIDATION_SCHEMA = z.object({
	id: z.number(),
	name: z.string(),
	symbol: z.string(),
	decimals: z.number().optional(),
	contract: z.string().optional(),
	logo: z.url().optional(),
});

const UNIFIED_VALIDATION_SCHEMA = z.object({
	id: z.string().optional(),
	timestamp: z.number(),
	from: z.string(),
	to: z.string(),
	contract: z.string().optional(),
	hash: z.string(),
	amount_usd: z.number().optional(),
	amount: z.number().optional(),
	block_number: z.number(),
	type: z.string(),
	blockchain: z.string(),
	tx_cost: z.number().optional(),
	method_id: z.string().nullable().optional(),
	transaction: z
		.object({
			hash: z.string(),
			chainId: z.string(),
			fees: z.string().optional(),
			feesUSD: z.number().optional(),
			date: z.string().optional(),
		})
		.optional(),
	asset: ASSET_VALIDATION_SCHEMA.optional(),
});

export const TRANSACTIONS_VALIDATION_SCHEMA = z.object({
	raw: z.array(RAW_VALIDATION_SCHEMA).optional(),
	unified: z.array(UNIFIED_VALIDATION_SCHEMA).optional(),
	wallets: z.array(z.string()),
	pagination: z
		.object({
			total: z.number(),
			page: z.number(),
			offset: z.number(),
			limit: z.number(),
			totalPages: z.number().optional(),
			pageItem: z.number().optional(),
			totalItems: z.number().optional(),
		})
		.optional(),
});

export type TransactionResponse = z.input<
	typeof TRANSACTIONS_VALIDATION_SCHEMA
>;

const AssetSchema = z.object({
	name: z.string(),
	symbol: z.string(),
	id: z.number(),
	contract: z.string(),
	logo: z.url(),
});

const TransactionSchema = z.object({
	timestamp: z.number(),
	asset: AssetSchema,
	type: z.string(),
	method_id: z.string().nullable(),
	hash: z.string(),
	blockchain: z.string(),
	amount: z.number(),
	amount_usd: z.number(),
	to: z.string(),
	from: z.string(),
});

export const WalletTransactionsResponseSchema = z.object({
	data: z.object({
		transactions: z.array(TransactionSchema),
		wallets: z.array(z.string()),
	}),
	details: z.any(),
	pagination: z.object({
		limit: z.number(),
		offset: z.number(),
		page: z.number(),
		total: z.number(),
	}),
});

export type SmartTransactionsResponse = z.input<
	typeof WalletTransactionsResponseSchema
>;
