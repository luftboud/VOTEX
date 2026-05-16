import UserMain from "../../components/UserMain/UserMain";
import Header from "../../components/Header/Header";

function userHome() {
    return (
        <div>
            <Header
                name="Ія"
                avatar="/images/avatar.svg"
            />
            <UserMain />
        </div>
    )
}

export default userHome;