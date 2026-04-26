import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserHome from "./pages/UserHome/UserHome";
import AdminHome from "./pages/AdminHome/AdminHome";
import ArchivePage from "./pages/ArchivePage/ArchivePage";
import MeetingResultsPage from "./pages/MeetingResultsPage/MeetingResultsPage";
import CreateConvocationPage from "./pages/CreateConvocation/CreateConvocation";
import EditConvocationPage from "./pages/EditConvocation/EditConvocation";
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
    const isAdmin = user?.kernel;

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Routes>
                {/* Логіку шляхів закоментовано на час роботи задля зручності
                    Тому можете росто в пошуковому полі тикати шляхи які нада
                */}
                <Route
                    path="/login"
                    element={
                        // user ? (
                        //     <Navigate to={isAdmin ? "/admin" : "/"} replace />
                        // ) : (
                            <LoginPage onAuthSuccess={(loggedInUser) => setUser(loggedInUser)} />
                        // )
                    }
                />
                <Route
                    path="/"
                    element={
                        // !user ? (
                        //     <Navigate to="/login" replace />
                        // ) : isAdmin ? (
                        //     <Navigate to="/admin" replace />
                        // ) : (
                            <UserHome user={user} />
                        // )
                    }
                />

                <Route
                    path="/admin"
                    element={
                        // !user ? (
                        //     <Navigate to="/login" replace />
                        // ) : isAdmin ? (
                            <AdminHome user={user} />
                        // ) : (
                        //     <Navigate to="/" replace />
                        // )
                    }
                />

                <Route
                    path="/archive"
                    element={<ArchivePage />}
                />

                <Route
                    path="/archive/:meetingId"
                    element={<MeetingResultsPage />}
                />

                <Route
                    path="/admin/convocations/new"
                    element={<CreateConvocationPage user={user} />}
                />

                <Route
                    path="/admin/convocations/:convocationId"
                    element={<EditConvocationPage user={user} />}
                />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;