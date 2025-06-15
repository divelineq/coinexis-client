import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "sonner";
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

async function enableMocking() {
	//* test/development/production
	if (import.meta.env.MODE === "test") {
		const { worker } = await import("./mocks/browser");

		return worker.start();
	}
}

const router = createRouter({ routeTree });

const queryClient = new QueryClient();

enableMocking().then(() => {
	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
					<Toaster
						closeButton
						duration={1500}
						position="top-center"
						richColors
					/>
					<ReactQueryDevtools initialIsOpen={false} position="right" />
				</QueryClientProvider>
			</ErrorBoundary>
		</StrictMode>,
	);
});
