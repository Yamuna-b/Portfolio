import React, { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@react-pdf-viewer/core/lib/styles/index.css";
import {
  ArrowLeft, Linkedin, Github, Download, Mail, Phone
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Footer from "./components/Footer";
import Stats from "./components/Stats";

// Search Bar Component
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 px-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white px-6 py-3 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// --- Animated, drifting background stars with enhanced effects ---
function Bubbles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: 22 }).map((_, i) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = Math.random() * 12 + 4;
        const driftX = (Math.random() - 0.5) * 40;
        const driftY = (Math.random() - 0.5) * 40;
        const colors = ['bg-slate-500', 'bg-sky-700', 'bg-slate-600'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            className={"absolute rounded-full " + color + " opacity-[0.08] blur-xl"}
            style={{ width: size, height: size }}
            initial={{ top: top + '%', left: left + '%' }}
            animate={{
              top: [top + '%', (top + driftY) + '%', top + '%'],
              left: [left + '%', (left + driftX) + '%', left + '%'],
              opacity: [0.06, 0.12, 0.06],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 15 + Math.random() * 12,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
}

// --- Personal Data ---
const personalInfo = {
  name: "Yamuna",
  tagline1: "Backend-focused Software Engineer | Building scalable systems and digital twins.",
  tagline2: "CS undergrad (2027) focused on backend, cloud, and data-intensive applications using Python, JavaScript, and modern DevOps.",
  email: "yamuna.bsvy@gmail.com",
  phone: "+91-9629163099",
  whatsapp: "919629163099",
  bio: "I'm a 3rd-year Computer Science student (graduating 2027) targeting backend and full-stack engineering roles. I enjoy designing maintainable APIs, modeling data thoughtfully, and shipping services with Docker and CI/CD. Recent work spans a personal-finance digital twin backend (Money Mirror) and Log Beacon—an incident-tracking and observability platform—both with an emphasis on clear architecture and reliability.",
  skillGroups: [
    { title: "Programming", items: ["Python", "JavaScript", "Java", "C"] },
    { title: "Backend & APIs", items: ["FastAPI", "Node.js", "Express.js", "REST APIs", "WebSockets"] },
    { title: "Databases", items: ["PostgreSQL", "SQLite", "MongoDB", "SQL (queries, indexing basics)"] },
    { title: "Cloud & DevOps", items: ["Docker", "GitHub Actions", "Git", "Basic AWS (EC2/S3)", "CI/CD pipelines"] },
    { title: "Frontend", items: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
    { title: "Familiar & tooling", items: ["Kubernetes", "Redis", "Postman"] },
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
    leetcode: "https://leetcode.com/u/Yamuna_bsvy/"
  }
};

const experience = [
  {
    logo: "/kevelllogo.jpg",
    company: "Kevell Corp",
    role: "Web Development Intern",
    duration: "Dec 2024",
    desc: "Built internal tools with React and Node.js for a fast-moving product squad.",
    bullets: [
      "Implemented React screens and reusable components that reduced duplicate UI code across internal tools.",
      "Shipped and documented REST endpoints in Node.js/Express consumed by teammates during feature work.",
      "Collaborated through code review and iterative delivery to stabilize pages used by stakeholders."
    ]
  },
  {
    logo: "/Nittelogo.jpg",
    company: "IEEE Conference (ECOSAUR)",
    role: "Presenter",
    duration: "Feb 2024",
    desc: "Presented research on carbon footprint awareness and mitigation at NITTE, Karnataka.",
    link: { text: "View Publication", url: "#" },
    bullets: [
      "Delivered an oral presentation on carbon footprint awareness and mitigation approaches at NITTE, Karnataka.",
      "Distilled methodology and findings for an academic audience and conference reviewers."
    ]
  },
  {
    logo: "/Reccsarlogo.jpg",
    company: "Reccsar Private Limited",
    role: "Cloud Computing Intern",
    duration: "June 2025",
    desc: "Cloud-hosted dashboards integrating data sources for nonprofit delivery teams.",
    bullets: [
      "Developed dashboards for nonprofit initiatives hosted on AWS, combining multiple data feeds into actionable views.",
      "Automated parts of deployment and repeatable environment setup using GitHub Actions where applicable.",
      "Partnered across roles to tighten delivery cycles for quick iterations on stakeholder feedback."
    ]
  }
];

const featuredProjects = [
  {
    title: "Money Mirror",
    tagline: "Personal finance digital twin—model spending and forecasts with a clean backend abstraction.",
    stack: ["Python", "PostgreSQL", "REST", "Docker"],
    bullets: [
      "Separated domain logic from transport so core finance rules stayed testable and easy to extend.",
      "Designed persistence around predictable migrations and sane indexing for analytic-style queries.",
      "Packaged repeatable local and deploy flows with Docker to keep environments consistent.",
    ],
    links: {
      github: "https://github.com/Yamuna-b/Money_Mirror",
      live: "https://drive.google.com/file/d/1H01AjMrU8kZ_mYTkO4IgUO7lQl5zsw2s/view?usp=sharing",
    },
    image: "/fullstack1.png",
  },
  {
    title: "Log Beacon",
    tagline: "Incident-tracking and observability platform emphasizing reliable triage and clear escalation paths.",
    stack: ["Node.js", "Express.js", "MongoDB", "WebSockets"],
    bullets: [
      "Structured incident lifecycle endpoints for create/update/resolve flows with authorization in mind.",
      "Used WebSockets selectively for realtime status without overloading clients with chatter.",
      "Focused on observable errors and sane defaults so on-call workflows stayed understandable.",
    ],
    links: {
      github: "https://github.com/Yamuna-b/LogBeacon",
      live: "https://drive.google.com/file/d/1VIW1KpCmgK-CLCpHbwdMd8BppwnZfHd-/view?usp=sharing",
    },
    image: "/backend1.png",
  },
  {
    title: "MarineTaxa AI",
    tagline: "Marine species classification pipeline with model-centric evaluation and deployment-ready outputs.",
    stack: ["Python", "PyTorch", "OpenCV", "Computer Vision"],
    bullets: [
      "Built image classification workflows for marine taxa prediction with consistent preprocessing.",
      "Benchmarked model behavior across class groups and improved label quality for better generalization.",
      "Packaged inference flow so predictions can be exposed through an API or demo interface.",
    ],
    links: {
      github: "https://github.com/Yamuna-b/MarineTaxaAi",
      live: "https://drive.google.com/file/d/1aZN2iFA1QZwSP_ftBbqv21tr_xtpykPB/view?usp=sharing",
    },
    image: "/ai_2.mp4",
  },
  {
    title: "Namma Oor Fix",
    tagline: "Civic issue reporting workflow with clean backend CRUD, status transitions, and accountability views.",
    stack: ["React", "Node.js", "MongoDB", "REST APIs"],
    bullets: [
      "Modeled issue lifecycle states from report to resolution for predictable civic workflows.",
      "Implemented role-oriented APIs for citizens and admins with structured validation.",
      "Focused on simple, auditable status updates to improve reporting transparency.",
    ],
    links: { github: "https://github.com/Yamuna-b/Namma-Oor-Fix", live: null },
    image: "/fullstack2.png",
  },
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
      images: ["/full_1.mp4"],
      shortDesc: "Full-stack pet shop platform",
      fullDesc: "A comprehensive pet shop website with e-commerce functionality, pet adoption services, and community features.",
      tags: ["React", "Node.js", "MongoDB"],
      tools: ["Express", "Redux"],
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
      links: { github: "https://github.com/Yamuna-b/RepoDocs" }
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
      title: "Exoplanet Detection System",
      images: ["/ai_1.mp4"],
      shortDesc: "AI for detecting exoplanets in space data",
      fullDesc: "Machine learning model that analyzes light curve data from telescopes to identify potential exoplanets using deep learning techniques.",
      tags: ["AI", "Astronomy", "Deep Learning"],
      tools: ["Python", "TensorFlow", "Keras"],
      links: { github: "https://github.com/Yamuna-b/nasa-spaceapps-exoplanet" }
    },
    {
      id: 2,
      title: "MarineTaxa AI",
      images: ["/ai_2.mp4"],
      shortDesc: "AI for classifying marine species",
      fullDesc: "Computer vision system that classifies marine organisms from underwater imagery using convolutional neural networks.",
      tags: ["AI", "Marine Biology", "Computer Vision"],
      tools: ["Python", "PyTorch", "OpenCV"],
      links: { github: "https://github.com/Yamuna-b/MarineTaxaAi" }
    },
    {
      id: 3,
      title: "Menstrual Health AI Chatbot",
      images: ["/ai_3.mp4"],
      shortDesc: "AI chatbot for menstrual health",
      fullDesc: "Chatbot offering resources for PCOD, PMS, PMDD.",
      tags: ["AI", "Chatbot", "Healthcare"],
      tools: ["Python", "TensorFlow"],
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
      images: ["/showcase1.jpg", "/video1.mp4"],
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
      images: ["/fullstack1.png"],
      shortDesc: "Digital twin backend for personal finance simulation",
      fullDesc: "API-first backend to simulate multi-month cash-flow scenarios with structured data modeling and forecasting flows.",
      tags: ["Backend", "FinTech", "REST"],
      tools: ["Python", "PostgreSQL", "Docker"],
      links: {
        github: "https://github.com/Yamuna-b/Money_Mirror",
        demo: "https://drive.google.com/file/d/1H01AjMrU8kZ_mYTkO4IgUO7lQl5zsw2s/view?usp=sharing",
      },
    },
    {
      id: 2,
      title: "Namma Oor Fix",
      images: ["/fullstack2.png"],
      shortDesc: "Civic issue reporting with status workflows",
      fullDesc: "Backend + full-stack issue lifecycle platform from report to resolution for local civic workflows.",
      tags: ["Backend", "Civic Tech"],
      tools: ["Node.js", "MongoDB", "REST APIs"],
      links: { github: "https://github.com/Yamuna-b/Namma-Oor-Fix" },
    },
    {
      id: 3,
      title: "Petimony",
      images: ["/full_1.mp4"],
      shortDesc: "Pet adoption and care platform",
      fullDesc: "Full-stack project with backend flows for listings, requests, approvals, and authenticated user actions.",
      tags: ["Full Stack", "Backend-heavy"],
      tools: ["React", "Node.js", "Express", "MongoDB"],
      links: { github: "https://github.com/Yamuna-b/Petimony" },
    },
    {
      id: 4,
      title: "Chat Support Pro",
      images: ["/fullstack5.png"],
      shortDesc: "Realtime customer support console",
      fullDesc: "Conversation and assignment workflows with API endpoints and realtime updates for support operations.",
      tags: ["Realtime", "Backend APIs"],
      tools: ["Node.js", "Socket.io", "React"],
      links: { github: "https://github.com/Yamuna-b/client-support-realtime-chat" },
    },
    {
      id: 5,
      title: "Porter Seva",
      images: ["/fullstack4.png"],
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
      images: ["/ai_2.mp4"],
      shortDesc: "Marine species classification",
      fullDesc: "Computer vision pipeline for marine organism classification with preprocessing and model evaluation loops.",
      tags: ["AI/ML", "Computer Vision"],
      tools: ["Python", "PyTorch", "OpenCV"],
      links: {
        github: "https://github.com/Yamuna-b/MarineTaxaAi",
        demo: "https://drive.google.com/file/d/1aZN2iFA1QZwSP_ftBbqv21tr_xtpykPB/view?usp=sharing",
      },
    },
    {
      id: 2,
      title: "Exoplanet Detection System",
      images: ["/ai_1.mp4"],
      shortDesc: "ML detection from astronomy signals",
      fullDesc: "Model-driven detection pipeline for exoplanet identification from telescope-style data inputs.",
      tags: ["AI/ML", "Astronomy"],
      tools: ["Python", "TensorFlow", "Keras"],
      links: { github: "https://github.com/Yamuna-b/nasa-spaceapps-exoplanet" },
    },
    {
      id: 3,
      title: "Menstrual Health AI Chatbot",
      images: ["/ai_3.mp4"],
      shortDesc: "AI-assisted health guidance chatbot",
      fullDesc: "Conversational assistant focused on menstrual health guidance with intent-aware response flows.",
      tags: ["AI/ML", "NLP"],
      tools: ["Python", "TensorFlow"],
      links: { github: "https://github.com/Yamuna-b/FitFinder" },
    },
    {
      id: 4,
      title: "SRA – Self Realizing Agent",
      images: ["/backend2.png"],
      shortDesc: "Agentic reasoning and execution prototype",
      fullDesc: "Experimental plan-act-reflect style architecture for autonomous task execution.",
      tags: ["AI/ML", "Agents"],
      tools: ["Python", "Agent loops"],
      links: { github: "https://github.com/Yamuna-b/RepoDocs" },
    },
    {
      id: 5,
      title: "Ecosaur",
      images: ["/showcase6.jpg"],
      shortDesc: "Carbon footprint awareness and analysis",
      fullDesc: "Research-oriented analytics project exploring footprint awareness, mitigation strategies, and reporting.",
      tags: ["AI/ML", "Sustainability"],
      tools: ["Python", "Data Analytics"],
      links: { github: "https://github.com/Yamuna-b/RepoDocs" },
    },
  ],
  devops: [
    {
      id: 1,
      title: "Log Beacon",
      images: ["/backend1.png"],
      shortDesc: "Observability and incident workflow platform",
      fullDesc: "Structured log and incident tracking flows to improve engineering visibility, triage, and escalation.",
      tags: ["DevOps", "Observability"],
      tools: ["Node.js", "Express", "MongoDB"],
      links: {
        github: "https://github.com/Yamuna-b/LogBeacon",
        demo: "https://drive.google.com/file/d/1VIW1KpCmgK-CLCpHbwdMd8BppwnZfHd-/view?usp=sharing",
      },
    },
    {
      id: 2,
      title: "CI/CD with GitHub Actions",
      images: ["/cloud1.png"],
      shortDesc: "Automated build and deploy workflows",
      fullDesc: "Reusable CI/CD pipelines for lint/build/test and deployment automation.",
      tags: ["CI/CD", "GitHub Actions"],
      tools: ["Docker", "Node.js"],
      links: { github: "https://github.com/Yamuna-b/RepoDocs" },
    },
  ],
  frontend: [
    {
      id: 1,
      title: "ErgoCart",
      images: ["/fullstack3.png"],
      shortDesc: "Ergonomic e-commerce frontend",
      fullDesc: "Frontend-focused shopping experience with responsive layouts and ergonomic interaction patterns.",
      tags: ["Frontend", "UI/UX"],
      tools: ["React", "Tailwind CSS"],
      links: { github: "https://github.com/Yamuna-b/ErgoCart" },
    },
  ],
  highlights: [
    {
      id: 1,
      title: "Ecosaur Research Publication",
      images: ["/showcase6.jpg"],
      shortDesc: "Conference-level sustainability research",
      fullDesc: "Presented carbon footprint awareness and mitigation research in an academic setting.",
      tags: ["Research", "Publication"],
      tools: ["Data Analysis", "Presentation"],
      links: { github: "https://github.com/Yamuna-b/RepoDocs" },
    },
    {
      id: 2,
      title: "Designthon Euphoria’24",
      images: ["/showcase1.jpg"],
      shortDesc: "Design competition recognition",
      fullDesc: "Awarded for innovation and presentation quality in a university designthon.",
      tags: ["Highlight", "Award"],
      tools: ["Design Thinking"],
      links: { github: "https://github.com/Yamuna-b/RepoDocs" },
    },
  ],
};

// Helper to check if the file is a video
const isVideo = file => typeof file === "string" && file.match(/\.(mp4|webm|ogg)$/i);

// --- Navbar: minimal recruiter-friendly links + domains ---
function NavBar({ activeSection, setActiveSection, setExpandedCard, scrollHomeTo, openResumePreview }) {
  const navItems = [
    { key: "home", label: "HOME" },
    { key: "projects", label: "PROJECTS" },
    { key: "fullstack", label: "Backend" },
    { key: "ai", label: "AI/ML" },
    { key: "cloud", label: "DevOps" },
    { key: "showcase", label: "Highlights" },
  ];

  const runNavClick = item => {
    setExpandedCard(null);
    if (item.key === "home") {
      setActiveSection("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection(item.key);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f1117]/92 backdrop-blur-md border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-2 sm:py-3 gap-2 sm:gap-0">
      <div className="flex items-center gap-2 order-1 sm:order-1">
        <img
          src="/logo.jpg"
          alt="Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-sky-600/70"
          style={{ background: "#151520" }}
        />
        <span className="font-semibold text-base sm:text-lg text-slate-100 hidden sm:block tracking-tight">Yamuna</span>
      </div>

      <div className="sm:hidden flex items-center gap-2 order-2">
        <span className="font-semibold text-base text-slate-100">Yamuna</span>
      </div>

      <div className="flex-1 flex justify-center order-3 sm:order-2 mt-2 sm:mt-0">
        <div className="flex items-center gap-x-3 sm:gap-x-5 md:gap-x-6 flex-wrap justify-center">
          {navItems.map(item => {
            const isActive =
              item.isJump
                ? false
                : activeSection === item.key;
            const base =
              "text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-150 " +
              (isActive ? "text-sky-400" : "text-slate-200 hover:text-sky-300");
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => runNavClick(item)}
                className={base}
              >
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 hover:text-sky-300"
            onClick={() => scrollHomeTo("contact")}
          >
            CONTACT
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5 order-4 sm:order-3 mt-2 sm:mt-0">
        <button
          type="button"
          onClick={openResumePreview}
          className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-colors"
        >
          Preview
        </button>
        <a
          href="/resume.pdf"
          download="Yamuna_Resume.pdf"
          className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold bg-sky-700 hover:bg-sky-600 text-white transition-colors mr-1"
        >
          Download
        </a>
        <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hidden sm:block">
          <Linkedin className="w-5 h-5 text-sky-400 hover:text-sky-300 transition-colors" />
        </a>
        <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="hidden sm:block">
          <Github className="w-5 h-5 text-slate-300 hover:text-white transition-colors" />
        </a>
        <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer" title="LeetCode" className="hidden lg:block">
          <SiLeetcode className="w-5 h-5 text-amber-500/90 hover:text-amber-400 transition-colors" />
        </a>
      </div>
    </nav>
  );
}

const BackArrow = ({ activeSection, setActiveSection, show, setExpandedCard }) =>
  show && activeSection !== "home" && (
    <button
      onClick={() => {
        setExpandedCard(null);
        setActiveSection("home");
      }}
      className="fixed top-20 sm:top-24 left-4 sm:left-8 z-[120] flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-900/95 backdrop-blur-md rounded-full shadow-lg border border-slate-700 hover:border-sky-700/70 transition-all duration-300 group"
    >
      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:-translate-x-1 transition-transform duration-300" />
      <span className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-sky-300 transition-colors duration-300">Back</span>
    </button>
  );

// --- Profile Avatar with animated stars and your photo ---
function ProfileAvatar() {
  const stars = Array.from({ length: 20 }).map(() => ({
    top: `${25 + Math.random() * 50}%`,
    left: `${25 + Math.random() * 50}%`,
    size: Math.random() * 14 + 6,
    delay: Math.random() * 2,
  }));
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 mx-auto flex items-center justify-center select-none"
    >
      {/* Rotating gradient ring */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, #334155, #0369a1, #334155)",
          filter: "blur(6px)",
          opacity: 0.45,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="absolute inset-0 rounded-full border-[3px] border-sky-500/70 shadow-2xl backdrop-blur" style={{
        boxShadow: "0 0 28px 6px rgba(14,165,233,0.35), 0 0 0 6px rgba(15,23,42,0.4)"
      }} />
      
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            background: "radial-gradient(ellipse at center, rgba(226,232,240,0.9) 50%, rgba(56,189,248,0.55) 100%)",
            opacity: 0.7,
            filter: "blur(1px)",
          }}
          animate={{ 
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: star.delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
      
      <motion.div 
        className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-gradient-to-br from-[#151520] via-[#0f172a] to-[#151520] rounded-full flex items-center justify-center border-[3px] border-sky-500/80 shadow-xl z-10 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img
          src="/profile.png"
          alt="Yamuna"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

function FeaturedThumb({ media, title }) {
  if (typeof media === "string" && media.match(/\.(mp4|webm|ogg)$/i)) {
    return (
      <video
        src={media}
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover opacity-[0.88]"
      />
    );
  }
  return <img src={media} alt={title || ""} className="absolute inset-0 w-full h-full object-cover" />;
}

// --- Contact Section ---
const ContactSection = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <Phone className="text-emerald-500/90 shrink-0 w-5 h-5" />
      <a
        href={`https://wa.me/${personalInfo.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 text-sm break-all"
      >
        <FaWhatsapp className="inline-block shrink-0" /> {personalInfo.phone}
      </a>
    </div>
    <div className="flex items-center gap-3">
      <Mail className="text-sky-500 shrink-0 w-5 h-5" />
      <a
        href={`mailto:${personalInfo.email}`}
        className="text-sky-400 hover:text-sky-300 text-sm break-all"
      >
        {personalInfo.email}
      </a>
    </div>
  </div>
);

// --- Home Page Layout ---
function HomePage({ openResumePreview }) {
  return (
    <section className="min-h-screen pt-20 sm:pt-28 pb-20 bg-gradient-to-b from-[#0b0c10] via-[#0f1419] to-[#0b0c10]">
      <div className="max-w-6xl mx-auto px-4 space-y-14">
        <div className="text-center">
          <ProfileAvatar />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-slate-50 tracking-tight">
              {personalInfo.name}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-sky-400/95 max-w-3xl mx-auto leading-snug">
              {personalInfo.tagline1}
            </p>
            <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.tagline2}
            </p>
          </motion.div>
        </div>

        <motion.div
          id="about"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="scroll-mt-28 bg-[#12141b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg"
        >
          <h2 className="text-lg font-bold text-sky-400 mb-3">About</h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">{personalInfo.bio}</p>
        </motion.div>

        <div id="projects" className="scroll-mt-28">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-4">Featured projects</h2>
          <p className="text-sm text-slate-400 mb-6 max-w-2xl">
            Systems-focused work spanning APIs, persistence, and delivery—each distilled to outcomes you can ask about in an interview.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project, idx) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
                className="bg-[#12141b] border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col"
              >
                <div className="relative h-40 bg-slate-900 border-b border-slate-800">
                  <FeaturedThumb media={project.image} title={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141b] via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">{project.title}</h3>
                    <p className="text-sm text-slate-400 mt-1 leading-snug">{project.tagline}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(s => (
                      <span key={s} className="px-2.5 py-0.5 bg-sky-950/70 text-sky-200 rounded-md text-xs font-medium border border-sky-900/80">
                        {s}
                      </span>
                    ))}
                  </div>
                  <ul className="text-sm text-slate-300 space-y-1.5 list-disc ml-5 flex-1">
                    {project.bullets.map((b, bi) => (
                      <li key={`${project.title}-${bi}`}>{b}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {project.links?.github && project.links.github !== "#" ? (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-sky-400 hover:text-sky-300"
                      >
                        View code →
                      </a>
                    ) : null}
                    {project.links?.live && project.links.live !== "#" ? (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-sky-400 hover:text-sky-300"
                      >
                        Demo video →
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          id="skills"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="scroll-mt-28 bg-[#12141b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg"
        >
          <h2 className="text-lg font-bold text-sky-400 mb-5">Technical skills</h2>
          <div className="space-y-5">
            {personalInfo.skillGroups.map(group => (
              <div key={group.title}>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">{group.title}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <span
                      key={item}
                      className="px-2.5 py-1 bg-slate-800/90 text-slate-200 rounded-md text-xs border border-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          id="contact"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="scroll-mt-28 max-w-lg mx-auto bg-[#12141b] border border-slate-800 rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-lg font-bold text-sky-400 mb-4 text-center">Get in touch</h2>
          <ContactSection />
          <div className="flex justify-center gap-4 mt-5">
            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6 text-sky-400 hover:text-sky-300 transition-colors" />
            </a>
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-6 h-6 text-slate-300 hover:text-white transition-colors" />
            </a>
            <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <SiLeetcode className="w-6 h-6 text-amber-500/90 hover:text-amber-400 transition-colors" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              type="button"
              onClick={openResumePreview}
              className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold text-sm transition-colors"
            >
              Preview
            </button>
            <a
              href="/resume.pdf"
              download="Yamuna_Resume.pdf"
              className="px-5 py-2.5 bg-sky-700 hover:bg-sky-600 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" /> Download
            </a>
          </div>
        </motion.div>

        <motion.div
          id="experience"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="scroll-mt-28 bg-[#12141b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg"
        >
          <h2 className="text-lg font-bold text-sky-400 mb-5">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={`${exp.company}-${idx}`} className="flex gap-4 pb-6 border-b border-slate-800 last:border-0 last:pb-0">
                <img src={exp.logo} className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-800 shrink-0" alt="" />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-100">
                    {exp.role} · {exp.company}
                  </div>
                  <div className="text-xs text-sky-500 mt-0.5">{exp.duration}</div>
                  <p className="text-sm text-slate-400 mt-2">{exp.desc}</p>
                  {exp.bullets?.length ? (
                    <ul className="mt-3 text-sm text-slate-300 space-y-1.5 list-disc ml-5">
                      {exp.bullets.map(bullet => (
                        <li key={bullet.slice(0, 52)}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {exp.link ? (
                    <a
                      href={exp.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 px-3 py-1.5 bg-sky-800 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      {exp.link.text}
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            id="education"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="scroll-mt-28 bg-[#12141b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg"
          >
            <h2 className="text-lg font-bold text-sky-400 mb-4">Education</h2>
            {education.map(edu => (
              <div key={edu.degree} className="mb-5 flex gap-3 last:mb-0">
                <img src={edu.logo} className="w-11 h-11 rounded-full object-cover ring-2 ring-sky-800 shrink-0" alt="" />
                <div>
                  <div className="text-sm font-semibold text-slate-100">{edu.degree}</div>
                  <div className="text-xs text-sky-500">{edu.year}</div>
                  <div className="text-xs text-slate-400 mt-1">{edu.org}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            id="leadership"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="scroll-mt-28 bg-[#12141b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg"
          >
            <h2 className="text-lg font-bold text-sky-400 mb-4">Leadership & campus roles</h2>
            <div className="space-y-5 text-sm">
              <div className="flex gap-3">
                <img src="/Vcetlogo.jpg" className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-800 shrink-0" alt="" />
                <div>
                  <div className="font-semibold text-slate-100">Class Representative</div>
                  <div className="text-xs text-sky-500 mt-0.5">B.E. CSE Dept (2024–Present)</div>
                  <div className="text-xs text-slate-400 mt-1">Velammal College of Engineering and Technology</div>
                  <p className="text-slate-300 mt-2 text-xs leading-relaxed">
                    Relayed coursework and departmental updates between faculty and classmates; coordinated schedules and surfaced blockers early so deadlines stayed workable.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <img src="/Vcetlogo.jpg" className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-800 shrink-0" alt="" />
                <div>
                  <div className="font-semibold text-slate-100">Placement Batch Head</div>
                  <div className="text-xs text-sky-500 mt-0.5">B.E. CSE (2025–Present)</div>
                  <div className="text-xs text-slate-400 mt-1">Velammal College of Engineering and Technology</div>
                  <p className="text-slate-300 mt-2 text-xs leading-relaxed">
                    Helped synchronize placement cohort communication—announcements, deadlines, and escalation paths—keeping the batch aligned with training and recruiter timelines.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <img src="/Vcetlogo.jpg" className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-800 shrink-0" alt="" />
                <div>
                  <div className="font-semibold text-slate-100">Committee Head · Academic Cell</div>
                  <div className="text-xs text-sky-500 mt-0.5">2024–Present · VCET</div>
                  <div className="text-xs text-slate-400 mt-1">Academic coordination and initiatives</div>
                </div>
              </div>
              <div className="flex gap-3">
                <img src="/Vcetlogo.jpg" className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-800 shrink-0" alt="" />
                <div>
                  <div className="font-semibold text-slate-100">Eco Club Member</div>
                  <div className="text-xs text-sky-500 mt-0.5">VCET · 2024–Present</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          id="languages-soft-skills"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="scroll-mt-28 bg-[#12141b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg"
        >
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Languages</h3>
              {personalInfo.languages.map(lang => (
                <div key={lang.name} className="flex justify-between text-sm text-slate-300 py-1.5 border-b border-slate-800 last:border-0">
                  <span>{lang.name}</span>
                  <span className="text-sky-500 font-medium">{lang.level}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Soft skills</h3>
              <div className="flex flex-wrap gap-2">
                {personalInfo.softSkills.map(skill => (
                  <span key={skill} className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded-md text-xs border border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div id="coding-activity" className="scroll-mt-28 max-w-5xl mx-auto pb-8">
          <Stats />
        </div>
      </div>
    </section>
  );
}

// --- Project Card Grid, Tabs, Modal, and App Component ---
function ProjectGrid({ cards, expandedCard, setExpandedCard, columnsLg = 2, invisible = false }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const gridClass = columnsLg === 4 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 auto-rows-auto"
    : "grid grid-cols-1 md:grid-cols-2 gap-7 auto-rows-auto";

  const cardClass = invisible
    ? "relative group rounded-2xl cursor-pointer overflow-hidden hover:scale-105 transition-all duration-300 flex items-center justify-center min-h-[220px] bg-transparent"
    : "relative group rounded-2xl shadow-lg border border-gray-800 cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center min-h-[220px] bg-[#0d0d15]";

  return (
    <div className={gridClass}>
      {cards.map((project, idx) => {
        const images = (project.images && project.images.length > 0) ? project.images : [project.src];
        const onlyVideos = images.every(isVideo);
        const onlyImages = images.every(img => !isVideo(img));
        const singleVideo = onlyVideos && images.length === 1;
        const singleImage = onlyImages && images.length === 1;
        const multipleImages = onlyImages && images.length > 1;

        return (
          <div
            key={project.id || project.title}
            className={cardClass}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => !invisible && setExpandedCard(idx)}
            style={{ cursor: invisible ? 'default' : 'pointer' }}
          >
            {/* Single Video */}
            {singleVideo && (
              <video
                src={images[0]}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                className="w-full h-full object-contain"
              />
            )}

            {/* Single Image */}
            {singleImage && (
              <img
                src={images[0]}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            )}

            {/* Multiple Images (Swiper) */}
            {multipleImages && (
              <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop
                className="w-full h-full"
              >
                {images.map((img, i) => (
                  <SwiperSlide key={i} className="!h-full flex items-center justify-center">
                    <img
                      src={img}
                      alt={project.title}
                      className="w-full h-full object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* Hover overlay: only on hover, pretty effect */}
            <AnimatePresence>
              {hoveredCard === idx && expandedCard === null && !invisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 backdrop-blur rounded-2xl p-6"
                >
                  <h2 className="text-lg font-bold text-white mb-2 text-center">{project.title}</h2>
                  <p className="text-sm text-blue-100 mb-2 text-center">{project.shortDesc || project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-2 justify-center">
                    {(project.tags || []).map(tag => (
                      <span key={tag} className="px-3 py-1 bg-blue-900 text-blue-100 text-xs rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 justify-center">
                    {(project.tools || []).map(tool => (
                      <span key={tool} className="px-3 py-1 bg-fuchsia-900 text-fuchsia-100 text-xs rounded-full">{tool}</span>
                    ))}
                  </div>
                  <span className="text-xs text-blue-200 mt-2">(Click to expand)</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Modal expand on click (unchanged, still uses MediaSwiper for expanded view) */}
            <AnimatePresence>
              {expandedCard === idx && (
                <motion.div
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setExpandedCard(null)}
                >
                  <motion.div
                    className="relative w-[98vw] h-[95vh] rounded-2xl overflow-hidden"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                  >
                    {/* Full screen media */}
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <MediaSwiper
                        mediaList={project.images || [project.src]}
                        className="w-full h-full"
                      />
                    </div>

                    {/* Close button - X */}
                    <button
                      onClick={() => setExpandedCard(null)}
                      className="absolute top-4 right-4 z-[110] text-white bg-blue-900 hover:bg-red-600 rounded-full w-12 h-12 flex items-center justify-center text-3xl font-bold shadow-lg"
                      aria-label="Close"
                    >
                      ×
                    </button>

                    {/* GitHub button - bottom center */}
                    {project.links && Object.entries(project.links).filter(([key]) => {
                      return !['demo', 'behance', 'figma'].includes(key.toLowerCase());
                    }).map(([key, url]) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[110] px-8 py-3 bg-gradient-to-r from-blue-700 to-fuchsia-700 text-white rounded-xl font-bold text-sm shadow-lg hover:scale-110 hover:bg-blue-800 transition-all duration-200"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </a>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function TabbedSection({ title, tabs, cardsByTab, expandedCard, setExpandedCard }) {
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
          <ProjectGrid cards={currentCards} expandedCard={expandedCard} setExpandedCard={setExpandedCard} />
        )}
      </div>
    </div>
  );
}

// Section for Cloud, AI, etc.
function Section({ title, cards, expandedCard, setExpandedCard, columnsLg = 2, invisible = false }) {
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
    <div className="min-h-screen pt-20 sm:pt-32 pb-16 bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-4 mt-8">{title}</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {filteredCards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found matching "{searchQuery}"</p>
          </div>
        ) : (
          <ProjectGrid cards={filteredCards} expandedCard={expandedCard} setExpandedCard={setExpandedCard} columnsLg={columnsLg} invisible={invisible} />
        )}
      </div>
    </div>
  );
}

function ProjectsOverview({ expandedCard, setExpandedCard }) {
  const grouped = [
    { title: "Backend + Full Stack", cards: projectCatalog.backend },
    { title: "AI/ML", cards: projectCatalog.ai },
    { title: "DevOps", cards: projectCatalog.devops },
    { title: "Frontend", cards: projectCatalog.frontend },
    { title: "Highlights", cards: projectCatalog.highlights },
  ];

  return (
    <div className="min-h-screen pt-20 sm:pt-32 pb-16 bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-4 mt-8">Projects</h1>
        <p className="text-slate-400 mb-8">Grouped by domain so each track maps clearly to your SDE narrative.</p>
        <div className="space-y-12">
          {grouped.map(group => (
            <section key={group.title}>
              <h2 className="text-2xl font-semibold text-sky-300 mb-4">{group.title}</h2>
              <ProjectGrid cards={group.cards} expandedCard={expandedCard} setExpandedCard={setExpandedCard} />
            </section>
          ))}
        </div>
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
        className="relative w-full max-w-5xl h-[88vh] bg-[#0f1117] border border-slate-700 rounded-2xl overflow-hidden"
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
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.js">
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

// --- Auto-Moving Carousel Component ---
function AutoCarousel({ images, title }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-blue-300 mb-8 text-center">{title}</h2>
      <div className="relative overflow-hidden px-4">
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={3}
          spaceBetween={24}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true}
          className="!pb-8"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {images.map((img, idx) => {
            const isVideo = typeof img === "string" && img.match(/\.(mp4|webm|ogg)$/i);
            
            return (
              <SwiperSlide key={idx}>
                <div className="relative aspect-square w-full flex items-center justify-center">
                  {isVideo ? (
                    <video
                      src={img}
                      alt={`${title} ${idx + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={img}
                      alt={`${title} ${idx + 1}`}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

// --- Showcase Section Component ---
function ShowcaseSection() {
  // Generate certification images (cert1.jpg to cert18)
  const certifications = [
    '/cert1.jpg', '/cert2.jpg', '/cert3.jpg', '/cert4.jpg', '/cert5.jpg', '/cert6.jpg',
    '/cert7.jpg', '/cert8.jpg', '/cert9.jpg', '/cert10.jpg', '/cert11.jpg', '/cert12.jpg',
    '/cert13.png', '/cert14.jpg', '/cert15.jpg', '/cert16.png', '/cert17.png', '/cert18.jpeg'
  ];
  
  // Platform badges
  const platformBadges = ['/badge_1.png', '/badge_2.png', '/badge_3.jpg', '/badge_4.png'];
  
  // Open source contribution
  const openSource = ['/open_1.png', '/open_2.png', '/open_3.png'];

  return (
    <div className="min-h-screen pt-20 sm:pt-32 pb-16 bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8 mt-8 text-center">Visual Highlights</h1>
        
        {/* Combined Showcase Card with Image and Victory Quote */}
        <div className="mb-16 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden"
          >
            {/* Image Section */}
            <div className="relative h-[28rem] sm:h-[32rem] md:h-[36rem]">
              <img
                src="/showcase1.jpg"
                alt="Showcase"
                className="w-full h-full object-contain p-4"
              />
            </div>
            
            {/* Victory Quote Section */}
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md p-6 border-t border-blue-500/20">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                  "First Taste of Victory"
                </h2>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certifications Carousel */}
        <AutoCarousel images={certifications} title="Certifications" />

        {/* Platform Badges Carousel */}
        <div className="mb-12 max-w-3xl mx-auto">
          <AutoCarousel images={platformBadges} title="Platform Badges" />
        </div>

        {/* Open Source Contribution Carousel */}
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
  const [expandedCard, setExpandedCard] = useState(null);
  const [isResumePreviewOpen, setResumePreviewOpen] = useState(false);

  const scrollHomeTo = useCallback(sectionId => {
    setExpandedCard(null);
    setActiveSection("home");
    queueMicrotask(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <div className="min-h-screen bg-[#0b0c10] font-sans text-slate-200 antialiased">
        <Bubbles />
        <NavBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setExpandedCard={setExpandedCard}
          scrollHomeTo={scrollHomeTo}
          openResumePreview={() => setResumePreviewOpen(true)}
        />
        <BackArrow
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setExpandedCard={setExpandedCard}
          show={expandedCard === null}
        />
        {activeSection === "home" && <HomePage openResumePreview={() => setResumePreviewOpen(true)} />}
        {activeSection === "projects" && (
          <ProjectsOverview expandedCard={expandedCard} setExpandedCard={setExpandedCard} />
        )}
        {activeSection === "cloud" && (
          <Section
            title="DevOps & Cloud"
            cards={projectCatalog.devops}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
          />
        )}
        {activeSection === "ai" && (
          <Section
            title="AI/ML Projects"
            cards={projectCatalog.ai}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
          />
        )}
        {activeSection === "fullstack" && (
          <Section
            title="Backend & APIs"
            cards={projectCatalog.backend}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
          />
        )}
        {activeSection === "showcase" && <ShowcaseSection />}
        {activeSection === "video" && (
          <section className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-[#101018] via-[#181829] to-[#23233a]">
            <div className="max-w-6xl mx-auto px-4">
              <h1 className="text-4xl font-bold text-white mb-8 text-center">Video Showcase</h1>
              <VideoSwiper videos={["/video1.mp4", "/video2.mp4", "/video3.mp4"]} />
            </div>
          </section>
        )}
        
        {/* Footer */}
        <Footer personalInfo={personalInfo} scrollHomeTo={scrollHomeTo} />
        <ResumePreviewModal
          open={isResumePreviewOpen}
          onClose={() => setResumePreviewOpen(false)}
        />
      </div>
    </motion.div>
  );
}

// Universal Swiper for images/videos with autoplay loop and no controls
function MediaSwiper({ mediaList, className = "", swiperProps = {} }) {
  const swiperRef = useRef(null);
  const videoRefs = useRef({});

  // Helper: Advance slide after image timer or video end
  const handleSlide = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    const idx = swiper.realIndex;
    const video = videoRefs.current[idx];

    // Pause/reset all videos
    Object.values(videoRefs.current).forEach(v => {
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    });

    // Clear any existing timers
    if (swiper._customTimer) {
      clearTimeout(swiper._customTimer);
      swiper._customTimer = null;
    }

    if (video) {
      video.currentTime = 0;
      video.play();
      video.onended = () => {
        if (mediaList.length > 1) swiper.slideNext();
      };
    } else {
      // Image: advance after 2.5s
      if (mediaList.length > 1) {
        swiper._customTimer = setTimeout(() => swiper.slideNext(), 2500);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => handleSlide(), 0);
    return () => {
      if (swiperRef.current && swiperRef.current._customTimer) {
        clearTimeout(swiperRef.current._customTimer);
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Swiper
      modules={[Pagination, Navigation]}
      slidesPerView={1}
      loop={mediaList.length > 1}
      autoplay={false}
      pagination={{ clickable: true }}
      navigation={mediaList.length > 1}
      onSwiper={swiper => {
        swiperRef.current = swiper;
        handleSlide();
      }}
      onSlideChange={handleSlide}
      className={className}
      {...swiperProps}
    >
      {mediaList.map((media, idx) => (
        <SwiperSlide key={idx} className="flex items-center justify-center">
          {isVideo(media) ? (
            <video
              ref={el => (videoRefs.current[idx] = el)}
              src={media}
              muted
              autoPlay={mediaList.length === 1}
              playsInline
              loop={mediaList.length === 1}
              controls={false}
              className="w-full h-full object-contain"
              style={{ pointerEvents: "none" }}
            />
          ) : (
            <img
              src={media}
              alt=""
              className="w-full h-full object-contain"
              draggable={false}
              style={{ pointerEvents: "none" }}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
