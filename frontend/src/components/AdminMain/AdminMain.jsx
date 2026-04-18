import "./AdminMain.scss";
import { useNavigate } from "react-router-dom";

const recentMeetings = [
	{
		id: "meeting-1",
		title: "Budget Allocation Discussion",
		date: "15/03/2026",
		participants: "24 participants",
	},
	{
		id: "meeting-2",
		title: "Spring Festival Planning",
		date: "20/03/2026",
		participants: "28 participants",
	},
];

const settingsActions = [
	{
		id: "student-council",
		title: "Рада студентів",
		description: "Переглянути представників",
		icon: UsersOutlineIcon,
	},
	{
		id: "change-convocation",
		title: "Змінити скликання",
		description: "Відредагувати склад Ради",
		icon: CogIcon,
	},
];

function AdminMain() {
	const navigate = useNavigate();
	return (
		<main className="adminMain">
			<section className="adminMain__quick-actions">
				<button
					className="adminMain__action-card"
					type="button"
					onClick={() => navigate('/create-meeting')}
				>
					<div className={`adminMain__action-icon adminMain__action-icon--blue`}>
						<PlusIcon />
					</div>
					<h2 className="adminMain__action-title">Створити засідання</h2>
					<p className="adminMain__action-description">Відкрити низку голосувань</p>
				</button>
				<button
					className="adminMain__action-card"
					type="button"
					onClick={() => navigate('/archive')}
				>
					<div className={`adminMain__action-icon adminMain__action-icon--slate`}>
						<ArchiveIcon />
					</div>
					<h2 className="adminMain__action-title">Архів засідань</h2>
					<p className="adminMain__action-description">Перегляньте результати засідань</p>
				</button>
				<button
					className="adminMain__action-card"
					type="button"
				>
					<div className={`adminMain__action-icon adminMain__action-icon--gold`}>
						<UsersIcon />
					</div>
					<h2 className="adminMain__action-title">Нове скликання</h2>
					<p className="adminMain__action-description">Оновіть склад РС УКУ</p>
				</button>
			</section>

			<section className="adminMain__panels">
				<article className="adminMain__panel">
					<header className="adminMain__panel-header">
						<h3 className="adminMain__panel-title">
							<CalendarIcon />
							Крайні засідання
						</h3>
					</header>

					<div className="adminMain__meeting-list">
						{recentMeetings.map((meeting) => (
							<article key={meeting.id} className="adminMain__meeting-card">
								<h4 className="adminMain__meeting-title">{meeting.title}</h4>
								<p className="adminMain__meeting-meta">
									<span>{meeting.date}</span>
									<span className="adminMain__meeting-divider">•</span>
									<span>{meeting.participants}</span>
								</p>
							</article>
						))}
					</div>
				</article>

				<article className="adminMain__panel">
					<header className="adminMain__panel-header">
						<h3 className="adminMain__panel-title">
							<CogIcon />
							Налаштування
						</h3>
					</header>

					<div className="adminMain__settings-list">
						{settingsActions.map((action) => {
							const ActionIcon = action.icon;

							return (
								<button key={action.id} className="adminMain__settings-card" type="button">
									<ActionIcon />
									<div>
										<h4 className="adminMain__settings-title">{action.title}</h4>
										<p className="adminMain__settings-description">{action.description}</p>
									</div>
								</button>
							);
						})}
					</div>
				</article>
			</section>
		</main>
	);
}

function PlusIcon() {
	return (
		<svg viewBox="0 0 32 32" aria-hidden="true">
			<path d="M6.66667 16H25.3333" />
            <path d="M16 6.66663V25.3333" />
		</svg>
	);
}

