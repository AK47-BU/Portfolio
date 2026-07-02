import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { ShieldLockFill, FiletypeJs, FiletypeJsx, FiletypePy, Globe2, Windows, Terminal, HddNetwork, PeopleFill, PuzzleFill } from "react-bootstrap-icons";

// Define the Skills component.
export const Skills = () => {
    const skills = [
        { name: "Cyber Security", icon: <ShieldLockFill /> },
        { name: "JavaScript", icon: <FiletypeJs /> },
        { name: "React", icon: <FiletypeJsx /> },
        { name: "Python", icon: <FiletypePy /> },
        { name: "Web Development", icon: <Globe2 /> },
        { name: "Windows OS", icon: <Windows /> },
        { name: "Linux / CLI", icon: <Terminal /> },
        { name: "Networking", icon: <HddNetwork /> },
        { name: "Leadership", icon: <PeopleFill /> },
        { name: "Problem Solving", icon: <PuzzleFill /> },
    ];

    return (
        <section className="skill" id="skills">
            <Container>
                <Row>
                    <Col>
                        <motion.div
                            className="skill-box"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <span className="section-label">// 02 — Expertise</span>
                            <h2>Main Skills</h2>
                            <p>The tools I reach for most. Some came from lectures; most came from projects that refused to work until 2am.</p>
                            <div className="skills-grid">
                                {skills.map((skill, i) => (
                                    <motion.div
                                        className="skill-card"
                                        key={skill.name}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                                    >
                                        <span className="skill-icon">{skill.icon}</span>
                                        <h3>{skill.name}</h3>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
