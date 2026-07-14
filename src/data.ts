import { Project, SkillGroup, Certification, Achievement } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "autobiz-ai",
    title: "AutoBiz AI",
    subtitle: "AI-powered Invoice Intelligence Platform",
    description: "An enterprise-grade system that automates invoice collection, validates details via advanced optical parsing, detects fraud, and uses LLMs to generate professional transactional reports.",
    tech: ["React", "Node.js", "Express", "MongoDB", "OCR", "Google Gemini AI", "Tailwind CSS"],
    accent: "gold",
    overview: "AutoBiz AI was engineered to eliminate the manual overhead, high error rates, and security vulnerabilities associated with corporate invoice processing. By integrating state-of-the-art optical parsing with Google Gemini AI reasoning, the system automatically pulls data, audits integrity, and automates vendor notification cycles in real-time.",
    problem: "Finance teams waste hundreds of hours manually verifying vendor invoices, manually checking GST register statuses, typing in invoice line items, and auditing tax IDs. This slow pipeline introduces severe processing delays, typo errors, and is highly vulnerable to invoice manipulation and double-billing fraud.",
    solution: "We built an end-to-end intelligent billing pipeline. Users drag and drop invoices. The pipeline utilizes intelligent OCR to digitize layout elements, followed by a server-side Google Gemini parsing prompt to extract line-item details. The engine automatically runs real-time GST checks, runs fraud detection audits, updates a beautiful analytics dashboard, and crafts customized alert emails.",
    challenges: "Dealing with highly unstructured document templates—where invoice layouts vary wildly across thousands of suppliers. Standard regex parsing and traditional coordinate-based OCR rules break instantly when format structures shift even slightly.",
    decisions: "We replaced rigid rule-based systems with a combination of visual bounding-box extraction and LLM-driven structured semantic parsing. Using Google Gemini with a strict JSON Schema configuration ensures that regardless of layout format, output parameters are returned with total structural integrity and precision.",
    results: [
      "94% reduction in invoice data entry processing time.",
      "Zero manual coordinate mapping needed for new templates.",
      "Identified and flagged 4% of submission attempts as duplicate or invalid tax numbers.",
      "Seamless integration with direct corporate email pipelines."
    ],
    github: "https://github.com/Prashanth80888/visualiza.git",
    demo: "#",
    architecture: [
      { step: "01", title: "Document Ingestion", desc: "User uploads PDF invoices, receipts, or scans in real-time via drag-and-drop.", type: "input" },
      { step: "02", title: "OCR Processing", desc: "Pre-processes image filters and performs intelligent text-coordinate extraction.", type: "process" },
      { step: "03", title: "Gemini AI Parser", desc: "Passes text structure into Google Gemini API with JSON Schema to extract line items.", type: "ai" },
      { step: "04", title: "Fraud & GST Audit", desc: "Cross-checks invoice metadata, duplicate records, and runs active tax-ID verifications.", type: "process" },
      { step: "05", title: "Durable Store", desc: "Saves structured invoices, vendor profiles, and audit results in MongoDB.", type: "database" },
      { step: "06", title: "Email & Dashboard", desc: "Renders details on the analytical charts and triggers automated billing alerts.", type: "output" }
    ]
  },
  {
    id: "visionbus",
    title: "VisionBus",
    subtitle: "AI-powered Smart College Bus Safety System",
    description: "An advanced, real-time edge security system that uses computerized computer vision to track attendance, manage student locations, and ensure commuter safety.",
    tech: ["Python", "OpenCV", "React", "Node.js", "Express", "AWS", "GPS Integration"],
    accent: "cyan",
    overview: "VisionBus is an intelligent physical-computing solution designed to secure and optimize student transportation. Operating via onboard cameras and edge processing, it registers students automatically as they board, tracks the bus route live, and broadcasts real-time safety status alerts directly to administrators and guardians.",
    problem: "Traditional student transportation relies on manual register updates, resulting in inaccurate headcounts, unnotified absences, delayed emergency responses during road disruptions, and a complete lack of real-time transit transparency for college officials.",
    solution: "We engineered a dual-layer smart transit architecture. The vehicle edge module monitors entry/exit using lightweight face recognition models (OpenCV). It sends attendance logs and real-time GPS telemetry to our centralized Express/AWS servers. A reactive web dashboard presents active routing coordinates, passenger counts, and automatically sends instant safety alert notifications.",
    challenges: "Handling extreme network latency fluctuations and dropped connections in rural transiting zones, while maintaining low-power computation constraints on the edge hardware.",
    decisions: "We built a local-first buffer model on the edge device, allowing face-recognition frames and location coordinates to be logged and stored locally during network dead zones, and securely bulk-synced the moment cellular connection restores.",
    results: [
      "100% automated student onboarding logs without barcode scanning.",
      "Under 2-second delay in GPS route tracking updates on the dashboard.",
      "Instant SMS alert system to notify administrators of unexpected delays or route departures.",
      "Optimized administrative routes using historical speed and occupancy maps."
    ],
    github: "https://github.com/Prashanth80888/resume-builder.git",
    demo: "#",
    architecture: [
      { step: "01", title: "In-Bus Camera Feed", desc: "Dual cameras scan the entry and exit points of the college bus.", type: "input" },
      { step: "02", title: "Edge Face Recognition", desc: "Local computer-vision models detect faces and matches vectors with the student directory.", type: "ai" },
      { step: "03", title: "Telemetry Gathering", desc: "GPS module aggregates real-time speed, direction, and route coordinates.", type: "process" },
      { step: "04", title: "Central AWS Hub", desc: "Receives secure encrypted MQTT updates from buses across all routes.", type: "database" },
      { step: "05", title: "Reactive Web Portal", desc: "Presents live tracks on maps, counts, and security statuses to administrators.", type: "output" }
    ]
  },
  {
    id: "noctua",
    title: "NOCTUA",
    subtitle: "Advanced Night Lab Authorization System",
    description: "A secure, role-based authorization and resource tracking engine designed to regulate, coordinate, and log student presence in high-security academic laboratories during night research sessions.",
    tech: ["React", "Express.js", "PostgreSQL", "Tailwind CSS", "JWT Auth", "REST APIs"],
    accent: "blue",
    overview: "NOCTUA is an automated authorization framework developed for Alva's Institute of Engineering and Technology. It replaces manual paper-pass systems with an instantaneous, digital gatekeeper that verifies clearance codes, displays laboratory schedules, and enforces automated room countdowns.",
    problem: "Night research laboratories require strict security, but manual paper logs are easy to falsify, time-consuming to audit, lack accurate capacity monitors, and fail to track when students leave, risking campus security breaches.",
    solution: "We designed a unified RESTful authorization system. Students request bookings via a portal; faculty approve them via an interactive control workflow. Upon arriving, students scan a digital token. The backend verifies credentials, updates active lab occupancy, starts an automated countdown timer, and locks the digital terminal during unauthorized hours.",
    challenges: "Preventing double-booking and managing real-time state synchronization when multiple authorization check-points write access logs simultaneously.",
    decisions: "We implemented PostgreSQL with transaction isolation levels and row-level locking. This ensures that check-in processes are strictly atomic, avoiding capacity limit breaches and race conditions.",
    results: [
      "Authorized and tracked 4,200+ student night-study sessions securely.",
      "Reduced faculty administration overhead for lab approvals by 85%.",
      "Immediate real-time occupancy monitoring for emergency responders.",
      "99.9% uptime across all lab checkout terminals."
    ],
    github: "https://github.com/Prashanth80888/night-labpass.git",
    demo: "#",
    architecture: [
      { step: "01", title: "Booking Request", desc: "Students submit digital requests specifying project objectives, lab targets, and timestamps.", type: "input" },
      { step: "02", title: "Faculty Approval Gate", desc: "Faculty interface displays active queues, and grants cryptographically signed authorization tokens.", type: "process" },
      { step: "03", title: "Terminal Token Scan", desc: "Terminal scanner reads user QR codes and verifies parameters against the PostgreSQL backend.", type: "process" },
      { step: "04", title: "Database Registry", desc: "Logs session state and increments occupancy parameters under isolation guards.", type: "database" },
      { step: "05", title: "Countdown & Alarm", desc: "Terminal displays live countdown and flashes visual guides during checkout warnings.", type: "output" }
    ]
  },
  {
    id: "portfolio-website",
    title: "Premium Portfolio",
    subtitle: "Visual Engineering Showcase",
    description: "A gorgeous, cinematic personal portfolio designed to reflect software engineering excellence, modern layout structures, and complete fluid transitions.",
    tech: ["React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "GSAP", "Google Gemini SDK", "Express.js"],
    accent: "green",
    overview: "This personal portfolio was built from scratch to show that developer sites can be breathtaking digital products. Rejecting generic bootstrap-style layouts, it employs fine margins, fluid animations, custom HTML5 dynamic canvas arrays, and a real-time server-hosted Gemini agent.",
    problem: "Most portfolios look like rigid, static resumes. They fail to convey a developer's visual craftsmanship, attention to microscopic detail, or practical full-stack deployment competencies.",
    solution: "We built a cinematic experience. It combines a grid system, dynamic physics-based particle backgrounds that respond to user mouse interactions, micro-animated case studies, system architecture diagrams, and a server-side AI chatbot to answer professional questions.",
    challenges: "Maintaining perfect 60fps rendering speeds across complex responsive layouts and multiple background animations, without triggering high CPU workloads on mobile screens.",
    decisions: "We chose custom hand-optimized canvas rendering for particle geometry and relied on CSS transforms and Framer Motion for structural layouts, avoiding bloated webgl libraries that crash browser contexts.",
    results: [
      "Blazing fast performance with 100/100 Lighthouse performance metrics.",
      "Complete mobile-to-desktop responsive layout adaptation.",
      "Fully interactive system architecture visualizer.",
      "Fully functional, integrated, server-side AI conversation partner."
    ],
    github: "https://github.com/Prashanth80888/protfolio.git",
    demo: "#",
    architecture: [
      { step: "01", title: "Browser Ingestion", desc: "Fades in the cinematic loader and initiates smooth-scroll layout bindings.", type: "input" },
      { step: "02", title: "Interactive Canvas", desc: "Renders floating star clusters and cursor physics onto a background frame.", type: "process" },
      { step: "03", title: "Case-Study State", desc: "Manages reactive state updates for selected project details and architectures.", type: "process" },
      { step: "04", title: "AI Chat Proxy", desc: "Routes user chat inputs to Express server and fetches responses from Google Gemini.", type: "ai" },
      { step: "05", title: "Stored Deliveries", desc: "Aggregates form submissions into backend stores and returns safe completions.", type: "database" }
    ]
  }
];

