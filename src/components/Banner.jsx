import { useState, useEffect } from "react"
import {Container, Row, Col} from "react-bootstrap"
import { ArrowRightCircle } from "react-bootstrap-icons"
import headerimg from "../assets/img/headerimg.jpg"

// Define the Banner component.
export const Banner = () => {
    // State to track the current index in the toRotate array.
    const [loopNum, setLoopNum] = useState(0);
    // State to track if the text animation is deleting.
    const [isDeleting, setIsDeleting] = useState(false);
    // Array of strings to cycle through in the typing animation.
    const toRotate = [ "Cyber Security Managment", "Web Development", "Ethical Hacking"];
    // State to hold the currently displayed text.
    const [text, setText] = useState('');
    // State to control the speed of the typing animation (delta time between characters).
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    // Constant for the pause period after a full text is typed.
    const period = 2000;


    // useEffect hook to manage the typing animation interval.
    useEffect(() => {
        // Set up an interval timer that calls the tick function.
        let ticker = setInterval(() => {
            tick();
        }, delta);

        // Cleanup function: clear the interval when the component unmounts or dependencies change.
        return () => {clearInterval(ticker)};

    
    }, [text, delta]) // Dependencies: run effect when text or delta state changes.

    // Function to handle the typing/deleting animation logic.
    const tick = () => {
     // Get the index for the current string in toRotate, looping back using modulo.
     let i =loopNum % toRotate.length;
     // Get the full text for the current index.
     let fulltext = toRotate[i];
     // Calculate the updated text: deleting or typing the next character.
     let updatedText = isDeleting ? fulltext.substring(0, text.length - 1) : fulltext.substring(0, text.length + 1);

     // Update the displayed text state.
     setText(updatedText);

     // If deleting, speed up the delta (make deletion faster).
     if (isDeleting) {
        setDelta(prevDelta => prevDelta /2);
     }
     // If typing is complete (updatedText matches fulltext).
     if (!isDeleting && updatedText === fulltext) {
        // Switch to deleting mode.
        setIsDeleting(true);
        // Set delta to the pause period.
        setDelta(period);
        // If deleting is complete (updatedText is empty).
        }else if (isDeleting && updatedText === '') {
            // Switch back to typing mode.
            setIsDeleting(false);
            // Move to the next string in the toRotate array.
            setLoopNum(loopNum + 1);
            // Set a standard typing speed delta.
            setDelta(500);
        }
    }
    

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                   <Col xs={12} md={6} xl={7}>
                        <span className="tagline">Welcome to my Portfolio</span>
                        <h1>{"Hi I'm Adam"}</h1><span className="wrap">{text}</span>
                        <p>a second-year Cybersecurity Management student at Bournemouth University. I’m not just passionate about the theory of security; I’m driven to build and defend the practical solutions that organizations rely on.

I’ve had a taste of this in a competitive project with BAE Systems, where I was responsible for designing and building an SQL database from the ground up and developing its HTML front-end. Taking that system from initial client interviews to a final prototype for industry judges was a fantastic experience.

Alongside my technical studies in Python, SQL, and Network Security, I balance my time as a Part-time Manager. This role has been invaluable, teaching me how to lead a team, manage daily operations, and solve problems under pressure—skills that are just as critical in a security operations center as they are in retail.

I'm now actively seeking a placement where I can merge these two sides of my experience: my technical aptitude and my proven ability to lead. I'm eager to learn from industry experts and make a tangible contribution to a dynamic security team.</p>
                    <a href="#connect" className="banner-connect-btn" onClick={() => onUpdateActiveLink('connect')}>
                    Let's Connect! <ArrowRightCircle size={25}/>
                    </a>
                   </Col> 
                   <Col xs={12} md={6} xl={5}>
                        <img src={headerimg} alt="Header Img" />
                  </Col>
                </Row>
            </Container>
        </section>

    )
}