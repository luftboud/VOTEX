import Header from "../../components/Header/Header";
import MeetingsArchive from "../../components/MeetingsArchive/MeetingsArchive";

function ArchivePage({ user }) {
	return (
		<div>
			<Header user={user} />
			<MeetingsArchive user={user}/>
		</div>
	);
}

export default ArchivePage;
