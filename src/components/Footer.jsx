import { Container } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import navIcon2 from "../assets/img/github-brands-solid-full.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-inner">
          <img src={logo} alt="Adam Kulik logo" />
          <div className="social-icon">
            <a href="https://www.instagram.com/kulik6377" target="_blank" rel="noopener noreferrer"><img src={navIcon3} alt="Instagram" /></a>
            <a href="https://www.linkedin.com/in/adam-kulik-241035366" target="_blank" rel="noopener noreferrer"><img src={navIcon1} alt="LinkedIn" /></a>
            <a href="https://github.com/AK47-BU" target="_blank" rel="noopener noreferrer"><img src={navIcon2} alt="GitHub" /></a>
          </div>
          <div className="footer-meta">
            <p>© {new Date().getFullYear()} Adam Kulik</p>
            <p className="footer-sig">// designed &amp; coded by me</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
