import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { googleDriveImageUrl } from "../../utils/googleDriveImage";
import "./Header.scss";

function Header({ user, name }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const displayName = user?.name || (typeof name === "string" ? name : "") || "";
    const avatar = googleDriveImageUrl(user?.avatar);
    const isAdmin = Boolean(user?.kernel);

    const homePath = isAdmin ? "/admin" : "/";
    const links = [
        { to: homePath, label: "Головна" },
        { to: "/archive", label: "Архів засідань" },
        ...(isAdmin
            ? [
                { to: "/meeting", label: "Створити засідання" },
                { to: "/admin/convocations/new", label: "Нове скликання" },
            ]
            : []),
        { to: "/user-instruction", label: "Інструкція користувача" },
        { to: "/privacy-policy", label: "Політика конфіденційності" },
        { to: "/contacts", label: "Служба підтримки" },
    ];

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!menuOpen) {
            return undefined;
        }

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        }

        function handleResize() {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        window.addEventListener("resize", handleResize);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("resize", handleResize);
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <header className="header">
            <div className="header__bar">
                <div className="header__logo-container">
                    <button
                        type="button"
                        className="header__logo-container-button"
                        onClick={() => navigate(homePath)}
                    >
                        <img className="header__logo-container-img" src="/images/ucu.svg" alt="УКУ" />
                    </button>
                    <a className="header__logo-container-link" href="https://www.instagram.com/stcouncilucu?igsh=MWkwYzU3MGRieXhkMw==" target="_blank" rel="noopener noreferrer">
                        <img className="header__logo-container-img" src="/images/student_council.svg" alt="Рада студентів" />
                    </a>
                </div>

                <div className="header__user-info">
                    {displayName && (
                        <p className="header__user-info-name">
                            Ласкаво просимо, {displayName}
                        </p>
                    )}
                    {avatar && (
                        <img
                            className="header__user-info-img"
                            src={avatar}
                            alt=""
                            referrerPolicy="no-referrer"
                        />
                    )}
                    <button
                        type="button"
                        className="header__menu-toggle"
                        aria-expanded={menuOpen}
                        aria-controls="header-menu"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span className="header__menu-toggle-label">
                            {menuOpen ? "Закрити меню" : "Відкрити меню"}
                        </span>
                        <MenuIcon open={menuOpen} />
                    </button>
                </div>
            </div>

            {menuOpen && (
                <>
                    <button
                        type="button"
                        className="header__backdrop"
                        aria-label="Закрити меню"
                        onClick={() => setMenuOpen(false)}
                    />
                    <nav className="header__drawer" id="header-menu">
                        {displayName && (
                            <div className="header__drawer-user">
                                {avatar ? (
                                    <img className="header__drawer-avatar" src={avatar} alt="" referrerPolicy="no-referrer" />
                                ) : (
                                    <span className="header__drawer-avatar header__drawer-avatar--fallback" aria-hidden="true">
                                        {initials(displayName)}
                                    </span>
                                )}
                                <div>
                                    <p className="header__drawer-greeting">Ласкаво просимо</p>
                                    <p className="header__drawer-name">{displayName}</p>
                                </div>
                            </div>
                        )}
                        <ul className="header__drawer-list">
                            {links.map((link) => (
                                <li key={link.to}>
                                    <NavLink
                                        className={({ isActive }) =>
                                            `header__drawer-link${isActive ? " header__drawer-link--active" : ""}`
                                        }
                                        to={link.to}
                                        end={link.to === "/" || link.to === "/admin"}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </>
            )}
        </header>
    );
}

function initials(name) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

function MenuIcon({ open }) {
    return (
        <svg className="header__menu-icon" viewBox="0 0 24 24" aria-hidden="true">
            {open ? (
                <path d="M6 6L18 18M18 6L6 18" />
            ) : (
                <>
                    <path d="M4 7H20" />
                    <path d="M4 12H20" />
                    <path d="M4 17H20" />
                </>
            )}
        </svg>
    );
}

export default Header;
