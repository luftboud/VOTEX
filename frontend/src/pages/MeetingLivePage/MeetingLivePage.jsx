import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MeetingNotFound from "../../components/VotingPages/MeetingNotFound";
import WaitingForReps from "../../components/VotingPages/WaitingForReps";
import VotingPage from "../../components/VotingPages/VotingPage";
import VoteRecorded from "../../components/VotingPages/VoteRecorded";
import MeetingFinished from "../../components/VotingPages/MeetingFinished";

function MeetingLivePage() {
    const { meetingId } = useParams();
    const navigate = useNavigate();

    const [liveState, setLiveState] = useState({
        loading: true,
        state: "waiting",
        meeting: null,
        currentQuestion: null,
    });

    const [voteReceipt, setVoteReceipt] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        let mounted = true;

        async function pollMeetingState() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/meetings/${encodeURIComponent(meetingId)}/live`,
                    {
                        credentials: "include",
                    }
                );

                if (!mounted) {
                    return;
                }

                if (response.status === 404 || response.status === 403) {
                    setLiveState({
                        loading: false,
                        state: "not_found",
                        meeting: null,
                        currentQuestion: null,
                    });
                    return;
                }

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to load meeting state");
                }

                setLiveState({
                    loading: false,
                    state: data.state,
                    meeting: data.meeting,
                    currentQuestion: data.currentQuestion,
                });
            } catch (error) {
                console.error("Failed to load meeting state:", error);

                if (mounted) {
                    setLiveState({
                        loading: false,
                        state: "not_found",
                        meeting: null,
                        currentQuestion: null,
                    });
                }
            }
        }

        pollMeetingState();

        const intervalId = window.setInterval(pollMeetingState, 2000);

        return () => {
            mounted = false;
            window.clearInterval(intervalId);
        };
    }, [API_BASE_URL, meetingId]);

    useEffect(() => {
        if (!voteReceipt || !liveState.currentQuestion) {
            return;
        }

        if (String(voteReceipt.questionId) !== String(liveState.currentQuestion.id)) {
            setVoteReceipt(null);
        }
    }, [liveState.currentQuestion, voteReceipt]);

    async function handleVote(payload) {
        const response = await fetch(
            `${API_BASE_URL}/api/meetings/${encodeURIComponent(meetingId)}/vote`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to record vote");
        }

        setVoteReceipt(payload);
    }

    if (liveState.loading) {
        return <div>Loading...</div>;
    }

    if (liveState.state === "not_found") {
        return <MeetingNotFound onBack={() => navigate("/")} />;
    }

    if (liveState.state === "finished") {
        return (
            <MeetingFinished
                onArchive={() => navigate(`/archive/${meetingId}`)}
                onHome={() => navigate("/")}
            />
        );
    }

    if (
        liveState.state === "vote_recorded" ||
        (
            voteReceipt &&
            liveState.currentQuestion &&
            String(voteReceipt.questionId) === String(liveState.currentQuestion.id)
        )
    ) {
        return (
            <VoteRecorded nextText="Чекайте на наступне питання" />
        );
    }

    if (liveState.state !== "voting") {
        return (
            <WaitingForReps
                message={
                    liveState.meeting?.name
                        ? `${liveState.meeting.name}`
                        : "Очікуємо на початок засідання!"
                }
                detail="Коли голосування почнеться, питання автоматично з’явиться тут."
            />
        );
    }

    return (
        <VotingPage
            meetingId={meetingId}
            initialQuestion={liveState.currentQuestion}
            onVote={handleVote}
        />
    );
}

export default MeetingLivePage;