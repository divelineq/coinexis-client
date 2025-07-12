import { Link } from "@tanstack/react-router";
import { Button } from "@ui";
import { motion } from "framer-motion";
import { BestCoinsInfo } from "./CoinInfo";
import { FeatureItem } from "./FeatureItem";

function Home() {
	return (
		<main className="bg-background text-white font-orbitron min-h-screen overflow-x-hidden">
			<section className="py-20 px-6 md:px-20">
				<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-4xl md:text-6xl font-bold leading-tight"
						>
							Web3 Dashboard для анализа
							<br />
							<span className="text-primary">твоего кошелька</span>
						</motion.h1>
						<p className="text-gray-400 text-lg">
							Оценивай баланс, активы, токены, NFT и транзакции в одном месте —
							в удобном интерфейсе, без регистрации, в духе Web3.
						</p>
						<div className="flex gap-4">
							<Button>
								<Link to="/market">Попробовать</Link>
							</Button>
						</div>
					</div>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1 }}
						className="relative"
					>
						<div className="rounded-2xl bg-gradient-to-br from-[#1e1e2f] to-[#2e2e3f] p-6 shadow-xl border border-custom flex gap-3">
							<BestCoinsInfo coins={["bitcoin", "ethereum", "bnb"]} />
						</div>
						<div className="absolute -top-6 -left-6 w-16 h-16 bg-[#00f9bb44] rounded-full blur-2xl animate-pulse" />
						<div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#6c5dd355] rounded-full blur-2xl animate-pulse" />
					</motion.div>
				</div>
			</section>
			<section className="py-20 px-6 md:px-20 bg-surface border-t border-custom">
				<div className="max-w-5xl mx-auto text-center space-y-6">
					<h2 className="text-3xl md:text-4xl font-semibold text-white">
						Умный мониторинг криптокошельков
					</h2>
					<p className="text-gray-400 max-w-3xl mx-auto text-lg">
						Наблюдай за активностью любого адреса. Оптимизируй свои решения,
						следи за китами, сохраняй анонимность — платформа построена для
						Web3. Нет логинов, нет отслеживания, только данные.
					</p>
				</div>
			</section>
			<section className="py-20 px-6 md:px-20 bg-[#0e0e12] border-t border-custom">
				<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
					<FeatureItem
						title="Полный портфель"
						description="Отображение всех токенов, NFT и цен в реальном времени, с графиками и дашбордом."
					/>
					<FeatureItem
						title="Анализ транзакций"
						description="Фильтры, категории, просмотр входящих/исходящих и взаимодействий со смарт-контрактами."
					/>
					<FeatureItem
						title="Безопасность и приватность"
						description="Приложение работает только на клиенте. Без API-ключей, трекинга или авторизации."
					/>
				</div>
			</section>
			<footer className="bg-background border-t border-custom text-gray-400 px-6 md:px-20 py-12 mt-auto">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="space-y-2 text-center md:text-left">
						<p className="text-sm font-medium text-white">
							Создан на энтузиазме, кофе и Web3.
						</p>
						<p className="text-xs">Build & verify — never trust blindly.</p>
					</div>

					<div className="flex gap-6">
						<a
							href="https://github.com/divelineq"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary transition"
						>
							GitHub
						</a>
						<a
							href="https://t.me/divelineq"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary transition"
						>
							Telegram
						</a>
					</div>
				</div>
			</footer>
		</main>
	);
}

export { Home };
