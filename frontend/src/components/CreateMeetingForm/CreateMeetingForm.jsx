import MeetingFormItem from "./MeetingFormItem/MeetingFormItem";
import "./CreateMeetingForm.scss";
import {Link} from "react-router-dom";


function CreateMeetingForm({meetingInfo, setMeetingInfo, questions, setQuestions}) {
    function addQuestion() {
        setQuestions(prev => [
            ...prev,
            { id: crypto.randomUUID(), content: "" }
        ]);
    }

    function updateQuestion(id, value) {
        setQuestions(prev =>
            prev.map(question =>
                question.id === id
                    ? { ...question, content: value }
                    : question
            )
        );
    }

    function deleteQuestion(id) {
        setQuestions(prev =>
            prev.filter(question => question.id !== id)
        );
    }

    function updateMeetingInfo(field, value) {
        setMeetingInfo(prev => ({
            ...prev,
            [field]: value
        }));
    }

    return (
        <div className="meeting-creation">
            <div className="meeting-creation-title">
                <h1 className="meeting-creation-title__head">Створити нове засідання</h1>
                <p className="meeting-creation-title__descr">Налаштуйте своє засідання та питання до нього.</p>
            </div>

            <MeetingFormItem
                fields={[{
                        label: "Назва засідання",
                        value: meetingInfo.title,
                        onChange: (value) => updateMeetingInfo("title", value)
                    }, {
                        label: "Посилання",
                        value: meetingInfo.protocolLink,
                        onChange: (value) => updateMeetingInfo("protocolLink", value)
                }]}
            />

            <div className="meeting-creation-question-block">
                <h2 className="meeting-creation-question-block__title">Питання</h2>
                {questions.map((question) => (
                    <MeetingFormItem
                        key={question.id}
                        fields={[
                            {
                                label: "Зміст питання",
                                value: question.content,
                                onChange: (value) => updateQuestion(question.id, value)
                            }
                        ]}
                        onDelete={() => deleteQuestion(question.id)}
                    />
                ))}
                <button type="button" className="meeting-creation-question-block__add-question" onClick={addQuestion}>
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