type Props = {
	message?: string;
	onRetry?: () => void;
	error?: Error | null;
};

export function ErrorScreen({
	onRetry,
	error,
	message = "Что-то пошло не так! Попробуйте перезагрузить страницу",
}: Props) {
	const handleRetry = () => {
		if (!onRetry) {
			window.location.reload();
		}

		onRetry?.();
	};

	return (
		<div className="flex flex-col items-center justify-center text-center px-4 w-full h-[calc(100vh-80px)] bg-[--background] text-white">
			<div className="text-4xl md:text-5xl font-bold text-primary mb-4">
				⚠ Ошибка
			</div>
			<p className="text-lg text-zinc-300 max-w-xl mb-6">{message}</p>
			{error && (
				<p className="text-lg text-zinc-300 max-w-xl mb-6">{error.message}</p>
			)}
			<button
				onClick={handleRetry}
				className="px-6 py-2 rounded-xl bg-primary text-black font-semibold hover:bg-primary transition-colors"
			>
				{onRetry ? "Повторить попытку" : "Перезагрузить страницу"}
			</button>
		</div>
	);
}
