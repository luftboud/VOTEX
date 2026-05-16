import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
    return (
        <footer className="footer">
            <Link className="footer__link" to="/user-instruction">User Instruction</Link>
            <span className="footer__span">|</span>
            <Link className="footer__link" to="/privacy-policy">Privacy Policy</Link>
            <span className="footer__span">|</span>
            <Link className="footer__link" to="#">Support</Link>
        </footer>
    );
}

export default Footer;
