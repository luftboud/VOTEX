import Header from "../../components/Header/Header";
import "../InformationPages/InformationPages.scss";

function HeaderIcon({ type }) {
    const voteIcon = (
        <>
            <path d="M18.1675 8.33333C18.5481 10.2011 18.2768 12.1429 17.399 13.8348C16.5212 15.5268 15.0899 16.8667 13.3438 17.6311C11.5976 18.3955 9.64219 18.5382 7.80358 18.0353C5.96498 17.5325 4.35433 16.4145 3.24023 14.8679C2.12613 13.3212 1.57594 11.4394 1.68139 9.53616C1.78684 7.63295 2.54157 5.82341 3.81971 4.40931C5.09785 2.99521 6.82215 2.06203 8.70505 1.76538C10.588 1.46873 12.5157 1.82655 14.1667 2.77917" />
            <path d="M7.5 9.16667L10 11.6667L18.3333 3.33333" />
        </>
    );

    const icons = {
        book: (
            <>
                <path d="M12 7V21" />
                <path d="M3 18C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7C12 5.93913 12.4214 4.92172 13.1716 4.17157C13.9217 3.42143 14.9391 3 16 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V17C22 17.2652 21.8946 17.5196 21.7071 17.7071C21.5196 17.8946 21.2652 18 21 18H15C14.2044 18 13.4413 18.3161 12.8787 18.8787C12.3161 19.4413 12 20.2044 12 21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H3Z" />
            </>
        ),
        users: (
            <>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" />
                <path d="M7 20.662V19C7 18.4696 7.21071 17.9609 7.58579 17.5858C7.96086 17.2107 8.46957 17 9 17H15C15.5304 17 16.0391 17.2107 16.4142 17.5858C16.7893 17.9609 17 18.4696 17 19V20.662" />
            </>
        ),
        shield: <path d="M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0202 11.67 21.94C7.5 20.5 4 18 4 13V5.99996C4 5.73474 4.10536 5.48039 4.29289 5.29285C4.48043 5.10532 4.73478 4.99996 5 4.99996C7 4.99996 9.5 3.79996 11.24 2.27996C11.4519 2.09896 11.7214 1.99951 12 1.99951C12.2786 1.99951 12.5481 2.09896 12.76 2.27996C14.51 3.80996 17 4.99996 19 4.99996C19.2652 4.99996 19.5196 5.10532 19.7071 5.29285C19.8946 5.48039 20 5.73474 20 5.99996V13Z" />,
        ballot: (
            <>
                <path d="M9 12L11 14L15 10" />
                <path d="M5 7C5 5.9 5.9 5 7 5H17C17.5304 5 18.0391 5.21071 18.4142 5.58579C18.7893 5.96086 19 6.46957 19 7V19H5V7Z" />
                <path d="M22 19H2" />
            </>
        ),
        vote: voteIcon,
        vote_for: voteIcon,
        vote_against: voteIcon,
        vote_abstain: voteIcon,
        faq: (
            <>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                <path d="M9.09 9.00008C9.3251 8.33175 9.78915 7.76819 10.4 7.40921C11.0108 7.05024 11.7289 6.91902 12.4272 7.03879C13.1255 7.15857 13.7588 7.52161 14.2151 8.06361C14.6713 8.60561 14.9211 9.2916 14.92 10.0001C14.92 12.0001 11.92 13.0001 11.92 13.0001" />
                <path d="M12 17H12.01" />
            </>
        ),
    };

    const viewBox = type?.startsWith("vote") ? "0 0 20 20" : "0 0 24 24";

    return <svg viewBox={viewBox} fill="none" aria-hidden="true">{icons[type]}</svg>;
}

