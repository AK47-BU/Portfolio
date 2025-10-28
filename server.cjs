// // Load environment variables (like email credentials) from a .env file
require('dotenv').config(); 
const express = require("express");
// // Import the Express.js framework
const router = express.Router(); // Create a new router object to handle routes
const cors = require("cors");
// // Import CORS middleware to allow cross-origin requests
const nodemailer = require("nodemailer");
// // Import Nodemailer to send emails
const path = require("path"); // <-- ADD THIS LINE to work with file paths

// --- Server Setup ---

// Initialize the Express application
const app = express();
// // Enable CORS middleware for all routes to allow requests from your frontend
app.use(cors());
// // Enable middleware to parse incoming JSON request bodies (e.g., from your form)
app.use(express.json());

// --- ADD THESE LINES TO SERVE YOUR REACT APP ---
// Serve the static files from the React build folder
app.use(express.static(path.join(__dirname, 'dist')));
// ------------------------------------------------

// // Mount the router on the root path. All routes defined in `router` will be prefixed with "/"
app.use("/", router);

// --- ADD THIS CATCH-ALL ROUTE ---
// For any GET request that isn't for a static file, send back index.html
// This is needed for React's client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// Start the server and listen for connections on port 5000
// Get the port from the environment variable, or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));

// --- Nodemailer Configuration ---

// Create a reusable transporter object using Gmail as the service
const contactEmail = nodemailer.createTransport({
 service: 'gmail', // Use Gmail as the email service
 auth: {  user: process.env.EMAIL_USER, // Your Gmail address (loaded from .env)    pass: process.env.EMAIL_PASS  // Your Gmail password or App Password (loaded from .env)
 },
});

// Verify the transporter configuration to check if login credentials are correct
contactEmail.verify((error) => {
 if (error) {
  console.log("Error verifying transporter:", error); // Log an error if verification fails
 } else {
  console.log("Ready to Send"); // Log success if the server is ready to send emails
 }
});

// --- API Route ---

// Define a route to handle POST requests to the "/contact" endpoint
router.post("/contact", (req, res) => {

 // Extract data from the request body sent by the contact form
 const name = req.body.firstName + " " + req.body.lastName; // Combine first and last name
 const email = req.body.email; // Get the user's email
 const message = req.body.message; // Get the user's message
 const phone = req.body.phone; // Get the user's phone number

 // Create the email message object
 const mail = {
    // Set the 'From' header. Shows the user's name, but sends *from* your EMAIL_USER address.
 from: `"${name}" <${process.env.EMAIL_USER}>`, 
 to: process.env.EMAIL_USER, // The email address that will receive the form submission
 replyTo: email, // Set the 'Reply-To' header to the user's email, so you can reply directly
 subject: "Contact Form Submission - Portfolio", // Subject line of the email
// Email body, formatted as HTML
    html: `<p>Name: ${name}</p>
<p>Email: ${email}</p>
<p>Phone: ${phone}</p>
<p>Message: ${message}</p>`,
 };

 // Use the transporter to send the email
contactEmail.sendMail(mail, (error) => {
  if (error) {
      // If an error occurs during sending
console.error("Error sending email:", error); // Log the detailed error
      // Send a 500 Internal Server Error response to the client
res.status(500).json({ status: "Error", message: "Failed to send message." });
 } else {
      // If the email sends successfully
      // Send a 200 OK response to the client
 res.json({ code: 200, status: "Message Sent" });
 }
 });
});