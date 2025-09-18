import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AccountInfo } from "./AccountInfo";
import { ModeToggle } from "./ModeToggle";
import { NavigationMenu } from "./NavigationMenu";

export function Header() {
	return (
		<>
			<div className="p-2 flex text-center justify-between items-center">
				<NavigationMenu />
				<div className="flex gap-8 items-center">
					<AccountInfo />
					<ModeToggle />
				</div>
			</div>
			<hr className="border-custom" />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}
