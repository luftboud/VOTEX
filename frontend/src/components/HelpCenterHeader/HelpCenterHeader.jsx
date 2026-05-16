import "./HelpCenterHeader.scss";

function MenuIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 7h14M5 12h14M5 17h14" />
        </svg>
    );
}

function MembersIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            <path d="M3.5 18.5c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4M14 18.5c0-1.8 1.5-3.2 3.5-3.2 1.9 0 3.5 1.4 3.5 3.2" />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
            <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
        </svg>
    );
}

function HelpCenterHeader({ userName = "John Doe", variant = "full" }) {
    if (variant === "compact") {
        return (
            <header className="helpCenterHeader helpCenterHeader--compact">
                <div className="helpCenterHeader__inner">
                    <div className="helpCenterHeader__compact-actions">
                        <div className="helpCenterHeader__compact-action">
                            <MenuIcon />
                        </div>
                        <div className="helpCenterHeader__compact-action">
                            <MembersIcon />
                        </div>
                    </div>
                    <p className="helpCenterHeader__compact-user">{userName}</p>
                </div>
            </header>
        );
    }

    return (
        <header className="helpCenterHeader">
            <div className="helpCenterHeader__inner">
                <div className="helpCenterHeader__logos">
                    <img src="/images/ucu.svg" alt="Ukrainian Catholic University" />
                    <img src="/images/student_council.svg" alt="Student Council" />
                </div>
                <div className="helpCenterHeader__user">
                    <p>{userName}</p>
                    <span className="helpCenterHeader__user-icon">
                        <UserIcon />
                    </span>
                </div>
            </div>
        </header>
    );
}

export default HelpCenterHeader;
