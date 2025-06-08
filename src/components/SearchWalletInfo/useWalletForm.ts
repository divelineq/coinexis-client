import { useForm } from "@tanstack/react-form";
import type { z } from "zod/v4";
import type { ADRESS_VALIDATION_SCHEMA } from "./ValidationSchema";

type Adress = {
  adress: z.infer<typeof ADRESS_VALIDATION_SCHEMA>;
};

const defaultAdress: Adress = { adress: "" };

export function useWalletForm() {
  return useForm({
    defaultValues: defaultAdress,
    onSubmit: (values) => {
      console.log(values);
    },
  });

}

