import Header from "../../components/Header/Header";
import AdminMain from "../../components/AdminMain/AdminMain";

function adminHome({ user }) {
    return (
        <div>
            <Header user={user} />
            <AdminMain />
        </div>
    )
}

export default adminHome;