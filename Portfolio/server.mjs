import 'dotenv/config'; // ES Module way to load dotenv
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

// --- Server Setup ---
const app = express();
app.use(cors());
app.use(express.json());

// --- API Endpoint ---
// We change the route to '/api/contact'
// This matches the 'routes' in your vercel.json file.
app.post("/api/contact", (req, res) => {
 
 // --- Create Nodemailer setup *inside* the handler ---
 const contactEmail = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: process.env.EMAIL_USER,
 pass: process.env.EMAIL_PASS
 },
 });

 contactEmail.verify((error) => {
 if (error) {
   console.log("Error verifying transporter:", error);
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

// --- REMOVED React Catch-all ---
// Vercel handles this for you with the vercel.json file.

// --- REMOVED Start Server ---
// Vercel handles this automatically.

// --- ADD THIS - Export the app for Vercel ---
export default app;