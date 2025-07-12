import cx from "classix";
import { motion } from "framer-motion";
import { useState } from "react";

export type TabItem = {
	id: string;
	label: string;
};

type TabsProps = {
	tabs: TabItem[];
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	className?: string;
};

export const Tabs = ({
	tabs,
	value,
	defaultValue,
	onChange,
	className,
}: TabsProps) => {
	const [internalValue, setInternalValue] = useState(
		defaultValue ?? tabs[0]?.id,
	);
	const activeTab = value ?? internalValue;

	const handleChange = (id: string) => {
		if (!value) {
			setInternalValue(id);
		}

		onChange?.(id);
	};

	return (
		<div className={className}>
			<div className="relative flex justify-start space-x-6 border-b border-custom">
				{tabs.map((tab) => {
					const isActive = tab.id === activeTab;

					return (
						<button
							key={tab.id}
							onClick={() => handleChange(tab.id)}
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
