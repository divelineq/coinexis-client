import { useForm } from "@tanstack/react-form";
import type { z } from "zod/v4";
import type { ADRESS_VALIDATION_SCHEMA } from "./ValidationSchema";
import { detectCryptoAddressNetwork } from "./detectCryptoAddressNetwork";

type Adress = {
	adress: z.infer<typeof ADRESS_VALIDATION_SCHEMA>;
};

const defaultAdress: Adress = { adress: "" };

function SearchWalletInfo() {
	const form = useForm({
		defaultValues: defaultAdress,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.stopPropagation();
				e.preventDefault();
			}}
		>
			<form.Field
				name="adress"
				validators={{
					onChange: (value) =>
						value.value.length > 0 &&
						!detectCryptoAddressNetwork(value.value).isValid &&
						"Invalid address",
				}}
				children={(field) => {
					const inputValue = field.state.value;
					const detection = detectCryptoAddressNetwork(inputValue);
					const showNetwork = detection.isValid && detection.network;
					return (
						<div>
							<div>
								<input
									placeholder="Enter wallet address"
									className="m-4 border-2 border-gray-500 rounded-sm"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								{field.state.meta.errors && (
									<div className="text-red-500 px-2 text-md">
										{field.state.meta.errors}
									</div>
								)}
								{showNetwork && (
									<div className="text-green-500 px-2 text-md">
										{detection.network}
									</div>
								)}
							</div>
							<button
								type="submit"
								onClick={form.handleSubmit}
								className="border-2 border-gray-500 rounded-sm p-1 m-2"
							>
								Search
							</button>
						</div>
					);
				}}
			/>
		</form>
	);
}

export { SearchWalletInfo };
