import UserMain from "../../components/UserMain/UserMain";
import Header from "../../components/Header/Header";

function userHome({user}) {

    return (
        <div>
            <Header
                name={user?.name}
                avatar="/images/avatar.svg"
            />
            <UserMain />
        </div>
    )
}

export default userHome;