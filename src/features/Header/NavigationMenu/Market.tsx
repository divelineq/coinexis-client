import { Link } from "@tanstack/react-router";
import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "@ui";

export function Market() {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>Market</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid w-[400px] gap-4">
					<li>
						<NavigationMenuLink asChild>
							<Link to="/market/$category" params={{ category: "spot" }}>
								<div className="font-medium">Spot</div>
								<div className="text-muted-foreground">
									Direct token-to-token trading at current market prices.
								</div>
							</Link>
						</NavigationMenuLink>
					</li>
					<li>
						<NavigationMenuLink asChild>
							<Link to="/market/$category" params={{ category: "linear" }}>
								<div className="font-medium">USDT Perpetual</div>
								<div className="text-muted-foreground">
									USDT-margined perpetual contracts settled in stablecoins.
								</div>
							</Link>
						</NavigationMenuLink>
					</li>
					<li>
						<NavigationMenuLink asChild>
							<Link to="/market/$category" params={{ category: "inverse" }}>
								<div className="font-medium">Coin Perpetual</div>
								<div className="text-muted-foreground">
									Coin-margined contracts settled in the base cryptocurrency.
								</div>
							</Link>
						</NavigationMenuLink>
					</li>
					{/* //TODO: подумать как реализовать option */}
					{/* <li>
						<NavigationMenuLink asChild>
							<Link to="/market/$category" params={{ category: "option" }}>
								<div className="font-medium">Option</div>
								<div className="text-muted-foreground">
									Crypto options contracts for hedging and advanced trading.
								</div>
							</Link>
						</NavigationMenuLink>
					</li> */}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);
}
