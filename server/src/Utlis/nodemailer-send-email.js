const nodemailer = require("nodemailer");

const sendEmail3 = async (options) => {
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
    html: `<h3>${options.message}<br><br>
    or Click on this Button to rest your Password<br>
    <a href=${options.url}><button>Click Here</button></a><br><br><br>
    If you didn't forget your password, please ignore this email!</h3>`,
  };
  await transporter.sendMail(message, (error) => {
    if (error) console.log(error);
    else console.log(message);
  });
};
module.exports = {
  sendEmail3: sendEmail3,
};
