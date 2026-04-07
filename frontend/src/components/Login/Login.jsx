import "./Login.scss";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";

function Login({ onAuthSuccess }) {
    const navigate = useNavigate();

    function handleLoginSuccess(user) {
        console.log("Logged in user:", user);

        if (onAuthSuccess) {
            onAuthSuccess(user);
        }

        navigate("/");
    }

    return (
        <div className="Login">
            <h1 className="Login_title">Система голосування</h1>
            <h2 className="Login_subtitle">Ради студентів УКУ</h2>
            <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}

export default Login;