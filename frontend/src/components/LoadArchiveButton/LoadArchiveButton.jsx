import "./LoadArchiveButton.scss"
function escapeCsvValue(value) {
    if (value === null || value === undefined) {
        return "";
    }

    const stringValue = String(value);

    if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n") ||
        stringValue.includes(";")
    ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
}

function getPresentNames(present) {
    if (!Array.isArray(present)) {
        return "";
    }

    return present
        .map((person) => {
            if (typeof person === "string") {
                return person;
            }

            return person.name || person.fullName || person.email || "";
        })
        .filter(Boolean)
        .join("; ");
}

function convertMeetingsToCsv(meetings) {
    const headers = [
        "ID засідання",
        "Назва засідання",
        "Дата",
        "Статус",
        "Код",
        "Присутні",
        "Кількість присутніх",
        "Питання",
        "За",
        "Проти",
        "Утримались",
        "Не голосували"
    ];

    const rows = meetings.flatMap((meeting) => {
        const presentNames = getPresentNames(meeting.present);
        const presentCount = meeting.present?.length ?? 0;

        if (!Array.isArray(meeting.agenda) || meeting.agenda.length === 0) {
            return [[
                meeting._id,
                meeting.name,
                meeting.datetime ? meeting.datetime.split("T")[0] : "",
                meeting.status,
                meeting.code,
                presentNames,
                presentCount,
                "",
                0,
                0,
                0,
                presentCount
            ]];
        }

        return meeting.agenda.map((question) => {
            const yes = question.yes.length ?? 0;
            const no = question.no.length ?? 0;
            const abstained = question.abstained.length ?? 0;
            const notVoted = Math.max(presentCount - yes - no - abstained, 0);

            return [
                meeting._id,
                meeting.name,
                meeting.datetime ? meeting.datetime.split("T")[0] : "",
                meeting.status,
                meeting.code,
                presentNames,
                presentCount,
                question.item_name || question.question || question.text || "",
                yes,
                no,
                abstained,
                notVoted
            ];
        });
    });

    return [
        headers.map(escapeCsvValue).join(","),
        ...rows.map((row) => row.map(escapeCsvValue).join(","))
    ].join("\n");
}
async function handleDownloadAllMeetings() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/meetings`, {
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Не вдалося отримати засідання");
        }

        const data = await response.json();

        const closedMeetings = data.meetings.filter(
            (meeting) => meeting.status === "Closed"
        );

        const csv = convertMeetingsToCsv(closedMeetings);

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "meetings-archive.csv";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("CSV download error:", error);
    }
}

function LoadArchiveButton() {
    return (
        <button
            type="button"
            className="download-btn"
            onClick={handleDownloadAllMeetings}
        >
            Викачати всі засідання в CSV
        </button>
    )
}
export default LoadArchiveButton;