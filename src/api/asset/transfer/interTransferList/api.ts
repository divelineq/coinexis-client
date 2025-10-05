import axios from "axios";
import type {
	AccountCoinsBalanceResponse,
	InferTransferListParams,
} from "../../../dto";

export class InferTransferList {
	public async getMany(signal: AbortSignal, params?: InferTransferListParams) {
		const res = await axios.get<AccountCoinsBalanceResponse[]>(
			`/api/asset/transfer/query-inter-transfer-list?transferId=${params?.transferId}&coin=${params?.coin}&status=${params?.status}&startTime=${params?.startTime}&endTime=${params?.endTime}&limit=${params?.limit}&cursor=${params?.cursor}`,
			{ signal },
		);

		return res.data;
	}
}
