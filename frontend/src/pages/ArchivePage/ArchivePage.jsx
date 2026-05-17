import Header from "../../components/Header/Header";
import MeetingsArchive from "../../components/MeetingsArchive/MeetingsArchive";

function ArchivePage({ user }) {
	return (
		<div>
			<Header
				name={user?.name ?? null}
			/>
			<MeetingsArchive user={user}/>
		</div>
	);
}

export default ArchivePage;
