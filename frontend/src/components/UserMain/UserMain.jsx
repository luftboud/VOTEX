import "./UserMain.scss";
import ArchiveMeetingUnit from "../ArchiveMeetingUnit/ArchiveMeetingUnit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserMain() {
    const [meetings, setMeetings] = useState([]);
    const [meetingCode, setMeetingCode] = useState("");
    const [joining, setJoining] = useState(false);
    const [joinError, setJoinError] = useState("");

    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function fetchMeetings() {
            try {
                const response = await fetch(`${API_BASE_URL}/api/meetings`, {
                    credentials: "include",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch meetings");
                }

                setMeetings(data.meetings);
            } catch (error) {
                console.log(error);
                setMeetings([]);
            }
        }

        fetchMeetings();
    }, []);

    async function handleJoinMeeting(event) {
        event.preventDefault();

        const trimmedCode = meetingCode.trim();

        if (!trimmedCode || joining) {
            return;
        }

        setJoining(true);
        setJoinError("");

        try {
            const response = await fetch(`${API_BASE_URL}/api/meetings/join-by-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    code: trimmedCode,
                }),
            });

            const data = await response.json();

            if (response.status === 404) {
                navigate("/meeting-not-found");
                return;
            }

            if (!response.ok) {
                throw new Error(data.message || "Failed to join meeting");
            }

            navigate(`/meeting/${data.meetingId}`);
        } catch (error) {
            console.error(error);
            setJoinError("Не вдалося приєднатися до засідання");
        } finally {
            setJoining(false);
        }
    }

    return (
        <div className="userMain__container">
            <div className="userMain__container-join-meeting-card">
                <div className="userMain__container-join-meeting-card-header">
                    <h2>Приєднатись до засідання</h2>
                </div>

                <form
                    onSubmit={handleJoinMeeting}
                    className="userMain__container-join-meeting-card-form"
                >
                    <input
                        type="text"
                        placeholder="Введіть код засідання"
                        className="userMain__container-join-meeting-card-form-input"
                        value={meetingCode}
                        onChange={(event) => setMeetingCode(event.target.value)}
                    />

                    <button
                        type="submit"
                        className="userMain__container-join-meeting-card-form-submit"
                        disabled={joining}
                    >
                        {joining ? "Приєднання..." : "Приєднатись"}
                    </button>
                </form>

                {joinError && (
                    <p className="userMain__container-join-meeting-card-error">
                        {joinError}
                    </p>
                )}
            </div>

            <div className="userMain__container-meeting-archive">
                <div className="userMain__container-meeting-archive-header">
                    <h2 className="userMain__container-meeting-archive-header-text">
                        Архів засідань
                    </h2>

                    <button
                        className="userMain__container-meeting-archive-header-btn"
                        type="button"
                        onClick={() => navigate("/archive")}
                    >
                        Показати всі
                    </button>
                </div>

                <div className="userMain__container-meeting-archive-cardholder">
                    {meetings
                        .filter(meeting => meeting.status === "Closed")
                        .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
                        .slice(0, 3)
                        .map(meeting => (
                            <ArchiveMeetingUnit
                                key={meeting._id}
                                id={meeting._id}
                                name={meeting.name}
                                date={meeting.datetime.split("T")[0]}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default UserMain;