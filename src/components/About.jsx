import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { MortarboardFill, TrophyFill, BriefcaseFill, Controller } from "react-bootstrap-icons";

export const About = () => {
  const facts = [
    { icon: <MortarboardFill />, label: "Education", value: "Cybersecurity Management, Bournemouth University" },
    { icon: <TrophyFill />, label: "Grade", value: "Third year — predicted a First" },
    { icon: <BriefcaseFill />, label: "Experience", value: "Multiple full-stack university projects · BAE Systems competition · Part-time Manager" },
    { icon: <Controller />, label: "Interests", value: "Gym · Golf · Gaming · Vinyl records" },
  ];

  return (
    <section className="about" id="about">
      <Container>
        <motion.div
          className="about-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="section-label">// 01 — About me</span>
          <h2>About Me</h2>
        </motion.div>
        <Row className="about-row">
          <Col md={7}>
            <motion.div
              className="about-bio"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p>I&apos;m a Cybersecurity Management student at Bournemouth University, driven to bridge the gap between technical security and operational leadership.</p>
              <p>I take a proactive approach to my development, constantly expanding my scope within the wider computing field. Beyond industry exposure such as a group competition with BAE Systems, I&apos;ve built several full-stack development projects at university, including a React and JavaScript AI chatbot and a multi-factor authentication system, putting my skills into practice.</p>
              <p>My experience also extends beyond the terminal. Working concurrently as a Part-time Manager has taught me how to lead teams and solve complex problems in high-pressure environments.</p>
              <p>Now in my third year and predicted a First, I&apos;m focused on sharpening both sides of my experience, hands-on development and technical security, through my degree and my own projects.</p>
              <div className="about-aside">
                <span className="section-label">// beyond the terminal</span>
                <p>Away from the keyboard, I&apos;m an avid gym-goer and try to get out on the golf course whenever I can. I&apos;m also a keen gamer, equally happy with an immersive story-driven game or something competitive online, and a big music fan who&apos;s slowly building up a vinyl collection.</p>
              </div>
            </motion.div>
          </Col>
          <Col md={5}>
            <motion.div
              className="about-facts"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <ul>
                {facts.map((f) => (
                  <li key={f.label}>
                    <span className="fact-icon">{f.icon}</span>
                    <div className="fact-body">
                      <span className="fact-label">{f.label}</span>
                      <span className="fact-val">{f.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
