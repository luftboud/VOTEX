import "./ProgressBar.scss"
function ProgressBar({ current, total }) {
    const progress = total > 0 ? (current / total) * 100 : 0;

    return (
        <div className="bar">
            <div
                className="bar__progress"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}

export default ProgressBar;