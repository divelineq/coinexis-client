import { useForm } from "@tanstack/react-form";
import { IconButton, Input } from "@ui";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { validateAddress } from "./validateAddress";

type Props = {
	onChange: (val: string) => void;
	isPending: boolean;
};

const buildMessage = (errors: string[], success: boolean) => {
	if (errors.length > 0) {
		return <IoIosClose size={20} className="cursor-default" color="red" />;
	}

	if (success) {
		return (
			<IoIosCheckmark size={20} className="cursor-default" color="green" />
		);
	}

	return null;
};

function WalletField({ onChange, isPending }: Props) {
	const form = useForm({
		defaultValues: { address: "" },
		onSubmit: (values) => onChange(values.value.address),
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
			className="w-full flex flex-col items-center gap-3"
		>
			<form.Field
				name="address"
				validators={{
					onChange: (value) =>
						value.value.length > 0 &&
						!validateAddress(value.value).isValid &&
						"Invalid address",
				}}
			>
				{(field) => {
					const detection = validateAddress(field.state.value);
					const showNetwork = detection.isValid && detection.network;

					return (
						<div className="w-full flex gap-2 items-center justify-center">
							<Input
								className="min-w-[430px]"
								startIcon={<IoWalletOutline size={20} />}
								endIcon={buildMessage(
									field.state.meta.errors as string[],
									!!showNetwork,
								)}
								id="wallet-address"
								type="text"
								placeholder="Enter wallet address"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							<IconButton
								className="h-9 w-9"
								icon={<AiOutlineSearch size={20} className="m-auto" />}
								isLoading={isPending}
								type="submit"
								onClick={form.handleSubmit}
								disabled={!validateAddress(field.state.value).isValid}
							/>
						</div>
					);
				}}
			</form.Field>
		</form>
	);
}

export { WalletField };
