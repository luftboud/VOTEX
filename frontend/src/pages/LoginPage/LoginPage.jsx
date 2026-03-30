import Login from '../../components/Login/Login'

function LoginPage({ onAuthSuccess }) {
    return (
        <div>
            <Login onAuthSuccess={onAuthSuccess} />
        </div>
    )
}
export default LoginPage;