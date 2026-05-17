import "./QuestionCard.scss"

function QuestionCard({ text }) {
    return (
        <div className="question-card">
            <h2 className="question-card__question">{text}</h2>
        </div>
    );
}

export default QuestionCard;