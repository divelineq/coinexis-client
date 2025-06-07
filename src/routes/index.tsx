import { createFileRoute } from "@tanstack/react-router";
import { useGetAllAssets } from "../api";
import { MainSkeleton } from "../components/Skeletons/MainSkeleton";
import { Table } from "../components/Table";
import { DEFAULT_COLUMNS } from "../consts/allAssetsDefaultColumns";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	pendingComponent: () => <MainSkeleton />,
	errorComponent: () => <div>Ошибка :(</div>,
});

function RouteComponent() {
	const { data } = useGetAllAssets();

	return <Table defaultColumns={DEFAULT_COLUMNS} data={data} />;
}
