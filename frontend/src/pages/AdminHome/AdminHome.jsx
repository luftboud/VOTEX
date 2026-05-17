import Header from "../../components/Header/Header";
import AdminMain from "../../components/AdminMain/AdminMain";

function adminHome({ user }) {
    const userName = user?.name || user?.firstName || "Ія";

    return (
        <div>
            <Header
                name={userName}
                avatar="/images/avatar.svg"
            />
            <AdminMain />
        </div>
    )
}

export default adminHome;