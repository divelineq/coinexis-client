declare module "*.css";

interface ImportMetaEnv {
	readonly VITE_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
