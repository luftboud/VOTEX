import "./VotingPages.scss";

function MeetingFinished({ onArchive, onHome }) {
    return (
        <div className="vpage vpage--center">
            <div className="vcard vcard--success">
                <div className="vcard__icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="1.6" fill="rgba(16,185,129,0.06)" />
                        <path d="M9.5 12.5l1.8 1.8L15.5 10" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h2 className="vcard__title">Засідання завершено!</h2>
                <div className="vcard__actions">
                    <button className="vbtn vbtn--primary" onClick={onArchive}>Переглянути в архіві</button>
                    <button className="vbtn vbtn--ghost" onClick={onHome}>Повернутись на головну</button>
                </div>
            </div>
        </div>
    );
}

export default MeetingFinished;
