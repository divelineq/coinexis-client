import { BiCheckCircle } from "react-icons/bi";

type Props = {
	title: string;
	description: string;
};

function FeatureItem({ title, description }: Props) {
	return (
		<div className="bg-surface p-6 rounded-xl border border-custom hover:shadow-lg transition">
			<div className="flex items-center gap-3 mb-4 text-primary">
				<BiCheckCircle className="w-6 h-6" />
				<h3 className="text-xl font-semibold">{title}</h3>
			</div>
			<p className="text-gray-400">{description}</p>
		</div>
	);
}

export { FeatureItem };
