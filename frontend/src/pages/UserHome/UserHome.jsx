import UserMain from "../../components/UserMain/UserMain";
import Header from "../../components/Header/Header";

function userHome({user}) {
    const userName = user?.name || "Анонім";

    return (
        <div>
            <Header
                name={userName}
                avatar="/images/avatar.svg"
            />
            <UserMain />
        </div>
    )
}

export default userHome;