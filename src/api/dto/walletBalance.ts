import { z } from "zod";

export const COIN_BALANCE_VALIDATION_SCHEMA = z.object({
	coin: z.string(),
	equity: z.string(),
	usdValue: z.string(),
	walletBalance: z.string(),
	free: z.string().optional(),
	locked: z.string().optional(),
	spotHedgingQty: z.string().optional(),
	borrowAmount: z.string(),
	availableToWithdraw: z.string().optional(),
	accruedInterest: z.string(),
	totalOrderIM: z.string(),
	totalPositionIM: z.string(),
	totalPositionMM: z.string(),
	unrealisedPnl: z.string(),
	cumRealisedPnl: z.string(),
	bonus: z.string(),
	marginCollateral: z.boolean(),
	collateralSwitch: z.boolean(),
	availableToBorrow: z.string().optional(),
	spotBorrow: z.string(),
});

export const WALLET_BALANCE_VALIDATION_SCHEMA = z.object({
	accountType: z.string(),
	accountLTV: z.string(),
	accountIMRate: z.string(),
	accountIMRateByMp: z.string(),
	accountMMRate: z.string(),
	accountMMRateByMp: z.string(),
	totalEquity: z.string(),
	totalWalletBalance: z.string(),
	totalMarginBalance: z.string(),
	totalAvailableBalance: z.string(),
	totalPerpUPL: z.string(),
	totalInitialMargin: z.string(),
	totalInitialMarginByMp: z.string(),
	totalMaintenanceMargin: z.string(),
	totalMaintenanceMarginByMp: z.string(),
	coin: z.array(COIN_BALANCE_VALIDATION_SCHEMA),
});

export type WalletBalanceResponse = z.input<
	typeof WALLET_BALANCE_VALIDATION_SCHEMA
>;
