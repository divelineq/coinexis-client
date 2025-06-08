import { createFileRoute } from "@tanstack/react-router";
import { useGetAllAssets } from "../api";
import { MainSkeleton } from "../components/Skeletons/MainSkeleton";
import { Table } from "../components/Table";
import { DEFAULT_ALL_ASSETS_COLUMNS } from "../consts/allAssetsDefaultColumns";

export const Route = createFileRoute("/")({
	component: () => {
		const { data } = useGetAllAssets();

		return <Table defaultColumns={DEFAULT_ALL_ASSETS_COLUMNS} data={data} />;
	},
	pendingComponent: () => <MainSkeleton />,
	errorComponent: () => <div>Error assets table :(</div>,
});
