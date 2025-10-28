require('dotenv').config(); 
const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer"); // <-- Just import it
const path = require("path");

// --- Server Setup ---
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use("/", router);

// --- API Endpoint ---
router.post("/contact", (req, res) => {
  
  // --- Create Nodemailer setup *inside* the handler ---
  const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });

  // Verify it here
  contactEmail.verify((error) => {
    if (error) {
      console.log("Error verifying transporter:", error);
      // Don't stop, just log the error
    } else {
      console.log("Ready to Send");
    }
  });
  // ---------------------------------------------------

  // Extract form data
  const name = req.body.firstName + " " + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;

  const mail = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };

  // Send the email
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ status: "Error", message: "Failed to send message." });
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});

// --- React Catch-all ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- Start Server ---
// This part is correct and MUST be at the end
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));