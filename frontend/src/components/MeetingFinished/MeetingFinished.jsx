import "./MeetingFinished.scss"
function MeetingFinished({ onCloseMeeting }) {
    return (
        <main className="meeting-finished">
            <div className="meeting-finished__card">
                <div className="meeting-finished__icon">
                    <TickIcon/>
                </div>

                <h1 className="meeting-finished__title">Усі питання розглянуто</h1>

                <p className="meeting-finished__description">
                    Голосування за всі питання завершено. Закрийте засідання,
                    щоб зберегти результати.
                </p>

                <button onClick={onCloseMeeting} className="meeting-finished__button">
                    Закрити засідання
                </button>
            </div>
        </main>
    );
}

function TickIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M15 20L18.3333 23.3333L25 16.6667M35 20C35 21.9698 34.612 23.9204 33.8582 25.7403C33.1044 27.5601 31.9995 29.2137 30.6066 30.6066C29.2137 31.9995 27.5601 33.1044 25.7403 33.8582C23.9204 34.612 21.9698 35 20 35C18.0302 35 16.0796 34.612 14.2597 33.8582C12.4399 33.1044 10.7863 31.9995 9.3934 30.6066C8.00052 29.2137 6.89563 27.5601 6.14181 25.7403C5.38799 23.9204 5 21.9698 5 20C5 16.0218 6.58035 12.2064 9.3934 9.3934C12.2064 6.58035 16.0218 5 20 5C23.9782 5 27.7936 6.58035 30.6066 9.3934C33.4196 12.2064 35 16.0218 35 20Z" stroke="#01246F" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default MeetingFinished;