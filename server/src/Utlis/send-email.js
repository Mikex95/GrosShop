// const { google } = require("googleapis");
// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
// dotenv.config();

// const GMAIL_ADRESS = process.env.GMAIL_ADRESS;
// const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
// const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
// const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
// const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

// //1- Generate Gmail OAuth2 credentials.
// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// const sendEmail = async () => {
//   // 2- Create a transporter + Get the  Access Token.
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: GMAIL_ADRESS,
//       clientId: CLIENT_ID,
//       clientSecret: CLIENT_SECRET,
//       refreshToken: REFRESH_TOKEN,
//       accessToken: accessToken,
//     },
//   });

//   // 2) Define the email options
//   const mailOptions = {
//     from: `GrosShopApp Team <${GMAIL_ADRESS}>`,
//     to,
//     subject,
//     text,
//     html: html ? html : text.replaceAll("\n", "<br/>"),
//   };

//   // 3) Actually send the email
//   await transporter.sendMail(mailOptions, (err, info) => {
//     if (err) console.log(colors.bgRed(err));
//     else console.log(colors.bgGreen("Email sucessfully sent", info));
//   });
// };

// module.exports = sendEmail;
const sgMail = require("@sendgrid/mail");

const sendEmail = async (options) => {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `<a href=${options.url}><button>Click Here</button></a>`,
  };
  await sgMail.send(message);
};
module.exports = sendEmail;
