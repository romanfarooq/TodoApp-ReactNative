import { createTransport } from "nodemailer";

const sendMail = async (email, subject, text) => {

  const transporter = createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMPT_USER,
    to: email,
    subject,
    text,
  });

};

export default sendMail;