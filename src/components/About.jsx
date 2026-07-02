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
              <p>I&apos;m in my third year studying Cybersecurity Management at Bournemouth University, currently predicted a First. The course covers both the technical side of security and how it gets run in practice, and I&apos;ve ended up caring about both.</p>
              <p>Most of what I know about software came from building it. At uni I&apos;ve made a chatbot that debates you in the style of Socrates, an MFA prototype based on Monzo&apos;s login flow, and this site, all in React and JavaScript. A group competition with BAE Systems gave me my first proper look at how the industry works.</p>
              <p>Alongside uni I work as a part-time manager. It mostly means solving problems that won&apos;t wait, and it has taught me more about leading people than any module could.</p>
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
