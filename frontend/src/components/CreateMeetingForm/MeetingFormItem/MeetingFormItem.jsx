import "./MeetingFormItem.scss";

function MeetingFormItem({ fields, onDelete }) {
    return (
        <div className="meeting-creation-question">
            {fields.map((field) => (
                <div className="meeting-creation-question__item">
                    <div className={"meeting-creation-question__item-header"}>
                        <p className="meeting-creation-question__item-header-name">{field.label}</p>
                        {onDelete && (
                            <button type="button" className="meeting-creation-question__item-header-delete" onClick={onDelete}>Видалити</button>
                        )}
                    </div>
                    <input
                        type="text"
                        className="meeting-creation-question__item-input"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
}

export default MeetingFormItem;