import { Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import MeetingResults from "../../components/MeetingResults/MeetingResults";
import { testMeetingsResults } from "../../data/testMeetings";

function MeetingResultsPage() {
    const { meetingId } = useParams();
    const meeting = testMeetingsResults[meetingId];

    if (!meeting) {
        return <Navigate to="/archive" replace />;
    }

    return (
        <div>
            <Header
                name="Ія"
                avatar="/images/avatar.svg"
            />
            <MeetingResults meeting={meeting} />
        </div>
    );
}

export default MeetingResultsPage;