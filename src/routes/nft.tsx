import { Nft } from "@feature";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/nft")({
	component: Nft,
	pendingComponent: () => <div>Loading nft...</div>,
	errorComponent: () => <div>Error nft :(</div>,
});