function ArchiveIcon() {
	return (
		<svg viewBox="0 0 32 32" aria-hidden="true">
			<path d="M28 4H4.00002C3.26364 4 2.66669 4.59695 2.66669 5.33333V9.33333C2.66669 10.0697 3.26364 10.6667 4.00002 10.6667H28C28.7364 10.6667 29.3334 10.0697 29.3334 9.33333V5.33333C29.3334 4.59695 28.7364 4 28 4Z" />
            <path d="M5.33331 10.6666V25.3333C5.33331 26.0405 5.61426 26.7188 6.11436 27.2189C6.61446 27.719 7.29274 28 7.99998 28H24C24.7072 28 25.3855 27.719 25.8856 27.2189C26.3857 26.7188 26.6666 26.0405 26.6666 25.3333V10.6666" />
            <path d="M13.3333 16H18.6666" />
		</svg>
	);
}

function UsersIcon() {
	return (
		<svg viewBox="0 0 32 32" aria-hidden="true">
			<path d="M21.3334 28V25.3333C21.3334 23.9188 20.7715 22.5623 19.7713 21.5621C18.7711 20.5619 17.4145 20 16 20H8.00002C6.58553 20 5.22898 20.5619 4.22878 21.5621C3.22859 22.5623 2.66669 23.9188 2.66669 25.3333V28" />
            <path d="M12 14.6667C14.9455 14.6667 17.3334 12.2789 17.3334 9.33333C17.3334 6.38781 14.9455 4 12 4C9.0545 4 6.66669 6.38781 6.66669 9.33333C6.66669 12.2789 9.0545 14.6667 12 14.6667Z" />
            <path d="M29.3333 28V25.3333C29.3324 24.1516 28.9391 23.0037 28.2151 22.0698C27.4911 21.1358 26.4775 20.4688 25.3333 20.1733" />
            <path d="M21.3333 4.17334C22.4805 4.46707 23.4974 5.13427 24.2235 6.06975C24.9496 7.00523 25.3438 8.15578 25.3438 9.34001C25.3438 10.5242 24.9496 11.6748 24.2235 12.6103C23.4974 13.5457 22.4805 14.2129 21.3333 14.5067" />
		</svg>
	);
}

function CalendarIcon() {
	return (
		<svg viewBox="0 0 20 20" aria-hidden="true">
			<path d="M6.66667 1.66663V4.99996" />
            <path d="M13.3333 1.66663V4.99996" />
            <path d="M15.8333 3.33337H4.16667C3.24619 3.33337 2.5 4.07957 2.5 5.00004V16.6667C2.5 17.5872 3.24619 18.3334 4.16667 18.3334H15.8333C16.7538 18.3334 17.5 17.5872 17.5 16.6667V5.00004C17.5 4.07957 16.7538 3.33337 15.8333 3.33337Z" />
            <path d="M2.5 8.33337H17.5" />
		</svg>
	);
}

