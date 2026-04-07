import "./Login.scss"
import { useEffect, useRef } from "react";

let googleInitialized = false;

function GoogleLoginButton({ onLoginSuccess }) {
    const buttonRef = useRef(null);

    useEffect(() => {
        if (!window.google || !buttonRef.current) return;
        if (!googleInitialized) {

            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
            });

            googleInitialized = true;
        }

        if (buttonRef.current.childElementCount === 0) {

            window.google.accounts.id.renderButton(buttonRef.current, {
                theme: "outline",
                size: "large",
                text: "signin_with",
                shape: "rounded",
            });
        }
    }, []);

    async function handleCredentialResponse(response) {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    idToken: response.credential,
                }),
            });

            const data = await res.json();

            console.log("Backend login response:", data);

            if (!res.ok) {
                console.error("Login failed:", data);
                return;
            }

            if (onLoginSuccess) {
                onLoginSuccess(data.user);
            }
        } catch (error) {
            console.error("Google login error:", error);
        }
    }

    return <div ref={buttonRef} className="Login_button"></div>;
}

export default GoogleLoginButton;