import Header from "../../components/Header/Header";
import EditConvocation from "../../components/EditConvocation/EditConvocation";

function EditConvocationPage({ user }) {
	return (
		<div>
			<Header user={user} />
			<EditConvocation />
		</div>
	);
}

export default EditConvocationPage;
