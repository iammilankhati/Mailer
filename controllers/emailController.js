const sendEmail = require("../services/emailService");

exports.sendWelcomeEmail = async (req, res) => {
  // get the email body the user
  const { email } = req.body;

  const templateName = "welcomeEmail";
  const templateData = {
    title: "Welcome title",
    baseUrl: "http://localhost:3000",
  };
  const subject = "Welcome to our service!";

  // send the welcome email
  try {
    const result = await sendEmail(email, subject, templateName, templateData);

    return res.status(200).json({ message: "Email sent!", result: result });
  } catch (error) {
    console.log("Couldn't send welcome email");
    return res.status(500).json({ message: error });
  }
};
