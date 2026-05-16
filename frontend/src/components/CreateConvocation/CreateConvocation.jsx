import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateConvocation.scss";

function isValidYearRange(value) {
	const m = value.trim().match(/^(\d{4})-(\d{4})$/);
	if (!m) return false;
	const y1 = Number(m[1]);
	const y2 = Number(m[2]);
	if (y2 !== y1 + 1) return false;
	const currentYear = new Date().getFullYear();
	return y1 >= 2000 && y1 <= currentYear + 5;
}

function CreateConvocation() {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [year, setYear] = useState("");
	const [descr, setDescr] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	const yearInvalid = year.trim() !== "" && !isValidYearRange(year);
	const isValid = name.trim() !== "" && isValidYearRange(year);

	async function handleSubmit(event) {
		event.preventDefault();
		if (!isValid || submitting) {
			return;
		}

		setSubmitting(true);
		setError("");

		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/api/convocations`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: name.trim(), year: year.trim(), descr: descr.trim() || null }),
			});

			if (!response.ok) {
				const data = await response.json().catch(() => ({}));
				throw new Error(data.message || "Failed to create convocation");
			}

			const data = await response.json();
			navigate(`/admin/convocations/${data.convocation._id}`);
		} catch (err) {
			setError(err.message);
			setSubmitting(false);
		}
	}

	return (
		<main className="createConvocation">
			<div className="createConvocation__container">
				<div className="createConvocation__heading">
					<h1 className="createConvocation__title">Створити нове скликання</h1>
					<p className="createConvocation__subtitle">Налаштуйте нове скликання Ради студентів</p>
				</div>

				<form className="createConvocation__card" onSubmit={handleSubmit}>
					<div className="createConvocation__field">
						<label className="createConvocation__label" htmlFor="convocation-name">
							Назва скликання
							<span className="createConvocation__required">*</span>
						</label>
						<input
							id="convocation-name"
							className="createConvocation__input"
							type="text"
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder="Напр.: 5-те скликання Ради студентів УКУ"
							required
						/>
					</div>

					<div className="createConvocation__field">
						<label className="createConvocation__label" htmlFor="convocation-year">
							Академічний рік
							<span className="createConvocation__required">*</span>
						</label>
						<input
							id="convocation-year"
							className="createConvocation__input"
							type="text"
							value={year}
							onChange={(event) => setYear(event.target.value)}
							placeholder="Напр.: 2025-2026"
							required
						/>
						{yearInvalid && (
							<p className="createConvocation__error">
								Введіть рік у форматі YYYY-YYYY з послідовними роками (напр.: 2026-2027).
							</p>
						)}
					</div>

					<div className="createConvocation__field">
						<label className="createConvocation__label" htmlFor="convocation-descr">
							Опис (за бажанням)
						</label>
						<textarea
							id="convocation-descr"
							className="createConvocation__textarea"
							value={descr}
							onChange={(event) => setDescr(event.target.value)}
							placeholder="Додайте опис цього скликання..."
						/>
					</div>

					<div className="createConvocation__note">
						<strong>Зверніть увагу:</strong>
						після створення скликання поточний склад представників буде очищено,
						а ви зможете додати нових представників на сторінці редагування.
					</div>

					{error && <p className="createConvocation__error">{error}</p>}

					<div className="createConvocation__actions">
						<button
							type="button"
							className="createConvocation__button createConvocation__button--secondary"
							onClick={() => navigate("/admin")}
						>
							Скасувати
						</button>
						<button
							type="submit"
							className="createConvocation__button createConvocation__button--primary"
							disabled={!isValid || submitting}
						>
							{submitting ? "Створення..." : "Створити скликання"}
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}

export default CreateConvocation;
