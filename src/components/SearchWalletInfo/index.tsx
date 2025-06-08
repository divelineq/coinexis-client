import { detectCryptoAddressNetwork } from "./detectCryptoAddressNetwork";
import { useWalletForm } from "./useWalletForm";

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
						!detectCryptoAddressNetwork(value.value).isValid &&
						"Invalid address",
				}}
				children={(field) => {
					const inputValue = field.state.value;
					const detection = detectCryptoAddressNetwork(inputValue);
					const showNetwork = detection.isValid && detection.network;
					return (
						<div className="flex flex-col items-center w-[420px]">
							<label
								htmlFor="wallet-adress"
								className="text-sm mt-6 flex gap-1 w-full justify-between"
							>
								<p>Wallet address</p>
								{field.state.meta.errors && (
									<div className="text-red-500 text-md">
										{field.state.meta.errors}
									</div>
								)}
								{showNetwork && (
									<div className="text-green-500 text-md">
										{detection.network}
									</div>
								)}
							</label>
							<input
								id="wallet-adress"
								placeholder="Enter wallet address"
								className="p-2 w-full  border-2 border-gray-500 rounded-sm"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							<button
								disabled={!detection.isValid}
								type="submit"
								onClick={form.handleSubmit}
								className="bg-blue-600 text-white py-1 rounded-sm w-full my-2 cursor-pointer hover:bg-blue-800 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
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
