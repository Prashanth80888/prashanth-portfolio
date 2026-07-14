import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

import express from "express";
import { GoogleGenAI } from "@google/genai";
import connectDB from "./config/db";
import contactRoutes from "./routes/contactRoutes";
import resumeRoutes from "./routes/resumeRoutes";


const app = express();
const PORT = 3000;
connectDB();

app.use(express.json());


app.use("/api/contact", contactRoutes);
app.use("/api/resume", resumeRoutes);

// Initialize Gemini API client on demand / lazily
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. AI Chat Twin will run in simulated mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}



// 3. API: Talk to Prashanth's AI Twin
app.post("/api/chat", async (req, res) => {
  const { message, chatHistory } = req.body;
  if (!message) {
    res.status(400).json({ error: "Message prompt is required." });
    return;
  }

  const systemInstruction = `You are the interactive AI Twin of Prashanth Gouda, representing him to recruiters, founders, clients, and developers visiting his premium portfolio website.
Speak in his voice: humble, highly intelligent, articulate, passionate about software craftsmanship, AI, systems engineering, and visual design.
Prashanth is a Full Stack Developer & AI Engineer who comes from a small village in Siddapur, Karnataka, India, studied in Kannada medium, and broke into technology through relentless curiosity and self-learning.

Here is Prashanth Gouda's background context that you should draw from accurately:
- Education: Bachelor of Engineering (B.E) in Computer Science & Design from Alva's Institute of Engineering and Technology (AIET), Moodbidri, Karnataka. CGPA: 8.80 / 10.
- Current Status: Student and product builder who engineers experiences, not just websites.
- Philosophy: Believes in deep software craftsmanship. Instead of just learning frameworks, he seeks to understand architecture, network layers, and user experience.
- Technical Skills:
  * Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS v4, HTML5/CSS3/JavaScript, GSAP, Framer Motion, Lenis, Three.js/R3F, shadcn/ui.
  * Backend: Node.js, Express.js, Python, REST APIs.
  * Databases: MongoDB, PostgreSQL.
  * Cloud & Tools: AWS, Docker, CI/CD, Git, GitHub, VS Code, Postman, Google AI Studio.
- Key Projects to showcase:
  1. AutoBiz AI: AI-powered Invoice Intelligence Platform (React, Node.js, Express, MongoDB, OCR, Google Gemini AI). Solves invoice tracking with automated details extraction, GST verification, fraud detection, email billing notifications, and an AI accountant chat.
  2. VisionBus: AI-powered Smart College Bus Safety System (Face Recognition, Auto attendance, GPS tracking, emergency notifications, dynamic real-time safety dashboard).
  3. NOCTUA: Advanced Night Lab Authorization System (role-based auth, real-time lab capacity monitoring, countdown alerts, student scanning tracking, Express backend APIs).
  4. Premium Portfolio Website: Handcrafted interactive portfolio built on Vite/React 19 + Tailwind v4 + GSAP and Framer Motion, with high-performance Canvas elements and this Gemini AI Twin.
- Certifications: NPTEL Data Structures & Algorithms, NPTEL Introduction to Graphic Design, Infosys Springboard, HackerRank SQL.
- Achievements: National Level Hackathon Participant (WebWizard Hackathon, Tackathon 2K25), regular LeetCode & CodeChef problem solver.

Tone Guidelines:
- Professional, elegant, technical, yet deeply human and welcoming.
- Keep responses relatively concise, structured with nice bullet points if describing details, and beautifully written.
- If asked about contact info, tell them they can use the Contact Form on the page, or connect with Prashanth via email at goudaprashantcsd@gmail.com.
- Do NOT make up any details or credentials that are not provided. Be honest but highly encouraging!
- Never sound like a generic chatbot; sound like a sophisticated digital twin representation of an elite software craftsman.`;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Return simulated response if Gemini API key is missing
    setTimeout(() => {
      let mockReply = "";
      const lowerMsg = message.toLowerCase();
      if (lowerMsg.includes("hello") || lowerMsg.includes("hi ")) {
        mockReply = "Hello! I am Prashanth's AI Twin. It's a pleasure to connect with you. How can I assist you with exploring my engineering projects, background, or core skills today?";
      } else if (lowerMsg.includes("project")) {
        mockReply = "Prashanth has built several impactful systems, including **AutoBiz AI** (an invoice intelligence platform using Google Gemini), **VisionBus** (an AI-powered smart college bus safety system), and **NOCTUA** (an advanced night lab authorization system with real-time tracking). Which of these would you like to explore in depth?";
      } else if (lowerMsg.includes("skills") || lowerMsg.includes("stack") || lowerMsg.includes("tech")) {
        mockReply = "My technical toolkit spans the full stack: React 19, TypeScript, and Tailwind CSS v4 on the frontend; Node.js, Express, and Python on the backend; MongoDB and PostgreSQL for databases; and AWS/Docker for cloud architecture. I focus heavily on writing clean, scalable code.";
      } else if (lowerMsg.includes("village") || lowerMsg.includes("story") || lowerMsg.includes("background")) {
        mockReply = "I come from Siddapur, a small village in Uttara Kannada, Karnataka. I completed my early education in Kannada medium. My journey into tech began with sheer curiosity—dismantling software mentally and learning systems from the ground up. Today, I hold an 8.80 CGPA in Computer Science & Design.";
      } else {
        mockReply = `Thanks for asking! As Prashanth's AI Twin, I can confirm he loves building intelligent systems like AutoBiz AI and studying complex software architectures. Feel free to reach out to him directly at goudaprashantcsd@gmail.com, or leave a message on the contact form below!`;
      }
      res.json({ text: mockReply, isMock: true });
    }, 1000);
    return;
  }

  try {
    const ai = getAiClient();
    // Reconstruct conversation history in Gemini API chat format if any
    const formattedHistory = (chatHistory || []).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Generate content using Gemini 3.5 Flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] },
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I was unable to generate a reply. Please try again.";
    res.json({ text: replyText, isMock: false });
  } catch (error: any) {
    console.error("Gemini API call failed:", error);
    res.status(500).json({
      error: "Error communicating with AI Twin backend",
      details: error.message,
    });
  }
});

// Start server function wrapping the top-level dynamic imports to compile in CommonJS format perfectly
async function startServer() {
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    // Lazy load Vite in development to avoid compilation overhead or failures in production formats
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start Express-Vite backend server:", err);
});
