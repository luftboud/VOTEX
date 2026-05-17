import "./VoteStats.scss"

function VoteStats({ question, present }) {
    const yesCount = question.yes.length;
    const noCount = question.no.length;
    const abstainedCount = question.abstained.length;
    const presentCount = present.length;

    return (
        <div className="vote-stats">
            <div className="vote-stats__stats-card vote-stats__stats-card--yes">
                <div className="vote-stats__stats-card__header">
                    <div className="vote-stats__stats-card__header-icon vote-stats__stats-card__header-icon--yes">
                        <YesIcon />
                    </div>
                    <p className="vote-stats__header-text">За</p>
                </div>
                <h2 className="vote-stats__counter vote-stats__counter--yes">{yesCount}</h2>
            </div>

            <div className="vote-stats__stats-card vote-stats__stats-card--no">
                <div className="vote-stats__stats-card__header">
                    <div className="vote-stats__stats-card__header-icon vote-stats__stats-card__header-icon--no">
                        <NoIcon />
                    </div>
                    <p className="vote-stats__header-text">Проти</p>
                </div>
                <h2 className="vote-stats__counter vote-stats__counter--no">{noCount}</h2>
            </div>

            <div className="vote-stats__stats-card vote-stats__stats-card--abstained">
                <div className="vote-stats__stats-card__header">
                    <div className="vote-stats__stats-card__header-icon vote-stats__stats-card__header-icon--abstained">
                        <AbstainedIcon />
                    </div>
                    <p className="vote-stats__header-text">Утримались</p>
                </div>
                <h2 className="vote-stats__counter vote-stats__counter--abstained">{abstainedCount}</h2>
            </div>

            <div className="vote-stats__stats-card vote-stats__stats-card--not-voted">
                <div className="vote-stats__stats-card__header">
                    <div className="vote-stats__stats-card__header-icon vote-stats__stats-card__header-icon--people">
                        <PeopleIcon />
                    </div>
                    <p className="vote-stats__header-text">Не голосували</p>
                </div>
                <h2 className="vote-stats__counter vote-stats__counter--not-voted">{presentCount - abstainedCount - noCount - yesCount}</h2>
            </div>
        </div>
    );
}

function YesIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 10V22" stroke="#00A63E" width="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 5.88L14 10H19.83C20.1405 10 20.4467 10.0723 20.7244 10.2111C21.0021 10.35 21.2437 10.5516 21.43 10.8C21.6163 11.0484 21.7422 11.3367 21.7977 11.6422C21.8533 11.9477 21.8369 12.2619 21.75 12.56L19.42 20.56C19.2988 20.9754 19.0462 21.3404 18.7 21.6C18.3538 21.8596 17.9327 22 17.5 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V12C2 11.4696 2.21071 10.9609 2.58579 10.5858C2.96086 10.2107 3.46957 10 4 10H6.76C7.13208 9.9998 7.49674 9.89581 7.81296 9.69972C8.12917 9.50363 8.38442 9.22321 8.55 8.89L12 2C12.4716 2.00584 12.9357 2.11817 13.3578 2.3286C13.7799 2.53902 14.1489 2.84211 14.4374 3.2152C14.7259 3.5883 14.9263 4.02176 15.0237 4.4832C15.1212 4.94464 15.113 5.42213 15 5.88Z" stroke="#00A63E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}

function NoIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M17 14V2" stroke="#E7000B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.99992 18.12L9.99992 14H4.16992C3.85943 14 3.55321 13.9277 3.27549 13.7889C2.99778 13.65 2.75622 13.4484 2.56992 13.2C2.38363 12.9516 2.25772 12.6633 2.20218 12.3578C2.14664 12.0523 2.16298 11.7381 2.24992 11.44L4.57992 3.44C4.70109 3.02457 4.95373 2.65964 5.29992 2.4C5.64611 2.14036 6.06718 2 6.49992 2H19.9999C20.5304 2 21.0391 2.21071 21.4141 2.58579C21.7892 2.96086 21.9999 3.46957 21.9999 4V12C21.9999 12.5304 21.7892 13.0391 21.4141 13.4142C21.0391 13.7893 20.5304 14 19.9999 14H17.2399C16.8678 14.0002 16.5032 14.1042 16.187 14.3003C15.8707 14.4964 15.6155 14.7768 15.4499 15.11L11.9999 22C11.5283 21.9942 11.0642 21.8818 10.6421 21.6714C10.2201 21.461 9.85099 21.1579 9.56252 20.7848C9.27404 20.4117 9.07361 19.9782 8.97618 19.5168C8.87876 19.0554 8.88688 18.5779 8.99992 18.12Z" stroke="#E7000B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}

function AbstainedIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19" stroke="#4A5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

function PeopleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 20.9999V18.9999C21.9993 18.1136 21.7044 17.2527 21.1614 16.5522C20.6184 15.8517 19.8581 15.3515 19 15.1299" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 3.12988C16.8604 3.35018 17.623 3.85058 18.1676 4.55219C18.7122 5.2538 19.0078 6.11671 19.0078 7.00488C19.0078 7.89305 18.7122 8.75596 18.1676 9.45757C17.623 10.1592 16.8604 10.6596 16 10.8799" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default VoteStats;