import "./MeetingRoom.scss";
import {useEffect, useState} from "react";

function MeetingRoom({ meeting_code, members, setActiveMeeting }) {
    const [starting, setStarting] = useState(false);
    const [quorum, setQuorum] = useState(0);

    async function handleSubmit(e) {
        e.preventDefault();
        setStarting(true);

        const request = await fetch(`${import.meta.env.VITE_API_URL}/api/activateMeeting`,
            {
                credentials: "include",
            });

        const json = await request.json();
        if (!request.ok) {
            setStarting(false);
            console.log(json.message);
        }

        setActiveMeeting(json.meeting);
    }

    useEffect(() => {
        async function loadMeetings() {
            const users_request = await fetch(`${import.meta.env.VITE_API_URL}/api/user_collection`,
                {
                    credentials: "include",
                });

            const users_data = await users_request.json();

            setQuorum(Math.ceil(users_data.count / 2) + 1);
        }

        loadMeetings();
    }, [])


    return (
        <div className="system-layout">
            <div className="system-layout__container">
                <p className="system-layout__container-title">Код приєднання</p>
                <p className="system-layout__container-code">{meeting_code}</p>
            </div>

            <div className="system-layout__member-container">
                <p className="system-layout__member-container-title">Під'єдналось учасників: {members.length}</p>
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
                            <tr>
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
                <button type="submit" className="system-layout__form-btn" disabled={members.length < quorum || starting}>
                    {starting ? "Запускається..." : "Почати засідання"}
                </button>
                <p>Почніть засідання, коли всі присутні доєднаються.</p>
                {members.length < quorum && (
                    <p>Ви не можете почати засідання поки кворум не досягнено.</p>
                )}
            </form>
        </div>
    );
}

export default MeetingRoom;