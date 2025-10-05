import { Nft } from "@features";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/nfts")({
	component: Nft,
	pendingComponent: () => <div>Loading nft...</div>,
	errorComponent: () => <div>Error nft :(</div>,
});
