import HelpCenterHeader from "../../components/HelpCenterHeader/HelpCenterHeader";
import "../InformationPages/InformationPages.scss";

function HeaderIcon({ type }) {
    const icons = {
        overview: <circle cx="12" cy="12" r="7.5" />,
        document: (
            <>
                <path d="M7 4.5h8l3 3v12H7z" />
                <path d="M15 4.5v3h3M9.5 11h6M9.5 14h6" />
            </>
        ),
        eye: (
            <>
                <path d="M2.5 12s3.4-5 9.5-5 9.5 5 9.5 5-3.4 5-9.5 5-9.5-5-9.5-5Z" />
                <circle cx="12" cy="12" r="2.2" />
            </>
        ),
        lock: (
            <>
                <rect x="6.5" y="10.5" width="11" height="9" rx="2" />
                <path d="M9 10.5V8.8a3 3 0 0 1 6 0v1.7" />
            </>
        ),
        share: (
            <>
                <circle cx="6.5" cy="12" r="2" />
                <circle cx="17.5" cy="6.5" r="2" />
                <circle cx="17.5" cy="17.5" r="2" />
                <path d="M8.2 11l7.2-3.7M8.2 13l7.2 3.7" />
            </>
        ),
        info: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 10.5v5M12 8h.01" />
            </>
        ),
    };

    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            {icons[type]}
        </svg>
    );
}

function PrivacyPolicyPage({ user }) {
    const userName = user?.name || user?.firstName || "John Doe";

    return (
        <main className="infoDocsPage infoDocsPage--privacy">
            <HelpCenterHeader userName={userName} variant="compact" />

            <section className="infoDocsPage__content">
                <header className="infoDocsPage__heading">
                    <h1 className="infoDocsPage__title">Privacy Policy</h1>
                    <p className="infoDocsPage__subtitle">Last updated: March 29, 2026</p>
                </header>

                <div className="infoDocsPage__cards">
                    <article className="infoDocsCard infoDocsCard--blue">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="overview" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Overview</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <p className="infoDocsBlock__text">
                                The Student Council Voting Platform is committed to protecting your privacy. This policy outlines how
                                we collect, use, and protect your personal information when you use our voting platform.
                            </p>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--green">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="document" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Information We Collect</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Personal Information</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Name and email address (via Google authentication)</li>
                                    <li>University affiliation</li>
                                    <li>Student Council role and department</li>
                                </ul>
                            </div>
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Voting Data</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Meeting attendance records</li>
                                    <li>Vote submissions (anonymized)</li>
                                    <li>Timestamp of voting activities</li>
                                </ul>
                            </div>
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Technical Information</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>IP address and device information</li>
                                    <li>Browser type and version</li>
                                    <li>Access timestamps</li>
                                </ul>
                            </div>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--purple">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="eye" />
                            </span>
                            <h2 className="infoDocsCard__header-title">How We Use Your Information</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <ul className="infoDocsList">
                                <li>To authenticate and verify your identity as a Student Council member</li>
                                <li>To facilitate voting sessions and record attendance</li>
                                <li>To generate aggregate voting results and statistics</li>
                                <li>To maintain meeting archives and historical records</li>
                                <li>To improve the platform and ensure system security</li>
                            </ul>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--orange">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="lock" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Vote Anonymity</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <p className="infoDocsBlock__text">
                                We take vote privacy seriously. Your individual voting choices are kept confidential:
                            </p>
                            <ul className="infoDocsList infoDocsList--check">
                                <li>Votes are anonymized immediately upon submission</li>
                                <li>Only aggregate results are displayed publicly</li>
                                <li>Individual voting records are encrypted and secure</li>
                                <li>Administrators cannot view individual vote choices</li>
                            </ul>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--red">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="share" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Data Sharing and Disclosure</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <p className="infoDocsBlock__text">
                                We do not sell, trade, or rent your personal information to third parties. Your data may only be
                                shared:
                            </p>
                            <ul className="infoDocsList">
                                <li>With university administration when required by policy</li>
                                <li>When mandated by law or legal proceedings</li>
                                <li>To protect the rights, property, or safety of users</li>
                            </ul>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--slate">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="info" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Your Rights</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <p className="infoDocsBlock__text">You have the right to:</p>
                            <ul className="infoDocsList">
                                <li>Access your personal information</li>
                                <li>Request correction of inaccurate data</li>
                                <li>View your voting history and attendance records</li>
                                <li>Request data deletion (subject to legal requirements)</li>
                            </ul>
                        </div>
                    </article>

                    <article className="infoDocsCard">
                        <div className="infoDocsCard__body">
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Contact Us</h3>
                                <p className="infoDocsContact">
                                    If you have any questions or concerns about this Privacy Policy or how we handle your data,
                                    please contact the Student Council administration at{" "}
                                    <a href="mailto:council@university.edu">council@university.edu</a>
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}

export default PrivacyPolicyPage;
