import type { AccountType } from "../dto";

export type InferTransferListParams = {
	transferId?: string; // ID перевода
	coin?: string; // Валюта
	status?: string; // Статус
	startTime?: number; // Время начала
	endTime?: number; // Время конца
	limit?: number; // Кол-во записей
	cursor?: string; // Курсор страницы
};

type TransferList = {
	transferId: string; // ID перевода
	coin: string; // Валюта
	amount: string; // Сумма
	fromAccountType: AccountType; // Откуда
	toAccountType: AccountType; // Куда
	timestamp: string; // Метка времени
	status: string; // Статус
};

export type InferTransferListResponse = {
	list: TransferList[]; // Список переводов
	nextPageCursor: string; // След. курсор
};
