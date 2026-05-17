import "./MeetingHeader.scss"
function MeetingHeader({ title, currentQuestionNumber, totalQuestions }) {
    return (
        <div className="title-container">
            <h1 className="title-container__title">{title}</h1>

            <p className="title-container__counter">
                Питання {currentQuestionNumber} із {totalQuestions}
            </p>
        </div>
    );
}

export default MeetingHeader;