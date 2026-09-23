import { useEffect, useState } from "react";
import "./LoadingPage.scss";

const TILTS = [-7, 6, -4, 8, 0, 5, -6, 3];

function LoadingPage() {
    const [tilt, setTilt] = useState(0);

    useEffect(() => {
        let index = 0;
        const timer = window.setInterval(() => {
            index = (index + 1) % TILTS.length;
            setTilt(TILTS[index]);
        }, 300);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <main className="loadingPage" aria-busy="true" aria-live="polite">
            <img
                className="loadingPage__cat"
                src="/images/loading-cat.png"
                alt=""
                style={{ transform: `rotate(${tilt}deg)` }}
            />
            <p className="loadingPage__label">Завантаження</p>
        </main>
    );
}

export default LoadingPage;
