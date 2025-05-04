import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { App } from "./App";
import "./index.css";

const queryClient = new QueryClient();

function ErrorFallback({ error }: any) {
	return (
		<div className="text-center items-center justify-center flex flex-col h-screen">
			<h1>Что-то пошло не так!</h1>
			<p>{error.message}</p>
		</div>
	);
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<QueryClientProvider client={queryClient}>
				<App />
				<ReactQueryDevtools initialIsOpen={false} position="right" />
			</QueryClientProvider>
		</ErrorBoundary>
	</StrictMode>,
);
