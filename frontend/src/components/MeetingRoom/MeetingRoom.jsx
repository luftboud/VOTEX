import "./MeetingRoom.scss";

function MeetingRoom({ meeting_code, members }) {
    async function handleSubmit(e) {
        e.preventDefault();

        const request = await fetch(`${import.meta.env.VITE_API_URL}/api/activateMeeting`);

        if (!request.ok) {
            const json = await request.json();
            console.log(json.message);
        }

        // navigate()
    }

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
                <button type="submit" className="system-layout__form-btn">Почати засідання</button>
                <p>Почніть засідання, коли всі присутні доєднаються</p>
            </form>
        </div>
    );
}

export default MeetingRoom;