"use client";

import { Link } from "@tanstack/react-router";
import {
	NavigationMenu as NavigationMenuComponent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@ui";
import { Market } from "./Market";
import { Wallet } from "./Wallet";

export function NavigationMenu() {
	return (
		<NavigationMenuComponent viewport={false} className="z-200 text-left">
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<Link className="[&.active]:text-primary" to="/">
							Home
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<Market />
				<Wallet />
			</NavigationMenuList>
		</NavigationMenuComponent>
	);
}
