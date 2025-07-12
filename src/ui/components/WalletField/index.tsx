import { useForm } from "@tanstack/react-form";
import { Button, Input } from "@ui";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import { addressDetection } from "./addressDetection";
import { getStartIcon } from "./getStartIcon";

type Props = {
	onChange: (val: string) => void;
	isPending: boolean;
};

const buildMessage = (errors: string[], success: boolean) => {
	if (errors.length > 0) {
		return <IoIosClose size={24} className="cursor-default" color="red" />;
	}

	if (success) {
		return (
			<IoIosCheckmark size={24} className="cursor-default" color="green" />
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
						!addressDetection(value.value).isValid &&
						"Invalid address",
				}}
			>
				{(field) => {
					const detection = addressDetection(field.state.value);
					const showNetwork = detection.isValid && detection.network;

					return (
						<div className="w-full flex gap-2 items-center justify-center">
							<Input
								className="min-w-[430px]"
								startIcon={getStartIcon(detection.network)}
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
							<Button
								size="icon"
								isLoading={isPending}
								type="submit"
								onClick={form.handleSubmit}
								disabled={!addressDetection(field.state.value).isValid}
							>
								<AiOutlineSearch size={20} className="m-auto" />
							</Button>
						</div>
					);
				}}
			</form.Field>
		</form>
	);
}

export { WalletField };
