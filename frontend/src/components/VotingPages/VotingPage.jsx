import { useEffect, useState } from "react";
import "./VotingPages.scss";

function ConfirmModal({ open, onCancel, onConfirm, choiceLabel }) {
    if (!open) return null;
    return (
        <div className="vmodal">
            <div className="vmodal__box">
                <p>Підтвердіть свій вибір</p>
                <p className="vmodal__question">Ви впевнені, що хочете проголосувати "{choiceLabel}"?</p>
                <div className="vmodal__actions">
                    <button className="vbtn vbtn--ghost" onClick={onCancel}>Скасувати</button>
                    <button className="vbtn vbtn--primary" onClick={onConfirm}>Підтвердити</button>
                </div>
            </div>
        </div>
    );
}

function VotingPage({ meetingId, initialQuestion, fetchCurrentQuestion, onVote }) {
    const [question, setQuestion] = useState(initialQuestion || null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingChoice, setPendingChoice] = useState(null);

    // polling for new question if provided
    useEffect(() => {
        let mounted = true;
        if (fetchCurrentQuestion) {
            const poll = async () => {
                try {
                    const q = await fetchCurrentQuestion(meetingId);
                    if (mounted && q && q.id !== question?.id) setQuestion(q);
                } catch (e) {
                    // ignore
                }
            };
            poll();
            const id = setInterval(poll, 3000);
            return () => {
                mounted = false;
                clearInterval(id);
            };
        }
    }, [fetchCurrentQuestion, meetingId, question]);

    if (!question) {
        return (
            <div className="vpage vpage--center">
                <div className="vcard">
                    <h2 className="vcard__title">Немає активного голосування</h2>
                    <p className="vcard__text">Очікуйте або поверніться пізніше.</p>
                </div>
            </div>
        );
    }

    const handleChoice = (choice) => {
        setPendingChoice(choice);
        setConfirmOpen(true);
    };

    const confirm = () => {
        setConfirmOpen(false);
        if (onVote) onVote({ questionId: question.id, choice: pendingChoice });
    };

    return (
        <div className="vpage vpage--center">
            <div className="vcard">
                <h2 className="vcard__title">{question.title}</h2>
                <div className="vchoices">
                    <button className="vchoice vchoice--yes" onClick={() => handleChoice("yes")}>За</button>
                    <button className="vchoice vchoice--no" onClick={() => handleChoice("no")}>Проти</button>
                    <button className="vchoice vchoice--abs" onClick={() => handleChoice("abs")}>Утриматись</button>
                </div>
            </div>

            <ConfirmModal
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={confirm}
                choiceLabel={pendingChoice}
            />
        </div>
    );
}

export default VotingPage;
