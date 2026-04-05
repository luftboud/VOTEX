import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserHome from "./pages/UserHome/UserHome";
import {Navigate, Route, Routes} from "react-router-dom";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Routes>
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/" replace />
                        ) : (
                            <LoginPage onAuthSuccess={() => setIsAuthenticated(true)} />
                        )
                    }
                />

                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <UserHome />
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