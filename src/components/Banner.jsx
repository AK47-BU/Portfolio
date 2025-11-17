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
                        <p>a Cybersecurity Management student at Bournemouth University, I am driven to bridge the gap between technical security and operational leadership.

I take a proactive approach to my development, constantly expanding my scope within the wider computing field. I have validated my core skills through industry exposure—including a group competition with BAE Systems—but I also actively challenge myself with new disciplines. I enjoy stepping into areas like software development to test my abilities, a mindset reflected in the custom build of this portfolio.

However, my experience extends beyond the terminal. Working concurrently as a Part-time Manager has taught me how to lead teams and solve complex problems in high-pressure environments.

I am now looking for a placement year where I can merge these two sides of my experience: technical defense and proven leadership.</p>
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