import "./Footer.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer flex-v-center" id="footer">
      <div>
        <p>&copy; {new Date().getFullYear()} Book My Show</p>
        <p>Created by Sharath Devadiga</p>
      </div>
      <div className="social-link-container">
        <a
          className="social-link"
          href="https://www.linkedin.com/in/sharath-devadiga"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin></FaLinkedin>
        </a>
        <a
          className="social-link"
          href="https://github.com/Sharatdevadiga"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub></FaGithub>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
