import axios from "axios";
import type {
	AccountCoinsBalanceResponse,
	InferTransferListParams,
} from "../../../dto";

export class InferTransferList {
	public async getMany(params: InferTransferListParams, signal: AbortSignal) {
		const res = await axios.get<AccountCoinsBalanceResponse[]>(
			`api/query-inter-transfer-list?accountType=${params.coin}&startTime=${params.startTime}&endTime=${params.endTime}&limit=${params.limit}&cursor=${params.cursor}`,
			{ signal },
		);

		return res.data;
	}
}
