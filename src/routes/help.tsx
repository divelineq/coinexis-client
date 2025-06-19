import { Help } from "@feature";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/help")({
	component: Help,
});
