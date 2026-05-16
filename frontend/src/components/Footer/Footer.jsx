import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
    return (
        <footer className="footer">
            <Link className="footer__link" to="/user-instruction">Інструкція користувача</Link>
            <span className="footer__span">|</span>
            <Link className="footer__link" to="#">Політика конфідеційності</Link>
            <span className="footer__span">|</span>
            <Link className="footer__link" to="#">Служба підтримки</Link>
        </footer>
    );
}

export default Footer;