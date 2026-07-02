import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import contactImg from "../assets/img/Logo.png";

export const Contact = () => {
  // Define the initial structure for the form's state
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    company: '' // Honeypot — must stay empty for real users
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.code === 200) {
        setFormDetails(formInitialDetails); // Clear the form only on success
        setStatus({ success: true, message: 'Message sent successfully!' });
      } else {
        setStatus({ success: false, message: result.message || 'Something went wrong, please try again later.' });
      }
    } catch {
      setStatus({ success: false, message: 'Network error. Please try again later.' });
    } finally {
      setButtonText("Send");
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <motion.div
              className="contact-img-wrap"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img src={contactImg} alt="Contact me" />
            </motion.div>
          </Col>
          <Col size={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="section-label">// 04 — Get in touch</span>
              <h2>Get In Touch</h2>
              <p className="contact-note">The form works — I built the backend myself. Messages land straight in my inbox.</p>
              <form onSubmit={handleSubmit}>
                {/* Honeypot field — visually hidden; real users never fill it, bots do */}
                <input
                  type="text"
                  name="company"
                  value={formDetails.company}
                  onChange={(e) => onFormUpdate('company', e.target.value)}
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-5000px' }}
                />
                <Row>
                  <Col size={12} sm={6} className="px-1">
                    <input type="text" value={formDetails.firstName} placeholder="First Name" maxLength={100} required onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                  </Col>
                  <Col size={12} sm={6} className="px-1">
                    <input type="text" value={formDetails.lastName} placeholder="Last Name" maxLength={100} onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                  </Col>
                  <Col size={12} sm={6} className="px-1">
                    <input type="email" value={formDetails.email} placeholder="Email Address" maxLength={200} required onChange={(e) => onFormUpdate('email', e.target.value)} />
                  </Col>
                  <Col size={12} sm={6} className="px-1">
                    <input type="tel" value={formDetails.phone} placeholder="Phone No." maxLength={50} onChange={(e) => onFormUpdate('phone', e.target.value)} />
                  </Col>
                  <Col size={12} className="px-1">
                    <textarea rows="6" value={formDetails.message} placeholder="Message" maxLength={5000} required onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                    <button type="submit"><span>{buttonText}</span></button>
                  </Col>
                  {
                    status.message &&
                    <Col size={12}>
                      <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                    </Col>
                  }
                </Row>
              </form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
