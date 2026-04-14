import { Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import MeetingResults from "../../components/MeetingResults/MeetingResults";
import { useEffect, useState } from "react";

function MeetingResultsPage() {
    const { meetingId } = useParams();
    let [meeting, setMeeting] = useState(null);
    let [rendering, setRendering] = useState(true);
    let [not_found, setNot_found] = useState(false);

    useEffect(() => {
        async function fetchMeetingResults() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/meetings`);
                const data = await response.json();

                const found = data.meetings.find(meeting => meeting._id === meetingId.trim());

                if (found) {
                    setMeeting(found);
                } else {
                    setNot_found(true);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setRendering(false);
            }
        }

        fetchMeetingResults();
    }, [meetingId]);

    if (rendering) {
        return <div>Вантажиться...</div>;
    }

    if (not_found) {
        return <Navigate to="/archive" replace />;
    }

    return (
        <div>
            {/*<Header*/}
            {/*    name="Ія"*/}
            {/*    avatar="/images/avatar.svg"*/}
            {/*/>*/}
            <MeetingResults meeting={meeting} />
        </div>
    );
}

export default MeetingResultsPage;