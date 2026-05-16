import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MeetingNotFound from "../../components/VotingPages/MeetingNotFound";
import WaitingForReps from "../../components/VotingPages/WaitingForReps";
import VotingPage from "../../components/VotingPages/VotingPage";
import VoteRecorded from "../../components/VotingPages/VoteRecorded";
import MeetingFinished from "../../components/VotingPages/MeetingFinished";
import { API_BASE_URL } from "../../config/api";

function MeetingLivePage() {
    const { meetingCode } = useParams();
    const navigate = useNavigate();
    const [liveState, setLiveState] = useState({ loading: true, state: "waiting", meeting: null, currentQuestion: null });
    const [voteReceipt, setVoteReceipt] = useState(null);

    useEffect(() => {
        let mounted = true;

        async function pollMeetingState() {
            try {
                const response = await fetch(`${API_BASE_URL}/api/meetings/code/${encodeURIComponent(meetingCode)}`);

                if (!mounted) {
                    return;
                }

                if (response.status === 404) {
                    setLiveState({ loading: false, state: "not_found", meeting: null, currentQuestion: null });
                    return;
                }

                const data = await response.json();
                setLiveState({
                    loading: false,
                    state: data.state,
                    meeting: data.meeting,
                    currentQuestion: data.currentQuestion,
                });
            } catch (error) {
                console.error("Failed to load meeting state:", error);
                if (mounted) {
                    setLiveState({ loading: false, state: "not_found", meeting: null, currentQuestion: null });
                }
            }
        }

        pollMeetingState();
        const intervalId = window.setInterval(pollMeetingState, 2000);

        return () => {
            mounted = false;
            window.clearInterval(intervalId);
        };
    }, [meetingCode]);

    useEffect(() => {
        if (!voteReceipt || !liveState.currentQuestion) {
            return;
        }

        if (String(voteReceipt.questionId) !== String(liveState.currentQuestion.id)) {
            setVoteReceipt(null);
        }
    }, [liveState.currentQuestion, voteReceipt]);

    async function handleVote(payload) {
        const response = await fetch(`${API_BASE_URL}/api/meetings/code/${encodeURIComponent(meetingCode)}/vote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Failed to record vote");
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
                onArchive={() => navigate("/archive")}
                onHome={() => navigate("/")}
            />
        );
    }

    if (liveState.state !== "voting") {
        return (
            <WaitingForReps
                message={liveState.meeting?.name ? `Засідання «${liveState.meeting.name}»` : "Очікуємо на представників!"}
                detail="Щойно буде додано голосування, воно автоматично з’явиться тут."
            />
        );
    }

    if (voteReceipt && liveState.currentQuestion && String(voteReceipt.questionId) === String(liveState.currentQuestion.id)) {
        return <VoteRecorded nextText="Чекайте на наступне питання" onContinue={() => setVoteReceipt(null)} />;
    }

    return (
        <VotingPage
            meetingId={meetingCode}
            initialQuestion={liveState.currentQuestion}
            onVote={handleVote}
        />
    );
}

export default MeetingLivePage;