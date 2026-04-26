import Header from "../../components/Header/Header";
import CreateConvocation from "../../components/CreateConvocation/CreateConvocation";

function CreateConvocationPage({ user }) {
	const userName = user?.name || "Адмін";

	return (
		<div>
			<Header name={userName} avatar="/images/avatar.svg" />
			<CreateConvocation />
		</div>
	);
}

export default CreateConvocationPage;
