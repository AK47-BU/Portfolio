// Load environment variables (like email credentials) from a .env file
require('dotenv').config(); 
const express = require("express");
const router = express.Router(); // Create a new router object to handle routes
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path"); // <-- Required to serve static files

// --- Server Setup ---

// Initialize the Express application
const app = express();
app.use(cors());
app.use(express.json());

// --- Serve React App (FIX #2) ---
// Serve the static files (index.html, css, js) from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// --- API Route ---
// Mount the router on the root path
app.use("/", router);

// --- Nodemailer Configuration ---

const contactEmail = nodemailer.createTransport({
 service: 'gmail',
 auth: {
  user: process.env.EMAIL_USER, // Your Gmail address 
  pass: process.env.EMAIL_PASS  // Your Gmail App Password
 },
});

contactEmail.verify((error) => {
 if (error) {
  console.log("Error verifying transporter:", error);
 } else {
  console.log("Ready to Send");
 }
});

// --- API Endpoint ---

router.post("/contact", (req, res) => {
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

 contactEmail.sendMail(mail, (error) => {
  if (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ status: "Error", message: "Failed to send message." });
  } else {
    res.json({ code: 200, status: "Message Sent" });
  }
 });
});

// --- React Catch-all (FIX #2) ---
// For any other GET request, send back the React app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- Start Server (FIX #1) ---
// Get the port from the environment variable, or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));