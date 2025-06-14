import { allAssetsHandler } from "../api/coins/handlers";
import { transactionsHandler } from "../api/transactions/handlers";

export const handlers = [...allAssetsHandler, ...transactionsHandler];
