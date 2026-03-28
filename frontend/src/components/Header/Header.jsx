import "./Header.scss";

function Header({ name, avatar }) {
    return (
        <header className="header">
            <div className="header__logo-container">
                <img className="header__logo-container-img" src="/images/ucu.svg" alt="Student council" />
                <img className="header__logo-container-img" src="/images/student_council.svg" alt="UCU" />
            </div>
            <div className="header__user-info">
                <p className="header__user-info-name">Ласкаво просимо, {name}</p>
                <img className="header__user-info-img" src={avatar} alt="Avatar" />
            </div>
        </header>
    );
}

export default Header;