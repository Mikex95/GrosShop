const nodemailer = require("nodemailer");

const verifyEmail3 = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.GMAIL_ADDRESS}>`,
    to: options.email,
    subject: options.subject,
    // text: "Testing some Mailgun awesomness!",
    html: `<div style="width:100% ; height:100 %;">
    <h1 style="font-weight:500">
    Hey,${options.name}<br>
    Welcome to GrosShop</h1>
    <h1>Thanks for Signing up on our app</h1>
    <h3>Your Code for verification is :
    ${options.code}</h3>
    </div>
    <p>If this request is not made by you kindly ignore this mail.</p>
    <p>Regards,<br><strong>GrosShop Team</strong></p>,`,
  };
  await transporter.sendMail(message, (error) => {
    if (error) console.log(error);
    else console.log(message);
  });
};

module.exports = {
  verifyEmail3: verifyEmail3,
};
