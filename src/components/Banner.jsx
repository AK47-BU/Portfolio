import { useState, useEffect } from "react"
import {Container, Row, Col} from "react-bootstrap"
import { ArrowRightCircle } from "react-bootstrap-icons"
import headerimg from "../assets/img/headerimg.jpg"

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = [ "Cyber Security Managment", "Web Development", "Ethical Hacking"];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100)
    const period = 2000;


    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);
    
        return () => {clearInterval(ticker)};

    
    }, [text, delta])

    const tick = () => {
     let i =loopNum % toRotate.length;
     let fulltext = toRotate[i];
     let updatedText = isDeleting ? fulltext.substring(0, text.length - 1) : fulltext.substring(0, text.length + 1);

     setText(updatedText);

     if (isDeleting) {
        setDelta(prevDelta => prevDelta /2);
     }
     if (!isDeleting && updatedText === fulltext) {
        setIsDeleting(true);
        setDelta(period);
        }else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
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
                        <button onClick={() => console.log("connect")}>Let's Connect! <ArrowRightCircle size={25}/> </button>
                   </Col> 
                   <Col xs={12} md={6} xl={5}>
                        <img src={headerimg} alt="Header Img" />
                  </Col>
                </Row>
            </Container>
        </section>

    )
}