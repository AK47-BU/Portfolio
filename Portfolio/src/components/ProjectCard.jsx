import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, projectUrl }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} alt={title} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
          
          
          <div style={{ marginTop: "15px" }}>
            <a 
              href={projectUrl} 
              target="_blank" 
              rel="noreferrer" 
              style={{ color: '#fff', textDecoration: 'none', border: '1px solid #fff', padding: '8px 16px', borderRadius: '5px' }}
            >
              View on GitHub
            </a>
          </div>
          

        </div>
      </div>
    </Col>
  )
}
