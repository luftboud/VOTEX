import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import MeetingHeader from "../../components/MeetingHeader/MeetingHeader";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import VoteStats from "../../components/VoteStats/VoteStats";
import VotingControls from "../../components/VotingControls/VotingControls";
import MeetingFinished from "../../components/MeetingFinished/MeetingFinished";

import "./ActiveMeetingPage.scss"

const API_URL = import.meta.env.VITE_API_URL;
function ActiveMeetingPage() {
    const [meeting, setMeeting] = useState(null);
    const navigate = useNavigate();

    async function fetchActiveMeeting() {
        const response = await fetch(`${API_URL}/api/meetings/active`, {
            credentials: "include",
        });

        if (!response.ok) {
            console.error("Active meeting not found");
            return;
        }

        const data = await response.json();
        setMeeting(data.meeting);
    }

    useEffect(() => {
        fetchActiveMeeting();

        const interval = setInterval(fetchActiveMeeting, 2000);

        return () => clearInterval(interval);
    }, []);

    if (!meeting) {
        return <p>Завантаження...</p>;
    }

    const questions = meeting.agenda;
    const totalQuestions = questions.length;

    const progress = meeting.progress ?? 0;

    const questionIndex =
        meeting.current !== null
            ? questions.findIndex(question => question.item_id === meeting.current)
            : progress;

    const isMeetingFinished =
        progress >= totalQuestions && meeting.current === null;

    if (isMeetingFinished) {
        return <MeetingFinished onCloseMeeting={closeMeeting} />;
    }

    if (questionIndex === -1 || !questions[questionIndex]) {
        return <p>Поточне питання не знайдено</p>;
    }

    const currentQuestion = questions[questionIndex];
    const currentQuestionNumber = questionIndex + 1;

    async function startVoting() {
        const response = await fetch(
            `${API_URL}/api/meetings/${meeting._id}/current`,
            {
                credentials: "include",
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    current: currentQuestion.item_id,
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to start voting:", response.status, errorText);
            return;
        }

        const data = await response.json();
        setMeeting(data.meeting);
    }

    async function goToNextQuestion() {
        const response = await fetch(
            `${API_URL}/api/meetings/${meeting._id}/current`,
            {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    current: null
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to start voting:", response.status, errorText);
            return;
        }

        const data = await response.json();
        setMeeting(data.meeting);
    }

    async function closeMeeting() {
        try {
            const response = await fetch(
                `${API_URL}/api/meetings/${meeting._id}/close`,
                {
                    method: "PATCH",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                console.error("Failed to close meeting");
                return;
            }

            navigate(`/archive/${meeting._id}`);
        } catch (error) {
            console.error("Close meeting failed:", error);
        }
    }

    const yesCount = currentQuestion.yes?.length ?? 0;
    const noCount = currentQuestion.no?.length ?? 0;
    const abstainedCount = currentQuestion.abstained?.length ?? 0;
    const votesCount = yesCount + noCount + abstainedCount;

    const presentCount = meeting.present?.length ?? 0;

    return (
        <main className="question-frame">
            <MeetingHeader
                title={meeting.name}
                currentQuestionNumber={currentQuestionNumber}
                totalQuestions={totalQuestions}
            />

            <ProgressBar
                current={progress}
                total={totalQuestions}
            />

            <QuestionCard text={currentQuestion.item_name} />

            {meeting.current !== null && (
                <div className="question-frame__voting-progress">
                    <VoteStats question={currentQuestion} present={meeting.present} />

                    <div className="question-frame__voting-progress-bar">
                        <p className="question-frame__voting-progress-bar__text">Прогрес голосування</p>
                        <ProgressBar
                            current={votesCount}
                            total={presentCount}
                        />
                    </div>
                </div>
            )}

            <VotingControls
                isVotingActive={meeting.current !== null}
                onStartVoting={startVoting}
                onNextQuestion={goToNextQuestion}
            />
        </main>
    );
}


export default ActiveMeetingPage;