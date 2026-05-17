import "./Header.scss";
import {useNavigate} from "react-router-dom";

function Header({ name }) {
    const navigate = useNavigate();
    return (
        <header className="header">
            <div className="header__logo-container">
                <button
                    type="button"
                    className="header__logo-container-button"
                    onClick={() => navigate("/")}
                >
                    <img className="header__logo-container-img" src="/images/ucu.svg" alt="Student council" />
                </button>
                <a className="header__logo-container-link" href="https://www.instagram.com/stcouncilucu?igsh=MWkwYzU3MGRieXhkMw==" target="_blank" rel="noopener noreferrer">
                    <img className="header__logo-container-img" src="/images/student_council.svg" alt="UCU" />
                </a>
            </div>
            <div className="header__user-info">
                {name && (
                    <p className="header__user-info-name">
                        Ласкаво просимо, {name}
                    </p>
                )}
            </div>
        </header>
    );
}

export default Header;