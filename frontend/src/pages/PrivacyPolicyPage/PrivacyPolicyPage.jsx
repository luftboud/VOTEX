import Header from "../../components/Header/Header";
import "../InformationPages/InformationPages.scss";

function HeaderIcon({ type }) {
    const icons = {
        overview: <path d="M17 12.0004C17 17.0004 13.5 19.5005 9.34 20.9505C9.12216 21.0243 8.88554 21.0207 8.67 20.9405C4.5 19.5005 1 17.0004 1 12.0004V5.00045C1 4.73523 1.10536 4.48088 1.29289 4.29334C1.48043 4.10581 1.73478 4.00045 2 4.00045C4 4.00045 6.5 2.80045 8.24 1.28045C8.45185 1.09945 8.72135 1 9 1C9.27865 1 9.54815 1.09945 9.76 1.28045C11.51 2.81045 14 4.00045 16 4.00045C16.2652 4.00045 16.5196 4.10581 16.7071 4.29334C16.8946 4.48088 17 4.73523 17 5.00045V12.0004Z" />,
        document: (
            <>
                <path d="M12 8C16.9706 8 21 6.65685 21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5C3 6.65685 7.02944 8 12 8Z" />
                <path d="M3 5V19C3 19.7956 3.94821 20.5587 5.63604 21.1213C7.32387 21.6839 9.61305 22 12 22C14.3869 22 16.6761 21.6839 18.364 21.1213C20.0518 20.5587 21 19.7956 21 19V5" />
                <path d="M3 12C3 12.7956 3.94821 13.5587 5.63604 14.1213C7.32387 14.6839 9.61305 15 12 15C14.3869 15 16.6761 14.6839 18.364 14.1213C20.0518 13.5587 21 12.7956 21 12" />
            </>
        ),
        eye: (
            <>
                <path d="M2.06202 12.3481C1.97868 12.1236 1.97868 11.8766 2.06202 11.6521C2.87372 9.68397 4.25153 8.00116 6.02079 6.81701C7.79004 5.63287 9.87106 5.00073 12 5.00073C14.129 5.00073 16.21 5.63287 17.9792 6.81701C19.7485 8.00116 21.1263 9.68397 21.938 11.6521C22.0214 11.8766 22.0214 12.1236 21.938 12.3481C21.1263 14.3163 19.7485 15.9991 17.9792 17.1832C16.21 18.3674 14.129 18.9995 12 18.9995C9.87106 18.9995 7.79004 18.3674 6.02079 17.1832C4.25153 15.9991 2.87372 14.3163 2.06202 12.3481Z" />
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
            </>
        ),
        lock: (
            <>
                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" />
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" />
            </>
        ),
        share: (
            <>
                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="#82181A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" />
                <path d="M16 11L18 13L22 9" />
            </>
        ),
        info: (
            <>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                <path d="M12 8V12" />
                <path d="M12 16H12.01" />
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
            <Header name={userName} avatar="/images/avatar.svg"/>

            <section className="infoDocsPage__content">
                <header className="infoDocsPage__heading">
                    <h1 className="infoDocsPage__title">Політика конфіденційності</h1>
                    <p className="infoDocsPage__subtitle">Востаннє оновлено: 29 березня 2026</p>
                </header>

                <div className="infoDocsPage__cards">
                    <article className="infoDocsCard infoDocsCard--blue">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="overview" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Огляд</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <p className="infoDocsBlock__text">
                                Платформа голосування Ради студентів зобов’язується захищати вашу конфіденційність. Ця політика описує, як
                                ми збираємо, використовуємо та захищаємо вашу особисту інформацію під час користування нашою платформою голосування.
                            </p>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--green">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="document" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Інформація, яку ми збираємо</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Особиста інформація</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Ім’я та електронна пошта через Google-автентифікацію</li>
                                    <li>Належність до університету</li>
                                    <li>Роль у Раді студентів та факультет</li>
                                </ul>
                            </div>
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Дані голосування</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Записи відвідуваності засідань</li>
                                    <li>Подані голоси, анонімізовані</li>
                                    <li>Часові позначки дій голосування</li>
                                </ul>
                            </div>
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Технічна інформація</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>IP-адреса та інформація про пристрій</li>
                                    <li>Тип і версія браузера</li>
                                    <li>Часові позначки доступу</li>
                                </ul>
                            </div>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--purple">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="eye" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Як ми використовуємо вашу інформацію</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <ul className="infoDocsList">
                                <li>Для автентифікації та підтвердження вашої особи як члена Ради студентів</li>
                                <li>Для проведення сесій голосування та фіксації відвідуваності</li>
                                <li>Для створення узагальнених результатів голосування та статистики</li>
                                <li>Для ведення архівів засідань та історичних записів</li>
                                <li>Для покращення платформи та забезпечення безпеки системи</li>
                            </ul>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--orange">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="lock" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Анонімність голосування</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <p className="infoDocsBlock__text">
                                Ми серйозно ставимося до конфіденційності голосування. Ваші індивідуальні вибори під час голосування залишаються конфіденційними:
                            </p>
                            <ul className="infoDocsList infoDocsList--check">
                                <li>Голоси анонімізуються одразу після подання</li>
                                <li>Публічно відображаються лише узагальнені результати</li>
                                <li>Індивідуальні записи голосування зашифровані та захищені</li>
                                <li>Адміністратори не можуть переглядати індивідуальні вибори голосування</li>
                            </ul>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--red">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="share" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Передача та розкриття даних</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <p className="infoDocsBlock__text">
                                Ми не продаємо, не обмінюємо та не передаємо в оренду вашу особисту інформацію третім сторонам. Ваші дані можуть бути
                                передані лише:
                            </p>
                            <ul className="infoDocsList">
                                <li>Адміністрації університету, коли це вимагається політикою</li>
                                <li>Коли це вимагається законом або судовими процедурами</li>
                                <li>Для захисту прав, власності або безпеки користувачів</li>
                            </ul>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--slate">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="info" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Ваші права</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <p className="infoDocsBlock__text">Ви маєте право:</p>
                            <ul className="infoDocsList">
                                <li>Отримати доступ до своєї особистої інформації</li>
                                <li>Попросити виправити неточні дані</li>
                                <li>Переглядати свою історію голосування та записи відвідуваності</li>
                                <li>Попросити видалення даних, з урахуванням законодавчих вимог</li>
                            </ul>
                        </div>
                    </article>

                    <article className="infoDocsCard">
                        <div className="infoDocsCard__body">
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Зв’язатися з нами</h3>
                                <p className="infoDocsContact">
                                    Якщо у вас є запитання або занепокоєння щодо цієї Політики конфіденційності або того, як ми обробляємо ваші дані,
                                    будь ласка, зверніться до розробників за адресою{" "}
                                    <a href="mailto:ijamaharyta@gmail.com">ijamaharyta@gmail.com</a>
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