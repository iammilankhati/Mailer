const express = require("express");
const bodyParser = require("body-parser");
const { sendWelcomeEmail } = require("./controllers/emailController");
const path = require("path");
const app = express();
const serverless = require("serverless-http");
const router = express.Router();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Welcome route
router.get("/welcome", (req, res) => {
  res.send("Welcome to the email sending service!");
});
// Route to send welcome email
router.post("/", sendWelcomeEmail);

app.use("/api", router);

// Start the server
module.exports.handler = serverless(app);
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
