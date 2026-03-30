import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1 }}>
                {isAuthenticated && (
                    <Header
                        name="Ія"
                        avatar="/images/avatar.svg"
                    />
                )}

                {isAuthenticated ? (
                    <main style={{ textAlign: "center", padding: "24px" }}>
                        <h1>Ви успішно увійшли</h1>
                        <p>Перехід після реєстрації виконано (демо-заглушка).</p>
                    </main>
                ) : (
                    <LoginPage onAuthSuccess={() => setIsAuthenticated(true)} />
                )}
            </div>
            <Footer />
        </div>
    );
}

export default App;