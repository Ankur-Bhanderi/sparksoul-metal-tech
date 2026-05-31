const nodemailer = require("nodemailer");

async function main() {
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,
    auth: {
      user: "resend",
      pass: "re_3sx1S5p4_Laq57yaMLscwVKURhgNP2ZKD",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: 'onboarding@resend.dev', // Resend testing default
      to: 'makwanaharpal806@gmail.com', // Trying to send to unverified address
      subject: 'Resend Configuration Test',
      text: 'Testing Resend SMTP.'
    });
    console.log("SUCCESS:", info.messageId);
  } catch (error) {
    console.error("ERROR:");
    console.error(error.message);
  }
}

main();
