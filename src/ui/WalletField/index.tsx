import { useForm } from "@tanstack/react-form";
import { Button, TextField } from "@ui";
import type { z } from "zod/v4";
import type { ADDRESS_VALIDATION_SCHEMA } from "./ValidationSchema";
import { validateAddress } from "./validateAddress";

type Props = {
	onChange: (val: string) => void;
	isPending: boolean;
};

type Address = {
	address: z.infer<typeof ADDRESS_VALIDATION_SCHEMA>;
};

const DEFAULT_ADDRESS: Address = { address: "" };

function buildFieldLabel<T extends Record<string, any>>(field: T) {
	const detection = validateAddress(field.state.value);
	const showNetwork = detection.isValid && detection.network;

	return (
		<>
			<p>Wallet address</p>
			{field.state.meta.errors && (
				<div className="text-red-500 text-md">{field.state.meta.errors}</div>
			)}
			{showNetwork && (
				<div className="text-green-500 text-md">{detection.network}</div>
			)}
		</>
	);
}

function WalletField({ onChange, isPending }: Props) {
	const form = useForm({
		defaultValues: DEFAULT_ADDRESS,
		onSubmit: (values) => onChange(values.value.address),
	});

	return (
		<form
			className="flex flex-col items-center"
			onSubmit={(e) => {
				e.stopPropagation();
				e.preventDefault();
			}}
		>
			<form.Field
				name="address"
				validators={{
					onChange: (value) =>
						value.value.length > 0 &&
						!validateAddress(value.value).isValid &&
						"Invalid address",
				}}
				children={(field) => (
					<div className="flex flex-col items-center w-[420px]">
						<TextField
							className="w-full"
							label={buildFieldLabel<typeof field>(field)}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={field.handleChange}
						/>
						<Button
							isLoading={isPending}
							disabled={!validateAddress(field.state.value).isValid}
							type="submit"
							onClick={form.handleSubmit}
							className="bg-blue-600 text-white py-1 rounded-sm w-full my-2 cursor-pointer hover:bg-blue-800 transition-colors"
						>
							Search
						</Button>
					</div>
				)}
			/>
		</form>
	);
}

export { WalletField };
