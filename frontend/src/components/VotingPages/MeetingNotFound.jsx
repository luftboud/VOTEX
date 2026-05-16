import "./VotingPages.scss";

function MeetingNotFound({ onBack }) {
    return (
        <div className="vpage vpage--center">
            <div className="vcard vcard--error">
                <div className="vcard__icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="1.6" fill="rgba(239,68,68,0.06)" />
                        <path d="M12 7v6" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="17" r="1" fill="#ef4444" />
                    </svg>
                </div>
                <h2 className="vcard__title">Засідання не знайдено</h2>
                <p className="vcard__text">Засідання не існує, або воно вже розпочалось</p>
                <button className="vcard__button" onClick={onBack}>Повернутися на головну</button>
            </div>
        </div>
    );
}

export default MeetingNotFound;
