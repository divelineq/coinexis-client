"use client";

import { Link, useRouter } from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@ui";
import { createSerializer, parseAsString } from "nuqs";

const serializer = createSerializer({
	tab: parseAsString,
});

export function NavigationMenuDemo() {
	const router = useRouter();

	return (
		<NavigationMenu viewport={false} className="z-10 text-left">
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<Link className="[&.active]:text-primary" to="/">
							Home
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Market</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-4">
							<li>
								<NavigationMenuLink asChild>
									<Link
										to={serializer("market", {
											tab: "all",
										})}
										onClick={() => {
											router.invalidate();
										}}
									>
										<div className="font-medium">All coins</div>
										<div className="text-muted-foreground">
											A complete list of cryptocurrencies, including both
											popular and new tokens on the market.
										</div>
									</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link
										to={serializer("market", {
											tab: "categories",
										})}
										onClick={() => {
											router.invalidate();
										}}
									>
										<div className="font-medium">Categories</div>
										<div className="text-muted-foreground">
											An overview of cryptocurrencies grouped by thematic
											categories — technology, purpose, and scope of
											application.
										</div>
									</Link>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<Link className="[&.active]:text-primary" to="/nft">
							Nfts
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<Link className="[&.active]:text-primary" to="/portfolio">
							Portfolio
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<Link className="[&.active]:text-primary" to="/transactions">
							Transactions
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
