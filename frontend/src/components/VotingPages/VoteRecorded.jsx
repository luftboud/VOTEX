import "./VotingPages.scss";

function VoteRecorded({ nextText = "Чекайте на наступне питання", onContinue }) {
    return (
        <div className="vpage vpage--center">
            <div className="vcard">
                <div className="vcard__icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="1.6" fill="rgba(16,185,129,0.06)" />
                        <path d="M7 12.5l2.5 2.5L17 8" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h2 className="vcard__title">Ваш голос зараховано</h2>
                <p className="vcard__text">{nextText}</p>
                {onContinue && <button className="vcard__button" onClick={onContinue}>Продовжити</button>}
            </div>
        </div>
    );
}

export default VoteRecorded;
