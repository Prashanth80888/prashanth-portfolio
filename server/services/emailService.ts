import path from "path";
import dotenv from "dotenv";
import { Resend } from "resend";

// Load .env
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

console.log("Current Directory:", process.cwd());
console.log("✅ RESEND_API_KEY:", process.env.RESEND_API_KEY);
console.log("✅ EMAIL_FROM:", process.env.EMAIL_FROM);
console.log("✅ EMAIL_TO:", process.env.EMAIL_TO);

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendContactNotification = async ({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.EMAIL_TO!,
    subject: `🚀 New Portfolio Contact - ${name}`,

    html: `
      <div style="font-family:Arial,sans-serif;padding:30px">
        <h2>📩 New Portfolio Contact</h2>
        <hr>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>

        <p><strong>Message:</strong></p>

        <div style="background:#f4f4f4;padding:15px;border-radius:8px">
          ${message}
        </div>

      </div>
    `,
  });
};

export const sendThankYouEmail = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  return await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,

    subject: "Thank you for contacting Prashanth Gouda",

    html: `
      <div style="font-family:Arial,sans-serif;padding:30px">

        <h2>Thank You, ${name} 👋</h2>

        <p>
          Thank you for reaching out through my portfolio.
        </p>

        <p>
          I have successfully received your message and will get back to you as soon as possible.
        </p>

        <br>

        <p>
          Regards,<br/>
          <strong>Prashanth Gouda</strong><br/>
          Full Stack Developer & AI Engineer
        </p>

      </div>
    `,
  });
};