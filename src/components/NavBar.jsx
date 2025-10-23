import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import logo from "../assets/img/404pfpnew.jpg"
import navIcon1 from "../assets/img/nav-icon1.svg"
import navIcon3 from "../assets/img/nav-icon3.svg"
import navIcon2 from "../assets/img/github-brands-solid-full.svg"
// Define the NavBar component.
    export const NavBar = () => {
        // State to track the active navigation link, defaulting to 'home'.
        const [activelink, setActiveLink] = useState(`home`);
        // State to track if the page has been scrolled.
        const [scrolled, seScrolled] = useState(false);
// useEffect hook to handle scroll events.
        useEffect(() => {
            // Function to run on scroll.
            const onScroll = () => {
                // If scrolled more than 50px, set scrolled state to true.
                if (window.scrollY > 50) {
                    seScrolled(true);
                } else {
                    seScrolled(false);
                }
            }

            window.addEventListener("scroll", onScroll);

            return () => window.removeEventListener("scroll", onScroll);
        }, [])

        const onUpdateActiveLink = (value) => {
            setActiveLink(value);

        }
        
        return (
            // Navbar component from react-bootstrap, dynamically applying 'scrolled' class.
        <Navbar expand="lg" className={scrolled ? "scrolled": ""}>
        <Container>
            <Navbar.Brand href="#home">
                <img src={logo} alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
                <span className='navbar-toggle-icon'></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home" className={activelink === `home` ? `active navbar-link` : `navbar-link`} onClick={() => onUpdateActiveLink(`home`)}>Home</Nav.Link>
                <Nav.Link href="#Skills" className={activelink === `Skills` ? `active navbar-link` : `navbar-link`} onClick={() => onUpdateActiveLink(`Skills`)}>Skills</Nav.Link>
                <Nav.Link href="#Projects" className={activelink === `Projects` ? `active navbar-link` : `navbar-link`} onClick={() => onUpdateActiveLink(`Projects`)}>Projects</Nav.Link>               
            </Nav>
            <span className='navbar-text'>
                <div className='social-icon'>
                <Nav.Link href="#Instagram"><img src={navIcon3} alt="#Instagram"/></Nav.Link>
                <Nav.Link href="#LinkedIn"><img src={navIcon1} alt="#LinkedIn"/></Nav.Link>
                <Nav.Link href="#Github"><img src={navIcon2} alt="#Github"/></Nav.Link>
                </div>
                <button className='contact' onClick={() => console.log(`connect`)}>
                <span>Let's connect</span>
                </button>
                
            </span>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
