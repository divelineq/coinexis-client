import { createFileRoute } from "@tanstack/react-router";
import { SearchWalletInfo } from "../components/SearchWalletInfo";

export const Route = createFileRoute("/wallet")({
	component: SearchWalletInfo,
	errorComponent: () => <div>Ошибка :(</div>,
	pendingComponent: () => <div>Загрузка...</div>,
});
