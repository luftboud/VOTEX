import "./Login.scss";
import {Link, useNavigate} from "react-router-dom";
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
            <h1 className="Login-title">Система голосування</h1>
            <div className="Login__descr">
                <h2 className="Login__descr-subtitle">Ради студентів УКУ</h2>
                <span className="Login__descr-subtitle">|</span>
                <Link className="Login__descr-subtitle-link" to="/archive">Архів</Link>
            </div>
            <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}

export default Login;