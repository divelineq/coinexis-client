import cx from "classix";
import { motion } from "framer-motion";

export type TabItem = {
	id: string;
	label: string;
};

type TabsProps<TValue extends string> = {
	tabs: TabItem[];
	value: TValue;
	onChange: (value: TValue) => void;
	className?: string;
};

export const Tabs = <TValue extends string>({
	tabs,
	value,
	onChange,
	className,
}: TabsProps<TValue>) => {
	return (
		<div className={className}>
			<div className="relative flex justify-start space-x-6 border-b border-custom">
				{tabs.map((tab) => {
					const isActive = tab.id === value;

					return (
						<button
							key={tab.id}
							onClick={() => onChange(tab.id as TValue)}
							className={cx(
								"relative py-2 text-md font-medium transition-colors rounded-sm",
								isActive ? "text-primary" : "text-gray-400 hover:text-primary",
							)}
							role="tab"
							aria-selected={isActive}
							aria-controls={`tab-panel-${tab.id}`}
						>
							{tab.label}
							{isActive && (
								<motion.div
									layoutId="underline"
									className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-sm"
								/>
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
};
