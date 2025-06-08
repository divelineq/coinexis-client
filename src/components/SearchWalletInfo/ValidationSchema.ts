import { z } from "zod/v4";
import { detectCryptoAddressNetwork } from "./detectCryptoAddressNetwork";



export const ADRESS_VALIDATION_SCHEMA = z
  .string()
  .trim()
  .refine((value) => detectCryptoAddressNetwork(value).isValid, {
    message: "Некорректный адрес кошелька",
  });
