const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "wizard.team620@gmail.com",
    pass: "nedsfjiyglpxowdk" // App password
  }
});

app.post("/send-summary", (req, res) => {
  const { to, subject, text, html } = req.body;

  const mailOptions = {
    from: "wizARd <wizard.team620@gmail.com>",
    to,
    subject,
    text,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
      return res.status(500).send("Email failed");
    }
    res.send("Email sent");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
