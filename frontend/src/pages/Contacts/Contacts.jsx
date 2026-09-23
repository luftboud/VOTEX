import "./Contacts.scss";
import Header from "../../components/Header/Header";

function Contacts({ user }) {
	return (
		<div className="contacts">
			<Header user={user?.name || null} />
			<main className="contacts__main">
				<header className="contacts__heading">
					<p className="contacts__eyebrow">Підтримка</p>
					<h1 className="contacts__title">Служба підтримки</h1>
					<p className="contacts__lead">
						Якщо на платформі щось не працює, напишіть розробниці.
						Коротко опишіть, що сталося — так проблему вдасться розібрати швидше.
					</p>
				</header>

				<section className="contacts__card" aria-labelledby="contacts-person">
					<div className="contacts__person">
						<div className="contacts__avatar" aria-hidden="true">ІМ</div>
						<div>
							<h2 id="contacts-person" className="contacts__name">Ія Магарита</h2>
							<p className="contacts__role">Розробниця платформи</p>
						</div>
					</div>

					<div className="contacts__actions">
						<a
							className="contacts__action"
							href="https://t.me/zabuvayuvzhe"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="contacts__actionIcon" aria-hidden="true">
								<TelegramIcon />
							</span>
							<span className="contacts__actionText">
								<span className="contacts__actionLabel">Telegram</span>
								<span className="contacts__actionValue">Написати в чат</span>
							</span>
						</a>
						<a className="contacts__action" href="mailto:ijamaharyta@gmail.com">
							<span className="contacts__actionIcon" aria-hidden="true">
								<MailIcon />
							</span>
							<span className="contacts__actionText">
								<span className="contacts__actionLabel">Електронна пошта</span>
								<span className="contacts__actionValue">ijamaharyta@gmail.com</span>
							</span>
						</a>
					</div>
				</section>

				<section className="contacts__hint" aria-labelledby="contacts-hint">
					<h2 id="contacts-hint" className="contacts__hintTitle">Що варто вказати в повідомленні</h2>
					<ul className="contacts__list">
						<li>Що саме не працює: вхід, голосування, засідання чи конкретна сторінка.</li>
						<li>Що ви очікували побачити і що сталося замість цього.</li>
						<li>Скріншот, якщо помилка видима на екрані.</li>
					</ul>
					<p className="contacts__note">
						Сюди пишіть лише щодо роботи сайту. Питання порядку денного та рішень Ради студентів тут не обробляється.
					</p>
				</section>
			</main>
		</div>
	);
}

function TelegramIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M21 5L3.5 11.5c-.9.35-.88 1.62.03 1.94l4.5 1.56 1.72 5.2c.28.86 1.4.98 1.86.2l2.46-4.16 4.7 3.46c.72.53 1.74.13 1.9-.75L22.7 6.1c.18-.96-.78-1.74-1.7-1.1z" />
			<path d="M9.2 14.8l9.3-7.3" />
		</svg>
	);
}

function MailIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<path d="M3 7l9 7 9-7" />
		</svg>
	);
}

export default Contacts;
