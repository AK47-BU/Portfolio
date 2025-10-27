import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/Logo.png";
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
  // Define the initial structure for the form's state
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  // State to hold the current values of the form fields
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  // State to manage the text displayed on the submit button (e.g., 'Send', 'Sending...
  const [buttonText, setButtonText] = useState('Send');
  // State to store the submission status (success or error) to show messages to the user
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails, // Keep all existing form data
      [category]: value // Dynamically update the specific field
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser form submission (page reload)
    setButtonText("Sending..."); // Update button text to give user feedback
    
    // Use 'fetch' to send a POST request to the backend server endpoint
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST", // Specify the request method
      headers: {
        // Indicate that the request body is JSON
        "Content-Type": "application/json;charset=utf-8",
      },
      // Convert the 'formDetails' state object into a JSON string
      body: JSON.stringify(formDetails),
    });

    setButtonText("Send"); // Reset the button text after the request is complete
    let result = await response.json(); // Parse the JSON response from the server
    setFormDetails(formInitialDetails); // Clear the form fields by resetting to initial details
    
    // Check the response code from the server
    if (result.code == 200) {
      // Set a success message
      setStatus({ succes: true, message: 'Message sent successfully' });
    } else {
      // Set an error message
      setStatus({ succes: false, message: 'Something went wrong, please try again later.' });
    }
  };
// Render the component's JSX
  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact me" />
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        {/* FIX 2: 'lastName' had a typo ('lasttName') */}
                        <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)} />
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                        <button type="submit"><span>{buttonText}</span></button>
                      </Col>
                      {
                        status.message &&
                        <Col>
                          
                          <p className={status.succes === false ? "danger" : "success"}>{status.message}</p>
                        </Col>
                      }
                    </Row>
                  </form>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}