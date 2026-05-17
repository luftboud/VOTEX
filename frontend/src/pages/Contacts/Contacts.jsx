import "./Contacts.scss"
import Header from "../../components/Header/Header";
function Contacts({user}) {
    const userName = user?.name || null;
    return (
        <div className="contacts">
            <Header user={name} />
            <div className="contacts__container">
                <h1 className="contacts__title">
                    Для узгодження технічних питань звертайтесь до розробниці сайту:
                </h1>
                <h2 className="contacts__name">Ія Магарита</h2>
                <a href="https://t.me/zabuvayuvzhe" className="contacts__link">Telegram</a>
                <a href="mailto:ijamaharyta@gmail.com" className="contacts__link">Електронна пошта</a>
            </div>
        </div>
    )
}

export default Contacts;