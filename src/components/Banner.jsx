import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { ArrowRightCircle } from "react-bootstrap-icons"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import profileImg from "../assets/img/adam.jpg"

// Define the Banner component.
export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    // Phrases cycled through in the typing animation.
    const toRotate = ["Cyber Security Management", "Full-Stack Development", "Ethical Hacking"];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 2000;

    // Subtle hero-photo parallax (disabled when the user prefers reduced motion).
    const { scrollY } = useScroll();
    const reduce = useReducedMotion();
    const photoY = useTransform(scrollY, [0, 500], [0, reduce ? 0 : -40]);

    useEffect(() => {
        let ticker = setInterval(() => { tick(); }, delta);
        return () => { clearInterval(ticker) };
    }, [text, delta])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fulltext = toRotate[i];
        let updatedText = isDeleting ? fulltext.substring(0, text.length - 1) : fulltext.substring(0, text.length + 1);
        setText(updatedText);

        if (isDeleting) { setDelta(prevDelta => prevDelta / 2); }

        if (!isDeleting && updatedText === fulltext) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
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
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <h1>Hi, I&apos;m <span className="grad-text">Adam</span></h1>
                            <span className="wrap">{text}</span>
                            <p className="hero-lead">A third-year Cybersecurity Management student blending security, full-stack development, and leadership.</p>
                            <div className="hero-cta">
                                <a href="#connect" className="banner-connect-btn">
                                    Let&apos;s Connect! <ArrowRightCircle size={22} />
                                </a>
                                <a href="#projects" className="banner-ghost-btn">View my work</a>
                            </div>
                        </motion.div>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <motion.div
                            className="hero-photo"
                            style={{ y: photoY }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        >
                            <img src={profileImg} alt="Adam Kulik" />
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
