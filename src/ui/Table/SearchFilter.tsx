import { TextField } from "../TextField";

type Props = {
	className?: string;
};

function SearchFilter({ className }: Props) {
	return <TextField className={className} />;
}

export { SearchFilter };
