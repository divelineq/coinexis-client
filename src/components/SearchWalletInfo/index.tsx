import { Button } from "@ui/Button";
import { TextField } from "@ui/TextField";
import { validateAdress } from "./detectCryptoAddressNetwork";
import { useWalletForm } from "./useWalletForm";

function buildFieldLabel<T extends Record<string, any>>(field: T) {
	const detection = validateAdress(field.state.value);
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

function SearchWalletInfo() {
	const form = useWalletForm();

	return (
		<form
			className="flex flex-col items-center"
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
						!validateAdress(value.value).isValid &&
						"Invalid address",
				}}
				children={(field) => (
					<div className="flex flex-col items-center w-[420px]">
						<TextField
							label={buildFieldLabel<typeof field>(field)}
							placeholder="Enter wallet address"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
						<Button
							disabled={!validateAdress(field.state.value).isValid}
							type="submit"
							onClick={form.handleSubmit}
							className="bg-blue-600 text-white py-1 rounded-sm w-full my-2 cursor-pointer hover:bg-blue-800 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
						>
							Search
						</Button>
					</div>
				)}
			/>
		</form>
	);
}

export { SearchWalletInfo };
