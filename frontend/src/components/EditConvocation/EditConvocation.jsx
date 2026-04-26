import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	DEGREES,
	DEGREE_LABELS,
	FACULTIES,
	FACULTY_ORDER,
	PROGRAMS,
	getFacultyMax,
	getFacultyShort,
	getProgramName,
	getProgramDegree,
	getProgramsByFacultyAndDegree,
	getYearOptions,
} from "../../constants/faculties.js";
import "./EditConvocation.scss";

const API = import.meta.env.VITE_API_URL;
const DEFAULT_FACULTY = FACULTY_ORDER[0];
const DEFAULT_PROGRAM = FACULTIES[DEFAULT_FACULTY].programs[0].key;
const DEFAULT_YEAR = "1";

function EditConvocation() {
	const navigate = useNavigate();
	const { convocationId } = useParams();

	const [convocation, setConvocation] = useState(null);
	const [representatives, setRepresentatives] = useState([]);
	const [loading, setLoading] = useState(true);
	const [notFound, setNotFound] = useState(false);

	const [form, setForm] = useState({
		name: "",
		email: "",
		avatar: "",
		faculty: DEFAULT_FACULTY,
		major: DEFAULT_PROGRAM,
		year: DEFAULT_YEAR,
	});
	const [submitting, setSubmitting] = useState(false);
	const [formError, setFormError] = useState("");

	const [pendingRemoval, setPendingRemoval] = useState(null);

	useEffect(() => {
		let cancelled = false;

		async function load() {
			setLoading(true);
			try {
				const [convRes, repsRes] = await Promise.all([
					fetch(`${API}/api/convocations/${convocationId}`, { credentials: "include" }),
					fetch(`${API}/api/representatives`, { credentials: "include" }),
				]);

				if (cancelled) return;

				if (convRes.status === 404) {
					setNotFound(true);
					return;
				}

				if (!convRes.ok || !repsRes.ok) {
					throw new Error("Failed to load convocation");
				}

				const convData = await convRes.json();
				const repsData = await repsRes.json();

				setConvocation(convData.convocation);
				setRepresentatives(repsData.representatives ?? []);
			} catch (err) {
				console.error(err);
			} finally {
				if (!cancelled) setLoading(false);
			}
		}

		load();
		return () => {
			cancelled = true;
		};
	}, [convocationId]);

	const grouped = useMemo(() => {
		const buckets = {};
		for (const facKey of FACULTY_ORDER) {
			buckets[facKey] = { bachelor: [], master: [] };
		}

		for (const rep of representatives) {
			const program = PROGRAMS[rep.major];
			const facKey = program?.faculty ?? rep.faculty;
			const degree = program?.degree ?? "bachelor";
			if (!buckets[facKey]) {
				buckets[facKey] = { bachelor: [], master: [] };
			}
			buckets[facKey][degree].push(rep);
		}

		for (const facKey of Object.keys(buckets)) {
			for (const degree of DEGREES) {
				buckets[facKey][degree].sort((a, b) => {
					const yearDiff = String(a.year).localeCompare(String(b.year), undefined, { numeric: true });
					if (yearDiff !== 0) return yearDiff;
					return a.name.localeCompare(b.name, "uk");
				});
			}
		}
		return buckets;
	}, [representatives]);

	const selectedDegree = getProgramDegree(form.major);
	const yearOptions = getYearOptions(selectedDegree);

	function updateForm(patch) {
		setForm((current) => {
			const next = { ...current, ...patch };

			if (patch.faculty && patch.faculty !== current.faculty) {
				const firstProgram = FACULTIES[patch.faculty]?.programs?.[0];
				if (firstProgram) {
					next.major = firstProgram.key;
				}
			}

			const nextDegree = getProgramDegree(next.major);
			const allowedYears = getYearOptions(nextDegree);
			if (!allowedYears.includes(next.year)) {
				next.year = allowedYears[0];
			}

			return next;
		});
	}

	const isDuplicate = representatives.some(
		(r) => r.major === form.major && String(r.year) === String(form.year),
	);

	async function handleAdd(event) {
		event.preventDefault();
		if (submitting) return;

		if (isDuplicate) {
			setFormError(`На ${form.year} курсі програми «${getProgramName(form.major)}» вже є представник.`);
			return;
		}

		setFormError("");
		setSubmitting(true);

		try {
			const response = await fetch(`${API}/api/representatives`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: form.name.trim(),
					email: form.email.trim(),
					avatar: form.avatar.trim(),
					faculty: form.faculty,
					major: form.major,
					year: form.year,
				}),
			});

			if (!response.ok) {
				const data = await response.json().catch(() => ({}));
				throw new Error(data.message || "Не вдалося додати представника");
			}

			const data = await response.json();
			setRepresentatives((prev) => [...prev, data.representative]);
			setForm((current) => ({
				...current,
				name: "",
				email: "",
				avatar: "",
			}));
		} catch (err) {
			setFormError(err.message);
		} finally {
			setSubmitting(false);
		}
	}

	async function handleRemove(rep) {
		try {
			const response = await fetch(`${API}/api/representatives/${rep._id}`, {
				method: "DELETE",
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Не вдалося видалити представника");
			}

			setRepresentatives((prev) => prev.filter((r) => r._id !== rep._id));
		} catch (err) {
			console.error(err);
		} finally {
			setPendingRemoval(null);
		}
	}

	if (loading) {
		return <div className="editConvocation__loading">Завантаження...</div>;
	}

	if (notFound) {
		return <div className="editConvocation__notFound">Скликання не знайдено.</div>;
	}

	const facultyPrograms = FACULTIES[form.faculty]?.programs ?? [];
	const bachelorPrograms = facultyPrograms.filter((p) => p.degree === "bachelor");
	const masterPrograms = facultyPrograms.filter((p) => p.degree === "master");

	return (
		<main className="editConvocation">
			<div className="editConvocation__container">
				<div className="editConvocation__heading">
					<h1 className="editConvocation__title">Змінити скликання</h1>
					<p className="editConvocation__subtitle">Керуйте списком представників скликання</p>
				</div>

				<div className="editConvocation__convocationHeader">
					<div>
						<h2 className="editConvocation__convocationName">{convocation?.name}</h2>
						<p className="editConvocation__convocationYear">{convocation?.year}</p>
					</div>
				</div>

				<section className="editConvocation__addCard">
					<header className="editConvocation__addCardHeader">
						<UserPlusIcon />
						<h3 className="editConvocation__addCardTitle">Додати представника</h3>
					</header>

					<form className="editConvocation__addForm" onSubmit={handleAdd}>
						<div className="editConvocation__field">
							<label className="editConvocation__fieldLabel" htmlFor="rep-email">Електронна пошта</label>
							<input
								id="rep-email"
								className="editConvocation__input"
								type="email"
								required
								value={form.email}
								onChange={(event) => updateForm({ email: event.target.value })}
								placeholder="member@university.edu"
							/>
						</div>

						<div className="editConvocation__field">
							<label className="editConvocation__fieldLabel" htmlFor="rep-avatar">Шлях до фото</label>
							<input
								id="rep-avatar"
								className="editConvocation__input"
								type="url"
								value={form.avatar}
								onChange={(event) => updateForm({ avatar: event.target.value })}
								placeholder="https://drive.google.com/uc?export=view&id=..."
							/>
						</div>

						<div className="editConvocation__field">
							<label className="editConvocation__fieldLabel" htmlFor="rep-name">Імʼя та Прізвище</label>
							<input
								id="rep-name"
								className="editConvocation__input"
								type="text"
								required
								value={form.name}
								onChange={(event) => updateForm({ name: event.target.value })}
								placeholder="Напр.: Валєра Фабʼяновський"
							/>
						</div>

						<div className="editConvocation__field">
							<label className="editConvocation__fieldLabel" htmlFor="rep-faculty">Факультет</label>
							<select
								id="rep-faculty"
								className="editConvocation__select"
								value={form.faculty}
								onChange={(event) => updateForm({ faculty: event.target.value })}
							>
								{FACULTY_ORDER.map((key) => (
									<option key={key} value={key}>{getFacultyShort(key)}</option>
								))}
							</select>
						</div>

						<div className="editConvocation__field">
							<label className="editConvocation__fieldLabel" htmlFor="rep-major">Програма</label>
							<select
								id="rep-major"
								className="editConvocation__select"
								value={form.major}
								onChange={(event) => updateForm({ major: event.target.value })}
							>
								{bachelorPrograms.length > 0 && (
									<optgroup label={DEGREE_LABELS.bachelor.group}>
										{bachelorPrograms.map((p) => (
											<option key={p.key} value={p.key}>{p.name}</option>
										))}
									</optgroup>
								)}
								{masterPrograms.length > 0 && (
									<optgroup label={DEGREE_LABELS.master.group}>
										{masterPrograms.map((p) => (
											<option key={p.key} value={p.key}>{p.name}</option>
										))}
									</optgroup>
								)}
							</select>
						</div>

						<div className="editConvocation__field">
							<label className="editConvocation__fieldLabel" htmlFor="rep-year">Курс</label>
							<select
								id="rep-year"
								className="editConvocation__select"
								value={form.year}
								onChange={(event) => updateForm({ year: event.target.value })}
							>
								{yearOptions.map((year) => (
									<option key={year} value={year}>{year}</option>
								))}
							</select>
						</div>

						<div className="editConvocation__addRow">
							{formError && <p className="editConvocation__addError">{formError}</p>}
							{!formError && isDuplicate && (
								<p className="editConvocation__addError">
									На {form.year} курсі програми «{getProgramName(form.major)}» вже є представник.
								</p>
							)}
							<button
								type="submit"
								className="editConvocation__addButton"
								disabled={submitting || isDuplicate}
							>
								<PlusIcon />
								{submitting ? "Додавання..." : "Додати"}
							</button>
						</div>
					</form>
				</section>

				<div className="editConvocation__sections">
					{FACULTY_ORDER.map((facultyKey) => {
						const faculty = FACULTIES[facultyKey];
						const max = getFacultyMax(facultyKey);
						const reps = grouped[facultyKey] ?? { bachelor: [], master: [] };

						return (
							<article
								key={facultyKey}
								className="editConvocation__section"
								style={{
									"--faculty-border": faculty.palette.border,
									"--faculty-background": faculty.palette.background,
									"--faculty-heading": faculty.palette.heading,
								}}
							>
								<header className="editConvocation__sectionHeader">
									<h3 className="editConvocation__sectionTitle">{faculty.name}</h3>
									<p className="editConvocation__sectionMeta">
										Максимум: {max.bachelor} бакалаврів, {max.master} магістрів
									</p>
								</header>
								<div className="editConvocation__sectionBody">
									{DEGREES.map((degree) => (
										<DegreeGroup
											key={degree}
											degree={degree}
											reps={reps[degree]}
											max={max[degree]}
											onRemoveRequest={setPendingRemoval}
										/>
									))}
								</div>
							</article>
						);
					})}
				</div>
			</div>

			{pendingRemoval && (
				<div
					className="editConvocation__overlay"
					role="dialog"
					aria-modal="true"
					onClick={() => setPendingRemoval(null)}
				>
					<div
						className="editConvocation__dialog"
						onClick={(event) => event.stopPropagation()}
					>
						<h3 className="editConvocation__dialogTitle">
							Ви впевнені, що хочете видалити представника?
						</h3>
						<p className="editConvocation__dialogText">
							Ця дія прибере {pendingRemoval.name} зі списку скликання.
						</p>
						<div className="editConvocation__dialogActions">
							<button
								type="button"
								className="editConvocation__dialogButton editConvocation__dialogButton--secondary"
								onClick={() => setPendingRemoval(null)}
							>
								Скасувати
							</button>
							<button
								type="button"
								className="editConvocation__dialogButton editConvocation__dialogButton--danger"
								onClick={() => handleRemove(pendingRemoval)}
							>
								Видалити
							</button>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}

function DegreeGroup({ degree, reps, max, onRemoveRequest }) {
	const labels = DEGREE_LABELS[degree];

	return (
		<div className="editConvocation__degreeGroup">
			<h4 className="editConvocation__degreeTitle">
				{labels.plural} ({reps.length}/{max})
			</h4>
			{reps.length === 0 ? (
				<p className="editConvocation__empty">{labels.empty}</p>
			) : (
				<div className="editConvocation__cardsGrid">
					{reps.map((rep) => (
						<div key={rep._id} className="editConvocation__representative">
							<button
								type="button"
								className="editConvocation__remove"
								aria-label={`Видалити ${rep.name}`}
								onClick={() => onRemoveRequest(rep)}
							>
								<CloseIcon />
							</button>
							<p className="editConvocation__representativeName">{rep.name}</p>
							<p className="editConvocation__representativeMeta">{rep.year} курс</p>
							<p className="editConvocation__representativeMajor">{getProgramName(rep.major)}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

function UserPlusIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
			<circle cx="8.5" cy="7" r="4" />
			<line x1="20" y1="8" x2="20" y2="14" />
			<line x1="23" y1="11" x2="17" y2="11" />
		</svg>
	);
}

function PlusIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	);
}

function CloseIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<line x1="6" y1="6" x2="18" y2="18" />
			<line x1="18" y1="6" x2="6" y2="18" />
		</svg>
	);
}

export default EditConvocation;
