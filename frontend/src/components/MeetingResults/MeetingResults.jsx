import "./MeetingResults.scss";

function MeetingResults({ meeting }) {
    return (
        <main className="meetingResults">
            <section className="meetingResults__header">
                <h1 className="meetingResults__title">{meeting.title}</h1>
                <p className="meetingResults__subtitle">Результати засідання</p>
            </section>

            <section className="meetingResults__summary">
                <article className="meetingResults__summary-card">
                    <p className="meetingResults__summary-label">Дата</p>
                    <p className="meetingResults__summary-value">{meeting.date}</p>
                </article>
                <article className="meetingResults__summary-card">
                    <p className="meetingResults__summary-label">Учасники</p>
                    <p className="meetingResults__summary-value">{meeting.participants}</p>
                </article>
                <article className="meetingResults__summary-card">
                    <p className="meetingResults__summary-label">Питання</p>
                    <p className="meetingResults__summary-value">{meeting.questions.length}</p>
                </article>
            </section>

            <section className="meetingResults__questions">
                {meeting.questions.map((question, index) => (
                    <article key={question.id} className="meetingResults__question">
                        <h2 className="meetingResults__question-title">
                            {index + 1}. {question.title}
                        </h2>

                        <div className="meetingResults__answers">
                            {question.answers.map((answer) => (
                                <div key={answer.option} className="meetingResults__answer">
                                    <div className="meetingResults__answer-top">
                                        <span>{answer.option}</span>
                                        <span>{answer.percent}%</span>
                                    </div>
                                    <div className="meetingResults__bar">
                                        <div
                                            className="meetingResults__bar-fill"
                                            style={{ width: `${answer.percent}%` }}
                                        />
                                    </div>
                                    <p className="meetingResults__answer-votes">
                                        {answer.votes} голосів
                                    </p>
                                </div>
                            ))}
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default MeetingResults;