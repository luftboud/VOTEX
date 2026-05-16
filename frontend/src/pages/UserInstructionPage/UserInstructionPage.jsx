import HelpCenterHeader from "../../components/HelpCenterHeader/HelpCenterHeader";
import "../InformationPages/InformationPages.scss";

function HeaderIcon({ type }) {
    const icons = {
        book: (
            <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v14H7.5A2.5 2.5 0 0 0 5 20.5V6.5ZM5 6.5V20.5M9 8h6M9 11h6" />
        ),
        users: (
            <>
                <path d="M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M3.5 19c0-2.2 2.2-4 5-4s5 1.8 5 4M14 19c0-1.8 1.7-3.2 3.8-3.2S21.5 17.2 21.5 19" />
            </>
        ),
        shield: <path d="M12 3.5 6 6v5.8c0 4 2.6 7.5 6 8.7 3.4-1.2 6-4.7 6-8.7V6l-6-2.5Z" />,
        ballot: (
            <>
                <path d="M6.5 8h11v11h-11z" />
                <path d="M9 11.5h6M9 14.5h4" />
                <path d="M10 6h4" />
            </>
        ),
        faq: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M9.7 9.8a2.3 2.3 0 1 1 4 1.6c-.9.8-1.7 1.2-1.7 2.4" />
                <path d="M12 17h.01" />
            </>
        ),
    };

    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            {icons[type]}
        </svg>
    );
}

function UserInstructionPage({ user }) {
    const userName = user?.name || user?.firstName || "John Doe";

    return (
        <main className="infoDocsPage">
            <HelpCenterHeader userName={userName} />

            <section className="infoDocsPage__content">
                <header className="infoDocsPage__heading">
                    <h1 className="infoDocsPage__title">User Instructions</h1>
                    <p className="infoDocsPage__subtitle">Learn how to use the Student Council Voting Platform</p>
                </header>

                <div className="infoDocsPage__cards">
                    <article className="infoDocsCard infoDocsCard--blue">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="book" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Getting Started</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">1. Sign In</h3>
                                <p className="infoDocsBlock__text">
                                    Use your university Google account to sign in to the platform. Only authorized Student Council
                                    members can access the voting system.
                                </p>
                            </div>
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">2. Access Your Dashboard</h3>
                                <p className="infoDocsBlock__text">
                                    After signing in, you&apos;ll be directed to your dashboard where you can join meetings or view
                                    past meetings.
                                </p>
                            </div>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--green">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="users" />
                            </span>
                            <h2 className="infoDocsCard__header-title">For Representatives</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Joining a Meeting</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Enter the meeting code provided by your administrator</li>
                                    <li>Click the &quot;Join&quot; button to enter the meeting</li>
                                    <li>Wait for the voting session to begin</li>
                                </ul>
                            </div>

                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Voting Process</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Read each question carefully</li>
                                    <li>Choose one of three options: For, Against, or Abstain</li>
                                    <li>Confirm your vote when prompted</li>
                                    <li>Wait for the next question after submitting your vote</li>
                                </ul>
                            </div>

                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Viewing Archive</h3>
                                <p className="infoDocsBlock__text">
                                    Access the Meetings Archive section to view all past meetings and their results, even if you
                                    didn&apos;t participate.
                                </p>
                            </div>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--purple">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="shield" />
                            </span>
                            <h2 className="infoDocsCard__header-title">For Administrators</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Creating a Meeting</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Click &quot;Create New Meeting&quot; from your admin dashboard</li>
                                    <li>Enter meeting title and protocol link (optional)</li>
                                    <li>Add questions using the &quot;+&quot; button</li>
                                    <li>Click &quot;Start Meeting&quot; to begin the session</li>
                                </ul>
                            </div>

                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Managing Voting</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Share the meeting code with participants</li>
                                    <li>Click &quot;Start Voting&quot; for each question</li>
                                    <li>View real-time results after voting ends</li>
                                    <li>Proceed to the next question when ready</li>
                                </ul>
                            </div>

                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Managing Members</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Create a new convocation for each academic year</li>
                                    <li>Add members by email address</li>
                                    <li>Assign roles (President, Secretary, etc.)</li>
                                    <li>Remove or update members as needed</li>
                                </ul>
                            </div>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--orange">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="ballot" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Understanding Voting Options</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <div className="votingOption votingOption--for">
                                <span className="votingOption__icon">✓</span>
                                <div className="votingOption__content">
                                    <h3 className="votingOption__title">For</h3>
                                    <p className="votingOption__text">Vote &quot;For&quot; if you support the proposal or motion</p>
                                </div>
                            </div>

                            <div className="votingOption votingOption--against">
                                <span className="votingOption__icon">✕</span>
                                <div className="votingOption__content">
                                    <h3 className="votingOption__title">Against</h3>
                                    <p className="votingOption__text">Vote &quot;Against&quot; if you oppose the proposal or motion</p>
                                </div>
                            </div>

                            <div className="votingOption votingOption--abstain">
                                <span className="votingOption__icon">•</span>
                                <div className="votingOption__content">
                                    <h3 className="votingOption__title">Abstain</h3>
                                    <p className="votingOption__text">
                                        Vote &quot;Abstain&quot; if you prefer not to take a position or have a conflict of interest
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--slate">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="faq" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Frequently Asked Questions</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <div className="infoDocsFaq">
                                <h3 className="infoDocsFaq__question">Can I change my vote?</h3>
                                <p className="infoDocsFaq__answer">
                                    No, votes are final once submitted. Please review your choice carefully before confirming.
                                </p>
                            </div>

                            <div className="infoDocsFaq">
                                <h3 className="infoDocsFaq__question">What if I miss a meeting?</h3>
                                <p className="infoDocsFaq__answer">
                                    You can view the results and details of past meetings in the Meetings Archive section.
                                </p>
                            </div>

                            <div className="infoDocsFaq">
                                <h3 className="infoDocsFaq__question">Is my vote anonymous?</h3>
                                <p className="infoDocsFaq__answer">
                                    The system records that you voted, but your specific choice is kept private and only aggregate
                                    results are displayed.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}

export default UserInstructionPage;