function CogIcon() {
	return (
		<svg viewBox="0 0 20 20" aria-hidden="true">
			<path d="M10.1833 1.66663H9.81667C9.37464 1.66663 8.95072 1.84222 8.63816 2.15478C8.3256 2.46734 8.15 2.89127 8.15 3.33329V3.48329C8.1497 3.77556 8.07255 4.06262 7.92628 4.31566C7.78002 4.5687 7.56978 4.77882 7.31667 4.92496L6.95834 5.13329C6.70497 5.27957 6.41756 5.35658 6.125 5.35658C5.83244 5.35658 5.54503 5.27957 5.29167 5.13329L5.16667 5.06663C4.78422 4.84601 4.32987 4.78616 3.90334 4.90022C3.47681 5.01427 3.11296 5.29291 2.89167 5.67496L2.70833 5.99163C2.48772 6.37407 2.42787 6.82843 2.54192 7.25496C2.65598 7.68149 2.93461 8.04533 3.31667 8.26663L3.44167 8.34996C3.69356 8.49538 3.90302 8.7042 4.04921 8.95565C4.1954 9.2071 4.27325 9.49244 4.275 9.78329V10.2083C4.27617 10.502 4.19971 10.7908 4.05337 11.0454C3.90703 11.3 3.69601 11.5115 3.44167 11.6583L3.31667 11.7333C2.93461 11.9546 2.65598 12.3184 2.54192 12.745C2.42787 13.1715 2.48772 13.6258 2.70833 14.0083L2.89167 14.325C3.11296 14.707 3.47681 14.9856 3.90334 15.0997C4.32987 15.2138 4.78422 15.1539 5.16667 14.9333L5.29167 14.8666C5.54503 14.7203 5.83244 14.6433 6.125 14.6433C6.41756 14.6433 6.70497 14.7203 6.95834 14.8666L7.31667 15.075C7.56978 15.2211 7.78002 15.4312 7.92628 15.6843C8.07255 15.9373 8.1497 16.2244 8.15 16.5166V16.6666C8.15 17.1087 8.3256 17.5326 8.63816 17.8451C8.95072 18.1577 9.37464 18.3333 9.81667 18.3333H10.1833C10.6254 18.3333 11.0493 18.1577 11.3618 17.8451C11.6744 17.5326 11.85 17.1087 11.85 16.6666V16.5166C11.8503 16.2244 11.9275 15.9373 12.0737 15.6843C12.22 15.4312 12.4302 15.2211 12.6833 15.075L13.0417 14.8666C13.295 14.7203 13.5824 14.6433 13.875 14.6433C14.1676 14.6433 14.455 14.7203 14.7083 14.8666L14.8333 14.9333C15.2158 15.1539 15.6701 15.2138 16.0967 15.0997C16.5232 14.9856 16.887 14.707 17.1083 14.325L17.2917 14C17.5123 13.6175 17.5721 13.1632 17.4581 12.7366C17.344 12.3101 17.0654 11.9463 16.6833 11.725L16.5583 11.6583C16.304 11.5115 16.093 11.3 15.9466 11.0454C15.8003 10.7908 15.7238 10.502 15.725 10.2083V9.79163C15.7238 9.49794 15.8003 9.20917 15.9466 8.95454C16.093 8.69991 16.304 8.48847 16.5583 8.34163L16.6833 8.26663C17.0654 8.04533 17.344 7.68149 17.4581 7.25496C17.5721 6.82843 17.5123 6.37407 17.2917 5.99163L17.1083 5.67496C16.887 5.29291 16.5232 5.01427 16.0967 4.90022C15.6701 4.78616 15.2158 4.84601 14.8333 5.06663L14.7083 5.13329C14.455 5.27957 14.1676 5.35658 13.875 5.35658C13.5824 5.35658 13.295 5.27957 13.0417 5.13329L12.6833 4.92496C12.4302 4.77882 12.22 4.5687 12.0737 4.31566C11.9275 4.06262 11.8503 3.77556 11.85 3.48329V3.33329C11.85 2.89127 11.6744 2.46734 11.3618 2.15478C11.0493 1.84222 10.6254 1.66663 10.1833 1.66663Z" />
            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" />
		</svg>
	);
}

function UsersOutlineIcon() {
	return (
		<svg viewBox="0 0 16 16" aria-hidden="true">
			<path d="M10.6666 14V12.6667C10.6666 11.9594 10.3857 11.2811 9.8856 10.781C9.3855 10.281 8.70722 10 7.99998 10H3.99998C3.29274 10 2.61446 10.281 2.11436 10.781C1.61426 11.2811 1.33331 11.9594 1.33331 12.6667V14" />
            <path d="M5.99998 7.33333C7.47274 7.33333 8.66665 6.13943 8.66665 4.66667C8.66665 3.19391 7.47274 2 5.99998 2C4.52722 2 3.33331 3.19391 3.33331 4.66667C3.33331 6.13943 4.52722 7.33333 5.99998 7.33333Z" />
            <path d="M14.6667 14V12.6667C14.6662 12.0758 14.4696 11.5019 14.1076 11.0349C13.7456 10.5679 13.2388 10.2344 12.6667 10.0867" />
            <path d="M10.6667 2.08667C11.2403 2.23354 11.7487 2.56714 12.1118 3.03488C12.4748 3.50262 12.6719 4.07789 12.6719 4.67C12.6719 5.26212 12.4748 5.83739 12.1118 6.30513C11.7487 6.77287 11.2403 7.10647 10.6667 7.25334" />
		</svg>
	);
}

export default AdminMain;
