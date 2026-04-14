import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { testArchiveMeetings } from "../../data/testMeetings";
import "./MeetingsArchive.scss";

function normalizeSearchValue(value) {
	return value
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9а-яіїєґ]+/gi, " ")
		.trim();
}

function getDateParts(dateValue) {
	return dateValue
		.split(/\D+/)
		.filter(Boolean)
		.map((part) => part.replace(/^0+/, "") || "0");
}

function matchesSearch(meeting, query) {
	if (!query) {
		return true;
	}

	const normalizedQueryTokens = normalizeSearchValue(query).split(/\s+/).filter(Boolean);
	const searchableTitle = normalizeSearchValue(meeting.title);
	const [dayPart, monthPart, yearPart] = getDateParts(meeting.date);

	return normalizedQueryTokens.every((token) => {
		if (/^\d+$/.test(token)) {
			const normalizedToken = token.replace(/^0+/, "") || "0";

			if (token.length === 4) {
				return yearPart === normalizedToken;
			}

			return [dayPart, monthPart].some((part) => part === normalizedToken);
		}

		return searchableTitle.includes(token);
	});
}

function MeetingsArchive() {
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const filteredMeetings = useMemo(() => {
		return testArchiveMeetings.filter((meeting) => matchesSearch(meeting, search));
	}, [search]);

	return (
		<main className="meetingsArchive">
			<h1 className="meetingsArchive__title">Архів засідань</h1>
			<p className="meetingsArchive__subtitle">Перегляньте результати минулих засідань</p>

			<div className="meetingsArchive__search">
				<svg
					className="meetingsArchive__search-icon"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M21 21L16.65 16.65"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<input
					type="text"
					value={search}
					onChange={(event) => setSearch(event.target.value)}
					className="meetingsArchive__search-input"
					placeholder="Пошук..."
					aria-label="Пошук засідання"
				/>
			</div>

			<div className="meetingsArchive__list">
				{filteredMeetings.map((meeting) => (
					<article key={meeting.id} className="meetingsArchive__item">
						<div className="meetingsArchive__item-content">
							<h2 className="meetingsArchive__item-title">{meeting.title}</h2>
							<p className="meetingsArchive__item-meta">
								<span className="meetingsArchive__item-date">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
									>
										<path
											d="M8 2V5"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M16 2V5"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M3 9H21"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H18C19.6569 5 21 6.34315 21 8Z"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									{meeting.date}
								</span>
								<span className="meetingsArchive__item-separator">•</span>
								<span>{meeting.participants} participants</span>
								<span className="meetingsArchive__item-separator">•</span>
								<span>{meeting.questions} questions</span>
							</p>
						</div>
						<button
							type="button"
							className="meetingsArchive__item-button"
							onClick={() => navigate(`/archive/${meeting.id}`)}
						>
							View Results
						</button>
					</article>
				))}
			</div>
		</main>
	);
}

export default MeetingsArchive;
