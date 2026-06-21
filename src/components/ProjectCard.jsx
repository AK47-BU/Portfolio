import { motion } from "framer-motion";
import { Github, ArrowRight } from "react-bootstrap-icons";

export const ProjectCard = ({ title, description, imgUrl, projectUrl, tags = [], index = 0 }) => {
  return (
    <motion.div
      className="proj-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
    >
      <div className="proj-card-imgbx">
        <img src={imgUrl} alt={title} />
      </div>
      <div className="proj-card-body">
        <h4>{title}</h4>
        <span>{description}</span>
        {tags.length > 0 && (
          <div className="proj-tags">
            {tags.map((tag) => (
              <span className="proj-tag" key={tag}>{tag}</span>
            ))}
          </div>
        )}
        <a className="proj-card-link" href={projectUrl} target="_blank" rel="noreferrer">
          <Github /> View on GitHub <ArrowRight />
        </a>
      </div>
    </motion.div>
  )
}
