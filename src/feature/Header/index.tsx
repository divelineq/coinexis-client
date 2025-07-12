import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ModeToggle } from "./ModeToggle";

export function Header() {
	return (
		<>
			<div className="p-2 flex text-center justify-between items-center">
				<div className="flex gap-4">
					<Link to="/" className="[&.active]:text-primary">
						Home
					</Link>{" "}
					<Link to="/market" className="[&.active]:text-primary">
						Market
					</Link>
					<Link to="/portfolio" className="[&.active]:text-primary">
						Portfolio
					</Link>
					<Link to="/transactions" className="[&.active]:text-primary">
						Transactions
					</Link>
					<Link to="/nft" className="[&.active]:text-primary">
						Nft
					</Link>
				</div>
				<ModeToggle />
			</div>
			<hr className="border-custom" />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}
