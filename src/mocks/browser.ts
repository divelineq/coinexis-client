import { setupWorker } from "msw/browser";
import { handlers } from "./handlers.js";

export const worker = setupWorker(...handlers);
await worker.start({
	serviceWorker: {
		url: "../../public/mockServiceWorker.js",
	},
});
