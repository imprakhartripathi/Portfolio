require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "1mb" }));

const allowedOrigins = [
  "https://imprakhartripathi.github.io",
  "https://imprakhartripathi.netlify.app",
  "https://imprakhartripathi.in",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

function sanitize(value) {
  return String(value || "").trim();
}

function validatePayload(body) {
  const payload = {
    name: sanitize(body?.name),
    email: sanitize(body?.email),
    subject: sanitize(body?.subject),
    message: sanitize(body?.message),
  };

  if (!payload.name || !payload.email || !payload.subject || !payload.message) {
    return { valid: false, message: "All fields are required." };
  }

  if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
    return { valid: false, message: "Please provide a valid email address." };
  }

  if (payload.message.length < 20) {
    return { valid: false, message: "Message must be at least 20 characters." };
  }

  return { valid: true, payload };
}

async function sendEmail(payload) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_TO || "imprakhartripathiofficial@gmail.com",
    replyTo: payload.email,
    subject: `Portfolio Contact: ${payload.subject}`,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`,
  };

  await transporter.sendMail(mailOptions);
}

async function handleContact(req, res) {
  const validation = validatePayload(req.body);

  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ message: "Email service is not configured." });
  }

  try {
    await sendEmail(validation.payload);
    return res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", handleContact);
app.post("/send-email", handleContact);

const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
