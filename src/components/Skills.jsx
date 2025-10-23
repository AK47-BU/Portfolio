
import { Container, Row, Col} from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Define the Skills component.
export const Skills = () => {

    // Configuration for the responsive behavior of the carousel.
    const responsive = {
        superLargeDesktop: {
          
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      return(
        <section className="skill" id="Skills">
            <Container>
                <Row>
                    <Col>
                        <div className="skill-box">
                            <h2>Main Skills</h2>
                            <p>I bring a diverse range of technical and professional skills to every project. Below are some of the core competencies I leverage to build, secure, and manage modern applications, and I am continually focused on developing these skills even further.</p>
                            <Carousel responsive={responsive} infinite={true} className="skills-slide">
                            <div className="skillitem">
                                
                                <h3>Cyber Security</h3>
                            </div>
                            <div className="skillitem">
                                
                                <h3>Python</h3>
                            </div>
                            <div className="skillitem">
                                
                                <h3>Leadership</h3>
                            </div>
                            <div className="skillitem">
                                
                                <h3>Web Development</h3>
                            </div>
                            <div className="skillitem">
                                
                                <h3>Problem solving</h3>
                            </div>
                            </Carousel>
                        </div>

                    </Col>
                </Row>
            </Container>
        </section>
      )

}