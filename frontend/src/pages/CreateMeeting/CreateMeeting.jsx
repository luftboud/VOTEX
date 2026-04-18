import CreateMeetingForm from "../../components/CreateMeetingForm/CreateMeetingForm";
import Header from "../../components/Header/Header";

function CreateMeeting({ user }) {
    return (
        <div>
            <Header
                name={user}
                avatar="/images/avatar.svg"
            />
            <form method="POST">
                <CreateMeetingForm />
            </form>
        </div>
    );
}

export default CreateMeeting;