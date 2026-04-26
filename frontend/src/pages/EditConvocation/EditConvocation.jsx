import Header from "../../components/Header/Header";
import EditConvocation from "../../components/EditConvocation/EditConvocation";

function EditConvocationPage({ user }) {
	const userName = user?.name || "Адмін";

	return (
		<div>
			<Header name={userName} avatar="/images/avatar.svg" />
			<EditConvocation />
		</div>
	);
}

export default EditConvocationPage;
