import "./UserMain.scss";
import ArchiveMeetingUnit from "../ArchiveMeetingUnit/ArchiveMeetingUnit";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

function userMain() {
    let [meetings, setMeetings] = useState([]);
    let [meetingCode, setMeetingCode] = useState("");

    useEffect(() => {
        async function fetchMeetings() {
            try {
                let response = await fetch(`${API_BASE_URL}/api/meetings`);
                let data = await response.json();
                setMeetings(data.meetings);
            } catch (error) {
                console.log(error);
                setMeetings([]);
            }
        }

        fetchMeetings();
    }, [])

    const navigate = useNavigate();

    function handleJoinMeeting(event) {
        event.preventDefault();

        const trimmedCode = meetingCode.trim();

        if (!trimmedCode) {
            return;
        }

        navigate(`/meeting/${encodeURIComponent(trimmedCode)}`);
    }

    return (
        <div className="userMain__container">
            <div className="userMain__container-join-meeting-card">
                <div className="userMain__container-join-meeting-card-header">
                    <h2>Приєднатись до засідання</h2>
                </div>
                <form onSubmit={handleJoinMeeting} className="userMain__container-join-meeting-card-form">
                    <input
                        type="text"
                        placeholder="Введіть код засідання"
                        className="userMain__container-join-meeting-card-form-input"
                        value={meetingCode}
                        onChange={(event) => setMeetingCode(event.target.value)}
                    />
                    <button type="submit" className="userMain__container-join-meeting-card-form-submit">Приєднатись</button>
                </form>
            </div>
            <div className="userMain__container-meeting-archive">
                <div className="userMain__container-meeting-archive-header">
                    <h2 className="userMain__container-meeting-archive-header-text">Архів засіднань</h2>
                    <button
                        className="userMain__container-meeting-archive-header-btn"
                        type="button"
                        onClick={() => navigate('/archive')}
                    >Показати всі</button>
                </div>
                <div className="userMain__container-meeting-archive-cardholder">
                    {meetings
                        .filter(meeting => meeting.status === "Closed")
                        .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
                        .slice(0, 3)
                        .map(meeting => (
                        <ArchiveMeetingUnit
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

export default userMain;