import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ModeToggle } from "./ModeToggle";
import { NavigationMenu } from "./NavigationMenu";

export function Header() {
	return (
		<>
			<div className="p-2 flex text-center justify-between items-center">
				<NavigationMenu />
				<ModeToggle />
			</div>
			<hr className="border-custom" />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}
