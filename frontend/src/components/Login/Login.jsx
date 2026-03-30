
import { useState } from "react";

const GOOGLE_REGISTER_STUB_URL =
    import.meta.env.VITE_GOOGLE_REGISTER_STUB_URL ||
    import.meta.env.VITE_GOOGLE_LOGIN_STUB_URL ||
    "/api/auth/google";

function Login({ onAuthSuccess }) {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleGoogleRegister = async () => {
        setIsLoading(true);
        setMessage("");

        try {
            const response = await fetch(GOOGLE_REGISTER_STUB_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ provider: "google", action: "register" })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            setMessage("Запит на реєстрацію через Google відправлено у заглушку успішно.");
            if (onAuthSuccess) {
                onAuthSuccess();
            }
        } catch (error) {
            setMessage("Не вдалося відправити запит у заглушку. Перевір endpoint або сервер.");
        } finally {
            setIsLoading(false);
            if (onAuthSuccess) {
                onAuthSuccess();
            }
        }
    };

    return (
        <section style={{ textAlign: "center", padding: "24px" }}>
            <h1>Логін</h1>
            <p>Проста сторінка без дизайну для майбутньої Google-авторизації.</p>

            <button type="button" onClick={handleGoogleRegister} disabled={isLoading}>
                {isLoading ? "Відправка..." : "Зареєструватись через Google"}
            </button>

            {message && <p>{message}</p>}
            <p>Поточний endpoint заглушки: {GOOGLE_REGISTER_STUB_URL}</p>
        </section>
    );
}

export default Login;