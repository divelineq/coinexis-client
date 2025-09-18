type CoinBalance = {
	coin: string; // тикер монеты, например BTC, ETH, USDT
	equity: string; // полный equity по монете (баланс + PnL)
	usdValue: string; // эквивалент equity в USD
	walletBalance: string; // общий баланс по монете
	free?: string; // свободный (доступный) баланс для SPOT
	locked?: string; // баланс, заблокированный под открытые ордера
	spotHedgingQty?: string; // количество монеты, использованное для хеджирования
	borrowAmount: string; // сколько заёмных средств по этой монете
	availableToWithdraw?: string; // устаревшее: доступно к выводу (UNIFIED не использует)
	accruedInterest: string; // накопленные проценты (заём/маржинальная торговля)
	totalOrderIM: string; // margin, зарезервированный под ордера
	totalPositionIM: string; // initial margin под открытые позиции
	totalPositionMM: string; // maintenance margin по позициям
	unrealisedPnl: string; // нереализованная прибыль/убыток
	cumRealisedPnl: string; // накопленная реализованная прибыль/убыток
	bonus: string; // бонусные средства (для unified accounts)
	marginCollateral: boolean; // можно ли использовать эту монету как залог
	collateralSwitch: boolean; // включено ли использование в залоге самим пользователем
	availableToBorrow?: string; // устаревшее поле, всегда пустое
	spotBorrow: string; // заём по спот марже (на будущее, сейчас всегда 0)
};

export type WalletBalanceResponse = {
	accountType: string; // тип аккаунта (UNIFIED, CONTRACT, SPOT и т.д.)
	accountLTV: string; // устаревшее поле (LTV)
	accountIMRate: string; // уровень начальной маржи (Initial Margin Rate)
	accountIMRateByMp: string; // IM rate, рассчитанный по mark price
	accountMMRate: string; // уровень поддерживающей маржи (Maintenance Margin Rate)
	accountMMRateByMp: string; // MM rate по mark price
	totalEquity: string; // общий equity аккаунта (в USD)
	totalWalletBalance: string; // общий баланс кошелька в USD
	totalMarginBalance: string; // общий маржинальный баланс
	totalAvailableBalance: string; // доступный баланс (USD), можно использовать для сделок
	totalPerpUPL: string; // общий нереализованный PnL по деривативам
	totalInitialMargin: string; // суммарный initial margin по всем позициям
	totalInitialMarginByMp: string; // initial margin по mark price
	totalMaintenanceMargin: string; // общий maintenance margin по всем позициям
	totalMaintenanceMarginByMp: string; // maintenance margin по mark price
	coin: CoinBalance[]; // список всех монет с балансами и статусом
};
