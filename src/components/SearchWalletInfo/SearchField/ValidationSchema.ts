import { z } from "zod/v4";
import { validateAdress } from "./validateAdress";

export const ADRESS_VALIDATION_SCHEMA = z
	.string()
	.trim()
	.refine((value) => validateAdress(value).isValid, {
		message: "Некорректный адрес кошелька",
	});
