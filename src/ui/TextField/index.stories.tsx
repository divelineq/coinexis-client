import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField } from ".";

const meta: Meta<typeof TextField> = {
	title: "TextField",
	component: TextField,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {};
