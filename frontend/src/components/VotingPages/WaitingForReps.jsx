import "./VotingPages.scss";

function WaitingForReps({ message = "Очікуємо на представників!", detail }) {
    return (
        <div className="vpage vpage--center">
            <div className="vcard">
                <div className="vcard__icon" aria-hidden>
                    <svg className="vspinner" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="32" r="26" stroke="#3b82f6" />
                    </svg>
                </div>
                <h2 className="vcard__title">{message}</h2>
                {detail && <p className="vcard__text">{detail}</p>}
            </div>
        </div>
    );
}

export default WaitingForReps;
