import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "watharkarrohit7975@gmail.com",
    pass: "heemspbglevlucwn",
  },
});

export const sendEmail = async (to, subject, text, html = null) => {
  try {
    await transporter.sendMail({
      from: '"Drivesta" <watharkarrohit7975@gmail.com>',
      to,
      subject,
      text,
      html: html || `<p>${text}</p>`,
    });
    console.log(" Message sent:", info.messageId);
  } catch (error) {
    console.error(" Email error:", error.message);
  }
};
