import "./VotingControls.scss"
function VotingControls({ isVotingActive, onStartVoting, onNextQuestion }) {
    return (
        <div className="controls">
            {isVotingActive ? (
                <button onClick={onNextQuestion} className="controls__button">
                    Перейти до наступного
                </button>
            ) : (
                <button onClick={onStartVoting} className="controls__button">
                    Почати голосування
                </button>
            )}
        </div>
    );
}

export default VotingControls;