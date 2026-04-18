import "./MeetingFormItem.scss";

function MeetingFormItem({ questions }) {
    return (
        <div className="meeting-creation-question">
            {questions.map((question) => (
                <div className="meeting-creation-question__item">
                    <p className="meeting-creation-question__item-input-name">{question}</p>
                    <input type="text" className="meeting-creation-question__item-input" />
                </div>
            ))}
        </div>
    );
}

export default MeetingFormItem;