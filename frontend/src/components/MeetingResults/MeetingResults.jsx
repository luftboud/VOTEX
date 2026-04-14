import "./MeetingResults.scss";

function MeetingResults({ meeting }) {
    const first_meet = meeting.agenda[0];
    const all_participants = first_meet.yes.length + first_meet.no.length + first_meet.abstained.length;
    return (
        <main className="meetingResults">
            <section className="meetingResults__header">
                <h1 className="meetingResults__title">{meeting.name}</h1>
                <p className="meetingResults__subtitle">Результати засідання</p>
            </section>

            <section className="meetingResults__summary">
                <article className="meetingResults__summary-card">
                    <p className="meetingResults__summary-label">Дата</p>
                    <p className="meetingResults__summary-value">{meeting.datetime.split("T")[0]}</p>
                </article>
                <article className="meetingResults__summary-card">
                    <p className="meetingResults__summary-label">Явка</p>
                    <p className="meetingResults__summary-value">{all_participants}</p>
                </article>
                <article className="meetingResults__summary-card">
                    <p className="meetingResults__summary-label">Питання</p>
                    <p className="meetingResults__summary-value">{meeting.agenda.length}</p>
                </article>
            </section>

            <section className="meetingResults__questions">
                {meeting.agenda.map((question) => {

                    const all_votes = question.yes.length + question.no.length + question.abstained.length;
                    const yes_percent = Math.round(question.yes.length * 100 / all_votes);
                    const no_percent = Math.round(question.no.length * 100 / all_votes);
                    const abstained_percent = Math.round(question.abstained.length * 100 / all_votes);

                    return (
                    <article key={question.item_id} className="meetingResults__question">
                        <h2 className="meetingResults__question-title">
                            {question.item_id}. {question.item_name}
                        </h2>

                        <div className="meetingResults__answers">
                            <div key="Yes" className="meetingResults__answer">
                                <div className="meetingResults__answer-top">
                                    <span>За</span>
                                    <span>{yes_percent}%</span>
                                </div>
                                <div className="meetingResults__bar">
                                    <div
                                        className="meetingResults__bar-fill"
                                        style={{ width: `${yes_percent}%` }}
                                    />
                                </div>
                                <p className="meetingResults__answer-votes">
                                    {question.yes.length} голосів
                                </p>
                            </div>
                        </div>

                        <div className="meetingResults__answers">
                            <div key="No" className="meetingResults__answer">
                                <div className="meetingResults__answer-top">
                                    <span>Проти</span>
                                    <span>{no_percent}%</span>
                                </div>
                                <div className="meetingResults__bar">
                                    <div
                                        className="meetingResults__bar-fill"
                                        style={{ width: `${no_percent}%` }}
                                    />
                                </div>
                                <p className="meetingResults__answer-votes">
                                    {question.no.length} голосів
                                </p>
                            </div>
                        </div>

                        <div className="meetingResults__answers">
                            <div key="Abstained" className="meetingResults__answer">
                                <div className="meetingResults__answer-top">
                                    <span>Утримались</span>
                                    <span>{abstained_percent}%</span>
                                </div>
                                <div className="meetingResults__bar">
                                    <div
                                        className="meetingResults__bar-fill"
                                        style={{ width: `${abstained_percent}%` }}
                                    />
                                </div>
                                <p className="meetingResults__answer-votes">
                                    {question.abstained.length} голосів
                                </p>
                            </div>
                        </div>
                    </article>
                ); })}
            </section>
        </main>
    );
}

export default MeetingResults;