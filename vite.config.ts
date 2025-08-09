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
		react(),
	],
	resolve: {
		alias: {
			"@ui": path.resolve(__dirname, "./src/ui"),
			"@api": path.resolve(__dirname, "./src/api"),
			"@feature": path.resolve(__dirname, "./src/feature"),
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
