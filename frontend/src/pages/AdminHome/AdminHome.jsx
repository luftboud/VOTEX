import Header from "../../components/Header/Header";
import AdminMain from "../../components/AdminMain/AdminMain";

function adminHome({ user }) {
    const userName = user?.name || "Анонім";

    return (
        <div>
            <Header
                name={userName}
            />
            <AdminMain />
        </div>
    )
}

export default adminHome;