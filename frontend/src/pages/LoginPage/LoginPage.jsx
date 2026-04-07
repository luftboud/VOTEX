import "./LoginPage.scss"
import Login from '../../components/Login/Login'

function LoginPage({ onAuthSuccess }) {
    return (
        <div className="Login_page">
            <Login onAuthSuccess={onAuthSuccess} />
        </div>
    )
}
export default LoginPage;