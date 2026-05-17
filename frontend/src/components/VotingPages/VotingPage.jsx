import { useEffect, useState } from "react";
import "./VotingPages.scss";

function ConfirmModal({ open, onCancel, onConfirm, choiceLabel }) {
    if (!open) return null;

    return (
        <div className="vmodal">
            <div className="vmodal__box">
                <p>Підтвердіть свій вибір</p>
                <p className="vmodal__question">
                    Ви впевнені, що хочете проголосувати «{choiceLabel}»?
                </p>
                <div className="vmodal__actions">
                    <button className="vbtn vbtn--ghost" onClick={onCancel}>
                        Скасувати
                    </button>
                    <button className="vbtn vbtn--primary" onClick={onConfirm}>
                        Підтвердити
                    </button>
                </div>
            </div>
        </div>
    );
}

function VotingPage({ initialQuestion, onVote }) {
    const [question, setQuestion] = useState(initialQuestion || null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingChoice, setPendingChoice] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setQuestion(initialQuestion || null);
        setError("");
        setPendingChoice(null);
        setConfirmOpen(false);
        setSubmitting(false);
    }, [initialQuestion?.id]);

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

    function handleChoice(choice) {
        setPendingChoice(choice);
        setConfirmOpen(true);
    }

    async function confirm() {
        if (!onVote || submitting) return;

        setSubmitting(true);
        setError("");

        try {
            await onVote({
                questionId: question.id,
                choice: pendingChoice,
            });

            setConfirmOpen(false);
        } catch (error) {
            console.error(error);
            setError("Не вдалося зарахувати голос. Спробуйте ще раз.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="vpage vpage--center">
            <div className="vcard">
                <h2 className="vcard__title">
                    {question.title || "Поточне питання"}
                </h2>

                {(question.text || question.description) && (
                    <p className="vcard__text">
                        {question.text || question.description}
                    </p>
                )}

                <div className="vchoices">
                    <button
                        className="vchoice vchoice--yes"
                        onClick={() => handleChoice("yes")}
                        disabled={submitting}
                    >
                        За
                    </button>

                    <button
                        className="vchoice vchoice--no"
                        onClick={() => handleChoice("no")}
                        disabled={submitting}
                    >
                        Проти
                    </button>

                    <button
                        className="vchoice vchoice--abs"
                        onClick={() => handleChoice("abstained")}
                        disabled={submitting}
                    >
                        Утриматись
                    </button>
                </div>

                {error && <p className="vcard__text">{error}</p>}
            </div>

            <ConfirmModal
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={confirm}
                choiceLabel={
                    pendingChoice === "yes"
                        ? "За"
                        : pendingChoice === "no"
                            ? "Проти"
                            : pendingChoice === "abstained"
                                ? "Утримався"
                                : pendingChoice
                }
            />
        </div>
    );
}

export default VotingPage;