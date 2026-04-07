import "./UserMain.scss";
import ArchiveMeetingUnit from "../ArchiveMeetingUnit/ArchiveMeetingUnit";

function userMain() {
    return (
        <div className="userMain__container">
            <div className="userMain__container-join-meeting-card">
                <div className="userMain__container-join-meeting-card-header">
                    <h2>Приєднатись до засідання</h2>
                </div>
                <form action="/" method="POST" className="userMain__container-join-meeting-card-form">
                    <input type="text" placeholder="Введіть код засідання" className="userMain__container-join-meeting-card-form-input" />
                    <button type="submit" className="userMain__container-join-meeting-card-form-submit">Приєднатись</button>
                </form>
            </div>
            <div className="userMain__container-meeting-archive">
                <div className="userMain__container-meeting-archive-header">
                    <h2 className="userMain__container-meeting-archive-header-text">Архів засіднань</h2>
                    <button className="userMain__container-meeting-archive-header-btn">Показати всі</button>
                </div>
                <div className="userMain__container-meeting-archive-cardholder">
                    <ArchiveMeetingUnit
                            name="Archive Meeting"
                            date="12.12.12"
                    />
                    <ArchiveMeetingUnit
                            name="Archive Meeting 2"
                            date="12.12.12"
                    />
                    <ArchiveMeetingUnit
                        name="Archive Meeting 3"
                        date="12.12.12"
                    />
                </div>
            </div>
        </div>
    );
}

export default userMain;