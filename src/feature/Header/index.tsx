import { Outlet, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ModeToggle } from "./ModeToggle";
import { NavigationMenuDemo } from "./NavigationMenu";

export function Header() {
	const { location } = useRouterState();

	return (
		<>
			<div className="p-2 flex text-center justify-between items-center">
				<NavigationMenuDemo />
				<ModeToggle />
			</div>
			<hr className="border-custom" />
			<Outlet key={location.pathname} />
			<TanStackRouterDevtools />
		</>
	);
}
