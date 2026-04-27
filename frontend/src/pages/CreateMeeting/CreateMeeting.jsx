import CreateMeetingForm from "../../components/CreateMeetingForm/CreateMeetingForm";
import Header from "../../components/Header/Header";
import {useState} from "react";

function CreateMeeting({ user }) {
    async function handleSubmit(e) {
        console.log("handleSubmit");
        e.preventDefault();

        const meeting = {
            title: meetingInfo.title,
            protocolLink: meetingInfo.protocolLink,
            questions: questions
                .map((question) => question.content.trim())
                .filter(Boolean),
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/createMeeting`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meeting)
        });

        if (response.status === 201) {
            setPage("waiting");
        }
    }

    const [meetingInfo, setMeetingInfo] = useState({
        title: "",
        protocolLink: ""
    });

    const [questions, setQuestions] = useState([
        { id: crypto.randomUUID(), content: "" }
    ]);

    const [page, setPage] = useState("form");

    return (
        <div>
            <Header
                name={user}
                avatar="/images/avatar.svg"
            />
            {page === "form"? (
                <form method="POST" onSubmit={handleSubmit}>
                    <CreateMeetingForm
                        meetingInfo={meetingInfo}
                        setMeetingInfo={setMeetingInfo}
                        questions={questions}
                        setQuestions={setQuestions}
                    />
                </form>
            ) : (
                <h1>Waiting</h1>
            )}
        </div>
    );
}

export default CreateMeeting;