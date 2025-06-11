import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
import { routeTree } from "./routeTree.gen";

function ErrorFallback({ error }: any) {
	return (
		<div className="text-center items-center justify-center flex flex-col h-screen">
			<h1>Что-то пошло не так! Попробуйте перезагрузить страницу</h1>
			<p>{error.message}</p>
		</div>
	);
}

const router = createRouter({ routeTree });

async function enableMocking() {
	if (process.env.NODE_ENV !== "development") {
		return;
	}

	const { worker } = await import("./mocks/browser");

	return worker.start();
}

const queryClient = new QueryClient();

enableMocking().then(() => {
	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
					<ReactQueryDevtools initialIsOpen={false} position="right" />
				</QueryClientProvider>
			</ErrorBoundary>
		</StrictMode>,
	);
});
