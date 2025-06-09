import { Table } from "@ui";
import { useGetAllAssets } from "../../api";
import { DEFAULT_ALL_ASSETS_COLUMNS } from "../../consts";

function AllAssetsTable() {
	const { data } = useGetAllAssets();

	return <Table defaultColumns={DEFAULT_ALL_ASSETS_COLUMNS} data={data} />;
}

export { AllAssetsTable };
