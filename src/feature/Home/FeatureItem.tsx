import { BiCheckCircle } from "react-icons/bi";

function FeatureItem({
	title,
	description,
}: { title: string; description: string }) {
	return (
		<div className="bg-[#1a1a22] p-6 rounded-xl border border-[#2a2a3d] hover:shadow-lg transition">
			<div className="flex items-center gap-3 mb-4 text-[#00f9bb]">
				<BiCheckCircle className="w-6 h-6" />
				<h3 className="text-xl font-semibold">{title}</h3>
			</div>
			<p className="text-gray-400">{description}</p>
		</div>
	);
}

export { FeatureItem };
