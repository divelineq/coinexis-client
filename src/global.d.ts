declare module "*.css";

interface ImportMetaEnv {
	readonly VITE_API_KEY: string;
	readonly MODE: string;
	readonly VITE_USE_MSW: string;
	readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
