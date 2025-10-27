import { Col } from "react-bootstrap";

// Define and export the ProjectCard component
// It receives title, description, and imgUrl as props
export const ProjectCard = ({ title, description, imgUrl }) => {
  return (
    // Bootstrap column for responsive layout
    <Col size={12} sm={6} md={4}>
      {/* Container for the project image and text overlay */}
      <div className="proj-imgbx">
        {/* The project image */}
        <img src={imgUrl} alt={title} />
        {/* Container for the text that appears on hover */}
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  )
}
