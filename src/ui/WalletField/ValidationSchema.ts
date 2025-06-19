import { validateAddress } from "src/ui/WalletField/validateAddress";
import { z } from "zod/v4";

export const ADDRESS_VALIDATION_SCHEMA = z
	.string()
	.trim()
	.refine((value) => validateAddress(value).isValid, {
		message: "Некорректный адрес кошелька",
	});
