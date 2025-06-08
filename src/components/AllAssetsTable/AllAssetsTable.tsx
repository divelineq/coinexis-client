import { Table } from "@ui/Table";
import { useGetAllAssets } from "../../api";
import { DEFAULT_ALL_ASSETS_COLUMNS } from "../../consts/allAssetsDefaultColumns";

function AllAssetsTable() {
	const { data } = useGetAllAssets();

	return <Table defaultColumns={DEFAULT_ALL_ASSETS_COLUMNS} data={data} />;
}

export { AllAssetsTable };
