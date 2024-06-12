const express = require("express");
const bodyParser = require("body-parser");
const sendEmail = require("./services/emailService");
const ejs = require("ejs");
const { sendWelcomeEmail } = require("./controllers/emailController");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the email sending service!");
});

// Route to send welcome email
app.post("/send-email", sendWelcomeEmail);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
