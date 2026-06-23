import { Navbar, Nav, Container } from "react-bootstrap";
import { useState, useEffect } from 'react';
import logo from "../assets/img/Logo.png"
import navIcon1 from "../assets/img/nav-icon1.svg"
import navIcon3 from "../assets/img/nav-icon3.svg"
import navIcon2 from "../assets/img/github-brands-solid-full.svg"

// Define the NavBar component.
export const NavBar = () => {
    const [activelink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => { setScrolled(window.scrollY > 50); }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    // Scroll-spy: highlight whichever section is currently in view.
    useEffect(() => {
        const ids = ['home', 'about', 'skills', 'projects'];
        const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
        if (!sections.length) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveLink(entry.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px' } // thin band near viewport centre
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [])

    const onUpdateActiveLink = (value) => { setActiveLink(value); }

    return (
        <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
            <Container>
                <Navbar.Brand href="#home">
                    <img src={logo} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className='navbar-toggle-icon'></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className={activelink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
                        <Nav.Link href="#about" className={activelink === 'about' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('about')}>About</Nav.Link>
                        <Nav.Link href="#skills" className={activelink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
                        <Nav.Link href="#projects" className={activelink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
                    </Nav>
                    <span className='navbar-text'>
                        <div className='social-icon'>
                            <a href="https://www.instagram.com/kulik6377" target="_blank" rel="noopener noreferrer"><img src={navIcon3} alt="Instagram" /></a>
                            <a href="https://www.linkedin.com/in/adam-kulik-241035366" target="_blank" rel="noopener noreferrer"><img src={navIcon1} alt="LinkedIn" /></a>
                            <a href="https://github.com/AK47-BU" target="_blank" rel="noopener noreferrer"><img src={navIcon2} alt="Github" /></a>
                        </div>
                        <a href="#connect" className='contact' onClick={() => onUpdateActiveLink('connect')}>
                            <span>Let&apos;s connect</span>
                        </a>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
