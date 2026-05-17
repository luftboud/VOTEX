import "./MeetingRoom.scss";
import { useEffect, useState } from "react";

function MeetingRoom({ meeting_code, members, setActiveMeeting }) {
    const [starting, setStarting] = useState(false);
    const [quorum, setQuorum] = useState(0);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (members.length < quorum) {
            setError("Ви не можете почати засідання, поки кворум не досягнено.");
            return;
        }

        setStarting(true);
        setError("");

        try {
            const request = await fetch(`${import.meta.env.VITE_API_URL}/api/activateMeeting`, {
                method: "PATCH",
                credentials: "include",
            });

            const json = await request.json();

            if (!request.ok) {
                setError(json.message || "Не вдалося почати засідання.");
                setStarting(false);
                return;
            }

            if (!json.meeting) {
                setError("Сервер не повернув активне засідання.");
                setStarting(false);
                return;
            }

            setActiveMeeting(json.meeting);
        } catch (error) {
            console.error("Activate meeting error:", error);
            setError("Сталася помилка під час запуску засідання.");
            setStarting(false);
        }
    }

    useEffect(() => {
        async function loadMeetings() {
            try {
                const users_request = await fetch(`${import.meta.env.VITE_API_URL}/api/user_collection`, {
                    credentials: "include",
                });

                const users_data = await users_request.json();

                if (!users_request.ok) {
                    setError(users_data.message || "Не вдалося завантажити користувачів.");
                    return;
                }

                setQuorum(Math.ceil(users_data.count / 2) + 1);
            } catch (error) {
                console.error("Load users error:", error);
                setError("Не вдалося завантажити дані для кворуму.");
            }
        }

        loadMeetings();
    }, []);

    return (
        <div className="system-layout">
            <div className="system-layout__container">
                <p className="system-layout__container-title">Код приєднання</p>
                <p className="system-layout__container-code">{meeting_code}</p>
            </div>

            <div className="system-layout__member-container">
                <p className="system-layout__member-container-title">
                    Під'єдналось учасників: {members.length}
                </p>

                {members.length !== 0 && (
                    <table className="system-layout__member-container-table">
                        <thead>
                        <tr>
                            <th>Імʼя</th>
                            <th>Спеціальність</th>
                            <th>Рік</th>
                        </tr>
                        </thead>

                        <tbody>
                        {members.map((member) => (
                            <tr key={member._id || member.email || member.name}>
                                <td>{member.name}</td>
                                <td>{member.major}</td>
                                <td>{member.year}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            <form className="system-layout__form" onSubmit={handleSubmit}>
                <button
                    type="submit"
                    className="system-layout__form-btn"
                    disabled={members.length < quorum || starting}
                >
                    {starting ? "Запускається..." : "Почати засідання"}
                </button>

                <p>Почніть засідання, коли всі присутні доєднаються.</p>

                {members.length < quorum && (
                    <p>Ви не можете почати засідання, поки кворум не досягнено.</p>
                )}

                {error && (
                    <p className="system-layout__form-error">{error}</p>
                )}
            </form>
        </div>
    );
}

export default MeetingRoom;