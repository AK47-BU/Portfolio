import 'dotenv/config'; // ES Module way to load dotenv
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url'; // Required to replicate __dirname

// --- Replicate __dirname for ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Server Setup ---
const app = express();
const router = express.Router(); // Define router

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist'))); // Serve React's build files
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

// --- React Catch-all ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));