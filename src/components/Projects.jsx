import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/PJimg1.jpg"
import projImg2 from "../assets/img/PJimg2.jpg"
import projImg3 from "../assets/img/Monzo.jpg"

export const Projects = () => {

  const projects = [
    {
      title: "My Portfolio",
      description: "A display of my skills of full stack web development",
      imgUrl: projImg1,
      projectUrl: "https://github.com/AK47-BU/Portfolio",
      tags: ["React", "Vite", "Node.js"]
    },
    {
      title: "Socrates AI chatbot",
      description: "University group project on developing a historical figure chatbot",
      imgUrl: projImg2,
      projectUrl: "https://github.com/AK47-BU/SocraticAI",
      tags: ["React", "JavaScript", "AI"]
    },
    {
      title: "Monzo-Style-MFA-Prototype",
      description: "Multi-Factor Authentication (MFA) system designed to mitigate Credential Harvesting and Brute Force attacks.",
      imgUrl: projImg3,
      projectUrl: "https://github.com/AK47-BU/Monzo-Style-MFA-Prototype",
      tags: ["React", "JavaScript", "Security"]
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <motion.div
              className="project-head"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="section-label">// 03 — Selected work</span>
              <h2>Projects</h2>
              <p className="project-intro">This section showcases a curated selection of projects, both completed and in progress, that demonstrate my practical application of skills I have learnt myself and at University</p>
            </motion.div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <ProjectCard key={index} index={index} {...project} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
