import nodemailer from "nodemailer";

const hasEmailConfig = () => {
  return (
    ((process.env.EMAIL_HOST && process.env.EMAIL_PORT) || process.env.EMAIL_SERVICE) &&
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASS
  );
};

export const sendEmail = async ({ to, subject, text, html }) => {
  if (!hasEmailConfig()) {
    // In dev environments without SMTP config, callers can fall back to returning tokens.
    return { ok: false, reason: "MISSING_EMAIL_CONFIG" };
  }

  const transporter = process.env.EMAIL_SERVICE
    ? nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })
    : nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: String(process.env.EMAIL_PORT) === "465",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

  const from =
    process.env.EMAIL_FROM ||
    process.env.EMAIL_USER ||
    "SkillSphere <no-reply@skillsphere.local>";

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  return { ok: true };
};

