import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ErrorScreen } from "@ui";
import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "sonner";
import "./index.css";
import { routeTree } from "./routeTree.gen";

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
			<ErrorBoundary FallbackComponent={ErrorScreen}>
				<NuqsAdapter>
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
				</NuqsAdapter>
			</ErrorBoundary>
		</StrictMode>,
	);
});
