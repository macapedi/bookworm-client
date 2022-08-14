
import { Link } from "react-router-dom";
import "./Footer.scss";
import facebookLogo from "../../assets/icons/facebook.png";
import instagramLogo from "../../assets/icons/instagram.png";
import twitterLogo from "../../assets/icons/twitter.png";



function Footer() {






    return (
        <footer className="footer">
            <Link to="/books" className="footer__logo-link">
                <p className="footer__logo"> BOOKWORM</p>
            </Link>
            <div className="footer__social-wrapper">
                <Link to="/books">
                    <img src={facebookLogo} alt="facebook icon" className="icon"></img>
                </Link>
                <Link to="/books">
                    <img src={twitterLogo} alt="twitter icon" className="icon"></img>
                </Link>
                <Link to="/books">
                    <img src={instagramLogo} alt="instagram icon" className="icon"></img>
                </Link>

            </div>


        </footer>
    );
}
export default Footer;