import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@react-pdf-viewer/core/lib/styles/index.css";
import {
  ArrowLeft, Linkedin, Github, Download, Mail, Phone, Search, X, ExternalLink
} from "lucide-react";
import "./App.css";
import { FaWhatsapp } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FaMedium } from "react-icons/fa";
import Footer from "./components/Footer";
import Stats from "./components/Stats";

const PLACEHOLDER_VIDEO = "/petimony.mp4";
const IEEE_PUBLICATION_URL = "https://ieeexplore.ieee.org/document/10986878";
const DESIGNS_INTRO =
  "I enjoy designing as a way to slow down and think carefully about how people will use something. Logos, posters, and app prototypes give me a quiet space to practice clarity of form, while still feeding my interest in building systems and products.";

// ─── Search Bar ───────────────────────────────────────────────────────────────
const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="w-full max-w-2xl mx-auto mb-8 px-4">
    <div className="relative group">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/20 to-violet-500/20 blur-sm group-focus-within:blur-md transition-all duration-300" />
      <input
        type="text"
        placeholder="Search projects by title, tech, or tag…"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="relative w-full bg-slate-900/80 text-slate-200 px-5 py-3 rounded-2xl border border-slate-700 focus:outline-none focus:border-sky-500/60 pl-12 placeholder:text-slate-500 backdrop-blur-md transition-all duration-300 text-sm"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
      {searchQuery && (
        <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  </div>
);

// ─── Ambient background particles ────────────────────────────────────────────
function Bubbles() {
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 280 + 80,
    driftX: (Math.random() - 0.5) * 35,
    driftY: (Math.random() - 0.5) * 35,
    duration: 18 + Math.random() * 14,
    color: i % 3 === 0 ? "rgba(14,165,233,0.04)" : i % 3 === 1 ? "rgba(139,92,246,0.04)" : "rgba(30,64,100,0.05)",
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: p.color, filter: "blur(60px)" }}
          initial={{ top: p.top + "%", left: p.left + "%" }}
          animate={{
            top: [p.top + "%", p.top + p.driftY + "%", p.top + "%"],
            left: [p.left + "%", p.left + p.driftX + "%", p.left + "%"],
          }}
          transition={{ duration: p.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: "linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}

// --- Personal Data ---
const personalInfo = {
  name: "Yamuna",
  tagline1: "Backend-focused Software Engineer | Building scalable systems and developer-first products",
  tagline2: "Final-year CSE student (graduating 2027) focused on backend, cloud, and data-intensive applications using Python, JavaScript, and modern DevOps.",
  email: "yamuna.bsvy@gmail.com",
  phone: "+91-9629163099",
  whatsapp: "919629163099",
  bio: "I'm a final-year Computer Science student (graduating 2027) focused on backend and platform engineering. I like owning products end-to-end—from idea and design to deployment and iteration—with a strong foundation in DSA, system design, and DevOps. I enjoy spotting real-world gaps (finance, civic systems, data tooling) and turning them into opinionated, usable products.",
  skillGroups: [
    { title: "Programming", items: ["Java", "Python", "JavaScript", "C", "SQL"] },
    { title: "Backend & APIs", items: ["FastAPI", "Node.js", "Express.js", "REST APIs", "JWT"] },
    { title: "Databases", items: ["PostgreSQL", "MongoDB"] },
    { title: "Cloud & DevOps", items: ["AWS", "Docker", "Git", "CI/CD", "Linux"] },
    { title: "AI / ML", items: ["PyTorch", "TensorFlow", "Hugging Face", "OpenCV", "LLM"] },
    { title: "Frontend & Tools", items: ["React", "HTML", "CSS", "Tailwind CSS", "Postman", "Figma"] },
    { title: "Competitive programming / DSA", items: ["Arrays", "Strings", "Hashing", "Trees", "Graphs", "Recursion", "Dynamic Programming"] },
  ],
  languages: [
    { name: "English", level: "Very Well" },
    { name: "Tamil", level: "Very Well" },
    { name: "Hindi", level: "Basic" }
  ],
  softSkills: [
    "Communication", "Problem Solving", "Teamwork", "Time Management", "Negotiation"
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/yamuna-bsvy/",
    instagram: "https://www.instagram.com/_._yamu_._/",
    github: "https://github.com/Yamuna-b",
    telegram: "#",
    leetcode: "https://leetcode.com/u/Yamuna_bsvy/",
    medium: "https://medium.com/@yamuna_b" 
  }
};

const experience = [
  {
    logo: "/kevelllogo.jpg",
    company: "Kevell Corp",
    role: "Web Development Intern",
    duration: "Dec 2024",
    desc: "Built Petimony and ErgoCart web apps, reusable frontend components, form handling, and integrated UIs with existing APIs.",
    bullets: [
      "Implemented React screens and reusable components that reduced duplicate UI code across internal tools and web apps like Petimony and ErgoCart.",
      "Shipped and documented REST endpoints consumed by teammates during feature work.",
      "Collaborated through code review and iterative delivery to stabilize pages used by stakeholders."
    ]
  },
  {
    logo: "/Nittelogo.jpg",
    company: "IEEE AIDE 2025 — NMAM Institute of Technology",
    role: "IEEE Author",
    duration: "2025",
    desc: "Published research on carbon footprint awareness and mitigation at an international conference.",
    link: { text: "View Publication", url: IEEE_PUBLICATION_URL },
    bullets: [
      "Authored and presented sustainability research at the International Conference on AIDE 2025.",
      "Distilled methodology and findings for an academic audience and conference reviewers.",
    ],
    rightImage: "/ieee.png"
  },
  {
    logo: "/Reccsarlogo.jpg",
    company: "Reccsar Private Limited",
    role: "Cloud Computing Intern",
    duration: "June 2025",
    desc: "Cloud-hosted dashboards and apps like RailwayPorterSeva and client-support-realtime-chat for nonprofit delivery teams.",
    bullets: [
      "Developed client-support-realtime-chat and RailwayPorterSeva hosted on AWS, combining multiple data feeds into actionable views.",
      "Automated parts of deployment and repeatable environment setup using CI/CD and GitHub Actions where applicable.",
      "Partnered across roles to tighten delivery cycles for quick iterations on stakeholder feedback."
    ]
  }
];

const featuredProjects = [
  {
    title: "Money Mirror",
    tagline: "Personal finance digital twin—salary, EMIs, savings, and 3–6 month cash-flow projections with low-balance warnings.",
    stack: ["FastAPI", "PostgreSQL", "JWT", "Docker"],
    bullets: [
      "FastAPI backend with JWT-secured REST APIs for what-if finance planning.",
      "PostgreSQL schema tuned for projections; average query latency around 120 ms.",
      "Docker-packaged deploy flow for consistent local and cloud environments.",
      "Designed the system as a 'personal CFO'—focused on predictable cash-flow planning for early-career professionals, with APIs structured for future mobile app integration.",
    ],
    links: {
      github: "https://github.com/Yamuna-b/Money_Mirror",
      live: "https://drive.google.com/file/d/1H01AjMrU8kZ_mYTkO4IgUO7lQl5zsw2s/view?usp=sharing",
    },
    image: "/MoneyMirrorCover.jpg",
  },
  {
    title: "Log Beacon",
    tagline: "Log analysis backend—parse structured logs, filter by time/status, and run regex queries for faster debugging with optional OpenAI summarization.",
    stack: ["TypeScript", "Express", "PostgreSQL", "Docker", "AWS"],
    bullets: [
      "TypeScript/Express service for structured log parsing, filtering, and regex search.",
      "PostgreSQL persistence with Docker deployment on AWS; query latency under 200 ms.",
      "Features: structured log ingestion, filters (time, level, service), regex search/incident linking, optional OpenAI summarization endpoint.",
    ],
    links: {
      github: "https://github.com/Yamuna-b/LogBeacon",
      live: "https://drive.google.com/file/d/1VIW1KpCmgK-CLCpHbwdMd8BppwnZfHd-/view?usp=sharing",
    },
    image: "/LogBeaconCover.jpg",
  },
  {
    title: "MarineTaxa AI",
    tagline: "ML taxonomy platform—Streamlit dashboard and sequence/ML classifier for eDNA.",
    stack: ["Python", "Streamlit", "PyTorch", "ML Classifier"],
    bullets: [
      "Streamlit dashboard and ML classifier for classifying marine organisms.",
      "Reduced manual classification time by roughly 40% in evaluation runs.",
      "Owned the full stack from data ingestion to ML integration, mirroring ML platform patterns used in production ML teams.",
    ],
    links: {
      github: "https://github.com/Yamuna-b/MarineTaxaAi",
      live: "https://drive.google.com/file/d/1aZN2iFA1QZwSP_ftBbqv21tr_xtpykPB/view?usp=sharing",
    },
    image: "/MarineTaxaAiCover.jpg",
  },
];

const entrepreneurialInitiatives = [
  "Led backend and architecture for 3+ self-initiated products (Money Mirror, Log Beacon, MarineTaxa AI), treating them as real users' workflows rather than just academic demos.",
  "Coordinated placement batch communication as Placement Batch Head, mirroring stakeholder management in fast-paced engineering teams.",
  "Regularly pitch project ideas and technical concepts via blogs, talks, and peer mentoring.",
];

const education = [
  {
    logo: "/Vcetlogo.jpg",
    degree: "B.E | Computer Science",
    org: "Velammal College of Engineering and Technology",
    year: "2027"
  },
  {
    logo: "/Vbcalogo.jpg",
    degree: "Higher Education",
    org: "Velammal Bodhi Campus",
    year: "2017-2023"
  },
  {
    logo: "/Tvslogo.jpg",
    degree: "School",
    org: "TVS Matriculation Higher Secondary School",
    year: "2011-2017"
  }
];

const PROJECTS = {
  cloud: [
    {
      id: 1,
      title: "CI/CD with GitHub Actions",
      images: ["/cloud1.png"],
      shortDesc: "Automated pipelines for Node services",
      fullDesc: "GitHub Actions workflows for build, lint, test, and container image publish to tighten release loops.",
      tags: ["GitHub Actions", "Docker"],
      tools: ["Node.js"],
      links: { github: "https://github.com/Yamuna-b" }
    },
    {
      id: 2,
      title: "Containerized deployments",
      images: ["/cloud1.png"],
      shortDesc: "Docker-backed environments from dev to staging",
      fullDesc: "Docker Compose and Dockerfile patterns for repeatable API + database setups during development.",
      tags: ["Docker", "DevOps"],
      tools: ["Compose"],
      links: { github: "https://github.com/Yamuna-b" }
    },
    {
      id: 3,
      title: "AWS basics — EC2 & S3",
      images: ["/cloud4.png"],
      shortDesc: "Prototype hosting with object storage offloads",
      fullDesc: "Explored deploying APIs on EC2 and using S3 for static assets—keeping networking and IAM scoped to course-level projects.",
      tags: ["AWS", "EC2", "S3"],
      tools: ["AWS CLI"],
      links: { github: "https://github.com/Yamuna-b" }
    }
  ],
  fullstack: [
    {
      id: 1,
      title: "Petimony - Pet Shop Website",
      images: ["/petimony.mp4"],
      shortDesc: "Full-stack pet shop platform",
      fullDesc: "A comprehensive pet shop website with e-commerce functionality, pet adoption services, and community features.",
      tags: ["HTML", "CSS", "JavaScript"],
      tools: ["HTML", "CSS", "JavaScript"],
      links: { github: "https://github.com/Yamuna-b/Petimony" }
    },
    {
      id: 2,
      title: "Portfolio Website",
      images: ["/fullstack1.png"],
      shortDesc: "Personal portfolio site",
      fullDesc: "Built my own portfolio using React and Tailwind.",
      tags: ["React", "Tailwind"],
      tools: ["TailwindCSS"],
      links: { github: "https://github.com/Yamuna-b/Portfolio" }
    },
    {
      id: 3,
      title: "Dashboard UI",
      images: ["/fullstack2.png"],
      shortDesc: "Analytics dashboard",
      fullDesc: "Interactive dashboard with charts and data visualization.",
      tags: ["React", "Charts"],
      tools: ["Chart.js"],
      links: { github: "https://github.com/Yamuna-b/PorterSeva" }
    },
    {
      id: 4,
      title: "Landing Page",
      images: ["/fullstack3.png"],
      shortDesc: "Modern landing page",
      fullDesc: "Responsive landing page with animations.",
      tags: ["HTML", "CSS"],
      tools: ["GSAP"],
      links: { github: "https://github.com/Yamuna-b/client-support-realtime-chat" }
    },
    {
      id: 5,
      title: "Node.js API",
      images: ["/fullstack1.png"],
      shortDesc: "REST API for e-commerce",
      fullDesc: "Node.js REST API with authentication and MongoDB.",
      tags: ["Node.js", "MongoDB"],
      tools: ["Express"],
      links: { github: "#" }
    },
    {
      id: 6,
      title: "Django Blog API",
      images: ["/fullstack1.png"],
      shortDesc: "Blog backend with Django",
      fullDesc: "RESTful blog backend using Django REST Framework.",
      tags: ["Django", "REST"],
      tools: ["DRF"],
      links: { github: "#" }
    },
    {
      id: 7,
      title: "GraphQL API",
      images: ["/backend1.png"],
      shortDesc: "GraphQL server",
      fullDesc: "Built GraphQL API with Apollo Server.",
      tags: ["GraphQL", "Apollo"],
      tools: ["Node.js"],
      links: { github: "#" }
    },
    {
      id: 8,
      title: "Microservices Backend",
      images: ["/backend2.png"],
      shortDesc: "Distributed services",
      fullDesc: "Microservices architecture with message queues.",
      tags: ["Microservices", "RabbitMQ"],
      tools: ["Docker"],
      links: { github: "#" }
    },
    {
      id: 9,
      title: "Full Stack Social App",
      images: ["/fullstack1.png", "/fullstack1.png", "/fullstack1.png"],
      shortDesc: "MERN stack social media app",
      fullDesc: "A social platform built with MongoDB, Express, React, and Node.js.",
      tags: ["MERN", "Full Stack"],
      tools: ["React", "Node.js"],
      links: { github: "#" }
    },
    {
      id: 10,
      title: "E-learning Platform",
      images: ["/fullstack4.png"],
      shortDesc: "Complete LMS system",
      fullDesc: "Learning management system with video courses.",
      tags: ["MERN", "LMS"],
      tools: ["MongoDB", "React"],
      links: { github: "#" }
    },
    {
      id: 11,
      title: "Real-time Chat App",
      images: ["/fullstack5.png"],
      shortDesc: "Socket.io chat application",
      fullDesc: "Real-time messaging with Socket.io and React.",
      tags: ["Socket.io", "Real-time"],
      tools: ["React", "Node.js"],
      links: { github: "#" }
    }
  ],
  uiux: [
      {
        id: 1,
        title: "Logo Design 1",
        images: ["/ui_1.png"],
        shortDesc: "Logo and branding design",
        fullDesc: "Professional logo design with modern aesthetics.",
        tags: ["Logo", "Branding"],
        tools: ["Canva", "Adobe Illustrator"],
        links: { View: "#" }
      },
      {
        id: 2,
        title: "Logo Design 2",
        images: ["/ui_2.png"],
        shortDesc: "Logo design for brand identity",
        fullDesc: "Designed brand logos for startups and hackathons.",
        tags: ["Logo", "Branding"],
        tools: ["Canva"],
        links: { View: "#" }
      },
      {
        id: 3,
        title: "Logo Design 3",
        images: ["/ui_3.jpg", "/ui_4.jpg"],
        shortDesc: "Eco-friendly platform logo",
        fullDesc: "Logo design with sustainability focus.",
        tags: ["Logo", "Sustainability"],
        tools: ["Figma"],
        links: { behance: "#" }
      },
      {
        id: 5,
        title: "Logo Design 5",
        images: ["/ui_5.png"],
        shortDesc: "Creative logo design",
        fullDesc: "Designed brand logos for startups and hackathons.",
        tags: ["Logo", "Branding"],
        tools: ["Canva"],
        links: { View: "#" }
      },
      {
        id: 6,
        title: "Logo Design 6",
        images: ["/ui_6.png"],
        shortDesc: "Brand identity logo",
        fullDesc: "Designed brand logos for startups and hackathons.",
        tags: ["Logo", "Branding"],
        tools: ["Canva"],
        links: { View: "#" }
      },
      {
        id: 7,
        title: "Logo Design 7",
        images: ["/ui_7.png"],
        shortDesc: "Professional logo design",
        fullDesc: "Designed brand logos for startups and hackathons.",
        tags: ["Logo", "Branding"],
        tools: ["Canva"],
        links: { View: "#" }
      },
      {
        id: 8,
        title: "Poster Design 1",
        images: ["/ui_8.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster design for events and promotions.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 9,
        title: "Poster Design 2",
        images: ["/ui_9.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster design for events and promotions.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 10,
        title: "Poster Design 3",
        images: ["/ui_10.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster design for events and promotions.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 11,
        title: "Poster Design 4",
        images: ["/ui_11.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster design for events and promotions.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 12,
        title: "Poster Design 5",
        images: ["/ui_12.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster design for events and promotions.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 13,
        title: "Poster Design 6",
        images: ["/ui_13.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster design for events and promotions.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 14,
        title: "Poster Design 7",
        images: ["/ui_14.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster design for events and promotions.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 15,
        title: "Poster Design 8",
        images: ["/ui_15.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster design for events and promotions.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 16,
        title: "Poster Design 9",
        images: ["/ui_16.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster design for events and promotions.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 17,
        title: "Poster Design 10",
        images: ["/ui_17.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster design for events and promotions.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 18,
        title: "App Prototype 1",
        images: ["/ui_18.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 19,
        title: "App Prototype 2",
        images: ["/ui_19.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 20,
        title: "App Prototype 3",
        images: ["/ui_20.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 21,
        title: "App Prototype 4",
        images: ["/ui_21.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 22,
        title: "App Prototype 5",
        images: ["/ui_22.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 23,
        title: "App Prototype 6",
        images: ["/ui_23.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 24,
        title: "App Prototype 7",
        images: ["/ui_24.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 25,
        title: "App Prototype 8",
        images: ["/ui_25.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 26,
        title: "App Prototype 9",
        images: ["/ui_26.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 27,
        title: "App Prototype 10",
        images: ["/ui_27.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 28,
        title: "App Prototype Video 1",
        images: ["/ui_28.mp4"],
        shortDesc: "Mobile app prototype video",
        fullDesc: "High-fidelity prototype video demonstration.",
        tags: ["Prototype", "Mobile", "Video"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 29,
        title: "App Prototype Video 2",
        images: ["/ui_29.mp4"],
        shortDesc: "Mobile app prototype video",
        fullDesc: "High-fidelity prototype video demonstration.",
        tags: ["Prototype", "Mobile", "Video"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 30,
        title: "App Prototype Video 3",
        images: ["/ui_30.mp4"],
        shortDesc: "Mobile app prototype video",
        fullDesc: "High-fidelity prototype video demonstration.",
        tags: ["Prototype", "Mobile", "Video"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 31,
        title: "App Prototype Video 4",
        images: ["/ui_31.mp4"],
        shortDesc: "Mobile app prototype video",
        fullDesc: "High-fidelity prototype video demonstration.",
        tags: ["Prototype", "Mobile", "Video"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 32,
        title: "App Prototype Video 5",
        images: ["/ui_32.mp4"],
        shortDesc: "Mobile app prototype video",
        fullDesc: "High-fidelity prototype video demonstration.",
        tags: ["Prototype", "Mobile", "Video"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 33,
        title: "App Prototype 11",
        images: ["/ui_33.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 34,
        title: "App Prototype 12",
        images: ["/ui_34.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 35,
        title: "App Prototype 13",
        images: ["/ui_35.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 36,
        title: "App Prototype 14",
        images: ["/ui_36.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 37,
        title: "App Prototype 15",
        images: ["/ui_37.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 38,
        title: "App Prototype 16",
        images: ["/ui_38.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for mobile application.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
  ],
  ai: [
    {
      id: 1,
      title: "ExoVision",
      images: ["/ExoVision.mp4"],
      shortDesc: "Exoplanet classification from NASA Space Apps data",
      fullDesc: "Streamlit app for exoplanet classification using NASA public datasets and TensorFlow ML pipelines.",
      tags: ["AI", "Astronomy", "Deep Learning"],
      tools: ["Python", "TensorFlow", "Streamlit"],
      links: { github: "https://github.com/Yamuna-b/nasa-spaceapps-exoplanet" }
    },
    {
      id: 2,
      title: "MarineTaxa AI",
      images: ["/MarineTaxaAi.mp4"],
      shortDesc: "AI for classifying marine species",
      fullDesc: "Computer vision system that classifies marine organisms from underwater imagery using convolutional neural networks.",
      tags: ["AI", "Marine Biology", "Computer Vision"],
      tools: ["Python", "PyTorch", "OpenCV"],
      links: { github: "https://github.com/Yamuna-b/MarineTaxaAi" }
    },
    {
      id: 3,
      title: "FitFinder",
      images: [PLACEHOLDER_VIDEO],
      shortDesc: "AIML virtual try-on and wardrobe visualizer",
      fullDesc: "Virtual try-on and wardrobe visualization app built with Python and a Flask-style web stack.",
      tags: ["AI", "Computer Vision"],
      tools: ["Python", "Flask", "HTML"],
      links: { github: "https://github.com/Yamuna-b/FitFinder" }
    }
  ],
  showcase: [
    {
      id: 1,
      title: "Designthon Euphoria’24",
      images: ["/showcase1.jpg"],
      desc: "Awarded for innovative UI/UX design at Kalasalingam University."
    },
    {
      id: 2,
      title: "Project Expo Techathon'24",
      images: ["/showcase1.jpg", "/MoneyMirror.mp4"],
      desc: ""
    },
    {
      id: 3,
      title: "Robotics Workshop",
      images: ["/showcase1.jpg"],
      desc: "Hands-on training and automation at Thiagarajar College."
    },
    {
      id: 4,
      title: "Hackathon Winner",
      images: ["/showcase2.jpg"],
      desc: "First prize at Smart India Hackathon 2024."
    },
    {
      id: 5,
      title: "UI/UX Competition",
      images: ["/showcase3.jpg"],
      desc: "Best design award at regional competition."
    },
    {
      id: 6,
      title: "Tech Talk Speaker",
      images: ["/showcase4.jpg"],
      desc: "Delivered keynote on cloud architecture."
    },
    {
      id: 7,
      title: "Open Source Contribution",
      images: ["/showcase5.jpg"],
      desc: "Major contributor to popular React libraries."
    },
    {
      id: 8,
      title: "Research Publication",
      images: ["/showcase6.jpg"],
      desc: "Published paper on sustainable technology."
    }
  ]
};

const projectCatalog = {
  backend: [
    {
      id: 1,
      title: "Money Mirror",
      images: ["/MoneyMirror.mp4"],
      shortDesc: "Personal finance digital twin with cash-flow projections",
      fullDesc: "FastAPI backend for personal finance planning with JWT-secured REST APIs, PostgreSQL, and Docker.",
      tags: ["Backend", "FinTech", "FastAPI"],
      tools: ["FastAPI", "PostgreSQL", "JWT", "Docker"],
      links: {
        github: "https://github.com/Yamuna-b/Money_Mirror",
        demo: "https://drive.google.com/file/d/1H01AjMrU8kZ_mYTkO4IgUO7lQl5zsw2s/view?usp=sharing",
      },
    },
    {
      id: 2,
      title: "Namma Oor Fix",
      images: [PLACEHOLDER_VIDEO],
      shortDesc: "Civic issue reporting with status workflows",
      fullDesc: "Backend + full-stack issue lifecycle platform from report to resolution for local civic workflows.",
      tags: ["Backend", "Civic Tech"],
      tools: ["Node.js", "MongoDB", "REST APIs"],
      links: { github: "https://github.com/Yamuna-b/Namma-Oor-Fix" },
    },
    {
      id: 3,
      title: "Petimony",
      images: ["/petimony.mp4"],
      shortDesc: "Pet shop and adoption platform",
      fullDesc: "Pet shop website with adoption flows, product highlights, and responsive UI.",
      tags: ["Full Stack", "Frontend"],
      tools: ["HTML", "CSS", "JavaScript"],
      links: {
        github: "https://github.com/Yamuna-b/Petimony",
      }
    },
    {
      id: 4,
      title: "Chat Support Pro",
      images: [PLACEHOLDER_VIDEO],
      shortDesc: "Realtime helpdesk chat widget",
      fullDesc: "Real-time helpdesk chat with Node.js, Express, Socket.io, and Firebase-backed messaging.",
      tags: ["Realtime", "Backend APIs"],
      tools: ["Node.js", "Express", "Socket.io", "Firebase"],
      links: { github: "https://github.com/Yamuna-b/client-support-realtime-chat" },
    },
    {
      id: 5,
      title: "Porter Seva",
      images: [PLACEHOLDER_VIDEO],
      shortDesc: "Service booking and assignment workflows",
      fullDesc: "Booking platform modeling job lifecycle, slot handling, and user-facing status tracking.",
      tags: ["Service Platform", "CRUD Workflows"],
      tools: ["Node.js", "Express", "MongoDB"],
      links: { github: "https://github.com/Yamuna-b/PorterSeva" },
    },
  ],
  ai: [
    {
      id: 1,
      title: "MarineTaxa AI",
      images: ["/MarineTaxaAi.mp4"],
      shortDesc: "ML-powered marine taxonomy platform",
      fullDesc: "Streamlit dashboard and sequence/ML classifier for marine taxonomy classification.",
      tags: ["AI/ML", "ML Classifier"],
      tools: ["Python", "Streamlit", "PyTorch", "Scikit-Learn"],
      links: {
        github: "https://github.com/Yamuna-b/MarineTaxaAi",
        demo: "https://drive.google.com/file/d/1aZN2iFA1QZwSP_ftBbqv21tr_xtpykPB/view?usp=sharing",
      },
    },
    {
      id: 2,
      title: "ExoVision",
      images: ["/ExoVision.mp4"],
      shortDesc: "Exoplanet classification from NASA Space Apps data",
      fullDesc: "Streamlit app for exoplanet classification using NASA public datasets and TensorFlow ML pipelines.",
      tags: ["AI/ML", "Astronomy"],
      tools: ["Python", "TensorFlow", "Streamlit"],
      links: { github: "https://github.com/Yamuna-b/nasa-spaceapps-exoplanet" },
    },
    {
      id: 3,
      title: "FitFinder",
      images: [PLACEHOLDER_VIDEO],
      shortDesc: "AIML virtual try-on and wardrobe visualizer",
      fullDesc: "Virtual try-on and wardrobe visualization app built with Python and a Flask-style web stack.",
      tags: ["AI/ML", "Computer Vision"],
      tools: ["Python", "Flask", "HTML", "CSS"],
      links: { github: "https://github.com/Yamuna-b/FitFinder" },
    },
    {
      id: 4,
      title: "SRA – Self Realizing Agent",
      images: ["/SRA.mp4"],
      shortDesc: "Agentic reasoning and execution prototype",
      fullDesc: "Experimental plan-act-reflect style architecture for autonomous task execution.",
      tags: ["AI/ML", "Agents"],
      tools: ["Python"],
    },
    {
      id: 5,
      title: "Ecosaur Research",
      images: ["/ieee.png"],
      shortDesc: "Carbon footprint awareness and mitigation research",
      fullDesc: "Research published at IEEE AIDE 2025 on carbon footprint awareness and mitigation.",
      tags: ["Research", "Publication"],
      tools: ["Data Analysis", "Presentation"],
      links: { publication: IEEE_PUBLICATION_URL },
    },
  ],
  devops: [
    {
      id: 1,
      title: "Log Beacon",
      images: ["/LogBeacon.mp4"],
      shortDesc: "Log analysis backend on AWS",
      fullDesc: "TypeScript/Express log analysis service with PostgreSQL, Docker, and AWS deployment.",
      tags: ["Cloud + DevOps", "Observability", "Express"],
      tools: ["TypeScript", "Express", "PostgreSQL", "Docker", "AWS"],
      links: {
        github: "https://github.com/Yamuna-b/LogBeacon",
        demo: "https://drive.google.com/file/d/1VIW1KpCmgK-CLCpHbwdMd8BppwnZfHd-/view?usp=sharing",
      },
    },
    {
      id: 2,
      title: "CI/CD with GitHub Actions",
      images: [PLACEHOLDER_VIDEO],
      shortDesc: "Automated build and deploy workflows",
      fullDesc: "Reusable CI/CD pipelines for lint/build/test and deployment automation.",
      tags: ["CI/CD", "GitHub Actions"],
      tools: ["Docker", "GitHub Actions", "Node.js"],
      links: { github: "https://github.com/Yamuna-b" },
    },
  ],
  frontend: [
    {
      id: 1,
      title: "ErgoCart",
      images: [PLACEHOLDER_VIDEO],
      shortDesc: "Ergonomic e-commerce frontend",
      fullDesc: "Responsive ergonomic products storefront built with HTML, CSS, and JavaScript.",
      tags: ["Frontend", "UI/UX"],
      tools: ["HTML", "CSS", "JavaScript"],
      links: { github: "https://github.com/Yamuna-b/ErgoCart" },
    },
    {
      id: 2,
      title: "RepoDocs",
      images: [PLACEHOLDER_VIDEO],
      shortDesc: "Repository documentation generator",
      fullDesc: "Tooling to scaffold and maintain README and repo documentation for faster onboarding.",
      tags: ["Developer Tools", "Documentation"],
      tools: ["Python", "Markdown"],
      links: { github: "https://github.com/Yamuna-b/RepoDocs" },
    },
  ],
  highlights: [
    {
      id: 1,
      title: "Ecosaur — IEEE Publication",
      images: ["/ieee.png"],
      shortDesc: "IEEE AIDE 2025 research publication",
      fullDesc: "Published carbon footprint awareness and mitigation research at IEEE AIDE 2025.",
      tags: ["Research", "Publication"],
      tools: ["Data Analysis", "Presentation"],
      links: { publication: IEEE_PUBLICATION_URL },
    },
    {
      id: 2,
      title: "Designthon Euphoria'24",
      images: ["/showcase1.jpg"],
      shortDesc: "First prize — design competition",
      fullDesc: "Awarded first prize for innovation and presentation at Kalasalingam University.",
      tags: ["Highlight", "Award"],
      tools: ["Design Thinking", "Figma"],
    },
  ],
};

const PROJECT_DOMAIN_FILTERS = [
  { key: "placement", label: "All projects", cards: () => [
    ...projectCatalog.backend,
    ...projectCatalog.ai,
    ...projectCatalog.devops,
    ...projectCatalog.frontend,
  ]},
  { key: "backend", label: "Backend + Frontend", cards: () => projectCatalog.backend },
  { key: "ai", label: "AI / ML", cards: () => projectCatalog.ai },
  { key: "devops", label: "Cloud + DevOps", cards: () => projectCatalog.devops },
  { key: "frontend", label: "Frontend", cards: () => projectCatalog.frontend },
  { key: "designs", label: "Designs", cards: () => PROJECTS.uiux },
];

// Helper to check if the file is a video
const isVideo = file => typeof file === "string" && file.match(/\.(mp4|webm|ogg)$/i);

// ─── Navbar ───────────────────────────────────────────────────────────────────
function NavBar({ activeSection, setActiveSection, setExpandedProject, scrollHomeTo, openResumePreview }) {
  const navItems = [
    { key: "home", label: "HOME" },
    { key: "projects", label: "PROJECTS" },
    { key: "highlights", label: "HIGHLIGHTS" },
  ];

  const go = item => {
    setExpandedProject(null);
    if (item.key === "home") {
      setActiveSection("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection(item.key);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-2 sm:py-3 gap-2 sm:gap-0"
      style={{ background: "rgba(8,9,14,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(148,163,184,0.08)" }}>

      <div className="flex items-center gap-2.5 order-1">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-sky-500/30 blur-md" />
          <img src="/logo.jpg" alt="Logo" className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-sky-500/40" />
        </div>
        <span className="font-semibold text-base sm:text-lg text-slate-100 hidden sm:block tracking-tight">Yamuna</span>
      </div>

      <div className="sm:hidden flex items-center gap-2 order-2">
        <span className="font-semibold text-base text-slate-100">Yamuna</span>
      </div>

      <div className="flex-1 flex justify-center order-3 sm:order-2 mt-1 sm:mt-0">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
          {navItems.map(item => {
            const active = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => go(item)}
                className={`text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-150 ${active ? "text-sky-400" : "text-slate-200 hover:text-sky-400"}`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => scrollHomeTo("contact")}
            className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 hover:text-sky-400 transition-colors duration-150"
          >
            CONTACT
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 order-4 sm:order-3 mt-1 sm:mt-0">
        <button
          onClick={openResumePreview}
          className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all duration-200"
        >
          Preview Resume
        </button>
        <a
          href="/resume.pdf"
          download="Yamuna_Resume.pdf"
          className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all duration-200"
        >
          Download
        </a>
        <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
          <Linkedin className="w-4 h-4 text-sky-400 hover:text-sky-300 transition-colors" />
        </a>
        <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
          <Github className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
        </a>
        <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer" className="hidden lg:block">
          <SiLeetcode className="w-4 h-4 text-amber-500 hover:text-amber-400 transition-colors" />
        </a>
        <a href={personalInfo.social.medium} target="_blank" rel="noopener noreferrer" className="hidden lg:block">
          <FaMedium className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
        </a>
      </div>
    </nav>
  );
}

const BackArrow = ({ activeSection, setActiveSection, show, setExpandedProject }) =>
  show && activeSection !== "home" && (
    <button
      onClick={() => { setExpandedProject(null); setActiveSection("home"); }}
      className="fixed top-20 sm:top-24 left-4 sm:left-8 z-[120] flex items-center gap-2 px-3 py-2 rounded-full border border-slate-700 hover:border-sky-600/60 text-slate-300 hover:text-sky-300 transition-all duration-200 group"
      style={{ background: "rgba(10,12,18,0.9)", backdropFilter: "blur(12px)" }}
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
      <span className="text-xs font-semibold">Back</span>
    </button>
  );

// ─── Profile Avatar ───────────────────────────────────────────────────────────
function ProfileAvatar() {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto flex items-center justify-center select-none"
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "conic-gradient(from 0deg, #0ea5e9, #8b5cf6, #0ea5e9)", filter: "blur(16px)", opacity: 0.35 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <div
        className="absolute inset-1 rounded-full border border-sky-500/30"
        style={{ boxShadow: "0 0 40px rgba(14,165,233,0.25), inset 0 0 20px rgba(14,165,233,0.06)" }}
      />
      <motion.div
        className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-sky-500/50 z-10 shadow-2xl"
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src="/profile.jpeg" alt="Yamuna" className="w-full h-full object-cover" />
      </motion.div>
    </motion.div>
  );
}

function FeaturedThumb({ media, title }) {
  if (isVideo(media))
    return <video src={media} muted loop playsInline autoPlay className="absolute inset-0 w-full h-full object-cover" />;
  return <img src={media} alt={title || ""} className="absolute inset-0 w-full h-full object-cover" />;
}

// ─── Contact block ────────────────────────────────────────────────────────────
const ContactSection = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <Phone className="text-emerald-400/90 shrink-0 w-5 h-5" />
      <a href={`https://wa.me/${personalInfo.whatsapp}`} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 text-sm break-all transition-colors">
        <FaWhatsapp className="inline-block shrink-0" /> {personalInfo.phone}
      </a>
    </div>
    <div className="flex items-center gap-3">
      <Mail className="text-sky-400 shrink-0 w-5 h-5" />
      <a href={`mailto:${personalInfo.email}`} className="text-sky-400 hover:text-sky-300 text-sm break-all transition-colors">
        {personalInfo.email}
      </a>
    </div>
    <div className="flex items-center gap-3">
      <FaMedium className="text-slate-400 shrink-0 w-5 h-5" />
      <a href={personalInfo.social.medium} target="_blank" rel="noopener noreferrer"
        className="text-slate-400 hover:text-slate-300 text-sm break-all transition-colors">
        Medium Blog
      </a>
    </div>
  </div>
);

// ─── Skill pill ───────────────────────────────────────────────────────────────
function SkillPill({ label }) {
  return (
    <span className="px-2.5 py-1 rounded-md text-xs font-medium border transition-colors duration-200 hover:border-sky-500/50 hover:text-sky-300 hover:bg-sky-950/30"
      style={{ background: "rgba(30,40,60,0.6)", borderColor: "rgba(100,116,139,0.3)", color: "#cbd5e1" }}>
      {label}
    </span>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────
function Card({ id, children, className = "" }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`scroll-mt-28 rounded-2xl border p-6 sm:p-8 shadow-lg ${className}`}
      style={{ background: "rgba(14,18,26,0.7)", borderColor: "rgba(51,65,85,0.5)", backdropFilter: "blur(8px)" }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#38bdf8" }}>
      {children}
    </h2>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────
function HomePage({ openResumePreview }) {
  return (
    <section className="min-h-screen pt-20 sm:pt-28 pb-20" style={{ background: "linear-gradient(170deg, #08090e 0%, #0c111a 40%, #08090e 100%)" }}>
      <div className="max-w-5xl mx-auto px-4 space-y-12">
        <div className="text-center pt-4">
          <ProfileAvatar />
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-7">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-50 mb-3">{personalInfo.name}</h1>
            <p className="text-base sm:text-lg font-semibold max-w-3xl mx-auto leading-snug" style={{ color: "#38bdf8" }}>
              {personalInfo.tagline1}
            </p>
            <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.tagline2}
            </p>
          </motion.div>
        </div>

        <Card id="about">
          <SectionLabel>About</SectionLabel>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">{personalInfo.bio}</p>
        </Card>

        <div id="projects" className="scroll-mt-28">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2">Featured projects</h2>
          <p className="text-sm text-slate-500 mb-6 max-w-2xl">
            Systems-focused work spanning APIs, persistence, and delivery—each distilled to outcomes you can ask about in an interview.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {featuredProjects.map((project, idx) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * idx }}
                className="group rounded-2xl overflow-hidden flex flex-col border transition-all duration-300 hover:border-sky-500/30"
                style={{ background: "rgba(14,18,26,0.7)", borderColor: "rgba(51,65,85,0.5)", backdropFilter: "blur(8px)", boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}
              >
                <div className="relative h-44 bg-slate-900 border-b border-slate-800/60 overflow-hidden">
                  <FeaturedThumb media={project.image} title={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1219] via-transparent to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.06) 0%, transparent 60%)" }} />
                </div>
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-50">{project.title}</h3>
                    <p className="text-sm text-slate-400 mt-1 leading-snug">{project.tagline}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{ background: "rgba(14,165,233,0.1)", color: "#7dd3fc", border: "1px solid rgba(14,165,233,0.2)" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <ul className="text-sm text-slate-300 space-y-1.5 list-disc ml-5 flex-1 leading-relaxed">
                    {project.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                  </ul>
                  <div className="flex flex-wrap gap-4 pt-1">
                    {project.links?.github && project.links.github !== "#" && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1">
                        <Github className="w-3.5 h-3.5" /> View code
                      </a>
                    )}
                    {project.links?.live && project.links.live !== "#" && (
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1">
                        <ExternalLink className="w-3.5 h-3.5" /> Live demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <Card id="skills">
          <SectionLabel>Technical skills</SectionLabel>
          <p className="text-sm text-slate-400 mb-5 max-w-3xl leading-relaxed">
          </p>
          <div className="space-y-5">
            {personalInfo.skillGroups.map(group => (
              <div key={group.title}>
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">{group.title}</div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map(item => <SkillPill key={item} label={item} />)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card id="experience">
          <SectionLabel>Experience</SectionLabel>
          <div className="space-y-7">
            {experience.map((exp, idx) => (
              <div key={idx} className="flex gap-4 pb-7 border-b last:border-0 last:pb-0 justify-between items-start" style={{ borderColor: "rgba(51,65,85,0.4)" }}>
                <div className="flex gap-4 flex-1 min-w-0">
                  <img src={exp.logo} className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-700 shrink-0" alt="" />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-100 text-sm">{exp.role} · {exp.company}</div>
                    <div className="text-xs text-sky-500 mt-0.5 font-medium">{exp.duration}</div>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">{exp.desc}</p>
                    {exp.bullets?.length ? (
                      <ul className="mt-3 text-sm text-slate-300 space-y-1.5 list-disc ml-5 leading-relaxed">
                        {exp.bullets.map(b => <li key={b.slice(0, 40)}>{b}</li>)}
                      </ul>
                    ) : null}
                    {exp.link ? (
                      <a href={exp.link.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-sky-900/50 hover:bg-sky-800/60 text-sky-300 rounded-lg text-xs font-semibold border border-sky-800/50 transition-all">
                        <ExternalLink className="w-3 h-3" /> {exp.link.text}
                      </a>
                    ) : null}
                  </div>
                </div>
                {exp.rightImage && (
                  <div className="hidden sm:block shrink-0 ml-4 mt-1">
                    <img src={exp.rightImage} className="w-40 h-auto rounded-md object-contain ring-1 ring-slate-700/50" alt="" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <div id="coding-activity" className="scroll-mt-28 max-w-5xl mx-auto">
          <Stats />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Card id="leadership">
            <SectionLabel>Leadership &amp; campus roles</SectionLabel>
            <div className="space-y-5 text-sm">
              {[
                { title: "Class Representative", sub: "B.E. CSE Dept (2024–Present)", desc: "Relayed coursework and departmental updates between faculty and classmates; coordinated schedules and surfaced blockers early so deadlines stayed workable." },
                { title: "Placement Batch Head", sub: "B.E. CSE (2025–Present)", desc: "Helped synchronize placement cohort communication—announcements, deadlines, and escalation paths—keeping the batch aligned with training and recruiter timelines." },
                { title: "Committee Head · Academic Cell", sub: "2024–Present · VCET", desc: "Academic coordination and initiatives." },
                { title: "Eco Club Member", sub: "VCET · 2024–Present", desc: "Volunteered at eco-awareness and campus sustainability events throughout 2025." },
              ].map((r, i) => (
                <div key={i} className="flex gap-3">
                  <img src="/Vcetlogo.jpg" className="w-9 h-9 rounded-lg object-cover ring-1 ring-slate-700 shrink-0" alt="" />
                  <div>
                    <div className="font-semibold text-slate-100 text-sm">{r.title}</div>
                    <div className="text-xs text-sky-500 mt-0.5">{r.sub}</div>
                    {r.desc && <p className="text-slate-400 mt-1 text-xs leading-relaxed">{r.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t" style={{ borderColor: "rgba(51,65,85,0.4)" }}>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Entrepreneurial &amp; leadership initiatives</div>
              <ul className="text-sm text-slate-300 space-y-2.5 list-disc ml-5 leading-relaxed">
                {entrepreneurialInitiatives.map(item => <li key={item.slice(0, 48)}>{item}</li>)}
              </ul>
            </div>
          </Card>

          <Card id="education">
            <SectionLabel>Education</SectionLabel>
            {education.map(edu => (
              <div key={edu.degree} className="mb-5 flex gap-3 last:mb-0">
                <img src={edu.logo} className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-700 shrink-0" alt="" />
                <div>
                  <div className="text-sm font-semibold text-slate-100">{edu.degree}</div>
                  <div className="text-xs text-sky-500 font-medium mt-0.5">{edu.year}</div>
                  <div className="text-xs text-slate-400 mt-1">{edu.org}</div>
                </div>
              </div>
            ))}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: "rgba(51,65,85,0.4)" }}>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Languages &amp; soft skills</div>
              <div className="space-y-2 mb-4">
                {personalInfo.languages.map(lang => (
                  <div key={lang.name} className="flex justify-between text-sm text-slate-300">
                    <span>{lang.name}</span>
                    <span className="text-sky-400 font-medium text-xs">{lang.level}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {personalInfo.softSkills.map(skill => <SkillPill key={skill} label={skill} />)}
              </div>
            </div>
          </Card>
        </div>

        <Card id="contact" className="max-w-2xl mx-auto">
          <SectionLabel>Get in touch</SectionLabel>
          <p className="text-sm text-slate-300 mb-2 leading-relaxed">
            Open to backend/SDE roles, internships, and collaborations on data-intensive or AI-powered products.
          </p>
          <p className="text-xs text-slate-500 mb-5">
            For faster responses: email first, then WhatsApp for coordination.
          </p>
          <ContactSection />
          <div className="flex flex-wrap justify-center gap-4 mt-5">
            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 text-sky-400 hover:text-sky-300 transition-colors" />
            </a>
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
            </a>
            <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <SiLeetcode className="w-5 h-5 text-amber-500 hover:text-amber-400 transition-colors" />
            </a>
            <a href={personalInfo.social.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium">
              <FaMedium className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
            <button onClick={openResumePreview}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white transition-all duration-200"
              style={{ background: "rgba(30,40,55,0.7)" }}>
              Preview Resume
            </button>
            <a href="/resume.pdf" download="Yamuna_Resume.pdf"
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200">
              <Download className="w-4 h-4" /> Download Resume
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
}

// ─── Media Swiper ─────────────────────────────────────────────────────────────
function SingleMedia({ media, className = "", showControls = false }) {
  if (isVideo(media)) {
    return (
      <video
        src={media}
        className={`w-full h-full object-contain ${className}`}
        autoPlay
        loop
        muted
        playsInline
        controls={showControls}
      />
    );
  }
  return <img src={media} alt="" className={`w-full h-full object-contain ${className}`} draggable={false} />;
}

function MultiMediaSwiper({ mediaList, className = "", showControls = false }) {
  const swiperRef = useRef(null);
  const videoRefs = useRef({});
  const timerRef = useRef(null);

  const handleSlide = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    const idx = swiper.realIndex;
    const video = videoRefs.current[idx];

    Object.values(videoRefs.current).forEach(v => {
      if (v) { v.pause(); v.onended = null; }
    });
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }

    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
      video.onended = () => { if (mediaList.length > 1) swiper.slideNext(); };
    } else if (mediaList.length > 1) {
      timerRef.current = setTimeout(() => swiper.slideNext(), 2500);
    }
  };

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    Object.values(videoRefs.current).forEach(v => { if (v) v.onended = null; });
  }, []);

  return (
    <Swiper
      modules={[Pagination, Navigation]}
      slidesPerView={1}
      loop={mediaList.length > 1}
      pagination={{ clickable: true }}
      navigation={mediaList.length > 1}
      onSwiper={s => { swiperRef.current = s; requestAnimationFrame(handleSlide); }}
      onSlideChange={handleSlide}
      className={className}
    >
      {mediaList.map((media, idx) => (
        <SwiperSlide key={idx} className="flex items-center justify-center">
          {isVideo(media) ? (
            <video ref={el => (videoRefs.current[idx] = el)} src={media} muted playsInline controls={showControls}
              className="w-full h-full object-contain" style={{ pointerEvents: showControls ? "auto" : "none" }} />
          ) : (
            <img src={media} alt="" className="w-full h-full object-contain" draggable={false} style={{ pointerEvents: "none" }} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function MediaSwiper({ mediaList, className = "", showControls = false }) {
  if (mediaList.length === 1) {
    return <SingleMedia media={mediaList[0]} className={className} showControls={showControls} />;
  }
  return <MultiMediaSwiper mediaList={mediaList} className={className} showControls={showControls} />;
}

function ProjectExpandModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKeyDown = e => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const mediaList = (project.images?.length ? project.images : [project.src]).filter(Boolean);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key={project.title}
        className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-[98vw] sm:max-w-6xl h-[min(92dvh,95vh)] rounded-2xl overflow-hidden bg-black mx-2 sm:mx-0"
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.97, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="w-full h-full flex items-center justify-center">
            <MediaSwiper mediaList={mediaList} className="w-full h-full" showControls />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-[210] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors"
            style={{ background: "rgba(14,165,233,0.85)" }}
            aria-label="Close"
          >
            ×
          </button>
          {project.links && Object.entries(project.links).filter(([k, url]) => url && url !== "#" && !["demo", "behance", "figma"].includes(k)).map(([k, url]) => (
            <a key={k} href={url} target="_blank" rel="noopener noreferrer"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[210] px-7 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #0284c7, #7c3aed)" }}>
              {k.charAt(0).toUpperCase() + k.slice(1)}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

// ─── Project Grid ─────────────────────────────────────────────────────────────
function ProjectGrid({ cards, expandedProject, setExpandedProject, columnsLg = 2, invisible = false }) {
  const [hovered, setHovered] = useState(null);

  const gridClass = columnsLg === 4
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-auto"
    : columnsLg === 3
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto"
    : "grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-auto";

  const isExpanded = project =>
    expandedProject && (expandedProject.id === project.id || expandedProject.title === project.title);

  return (
    <div className={gridClass}>
      {cards.map((project) => {
        const images = project.images?.length ? project.images : [project.src];
        const onlyVideos = images.every(isVideo);
        const onlyImages = images.every(img => !isVideo(img));
        const singleVideo = onlyVideos && images.length === 1;
        const singleImage = onlyImages && images.length === 1;
        const multipleImages = onlyImages && images.length > 1;
        const expanded = isExpanded(project);

        const cardStyle = invisible
          ? "relative group rounded-2xl cursor-default overflow-hidden flex items-center justify-center min-h-[200px] bg-transparent"
          : "relative group rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center min-h-[200px] transition-all duration-300 hover:scale-[1.01]";

        const cardBg = invisible ? {} : {
          background: "rgba(12,16,24,0.85)",
          border: "1px solid rgba(51,65,85,0.5)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        };

        return (
          <div
            key={`${project.id ?? ""}-${project.title}`}
            className={cardStyle}
            style={cardBg}
            onMouseEnter={() => setHovered(project.title)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => !invisible && setExpandedProject(project)}
          >
            {singleVideo && !expanded && (
              <img src={images[0].replace(/\.(mp4|webm|ogg)$/i, "Cover.jpg")} alt={project.title} className="w-full h-full object-contain" />
            )}
            {singleVideo && expanded && (
              <div className="w-full h-full min-h-[200px] bg-slate-900/80 flex items-center justify-center">
                <span className="text-xs text-slate-500">Expanded</span>
              </div>
            )}
            {singleImage && (
              <img src={images[0]} alt={project.title} className="w-full h-full object-contain" />
            )}
            {multipleImages && (
              <Swiper modules={[Autoplay]} slidesPerView={1} autoplay={{ delay: 2500, disableOnInteraction: false }} loop className="w-full h-full">
                {images.map((img, i) => (
                  <SwiperSlide key={i} className="!h-full flex items-center justify-center">
                    <img src={img} alt={project.title} className="w-full h-full object-contain" />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            <AnimatePresence>
              {hovered === project.title && !expandedProject && !invisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 rounded-2xl"
                  style={{ background: "rgba(8,10,18,0.88)", backdropFilter: "blur(6px)" }}
                >
                  <h2 className="text-base font-bold text-white mb-2 text-center">{project.title}</h2>
                  <p className="text-sm text-slate-300 mb-3 text-center leading-relaxed">{project.shortDesc || project.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-2 justify-center">
                    {(project.tags || []).map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{ background: "rgba(14,165,233,0.15)", color: "#7dd3fc", border: "1px solid rgba(14,165,233,0.25)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {(project.tools || []).map(tool => (
                      <span key={tool} className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{ background: "rgba(139,92,246,0.15)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.25)" }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 mt-3">Click to watch</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function TabbedSection({ title, tabs, cardsByTab, expandedProject, setExpandedProject }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  // Get current tab's cards and filter based on search query
  const currentCards = React.useMemo(() => {
    const tabCards = cardsByTab[activeTab] || [];
    if (!searchQuery) return tabCards;
    const query = searchQuery.toLowerCase();
    return tabCards.filter(card => 
      (card.title && card.title.toLowerCase().includes(query)) ||
      (card.desc && card.desc.toLowerCase().includes(query)) ||
      (card.tags && card.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }, [activeTab, cardsByTab, searchQuery]);

  // Update active tab when search query changes to show results in the current tab
  React.useEffect(() => {
    if (searchQuery) {
      // If no results in current tab, try to find a tab with matching results
      if (currentCards.length === 0) {
        const tabWithResults = tabs.find(tab => {
          const tabCards = cardsByTab[tab.value] || [];
          const query = searchQuery.toLowerCase();
          return tabCards.some(card => 
            (card.title && card.title.toLowerCase().includes(query)) ||
            (card.desc && card.desc.toLowerCase().includes(query)) ||
            (card.tags && card.tags.some(tag => tag.toLowerCase().includes(query)))
          );
        });
        if (tabWithResults) {
          setActiveTab(tabWithResults.value);
        }
      }
    }
  }, [searchQuery, tabs, cardsByTab, currentCards.length]);

  return (
    <div className="min-h-screen pt-20 sm:pt-32 pb-16 bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-4 mt-8">{title}</h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        {currentCards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {searchQuery 
                ? `No projects found matching "${searchQuery}" in ${tabs.find(t => t.value === activeTab)?.label || 'this tab'}` 
                : `No projects available in ${tabs.find(t => t.value === activeTab)?.label || 'this tab'}`}
            </p>
          </div>
        ) : (
          <ProjectGrid cards={currentCards} expandedProject={expandedProject} setExpandedProject={setExpandedProject} />
        )}
      </div>
    </div>
  );
}

// Section for Cloud, AI, etc.
function Section({ title, cards, expandedProject, setExpandedProject, columnsLg = 2, invisible = false }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter cards based on search query
  const filteredCards = React.useMemo(() => {
    if (!searchQuery) return cards;
    const query = searchQuery.toLowerCase();
    return cards.filter(card => 
      (card.title && card.title.toLowerCase().includes(query)) ||
      (card.desc && card.desc.toLowerCase().includes(query)) ||
      (card.tags && card.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }, [cards, searchQuery]);

  return (
    <div className="min-h-screen pt-20 sm:pt-32 pb-16" style={{ background: "linear-gradient(170deg, #08090e 0%, #0c111a 40%, #08090e 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 mt-8 tracking-tight">{title}</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {filteredCards.length === 0 ? (
          <div className="text-center py-16"><p className="text-slate-500">No results for "{searchQuery}"</p></div>
        ) : (
          <ProjectGrid cards={filteredCards} expandedProject={expandedProject} setExpandedProject={setExpandedProject} columnsLg={columnsLg} invisible={invisible} />
        )}
      </div>
    </div>
  );
}

function ProjectsOverview({ expandedProject, setExpandedProject }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState("placement");

  const domainCards = useMemo(() => {
    const filter = PROJECT_DOMAIN_FILTERS.find(f => f.key === activeDomain);
    return filter ? filter.cards() : PROJECT_DOMAIN_FILTERS[0].cards();
  }, [activeDomain]);

  const filteredCards = useMemo(() => {
    if (!searchQuery) return domainCards;
    const q = searchQuery.toLowerCase();
    return domainCards.filter(card =>
      card.title?.toLowerCase().includes(q) ||
      card.shortDesc?.toLowerCase().includes(q) ||
      card.desc?.toLowerCase().includes(q) ||
      card.fullDesc?.toLowerCase().includes(q) ||
      card.tags?.some(t => t.toLowerCase().includes(q))
    );
  }, [domainCards, searchQuery]);

  return (
    <div className="min-h-screen pt-20 sm:pt-32 pb-16" style={{ background: "linear-gradient(170deg, #08090e 0%, #0c111a 40%, #08090e 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 mt-8 tracking-tight">Projects</h1>
        <p className="text-slate-500 mb-6 text-sm">Browse all work, or filter by domain.</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {PROJECT_DOMAIN_FILTERS.map(f => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveDomain(f.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                activeDomain === f.key
                  ? "bg-sky-600/90 text-white border-sky-500/60 shadow-md shadow-sky-900/30"
                  : "bg-slate-900/60 text-slate-300 border-slate-700 hover:border-sky-600/40 hover:text-sky-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {activeDomain === "designs" && (
          <p className="text-sm text-slate-400 max-w-3xl mb-6 leading-relaxed border-l-2 border-sky-500/30 pl-4">
            {DESIGNS_INTRO}
          </p>
        )}

        {filteredCards.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500">No projects match your search in this domain.</p>
          </div>
        ) : (
          <ProjectGrid
            cards={filteredCards}
            expandedProject={expandedProject}
            setExpandedProject={setExpandedProject}
            columnsLg={activeDomain === "designs" ? 3 : 2}
          />
        )}
      </div>
    </div>
  );
}

function ResumePreviewModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = event => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[min(88dvh,88vh)] bg-[#0f1117] border border-slate-700 rounded-2xl overflow-hidden mx-2 sm:mx-0"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
          <h3 className="text-sm sm:text-base font-semibold text-slate-100">Resume preview</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xl leading-none"
            aria-label="Close preview"
          >
            ×
          </button>
        </div>
        <div className="h-[calc(88vh-58px)]">
          <Worker workerUrl={pdfjsWorker}>
            <Viewer fileUrl="/resume.pdf" />
          </Worker>
        </div>
      </div>
    </div>
  );
}

// --- Video Swiper Component ---
function VideoSwiper({ videos }) {
  return <MediaSwiper mediaList={videos} />;
}

// --- Always Looping Video Component ---
function AlwaysLoopingVideo({ src }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.play();
    }
  }, []);
  return <video ref={ref} src={src} controls loop autoPlay muted />;
}

function AutoCarousel({ images, title }) {
  return (
    <div className="mb-16">
      {title && (
        <h2 className="text-2xl font-bold mb-7 text-center" style={{ color: "#7dd3fc" }}>{title}</h2>
      )}
      <div className="relative overflow-hidden px-4">
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={3}
          spaceBetween={20}
          autoplay={{ delay: 1800, disableOnInteraction: false }}
          loop
          navigation
          className="!pb-8"
          breakpoints={{ 320: { slidesPerView: 1, spaceBetween: 16 }, 640: { slidesPerView: 2, spaceBetween: 20 }, 768: { slidesPerView: 3, spaceBetween: 20 }, 1024: { slidesPerView: 4, spaceBetween: 20 } }}
        >
          {images.map((img, idx) => {
            const vid = typeof img === "string" && /\.(mp4|webm|ogg)$/i.test(img);
            return (
              <SwiperSlide key={idx}>
                <div className="relative aspect-square w-full flex items-center justify-center rounded-xl overflow-hidden border border-slate-800">
                  {vid
                    ? <video src={img} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                    : <img src={img} className="w-full h-full object-contain" alt={`${title} ${idx + 1}`} />
                  }
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

function ShowcaseSection({ expandedProject, setExpandedProject }) {
  return (
    <div className="min-h-screen pt-20 sm:pt-32 pb-16" style={{ background: "linear-gradient(170deg, #08090e 0%, #0c111a 40%, #08090e 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 mt-8 tracking-tight">UI/UX Designs & Creative Work</h1>
        <p className="text-slate-500 mb-8 max-w-3xl text-sm">
          Explore my collection of logo designs, posters, app prototypes, and creative visual work. Each piece showcases different aspects of design thinking and visual communication.
        </p>
        <Section title="" cards={PROJECTS.uiux} expandedProject={expandedProject} setExpandedProject={setExpandedProject} columnsLg={3} />
      </div>
    </div>
  );
}

function HighlightsSection() {
  const certifications = [
    "/cert1.jpg", "/cert2.jpg", "/cert3.jpg", "/cert4.jpg", "/cert5.jpg", "/cert6.jpg",
    "/cert7.jpg", "/cert8.jpg", "/cert9.jpg", "/cert10.jpg", "/cert11.jpg", "/cert12.jpg",
    "/cert13.jpg", "/cert14.jpg", "/cert15.jpg", "/cert16.jpeg", "/cert17.png", "/cert20.jpg"
  ];
  const platformBadges = [
    "/badge_1.png", "/badge_2.png", "/badge_3.jpg", "/badge_4.png",
    "/badge_5.png", "/badge_6.png", "/badge_7.png", "/badge_8.png", "/badge_9.png",
    "/hackerrank-problem-solving.svg", "/hackerrank-python.svg",
  ];
  const openSource = ["/open_1.png", "/open_2.png", "/open_3.png", "/open_4.jpg", "/open_5.png", "/open_6.png"];
  const awards = ["/Award1.jpg", "/Award2.jpg", "/Award3.jpg", "/Award4.jpg", "/Award5.jpg"];

  return (
    <div className="min-h-screen pt-20 sm:pt-32 pb-16" style={{ background: "linear-gradient(170deg, #08090e 0%, #0c111a 40%, #08090e 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-10 mt-8 text-center tracking-tight">Highlights & Achievements</h1>

        <div className="mb-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-slate-800/60"
          >
            <div className="relative h-[26rem] sm:h-[30rem] md:h-[34rem]">
              <img src="/showcase1.jpg" alt="Showcase" className="w-full h-full object-contain p-4" />
            </div>
            <div className="p-6 border-t border-slate-800/60 text-center"
              style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(139,92,246,0.08) 100%)" }}>
              <h2 className="text-2xl sm:text-3xl font-bold"
                style={{ background: "linear-gradient(90deg, #fde68a, #fb923c, #f43f5e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                "First Taste of Victory"
              </h2>
            </div>
          </motion.div>
        </div>

        <AutoCarousel images={awards} title="" />
        <AutoCarousel images={certifications} title="Certifications" />
        <div className="mb-12 max-w-3xl mx-auto">
          <AutoCarousel images={platformBadges} title="Platform Badges" />
        </div>
        <div className="mb-16 max-w-6xl mx-auto">
          <AutoCarousel images={openSource} title="Open Source Contributions" />
        </div>
      </div>
    </div>
  );
}

// Main App
export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [expandedProject, setExpandedProject] = useState(null);
  const [isResumePreviewOpen, setResumePreviewOpen] = useState(false);

  const scrollHomeTo = useCallback(sectionId => {
    setExpandedProject(null);
    setActiveSection("home");
    queueMicrotask(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <div className="min-h-screen font-sans text-slate-200 antialiased" style={{ background: "#08090e" }}>
        <Bubbles />
        <NavBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setExpandedProject={setExpandedProject}
          scrollHomeTo={scrollHomeTo}
          openResumePreview={() => setResumePreviewOpen(true)}
        />
        <BackArrow
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setExpandedProject={setExpandedProject}
          show={expandedProject === null}
        />
        {activeSection === "home" && <HomePage openResumePreview={() => setResumePreviewOpen(true)} />}
        {activeSection === "projects" && (
          <ProjectsOverview expandedProject={expandedProject} setExpandedProject={setExpandedProject} />
        )}
        {activeSection === "highlights" && <HighlightsSection />}
        {activeSection === "video" && (
          <section className="min-h-screen pt-32 pb-16" style={{ background: "linear-gradient(170deg, #08090e 0%, #0c111a 100%)" }}>
            <div className="max-w-6xl mx-auto px-4">
              <h1 className="text-4xl font-bold text-white mb-8 text-center">Video Showcase</h1>
              <VideoSwiper videos={["/MoneyMirror.mp4", "/LogBeacon.mp4", "/ExoVision.mp4"]} />
            </div>
          </section>
        )}

        <ProjectExpandModal project={expandedProject} onClose={() => setExpandedProject(null)} />

        <Footer
          personalInfo={personalInfo}
          scrollHomeTo={scrollHomeTo}
          openResumePreview={() => setResumePreviewOpen(true)}
        />
        <ResumePreviewModal
          open={isResumePreviewOpen}
          onClose={() => setResumePreviewOpen(false)}
        />
      </div>
    </motion.div>
  );
}
