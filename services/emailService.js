const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();

// setup  the transporter with your SMTP server details

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// function to send email

const sendEmail = async (to, subject, templateName, data) => {
  const templatePath = path.join(
    __dirname,
    "../templates",
    `${templateName}.ejs`
  );

  ejs.renderFile(templatePath, data, (err, html) => {
    if (err) {
      console.log("Error rendering email template", err);
      return;
    }

    console.log(templatePath);
    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #007BFF;
            color: #ffffff;
            border-radius: 5px 5px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            font-size: 20px;
            color: #333333;
        }
        .content p {
            font-size: 16px;
            color: #666666;
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            background-color: #f4f4f4;
            color: #666666;
            font-size: 14px;
            border-radius: 0 0 5px 5px;
        }
        .footer p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Your Company</h1>
        </div>
        <div class="content">
            <h2>Hello, [Recipient Name]!</h2>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp5RedeRraxXQaRSzMojfftjikB_rCBqs3Rw&s" alt="" />
            <p>
                Welcome to our newsletter! We are excited to have you on board. Here is where you can introduce the purpose of the email or share any important information with your recipient.
            </p>
            <p>
                Feel free to customize this template to fit your needs. You can add images, links, and any other elements you need to make your email look great.
            </p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
            <p><a href="#" style="color: #007BFF; text-decoration: none;">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html>
`,
    };
    console.log("mailoptions", {
      sender: process.env.EMAIL,
      sender_password: process.env.PASSWORD,
      to: to,
      subject: subject,
    });
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error sending mail", err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
};

module.exports = sendEmail;
