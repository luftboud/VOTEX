export const DEGREE_MAX_YEAR = {
	bachelor: 4,
	master: 2,
};

export const DEGREES = ["bachelor", "master"];

export const DEGREE_LABELS = {
	bachelor: { plural: "Бакалаври", empty: "Немає бакалаврів", group: "Бакалаврат" },
	master: { plural: "Магістри", empty: "Немає магістрів", group: "Магістратура" },
};

export const FACULTIES = {
	"applied-sciences": {
		name: "Факультет Прикладних наук",
		short: "Прикладних наук",
		palette: { border: "#dab2ff", background: "#faf5ff", heading: "#59168b" },
		programs: [
			{ key: "cs", name: "Комп'ютерні науки", degree: "bachelor" },
			{ key: "ita", name: "ІТ та аналітика рішень", degree: "bachelor" },
			{ key: "robotics", name: "Робототехніка", degree: "bachelor" },
			{ key: "data-science", name: "Науки про дані", degree: "master" },
		],
	},
	law: {
		name: "Факультет Права",
		short: "Право",
		palette: { border: "#ff6467", background: "#fef2f2", heading: "#82181a" },
		programs: [
			{ key: "law-bach", name: "Право", degree: "bachelor" },
			{ key: "law-master", name: "Право (магістратура)", degree: "master" },
		],
	},
	"social-sciences": {
		name: "Факультет Суспільних наук",
		short: "Суспільних наук",
		palette: { border: "#8ec5ff", background: "#eff6ff", heading: "#1c398e" },
		programs: [
			{ key: "epe", name: "Етика-політика-економіка", degree: "bachelor" },
			{ key: "sociology", name: "Соціологія", degree: "bachelor" },
			{ key: "journalism", name: "Журналістика", degree: "master" },
			{ key: "media", name: "Медіакомунікації", degree: "master" },
			{ key: "public-admin", name: "Публічне управління та адміністрування", degree: "master" },
			{ key: "nonprofit-mgmt", name: "Управління неприбутковими організаціями", degree: "master" },
		],
	},
	"health-sciences": {
		name: "Факультет Наук про здоров'я",
		short: "Наук про здоров'я",
		palette: { border: "#05df72", background: "#f0fdf4", heading: "#0d542b" },
		programs: [
			{ key: "social-work", name: "Соціальна робота", degree: "bachelor" },
			{ key: "psychology-bach", name: "Психологія", degree: "bachelor" },
			{ key: "physical-therapy", name: "Фізична терапія", degree: "master" },
			{ key: "ergotherapy", name: "Ерготерапія", degree: "master" },
			{ key: "clinical-psy-cbt", name: "Клінічна психологія (КПТ)", degree: "master" },
			{ key: "clinical-psy-pdt", name: "Клінічна психологія (психодинамічна)", degree: "master" },
		],
	},
	humanities: {
		name: "Гуманітарний факультет",
		short: "Гуманітарний",
		palette: { border: "#ff637e", background: "#fff1f2", heading: "#8b0836" },
		programs: [
			{ key: "history", name: "Історія", degree: "bachelor" },
			{ key: "philology", name: "Філологія", degree: "bachelor" },
			{ key: "cultural-studies", name: "Культурологія", degree: "bachelor" },
			{ key: "heritage-future", name: "Майбутнє спадщини", degree: "master" },
		],
	},
	"philosophy-theology": {
		name: "Філософсько-богословський факультет",
		short: "Філософсько-богословський",
		palette: { border: "#e17100", background: "#fffbeb", heading: "#7b3306" },
		programs: [
			{ key: "theology-bach", name: "Богослов'я", degree: "bachelor" },
			{ key: "christian-pedagogy", name: "Християнська педагогіка", degree: "master" },
			{ key: "theology-master", name: "Богослов'я (магістратура)", degree: "master" },
		],
	},
};

export const FACULTY_ORDER = [
	"applied-sciences",
	"law",
	"social-sciences",
	"health-sciences",
	"humanities",
	"philosophy-theology",
];

export const PROGRAMS = Object.fromEntries(
	Object.entries(FACULTIES).flatMap(([facultyKey, faculty]) =>
		faculty.programs.map((program) => [program.key, { ...program, faculty: facultyKey }]),
	),
);

export function getFacultyName(key) {
	return FACULTIES[key]?.name ?? key;
}

export function getFacultyShort(key) {
	return FACULTIES[key]?.short ?? key;
}

export function getProgramName(key) {
	return PROGRAMS[key]?.name ?? key;
}

export function getProgramDegree(key) {
	return PROGRAMS[key]?.degree ?? "bachelor";
}

export function getYearOptions(degree) {
	const max = DEGREE_MAX_YEAR[degree] ?? 4;
	return Array.from({ length: max }, (_, i) => String(i + 1));
}

export function getFacultyMax(facultyKey) {
	const programs = FACULTIES[facultyKey]?.programs ?? [];
	const bachelor = programs.filter((p) => p.degree === "bachelor").length * DEGREE_MAX_YEAR.bachelor;
	const master = programs.filter((p) => p.degree === "master").length * DEGREE_MAX_YEAR.master;
	return { bachelor, master };
}

export function getProgramsByFacultyAndDegree(facultyKey, degree) {
	const programs = FACULTIES[facultyKey]?.programs ?? [];
	return programs.filter((p) => p.degree === degree);
}
