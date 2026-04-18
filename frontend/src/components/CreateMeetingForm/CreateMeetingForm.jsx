import MeetingFormItem from "./MeetingFormItem/MeetingFormItem";
import "./CreateMeetingForm.scss";
import {useState} from "react";
import {Link} from "react-router-dom";

function CreateMeetingForm() {
    const [questions_amount, setQuestionAmount] = useState(0);

    return (
        <div className="meeting-creation">
            <div className="meeting-creation-title">
                <h1 className="meeting-creation-title__head">Створити нове засідання</h1>
                <p className="meeting-creation-title__descr">Налаштуйте своє засідання та питання до нього.</p>
            </div>

            <MeetingFormItem questions={["Назва засідання", "Посилання на протокол"]} />

            <div className="meeting-creation-question-block">
                <h2 className="meeting-creation-question-block__title">Питання</h2>
                {Array.from({ length: questions_amount }).map((_, index) => (
                    <MeetingFormItem questions={["Зміст питання"]} />
                ))}
                <button type="button" className="meeting-creation-question-block__add-question" onClick={
                    () => setQuestionAmount(prev => prev + 1) }
                >
                    <div className={`meeting-creation-question-block__icon adminMain__action-icon adminMain__action-icon--blue`}>
                        <PlusIcon />
                    </div>
                    <p className="meeting-creation-question-block__title">Додати запитання</p>
                </button>
            </div>

            <div className="meeting-creation-btn-holder">
                <Link to="/admin" className="meeting-creation-btn-holder__cancel">Скасувати</Link>
                <button type="submit" className="meeting-creation-btn-holder__submit">Почати засідання</button>
            </div>
        </div>
    );
}

function PlusIcon() {
    return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M6.66667 16H25.3333" />
            <path d="M16 6.66663V25.3333" />
        </svg>
    );
}

export default CreateMeetingForm;