import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export function Header() {
	return (
		<>
			<div className="p-2 flex gap-2 text-center justify-center">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>{" "}
				<Link to="/coins" className="[&.active]:font-bold">
					Coins
				</Link>
				<Link to="/portfolio" className="[&.active]:font-bold">
					Portfolio
				</Link>
				<Link to="/transactions" className="[&.active]:font-bold">
					Transactions
				</Link>
				<Link to="/nft" className="[&.active]:font-bold">
					Nft
				</Link>
			</div>
			<hr className="border-custom" />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}
