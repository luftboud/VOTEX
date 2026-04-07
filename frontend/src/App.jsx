import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserHome from "./pages/UserHome/UserHome";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    setUser(null);
                    return;
                }

                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                console.error("Auth check failed:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Routes>
                <Route
                    path="/login"
                    element={
                        user ? (
                            <Navigate to="/" replace />
                        ) : (
                            <LoginPage onAuthSuccess={(loggedInUser) => setUser(loggedInUser)} />
                        )
                    }
                />

                <Route
                    path="/"
                    element={
                        user ? (
                            <UserHome user={user} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;