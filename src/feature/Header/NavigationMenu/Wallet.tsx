import { Link } from "@tanstack/react-router";
import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "@ui";

export function Wallet() {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>Wallet</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid w-[400px] gap-4">
					<li>
						<NavigationMenuLink asChild>
							<Link to="/nfts">
								<div className="font-medium">Nfts</div>
								<div className="text-muted-foreground">
									A showcase of all NFTs in your wallet, from collectibles to
									unique digital assets.
								</div>
							</Link>
						</NavigationMenuLink>
					</li>
					<li>
						<NavigationMenuLink asChild>
							<Link to="/portfolio">
								<div className="font-medium">Portfolio</div>
								<div className="text-muted-foreground">
									Overview of a wallet’s portfolio balance and asset
									distribution.
								</div>
							</Link>
						</NavigationMenuLink>
					</li>
					<li>
						<NavigationMenuLink asChild>
							<Link to="/transactions">
								<div className="font-medium">Transactions</div>
								<div className="text-muted-foreground">
									Complete history of transfers, trades, and activities from a
									wallet.
								</div>
							</Link>
						</NavigationMenuLink>
					</li>
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);
}
