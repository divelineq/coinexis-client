export type AccountCoinsBalanceParams = {
	accountType: string; // Тип аккаунта
	coin?: string; // Валюта(ы) заглавными
};

type CoinBalance = {
	coin: string; // Валюта
	walletBalance: string; // Баланс кошелька
	transferBalance: string; // Переводимый баланс
	bonus: string; // Бонус
};

export type AccountCoinsBalanceResponse = {
	accountType: string; // Тип аккаунта
	memberId: string; // ID пользователя
	balance: CoinBalance[]; // Массив балансов
};