function UserInstructionPage({ user }) {
    const userName = user?.name || user?.firstName || "John Doe";

    return (
        <main className="infoDocsPage">
            <Header name={userName} avatar="/images/avatar.svg"/>

            <section className="infoDocsPage__content">
                <header className="infoDocsPage__heading">
                    <h1 className="infoDocsPage__title">Інструкція користувача</h1>
                    <p className="infoDocsPage__subtitle">Дізнайтеся, як користуватися платформою голосування Ради студентів</p>
                </header>

                <div className="infoDocsPage__cards">
                    <article className="infoDocsCard infoDocsCard--blue">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="book" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Початок роботи</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">1. Увійдіть</h3>
                                <p className="infoDocsBlock__text">
                                    Використайте свій університетський Google-акаунт, щоб увійти на платформу. Лише авторизовані члени Ради студентів
                                    можуть отримати доступ до системи голосування.
                                </p>
                            </div>
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">2. Перейдіть до своєї панелі</h3>
                                <p className="infoDocsBlock__text">
                                    Після входу вас буде спрямовано до вашої панелі, де ви можете приєднатися до засідань або переглянути
                                    минулі засідання.
                                </p>
                            </div>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--green">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="users" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Для представників</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Приєднання до засідання</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Введіть код засідання, наданий вашим адміністратором</li>
                                    <li>Натисніть кнопку &quot;Приєднатися&quot;, щоб увійти до засідання</li>
                                    <li>Очікуйте початку сесії голосування</li>
                                </ul>
                            </div>

                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Процес голосування</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Уважно прочитайте кожне питання</li>
                                    <li>Оберіть один із трьох варіантів: За, Проти або Утриматися</li>
                                    <li>Підтвердьте свій голос, коли з’явиться запит</li>
                                    <li>Очікуйте наступного питання після подання голосу</li>
                                </ul>
                            </div>

                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Перегляд архіву</h3>
                                <p className="infoDocsBlock__text">
                                    Перейдіть до розділу Архів засідань, щоб переглянути всі минулі засідання та їхні результати, навіть якщо ви
                                    не брали участі.
                                </p>
                            </div>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--purple">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="shield" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Для адміністраторів</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Створення засідання</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Натисніть &quot;Створити нове засідання&quot; на своїй адміністративній панелі</li>
                                    <li>Введіть назву засідання та посилання на протокол, за бажанням</li>
                                    <li>Додайте питання за допомогою кнопки &quot;+&quot;</li>
                                    <li>Натисніть &quot;Почати засідання&quot;, щоб розпочати сесію</li>
                                </ul>
                            </div>

                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Керування голосуванням</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Поділіться кодом засідання з учасниками</li>
                                    <li>Натисніть &quot;Почати голосування&quot; для кожного питання</li>
                                    <li>Переглядайте результати в реальному часі після завершення голосування</li>
                                    <li>Переходьте до наступного питання, коли будете готові</li>
                                </ul>
                            </div>

                            <div className="infoDocsBlock">
                                <h3 className="infoDocsBlock__title">Керування членами</h3>
                                <ul className="infoDocsList infoDocsList--plain">
                                    <li>Створюйте нове скликання для кожного академічного року</li>
                                    <li>Додавайте членів за електронною поштою</li>
                                    <li>Призначайте ролі: Президент, Секретар тощо</li>
                                    <li>Видаляйте або оновлюйте членів за потреби</li>
                                </ul>
                            </div>
                        </div>
                    </article>

                    <article className="infoDocsCard infoDocsCard--orange">
                        <div className="infoDocsCard__header">
                            <span className="infoDocsCard__icon">
                                <HeaderIcon type="ballot" />
                            </span>
                            <h2 className="infoDocsCard__header-title">Розуміння варіантів голосування</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <div className="votingOption votingOption--for">
                                <span className="votingOption__icon">
                                    <HeaderIcon type="vote_for" />
                                </span>
                                <div className="votingOption__content">
                                    <h3 className="votingOption__title">За</h3>
                                    <p className="votingOption__text">Голосуйте &quot;За&quot;, якщо ви підтримуєте пропозицію або рішення</p>
                                </div>
                            </div>

                            <div className="votingOption votingOption--against">
                                <span className="votingOption__icon">
                                    <HeaderIcon type="vote_against" />
                                </span>
                                <div className="votingOption__content">
                                    <h3 className="votingOption__title">Проти</h3>
                                    <p className="votingOption__text">Голосуйте &quot;Проти&quot;, якщо ви не підтримуєте пропозицію або рішення</p>
                                </div>
                            </div>

                            <div className="votingOption votingOption--abstain">
                                <span className="votingOption__icon">
                                    <HeaderIcon type="vote_abstain" />
                                </span>
                                <div className="votingOption__content">
                                    <h3 className="votingOption__title">Утриматися</h3>
                                    <p className="votingOption__text">
                                        Голосуйте &quot;Утриматися&quot;, якщо ви не хочете займати позицію або маєте конфлікт інтересів
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
                            <h2 className="infoDocsCard__header-title">Поширені запитання</h2>
                        </div>
                        <div className="infoDocsCard__body">
                            <div className="infoDocsFaq">
                                <h3 className="infoDocsFaq__question">Чи можу я змінити свій голос?</h3>
                                <p className="infoDocsFaq__answer">
                                    Ні, голоси є остаточними після подання. Будь ласка, уважно перевірте свій вибір перед підтвердженням.
                                </p>
                            </div>

                            <div className="infoDocsFaq">
                                <h3 className="infoDocsFaq__question">Що робити, якщо я пропущу засідання?</h3>
                                <p className="infoDocsFaq__answer">
                                    Ви можете переглянути результати та деталі минулих засідань у розділі Архів засідань.
                                </p>
                            </div>

                            <div className="infoDocsFaq">
                                <h3 className="infoDocsFaq__question">Чи є мій голос анонімним?</h3>
                                <p className="infoDocsFaq__answer">
                                    Система фіксує, що ви проголосували, але ваш конкретний вибір залишається приватним, і відображаються лише узагальнені
                                    результати.
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