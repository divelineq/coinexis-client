import { createFileRoute } from "@tanstack/react-router";
import { AllAssetsCkeleton, AllAssetsTable } from "../components";

export const Route = createFileRoute("/coins")({
	component: AllAssetsTable,
	pendingComponent: () => <AllAssetsCkeleton />,
	errorComponent: () => <div>Error assets table :(</div>,
});
