const nodemailer = require("nodemailer");
require("dotenv").config();

// ✅ Configure Nodemailer Transporter with MailerSend
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.MAILERSEND_USER,
    pass: process.env.MAILERSEND_PASS,
  },
});

// ✅ Send Email Function
const sendEmail = async ({ name, email, message }) => {
  const mailOptions = {
    from: "MediPredict Contact <contact@sandbox_mailersend_domain.com>", // Use MailerSend sandbox domain
    to: "hammadalimughal08@gmail.com", // Your email address to receive messages
    subject: `New Contact Form Message from ${name} - MediPredict`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #999; font-size: 12px; text-align: center;">MediPredict Contact Form</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, message: "Failed to send email." };
  }
};

module.exports = sendEmail;
