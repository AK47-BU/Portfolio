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
      description: "This site. React and Vite up front, a serverless contact API with rate limiting behind it, designed and coded by me.",
      imgUrl: projImg1,
      projectUrl: "https://github.com/AK47-BU/Portfolio",
      tags: ["React", "Vite", "Node.js"]
    },
    {
      title: "Socrates AI chatbot",
      description: "Group project: a chatbot that debates you in the style of Socrates. React front end, JavaScript throughout.",
      imgUrl: projImg2,
      projectUrl: "https://github.com/AK47-BU/SocraticAI",
      tags: ["React", "JavaScript", "AI"]
    },
    {
      title: "Monzo-Style-MFA-Prototype",
      description: "A Monzo-style MFA login flow, built to blunt credential harvesting and brute-force attacks.",
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
              <p className="project-intro">Things I&apos;ve actually built. Coursework, group projects, and the site you&apos;re reading right now.</p>
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
