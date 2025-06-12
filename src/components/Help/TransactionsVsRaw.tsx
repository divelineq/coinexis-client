export default function TransactionsVsRaw() {
	return (
		<div className="p-6 space-y-6">
			<h1 className="text-2xl font-bold">
				Разница между <code>/1/wallet/transactions</code> и{" "}
				<code>/1/wallet/raw-transactions</code>
			</h1>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold">
					📊 /1/wallet/transactions — "Умные" транзакции
				</h2>
				<p>
					Это как красиво оформленная выписка из банка, где все уже обработано и
					понятно:
				</p>
				<ul className="list-disc list-inside space-y-1">
					<li>
						✅ Обработанная информация: API уже понял, что вы купили Bitcoin или
						продали Ethereum
					</li>
					<li>
						✅ Цены в долларах: показывает, сколько стоила ваша покупка в USD
					</li>
					<li>✅ Типы операций: четко говорит "покупка" или "продажа"</li>
					<li>
						✅ Информация о токенах: название, символ, логотип криптовалюты
					</li>
					<li>✅ Удобный формат: все данные красиво структурированы</li>
					<li>
						📈 Анализ торговых стратегий - понять, что покупает/продает кошелек
						💰 Оценка прибыльности - видеть P&L в долларах 🏆 Поиск "умных
						денег" - найти успешных трейдеров 📱 Создание отчетов для клиентов -
						красивые, понятные данные 🔍 Анализ портфелей - что держат крупные
						инвесторы
					</li>
				</ul>

				<pre className="bg-gray-700 rounded p-4 overflow-auto text-sm">
					{`{
  "type": "buy",
  "asset": {
    "name": "Bitcoin",
    "symbol": "BTC"
  },
  "amount": 0.5,
  "amount_usd": 25000
}`}
				</pre>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold">
					🔧 /1/wallet/raw-transactions — "Сырые" транзакции
				</h2>
				<p>Это как техническая распечатка прямо из блокчейна, без обработки:</p>
				<ul className="list-disc list-inside space-y-1">
					<li>
						🔍 Сырые данные: только базовая информация о переводах ETH, SOL и
						других нативных монет
					</li>
					<li>🔍 Технические детали: хеши, адреса, номера блоков</li>
					<li>
						🔍 Без интерпретации: API не пытается понять, что это была за
						операция
					</li>
					<li>
						🔍 Минимальная обработка: данные почти в том виде, как они записаны
						в блокчейне
					</li>
					<li>
						🕵️ Расследование подозрительной активности - отмывание, мошенничество
						⚡ Анализ газовых комиссий - оптимизация транзакций 🔗 Трассировка
						средств - откуда пришли деньги, куда ушли 🤖 Создание собственных
						алгоритмов - нужны чистые данные 📊 Анализ сетевой активности -
						паттерны использования блокчейна
					</li>
				</ul>

				<pre className="bg-gray-700 rounded p-4 overflow-auto text-sm">
					{`{
  "from": "0x123...",
  "to": "0x456...",
  "amount": "500000000000000000",
  "hash": "0x789..."
}`}
				</pre>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold">🤔 Когда что использовать?</h2>

				<div>
					<h3 className="font-medium">
						Используйте <code>/1/wallet/transactions</code> если:
					</h3>
					<ul className="list-disc list-inside space-y-1">
						<li>👶 Вы новичок в криптовалютах</li>
						<li>📱 Создаете приложение для обычных пользователей</li>
						<li>💰 Хотите показать портфолио с ценами в долларах</li>
						<li>📊 Нужна аналитика покупок/продаж</li>
					</ul>
				</div>

				<div>
					<h3 className="font-medium">
						Используйте <code>/1/wallet/raw-transactions</code> если:
					</h3>
					<ul className="list-disc list-inside space-y-1">
						<li>🔧 Вы разработчик и нужны технические детали</li>
						<li>🏗️ Создаете собственную систему обработки данных</li>
						<li>
							🔍 Нужны только базовые переводы нативных монет (ETH, SOL, BNB)
						</li>
						<li>⚡ Хотите максимально быстрый доступ к данным блокчейна</li>
					</ul>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-semibold">📝 Краткое резюме</h2>
				<p>
					<code>/1/wallet/transactions</code> = Готовая к использованию
					информация с ценами и понятными названиями (как красивая выписка из
					банка)
				</p>
				<p>
					<code>/1/wallet/raw-transactions</code> = Технические данные прямо из
					блокчейна без обработки (как техническая распечатка)
				</p>
				<p>
					Для большинства случаев лучше использовать обычный{" "}
					<code>/transactions</code>, а <code>raw-transactions</code> — только
					если вам нужны специфические технические данные.
				</p>
			</section>
		</div>
	);
}
