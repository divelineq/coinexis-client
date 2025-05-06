import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: RootComponent,
	pendingComponent: () => <div>Загрузка...</div>,
	errorComponent: () => <div>Ошибка :(</div>,
});

function RootComponent() {
	return (
		<>
			<div className="p-2 flex gap-2 text-center justify-center">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>{" "}
				<Link to="/charts" className="[&.active]:font-bold">
					Charts
				</Link>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}
