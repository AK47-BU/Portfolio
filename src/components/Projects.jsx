import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import TrackVisibility from 'react-on-screen';
import projImg1 from "../assets/img/PJimg1.jpg"
import projImg2 from "../assets/img/PJimg2.jpg"
import projImg3 from "../assets/img/Monzo.jpg"

export const Projects = () => {

  const projects = [
    {
      title: "My Portfolio",
      description: "A display of my skills of full stack web development",
      imgUrl: projImg1,
      projectUrl: "https://github.com/AK47-BU/Portfolio"
    },
    {
      title: "Socrates AI chatbot",
      description: "University group project on developing a historical figure chatbot",
      imgUrl: projImg2,
      projectUrl: "https://github.com/AK47-BU/SocraticAI"
    },
    {
      title: "Monzo-Style-MFA-Prototype",
      description: "Multi-Factor Authentication (MFA) system designed to mitigate Credential Harvesting and Brute Force attacks.",
      imgUrl: projImg3,
      projectUrl: "https://github.com/AK47-BU/Monzo-Style-MFA-Prototype"
    },
    
    
    
    /*{


      title: "",
      description: "",
      imgUrl: projImg1,
    },
    {
      title: "",
      description: "",
      imgUrl: projImg1,
    },
    {
      title: "",
      description: "",
      imgUrl: projImg1,
    },
    {
      title: "",
      description: "",
      imgUrl: projImg1,
    },*/
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>This section showcases a curated selection of projects, both completed and in progress, that demonstrate my practical application of skills I have learnt myself and at University</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                  
                  <p>Nothing here yet.....</p>
                </Tab.Pane>

                
                <Tab.Pane eventKey="third">

                  <p>Nothing here yet.....</p>
                </Tab.Pane>

              </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}