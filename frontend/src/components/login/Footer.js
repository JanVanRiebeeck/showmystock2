import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faTelegramPlane,
  faTwitter,
  faFacebookF,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="login_footer">
      <div className="login_footer_wrap">
        <Link to="/eng">English(UK)</Link>
        <Link to="/fr">Francais(FR)</Link>

        <Link to="/" className="footer_square">
          <i className="plus_icon"></i>
        </Link>
      </div>
      <div className="footer_splitter"></div>
      <div className="login_footer_wrap">
        <Link to="/faq">FAQ (Frequently Asked Questions)</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/about">About Us</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/guides">User Guides</Link>
        <Link to="/access">Accessibility</Link>
        <Link to="/careers">Careers</Link>
        <Link to="/partners">Partners</Link>
        <Link to="/affilliate">Affiliate Program</Link>
      </div>
      <div className="footer_splitter"></div>
      <div className="social_media_links">
        <a
          href="https://api.whatsapp.com/send?phone=yourphonenumber"
          target="_blank"
          rel="noreferrer"
          className="social-icon whatsapp"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
        <a
          href="https://t.me/yourusername"
          target="_blank"
          rel="noreferrer"
          className="social-icon telegram"
        >
          <FontAwesomeIcon icon={faTelegramPlane} />
        </a>
        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noreferrer"
          className="social-icon twitter"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
          href="https://www.facebook.com/yourusername"
          target="_blank"
          rel="noreferrer"
          className="social-icon facebook"
        >
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a
          href="https://www.youtube.com/yourchannelname" // Update the URL
          target="_blank"
          rel="noreferrer"
          className="social-icon youtube" // Class for YouTube
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
    </footer>
  );
}
