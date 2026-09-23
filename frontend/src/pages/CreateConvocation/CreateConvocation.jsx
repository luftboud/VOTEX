import Header from "../../components/Header/Header";
import CreateConvocation from "../../components/CreateConvocation/CreateConvocation";

function CreateConvocationPage({ user }) {
	return (
		<div>
			<Header user={user} />
			<CreateConvocation />
		</div>
	);
}

export default CreateConvocationPage;
