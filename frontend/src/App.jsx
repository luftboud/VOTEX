import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div>
            <Header
                name="Ія"
                avatar="/images/avatar.svg"
            />

            <h1>Hello, World!</h1>

            {/*<Routes>*/}
            {/*    <Route path="/" element={<Home />} />*/}
            {/*    <Route path="/login" element={<LoginPage />} />*/}
            {/*    <Route path="/user-instruction" element={<UserInstruction />} />*/}
            {/*</Routes>*/}

            <Footer />
        </div>
    );
}

export default App;