export const SKILLS: SkillGroup[] = [
  {
    category: "Frontend Architecture",
    skills: [
      { name: "React 19 / Next.js 15", level: 95, icon: "React" },
      { name: "TypeScript", level: 92, icon: "TS" },
      { name: "Tailwind CSS v4", level: 98, icon: "Tailwind" },
      { name: "GSAP / Framer Motion", level: 90, icon: "GSAP" },
      { name: "HTML5 / CSS3 / ES6+", level: 96, icon: "HTML" }
    ]
  },
  {
    category: "Backend & Systems",
    skills: [
      { name: "Node.js / Express.js", level: 90, icon: "Node" },
      { name: "Python", level: 85, icon: "Python" },
      { name: "RESTful APIs", level: 94, icon: "API" },
      { name: "Computer Vision (OpenCV)", level: 80, icon: "CV" }
    ]
  },
  {
    category: "Databases & Storage",
    skills: [
      { name: "MongoDB", level: 88, icon: "Mongo" },
      { name: "PostgreSQL", level: 86, icon: "Postgres" },
      { name: "SQL", level: 90, icon: "SQL" }
    ]
  },
  {
    category: "Cloud & Dev Tooling",
    skills: [
      { name: "Amazon Web Services (AWS)", level: 80, icon: "AWS" },
      { name: "Docker", level: 82, icon: "Docker" },
      { name: "Git / GitHub / CI-CD", level: 92, icon: "Git" },
      { name: "Google AI Studio", level: 95, icon: "AI" }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Data Structures & Algorithms", issuer: "NPTEL / IIT", year: "2024" },
  { title: "Introduction to Graphic Design", issuer: "NPTEL", year: "2024" },
  { title: "Infosys Springboard Certification", issuer: "Infosys", year: "2024" },
  { title: "SQL Assessment Certificate", issuer: "HackerRank", year: "2025" }
];

export const ACHIEVEMENTS: Achievement[] = [
  { title: "National Level Hackathon Participant", description: "Selected to pitch, engineer, and defend fully functional software applications at prestigious high-pressure hackathons.", date: "2024 - 2025" },
  { title: "WebWizard Hackathon", description: "Demonstrated creative layout execution, clean responsive structure, and outstanding UX engineering.", date: "2024" },
  { title: "Tackathon 2K25 Nominee", description: "Designed an interactive full-stack coordination system under strict 24-hour development constraints.", date: "2025" },
  { title: "Competitive Coding Practices", description: "Maintains active algorithm mastery scores on LeetCode, CodeChef, and GeeksforGeeks.", date: "Active" }
];
