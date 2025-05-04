import { useLogin } from "../api/loginState";

function Header() {
	const login = useLogin((state) => state.loggedIn);
	const setLogin = useLogin((state) => state.setLoggedIn);

	return (
		<div className="bg-emerald-800 h-12 flex items-center justify-between p-2">
			<div className="flex items-center gap-3">
				<h2>Project X</h2>
			</div>
			<div>
				<button
					className="outline-none cursor-pointer hover:text-emerald-300"
					onClick={() => setLogin(!login)}
				>
					Login
				</button>
			</div>
		</div>
	);
}

export { Header };
