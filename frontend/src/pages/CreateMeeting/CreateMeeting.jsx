import CreateMeetingForm from "../../components/CreateMeetingForm/CreateMeetingForm";
import Header from "../../components/Header/Header";
import MeetingRoom from "../../components/MeetingRoom/MeetingRoom";
import {useEffect, useState} from "react";
import ActiveMeetingPage from "../ActiveMeetingPage/ActiveMeetingPage";

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
    const [activeMeeting, setActiveMeeting] = useState(null);
    const [page, setPage] = useState("form");

    useEffect(() => {
        async function fetchScheduledMeetings() {
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

        fetchScheduledMeetings();

        if (page === "form") {
            return;
        }

        const intervalId = setInterval(() => {
            fetchScheduledMeetings();
        }, 2500);

        return () => clearInterval(intervalId);

    }, [page])

    useEffect(() => {
        async function fetchActiveMeeting() {
            const request = await fetch(`${import.meta.env.VITE_API_URL}/api/meetings/active`, {
                credentials: "include",
            });
            if (request.status === 404) {
                setActiveMeeting(null);
                return;
            }

            const data = await request.json();
            setActiveMeeting(data.meeting);
        }

        fetchActiveMeeting();
    })

    const userName = user?.name
    return (
        <div>
            <Header
                name={userName}
            />
            {activeMeeting !== null ? (
                <ActiveMeetingPage />
            ) : scheduledMeeting !== null ? (
                <MeetingRoom
                    meeting_code={scheduledMeeting.code}
                    members={scheduledMeeting.present}
                    setActiveMeeting={setActiveMeeting}
                />
            ) : (
                <form method="POST" onSubmit={handleSubmit}>
                    <CreateMeetingForm
                        meetingInfo={meetingInfo}
                        setMeetingInfo={setMeetingInfo}
                        questions={questions}
                        setQuestions={setQuestions}
                    />
                </form>
            )}
        </div>
    );
}

export default CreateMeeting;