import { z } from "zod/v4";
import { addressDetection } from "./addressDetection";

export const ADDRESS_VALIDATION_SCHEMA = z
	.string()
	.trim()
	.refine((value) => addressDetection(value).isValid, {
		message: "Некорректный адрес кошелька",
	});
