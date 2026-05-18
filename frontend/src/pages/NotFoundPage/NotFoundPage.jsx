import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";
import Header from "../../components/Header/Header";

function NotFoundPage({user}) {
    const navigate = useNavigate();

    return (
        <div>
            <Header name={user?.name || null}/>
            <main className="notFound">
                <section className="notFound__card">
                    <p className="notFound__code">404</p>

                    <h1 className="notFound__title">Сторінку не знайдено</h1>

                    <p className="notFound__text">
                        Схоже, такої сторінки не існує або посилання було змінено.
                    </p>

                    <button
                        type="button"
                        className="notFound__button"
                        onClick={() => navigate("/")}
                    >
                        Повернутись на головну
                    </button>
                </section>
            </main>
        </div>
    );
}

export default NotFoundPage;