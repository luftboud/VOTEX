import UserMain from "../../components/UserMain/UserMain";
import Header from "../../components/Header/Header";

function userHome({user}) {
    const userName = user?.name || "Анонім";
    const userAvatar = user?.avatar;


    return (
        <div>
            <Header
                name={userName}
            />
            <UserMain />
        </div>
    )
}

export default userHome;