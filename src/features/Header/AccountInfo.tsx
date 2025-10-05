import { api } from "@api";
import { useQuery } from "@tanstack/react-query";

function AccountInfo() {
	const { data, isLoading } = useQuery({
		queryKey: ["wallet-balance", "unified"],
		queryFn: ({ signal }) => api.walletBalance.getMany(signal, "UNIFIED"),
	});

	return (
		<div>
			<p className="text-sm">
				Единый торговый:{" "}
				<span>
					{isLoading
						? "Загрузка..."
						: Number(data?.totalWalletBalance).toLocaleString("en-US", {
								style: "currency",
								currency: "USD",
								maximumFractionDigits: 2,
							})}
				</span>
			</p>
		</div>
	);
}

export { AccountInfo };
