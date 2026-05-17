import CreateMeetingForm from "../../components/CreateMeetingForm/CreateMeetingForm";
import Header from "../../components/Header/Header";
import MeetingRoom from "../../components/MeetingRoom/MeetingRoom";
import {useEffect, useState} from "react";

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
            body: JSON.stringify(meeting),
            credentials: "include",
        });

        const data = await response.json();

        if (response.status === 201) {
            setMeetingInfo(prev => ({
                ...prev,
                meeting_id: data._id,
                meeting_code: data.code,
                present: data.present,
            }));

            setPage("waiting");
        }
    }

    const [meetingInfo, setMeetingInfo] = useState({
        title: "",
        protocolLink: "",
        meeting_code: 0,
        meeting_id: null,
        present: []
    });

    const [questions, setQuestions] = useState([
        { id: crypto.randomUUID(), content: "" }
    ]);

    const [scheduledMeeting, setScheduled] = useState(null);

    useEffect(() => {
        async function fetchMeetings() {
            const request = await fetch(`${import.meta.env.VITE_API_URL}/api/isScheduledMeetings`, {
                credentials: "include",
            });
            if (request.status === 404) {
                setScheduled(null);
                return;
            }

            const data = await request.json();
            console.log(data);
            setScheduled(data.meeting);
        }

        fetchMeetings();

        const intervalId = setInterval(() => {
            fetchMeetings();
        }, 2500);

        return () => clearInterval(intervalId);
    }, [])

    const [page, setPage] = useState("form");
    const userName = user?.name
    return (
        <div>
            <Header
                name={userName}
                avatar="/images/avatar.svg"
            />
            {page === "form" && scheduledMeeting === null ? (
                <form method="POST" onSubmit={handleSubmit}>
                    <CreateMeetingForm
                        meetingInfo={meetingInfo}
                        setMeetingInfo={setMeetingInfo}
                        questions={questions}
                        setQuestions={setQuestions}
                    />
                </form>
            ) : scheduledMeeting !== null ? (
                <MeetingRoom
                    meeting_id={scheduledMeeting._id}
                    meeting_code={scheduledMeeting.code}
                    members={scheduledMeeting.present}
                />
            ) : (
                <MeetingRoom
                    meeting_id={meetingInfo.meeting_id}
                    meeting_code={meetingInfo.meeting_code}
                    members={meetingInfo.present}
                />
            )}
        </div>
    );
}

export default CreateMeeting;