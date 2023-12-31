// helpers mailer.js

const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const redirect_uri = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  redirect_uri
);

console.log("OAuth settings:", auth);

exports.sendVerificationEmail = (email, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "ShowMyStock email verification ",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto,Arial,sans-serif;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dw3k5fe80/image/upload/v1693390000/showmystocklogo_gqffic.svg" alt="ShowMyStock Logo" style="width:30px"><span>Action required: Activate your ShowMyStock Account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto,Arial,sans-serif"><span>Hello</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on ShowMyStock.com, to complete your registration, please confirm your account.</span></div><a href=${url} style="width:200px;padding:10 px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600;border-radius:5px;display:inline-block;text-align:center;transition:background-color .3s">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Bridging Sources, Retailers, and Customers with Real-Time Inventory Visibility.</span></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.error("Error sending email:", err);
      return err;
    }
    console.log("Email sent successfully:", res);
    return res;
  });
};

exports.sendVerificationCode = (email, code) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "ShowMyStock Reset Password",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto,Arial,sans-serif;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dw3k5fe80/image/upload/v1693390000/showmystocklogo_gqffic.svg" alt="ShowMyStock Logo" style="width:30px"><span>Password Reset Code</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto,Arial,sans-serif"><span>Hello</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You requested to reset your password, please enter the reset code as shown below.</span></div><a style="width:200px;padding:10 px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600;border-radius:5px;display:inline-block;text-align:center;transition:background-color .3s">${code}</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Bridging Sources, Retailers, and Customers with Real-Time Inventory Visibility.</span></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.error("Error sending email:", err);
      return err;
    }
    console.log("Email sent successfully:", res);
    return res;
  });
};
