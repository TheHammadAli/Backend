const nodemailer = require("nodemailer");
const Subscriber = require("../models/Subscriber");

const sendNewsletter = async (subject, htmlContent) => {
  const subscribers = await Subscriber.find();
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.MAILERSEND_USER,
      pass: process.env.MAILERSEND_PASS,
    },
  });

  for (let sub of subscribers) {
    try {
      await transporter.sendMail({
        from: "MediPredict Newsletter <newsletter@sandbox_mailersend_domain.com>", // Use MailerSend sandbox domain
        to: sub.email,
        subject,
        html: htmlContent,
      });
    } catch (error) {
      console.error(`❌ Failed to send newsletter to ${sub.email}:`, error);
      // Continue with other subscribers even if one fails
    }
  }

  console.log("✅ Newsletter sent to", subscribers.length, "subscribers.");
};

module.exports = sendNewsletter;
