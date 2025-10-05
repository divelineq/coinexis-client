import tailwindcss from "@tailwindcss/vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			routesDirectory: "./src/routes",
		}),
		tailwindcss(),
		react({
			babel: {
				plugins: ["babel-plugin-react-compiler"],
			},
		}),
	],
	resolve: {
		alias: {
			"@ui": path.resolve(__dirname, "./src/ui"),
			"@api": path.resolve(__dirname, "./src/api"),
			"@features": path.resolve(__dirname, "./src/features"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:4200",
				changeOrigin: true,
				secure: true,
			},
		},
	},
});
