const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const verifyEmail1 = async (options) => {
  const data = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
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
  await mailgun.messages().send(data, (error, body) => {
    if (error) console.log(error);
    else console.log(body);
  });
};

module.exports = {
  verifyEmail1: verifyEmail1,
};
