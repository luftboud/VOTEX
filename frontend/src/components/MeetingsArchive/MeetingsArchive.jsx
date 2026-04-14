import {useEffect, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./MeetingsArchive.scss";
import ArchiveMeetingUnit from "../ArchiveMeetingUnit/ArchiveMeetingUnit";

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
	const searchableTitle = normalizeSearchValue(meeting.name);
	const [yearPart, monthPart, dayPart] = getDateParts(meeting.datetime.split("T")[0]);

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
	const navigate = useNavigate();

	const [meetings, setMeetings] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		async function fetchMeetings() {
			try {
				let response = await fetch(`${import.meta.env.VITE_API_URL}/api/meetings`);
				let data = await response.json();
				setMeetings(data.meetings);
			} catch (error) {
				console.log(error);
				setMeetings([]);
			}
		}

		fetchMeetings();
	}, [])

	const filteredMeetings = useMemo(() => {
		return meetings
			.filter(meeting => meeting.status === "Closed")
			.filter(meeting => matchesSearch(meeting, search));
	}, [meetings, search]);

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
				{filteredMeetings
					.map((meeting) => (
						<ArchiveMeetingUnit
							id={meeting._id}
							name={meeting.name}
							date={meeting.datetime.split("T")[0]}
						/>
				))}
			</div>
		</main>
	);
}

export default MeetingsArchive;
