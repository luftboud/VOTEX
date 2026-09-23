import UserMain from "../../components/UserMain/UserMain";
import Header from "../../components/Header/Header";
import MeetingLivePage from "../MeetingLivePage/MeetingLivePage";
import {Route} from "react-router-dom";

function userHome({user}) {
    return (
        <div>
            <Header user={user} />
            <UserMain />
        </div>
    )
}

export default userHome;