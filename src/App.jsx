import React, { useRef, useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  ArrowLeft, Linkedin, Github, Instagram, Download, Mail, Phone
} from "lucide-react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Footer from "./components/Footer";
import Badges from "./components/Badges";
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
      {Array.from({ length: 40 }).map((_, i) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = Math.random() * 14 + 6;
        const driftX = (Math.random() - 0.5) * 50;
        const driftY = (Math.random() - 0.5) * 50;
        const colors = ['bg-blue-300', 'bg-purple-300', 'bg-pink-300', 'bg-cyan-300'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            className={"absolute rounded-full " + color + " opacity-20 blur-xl"}
            style={{ width: size, height: size }}
            initial={{ top: top + '%', left: left + '%' }}
            animate={{
              top: [top + '%', (top + driftY) + '%', top + '%'],
              left: [left + '%', (left + driftX) + '%', left + '%'],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
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
  tagline1: "Aspiring DevOps & Cloud Engineer",
  tagline2: "Full Stack Enthusiast | Open Source Contributor",
  email: "yamuna.bsvy@gmail.com",
  phone: "+91-9629163099",
  whatsapp: "919629163099",
  bio: "Flexible and quick-adapting Computer Science undergraduate passionate about DevOps and Cloud. Eager to learn and experiment with new technologies; thrive in innovative environments and open source communities. Recognized for adaptability, creative problem-solving.",
  bio2: "Computer Science Student | Aspiring DevOps & Cloud Engineer | Full Stack Enthusiast & Open Source Contributor",
  techStacks: [
    "Python", "JavaScript", "Java", "C", "React.js", "Node.js", "Express.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "MongoDB", "PostgreSQL", "MySQL", "AWS", "Google Cloud", "Docker", "Kubernetes", "Git", "GitHub Actions", "Heroku CI/CD", "WebSockets", "Redis", "LaTeX", "Postman"
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
    desc: "Worked on modern web applications using React and Node.js."
  },
  {
    logo: "/Nittelogo.jpg",
    company: "IEEE Conference (ECOSAUR)",
    role: "Presenter",
    duration: "Feb 2024",
    desc: "Presented research on carbon footprint awareness and mitigation at NITTE, Karnataka.",
    link: { text: "View Publication", url: "#" }
  },
  {
    logo: "/Reccsarlogo.jpg",
    company: "Reccsar Private Limited",
    role: "Cloud Computing Intern",
    duration: "June 2025",
    desc: "Developed dashboards for non-profit initiatives."
  }
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

const certifications = [
  { src: "/cert1.jpg", title: "Designthon Euphoria'24" },
  { src: "/cert2.jpg", title: "Project Expo Techathon'24" },
  { src: "/cert3.jpg", title: "Robotics MOBIUS 2k24" },
  { src: "/cert4.jpg", title: "Designthon Euphoria'24" },
  { src: "/cert5.jpg", title: "Project Expo Techathon'24" },
  { src: "/cert6.jpg", title: "Robotics MOBIUS 2k24" },
  { src: "/cert7.jpg", title: "Robotics MOBIUS 2k24" },
  { src: "/cert8.jpg", title: "Designthon Euphoria'24" },
  { src: "/cert9.jpg", title: "Project Expo Techathon'24" },
];

const platformBadges = [
  { src: "/badge1.png", title: "Open Source Contributor" },
  { src: "/badge2.png", title: "Social Media Marketing" },
  { src: "/badge3.png", title: "AWS Certified" },
  { src: "/badge4.png", title: "Holopin Badges" },
  { src: "/badge5.png", title: "GitHub Achievements" },
  { src: "/badge7.png", title: "LeetCode Knight" },
  { src: "/badge8.png", title: "CodeChef Star" },
  { src: "/badge9.png", title: "Azure Certified" },
  { src: "/badge10.png", title: "Docker Certified" },
  { src: "/badge11.png", title: "Kubernetes Badge" },
  { src: "/badge12.png", title: "Google Cloud" },
];

const projects = {
  cloud: [
    {
      id: 1,
      title: "AWS Microservices",
      images: ["/cloud1.png", "/cloud1.png"],
      shortDesc: "Scalable microservices architecture",
      fullDesc: "Designed cloud-native microservices using AWS ECS, Docker, and CI/CD pipelines.",
      tags: ["AWS", "Docker"],
      tools: ["Terraform", "ECS"],
      links: { github: "#" }
    },
    {
      id: 2,
      title: "CI/CD Pipeline",
      images: ["/cloud1.png"],
      shortDesc: "Automated deployment pipeline",
      fullDesc: "Set up an automated CI/CD pipeline using GitHub Actions and Docker.",
      tags: ["CI/CD", "GitHub Actions"],
      tools: ["Docker"],
      links: { github: "#" }
    },
    {
      id: 3,
      title: "Cloud Monitoring",
      images: ["/cloud1.png"],
      shortDesc: "Cloud monitoring dashboard",
      fullDesc: "Built a real-time dashboard for AWS resource monitoring.",
      tags: ["AWS", "Monitoring"],
      tools: ["CloudWatch"],
      links: { github: "#" }
    },
    {
      id: 4,
      title: "Kubernetes Cluster",
      images: ["/cloud2.png"],
      shortDesc: "Container orchestration",
      fullDesc: "Set up Kubernetes cluster for microservices deployment.",
      tags: ["Kubernetes", "Docker"],
      tools: ["K8s"],
      links: { github: "#" }
    },
    {
      id: 5,
      title: "Terraform Infrastructure",
      images: ["/cloud3.png"],
      shortDesc: "Infrastructure as Code",
      fullDesc: "Automated AWS infrastructure using Terraform.",
      tags: ["Terraform", "IaC"],
      tools: ["AWS"],
      links: { github: "#" }
    },
    {
      id: 6,
      title: "Serverless API",
      images: ["/cloud4.png"],
      shortDesc: "AWS Lambda functions",
      fullDesc: "Built serverless REST API using AWS Lambda and API Gateway.",
      tags: ["Serverless", "Lambda"],
      tools: ["AWS"],
      links: { github: "#" }
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
      links: { github: "#", demo: "#" }
    },
    {
      id: 2,
      title: "Portfolio Website",
      images: ["/fullstack1.png"],
      shortDesc: "Personal portfolio site",
      fullDesc: "Built my own portfolio using React and Tailwind.",
      tags: ["React", "Tailwind"],
      tools: ["TailwindCSS"],
      links: { github: "#" }
    },
    {
      id: 3,
      title: "Dashboard UI",
      images: ["/fullstack2.png"],
      shortDesc: "Analytics dashboard",
      fullDesc: "Interactive dashboard with charts and data visualization.",
      tags: ["React", "Charts"],
      tools: ["Chart.js"],
      links: { github: "#" }
    },
    {
      id: 4,
      title: "Landing Page",
      images: ["/fullstack3.png"],
      shortDesc: "Modern landing page",
      fullDesc: "Responsive landing page with animations.",
      tags: ["HTML", "CSS"],
      tools: ["GSAP"],
      links: { github: "#" }
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
      links: { github: "#" }
    },
    {
      id: 2,
      title: "Marine Taxa Classification",
      images: ["/ai_2.mp4"],
      shortDesc: "AI for classifying marine species",
      fullDesc: "Computer vision system that classifies marine organisms from underwater imagery using convolutional neural networks.",
      tags: ["AI", "Marine Biology", "Computer Vision"],
      tools: ["Python", "PyTorch", "OpenCV"],
      links: { github: "#" }
    },
    {
      id: 3,
      title: "Menstrual Health AI Chatbot",
      images: ["/ai_3.mp4"],
      shortDesc: "AI chatbot for menstrual health",
      fullDesc: "Chatbot offering resources for PCOD, PMS, PMDD.",
      tags: ["AI", "Chatbot", "Healthcare"],
      tools: ["Python", "TensorFlow"],
      links: { github: "#" }
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

// Helper to check if the file is a video
const isVideo = file => typeof file === "string" && file.match(/\.(mp4|webm|ogg)$/i);

// --- Navbar with shine, spacing, and big text ---
function NavBar({ activeSection, setActiveSection, setExpandedCard }) {
  const navItems = [
    { key: "home", label: "HOME" },
    { key: "cloud", label: "Cloud & DevOps" },
    { key: "ai", label: "AI/ML" },
    { key: "fullstack", label: "Full Stack" },
    { key: "uiux", label: "UI/UX" },
    { key: "showcase", label: "Visual Highlights" }
  ];

  const navShineCSS = '\n' +
        '        .nav-shine {\n' +
        '          position: relative;\n' +
        '          transition: color 0.2s ease-out;\n' +
        '          transition-delay: 0.1s;\n' +
        '        }\n' +
        '        .nav-shine:hover, .nav-shine:focus {\n' +
        '          color: rgba(255, 255, 255, 0.2);\n' +
        '          transition-delay: 0s;\n' +
        '        }\n' +
        '        .nav-shine::before {\n' +
        '          content: attr(data-text);\n' +
        '          position: absolute;\n' +
        '          top: 50%;\n' +
        '          left: 50%;\n' +
        '          transform: translate(-50%, -50%);\n' +
        '          color: #d83bff;\n' +
        '          text-shadow: 0 0 10px #d83bff, 0 0 30px #d83bff, 0 0 80px #d83bff;\n' +
        '          letter-spacing: 40px;\n' +
        '          white-space: nowrap;\n' +
        '          text-align: center;\n' +
        '          opacity: 0;\n' +
        '          transition: opacity 0.25s ease-out, letter-spacing 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n' +
        '          font-size: 0.65em;\n' +
        '          font-weight: 500;\n' +
        '          z-index: -1;\n' +
        '          pointer-events: none;\n' +
        '        }\n' +
        '        .nav-shine:hover::before {\n' +
        '          opacity: 1;\n' +
        '          letter-spacing: 6px;\n' +
        '          transition-delay: 0.05s;\n' +
        '        }\n' +
        '        ';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: navShineCSS }}></style>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#13131c]/95 backdrop-blur border-b border-gray-800 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-2 sm:py-3">
        <div className="flex items-center gap-2 order-1 sm:order-1">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-blue-400 shadow"
            style={{ background: "#23233a" }}
          />
          <span className="font-bold text-lg sm:text-xl text-white hidden sm:block">Yamuna</span>
        </div>
        
        {/* Mobile menu button */}
        <div className="sm:hidden order-2 flex items-center gap-2">
          <span className="font-bold text-lg text-white">Yamuna</span>
        </div>
        
        <div className="flex-1 flex justify-center order-3 sm:order-2 mt-2 sm:mt-0">
          <div className="flex items-center gap-x-4 sm:gap-x-8 md:gap-x-12 flex-wrap justify-center">
            {navItems.map(({ key, label }) => {
              const isActive = activeSection === key;
              const activeClass = key === "showcase" ? "text-yellow-300 underline" : "text-blue-300";
              const className = `nav-shine text-sm sm:text-lg font-bold ${isActive ? activeClass : "text-white"}`;
              const style = {}; // Remove fixed margins for responsive design
              
              return (
                <button
                  key={key}
                  data-text={label}
                  onClick={() => {
                    setExpandedCard(null);
                    setActiveSection(key);
                  }}
                  className={className}
                  style={style}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 order-4 sm:order-3 mt-2 sm:mt-0">
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="hidden sm:block"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 hover:scale-110 transition" />
          </a>
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="hidden sm:block"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-200 hover:scale-110 transition" />
          </a>
          <a
            href={personalInfo.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="hidden sm:block"
          >
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 hover:scale-110 transition" />
          </a>
          <a
            href={personalInfo.social.telegram}
            target="_blank"
            rel="noopener noreferrer"
            title="Telegram"
            className="hidden md:block"
          >
            <FaTelegramPlane className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 hover:scale-110 transition" />
          </a>
          <a
            href={personalInfo.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            title="LeetCode"
            className="hidden lg:block"
          >
            <SiLeetcode className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 hover:scale-110 transition" />
          </a>
        </div>
      </nav>
    </>
  );
}

const BackArrow = ({ activeSection, setActiveSection, show, setExpandedCard }) =>
  show && activeSection !== "home" && (
    <button
      onClick={() => {
        setExpandedCard(null);
        setActiveSection("home");
      }}
      className="fixed top-20 sm:top-24 left-4 sm:left-8 z-[120] flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-blue-900/90 to-purple-900/90 backdrop-blur-md rounded-full shadow-xl border border-blue-500/30 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group"
    >
      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:-translate-x-1 transition-transform duration-300" />
      <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-200 transition-colors duration-300">Back</span>
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
          background: "conic-gradient(from 0deg, #38bdf8, #a21caf, #38bdf8)",
          filter: "blur(8px)"
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="absolute inset-0 rounded-full border-4 border-blue-400 shadow-2xl backdrop-blur" style={{
        boxShadow: "0 0 40px 10px rgba(80,180,255,0.6), 0 0 0 8px rgba(80,180,255,0.15)"
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
            background: "radial-gradient(ellipse at center, #fff 50%, #38bdf8 100%)",
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
        className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-gradient-to-br from-[#23233a] via-[#181829] to-[#23233a] rounded-full flex items-center justify-center border-4 border-blue-300 shadow-xl z-10 overflow-hidden"
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

// --- Contact Section ---
const ContactSection = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <Phone className="text-green-400" />
      <a
        href={`https://wa.me/${personalInfo.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-green-400 hover:text-green-200"
      >
        <FaWhatsapp className="inline-block" /> {personalInfo.phone}
      </a>
    </div>
    <div className="flex items-center gap-3">
      <Mail className="text-blue-400" />
      <a
        href={`mailto:${personalInfo.email}`}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-200"
      >
        {personalInfo.email}
      </a>
    </div>
  </div>
);

// --- Home Page Layout ---
function HomePage() {
  return (
    <section className="min-h-screen pt-20 sm:pt-32 pb-16 bg-gradient-to-br from-[#101018] via-[#181829] to-[#23233a]">
      <div className="max-w-6xl mx-auto px-4">
        <ProfileAvatar />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-2"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {personalInfo.name}
          </h1>
          <div className="text-xl font-semibold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            {personalInfo.tagline1}
          </div>
          <div className="text-base text-blue-300 mt-1">{personalInfo.tagline2}</div>
        </motion.div>
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex-1 bg-[#181829] rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <h2 className="text-xl font-bold text-blue-300 mb-4">About Me</h2>
            <p className="text-sm text-blue-100 mb-4 leading-relaxed">{personalInfo.bio}</p>
            <p className="text-sm text-blue-100 mb-4 leading-relaxed">{personalInfo.bio2}</p>
            <h3 className="text-base font-semibold text-blue-200 mt-4 mb-2">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {personalInfo.techStacks.map((skill, idx) => (
                <motion.span 
                  key={skill} 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="px-3 py-1 bg-blue-900 text-blue-100 rounded-full text-xs hover:bg-blue-800 hover:scale-110 transition-all duration-200 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex-1 bg-[#181829] rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <h2 className="text-xl font-bold text-blue-300 mb-4">Get In Touch</h2>
            <ContactSection />
            <div className="flex gap-3 mt-4">
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="w-6 h-6 text-blue-400 hover:scale-110 transition" /></a>
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer"><Github className="w-6 h-6 text-gray-200 hover:scale-110 transition" /></a>
              <a href={personalInfo.social.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="w-6 h-6 text-pink-400 hover:scale-110 transition" /></a>
              <a href={personalInfo.social.telegram} target="_blank" rel="noopener noreferrer"><FaTelegramPlane className="w-6 h-6 text-blue-400 hover:scale-110 transition" /></a>
              <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer"><SiLeetcode className="w-6 h-6 text-yellow-300 hover:scale-110 transition" /></a>
            </div>
            <a 
              href="/resume.pdf" 
              download="Yamuna_Resume.pdf"
              className="w-full mt-4 px-5 py-2 bg-gradient-to-r from-blue-900 to-fuchsia-800 text-white rounded-2xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Resume
            </a>

            {/* Languages & Soft Skills */}
            <div className="mt-6 pt-6 border-t border-blue-500/20">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold mb-3 text-white">Languages</div>
                  {personalInfo.languages.map(lang => (
                    <div key={lang.name} className="flex justify-between text-blue-100 text-xs py-1 rounded hover:bg-[#23233a] transition-colors mb-1">
                      <span>{lang.name}</span>
                      <span className="text-blue-400 font-semibold">{lang.level}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold mb-3 text-white">Soft Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {personalInfo.softSkills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-blue-900 text-blue-100 rounded-full text-xs hover:bg-blue-800 hover:scale-105 transition-all duration-200 cursor-default">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {/* Experience */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#181829] rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <h2 className="text-xl font-bold text-blue-300 mb-4">Experience</h2>
            {experience.map((exp, idx) => (
              <motion.div 
                key={exp.company} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="mb-4 flex items-start gap-2 p-3 rounded-xl hover:bg-[#23233a] transition-colors duration-200"
              >
                <img src={exp.logo} className="w-10 h-10 rounded-full mt-1 object-cover border-2 border-blue-400" alt="Logo" />
                <div>
                  <div className="text-sm font-semibold text-white">{exp.role} @ {exp.company}</div>
                  <div className="text-xs text-blue-400">{exp.duration}</div>
                  <div className="text-xs text-blue-100">{exp.desc}</div>
                  {/* Publication button for ECOSAUR */}
                  {exp.link && (
                    <a
                      href={exp.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-4 py-2 bg-gradient-to-r from-blue-700 to-fuchsia-700 text-white rounded-xl font-bold text-sm shadow-lg hover:scale-105 hover:bg-blue-800 transition-all duration-200"
                    >
                      {exp.link.text}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Education */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#181829] rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <h2 className="text-xl font-bold text-blue-300 mb-4">Education</h2>
            {education.map((edu, idx) => (
              <motion.div 
                key={edu.degree} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="mb-3 flex items-center gap-2 p-3 rounded-xl hover:bg-[#23233a] transition-colors duration-200"
              >
                <img src={edu.logo} className="w-10 h-10 rounded-full object-cover border-2 border-blue-400" alt="Logo" />
                <div>
                  <div className="text-sm font-semibold text-white">{edu.degree}</div>
                  <div className="text-xs text-blue-400">{edu.year}</div>
                  <div className="text-xs text-blue-100">{edu.org}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Leadership & Campus Roles */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#181829] rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <h2 className="text-xl font-bold text-blue-300 mb-4">Leadership & Campus Roles</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-3 rounded-xl hover:bg-[#23233a] transition-colors duration-200">
                <img src="/Vcetlogo.jpg" className="w-8 h-8 rounded-full object-cover border-2 border-blue-400" alt="VCET Logo" />
                <div>
                  <div className="text-sm font-semibold text-white">Class Representative</div>
                  <div className="text-xs text-blue-400">B.E. CSE Dept (2024–Present)</div>
                  <div className="text-xs text-blue-100">Velammal College of Engineering and Technology</div>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl hover:bg-[#23233a] transition-colors duration-200">
                <img src="/Vcetlogo.jpg" className="w-8 h-8 rounded-full object-cover border-2 border-blue-400" alt="VCET Logo" />
                <div>
                  <div className="text-sm font-semibold text-white">Placement Batch Head</div>
                  <div className="text-xs text-blue-400">B.E. CSE (2025–Present)</div>
                  <div className="text-xs text-blue-100">Velammal College of Engineering and Technology</div>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl hover:bg-[#23233a] transition-colors duration-200">
                <img src="/Vcetlogo.jpg" className="w-8 h-8 rounded-full object-cover border-2 border-blue-400" alt="VCET Logo" />
                <div>
                  <div className="text-sm font-semibold text-white">Committee Head</div>
                  <div className="text-xs text-blue-400">Academic Cell (2024–Present)</div>
                  <div className="text-xs text-blue-100">Velammal College of Engineering and Technology</div>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl hover:bg-[#23233a] transition-colors duration-200">
                <img src="/Vcetlogo.jpg" className="w-8 h-8 rounded-full object-cover border-2 border-blue-400" alt="VCET Logo" />
                <div>
                  <div className="text-sm font-semibold text-white">Eco Club Member</div>
                  <div className="text-xs text-blue-400">VCET (2024–Present)</div>
                  <div className="text-xs text-blue-100">Velammal College of Engineering and Technology</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="mt-12 max-w-5xl mx-auto">
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
            onClick={() => setExpandedCard(idx)}
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
              {hoveredCard === idx && expandedCard === null && (
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
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="relative bg-[#23233a] rounded-2xl shadow-xl w-[95vw] max-w-6xl h-[90vh] p-8 flex flex-col overflow-hidden items-center"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                  >
                    {/* X button */}
                    <button
                      onClick={() => setExpandedCard(null)}
                      className="absolute top-4 right-4 z-[110] text-white bg-blue-900 hover:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow"
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <MediaSwiper
                      mediaList={project.images || [project.src]}
                      className="w-full h-full mb-4 rounded-xl"
                    />
                    <h2 className="text-xl font-bold mb-2 text-white">{project.title}</h2>
                    <p className="mb-2 text-sm text-blue-100 text-center">{project.fullDesc || project.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-2 justify-center">
                      {(project.tags || []).map(tag => (
                        <span key={tag} className="px-3 py-1 bg-blue-900 text-blue-100 text-xs rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                      {(project.tools || []).map(tool => (
                        <span key={tool} className="px-3 py-1 bg-fuchsia-900 text-fuchsia-100 text-xs rounded-full">{tool}</span>
                      ))}
                    </div>
                    {project.links && Object.entries(project.links).filter(([key]) => {
                    // Remove demo, view, behance, figma links
                    return !['demo', 'view', 'behance', 'figma'].includes(key.toLowerCase());
                  }).map(([key, url]) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-gradient-to-r from-blue-700 to-fuchsia-700 text-white rounded-xl font-bold text-sm shadow-lg hover:scale-105 hover:bg-blue-800 transition-all duration-200 mb-2"
                        style={{ minWidth: 180, textAlign: "center", letterSpacing: 1 }}
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
    <div className="min-h-screen pt-20 sm:pt-32 pb-16">
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
    <div className="min-h-screen pt-20 sm:pt-32 pb-16">
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
    <div className="min-h-screen pt-20 sm:pt-32 pb-16">
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

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <div className="min-h-screen bg-[#101018] font-sans">
        <Bubbles />
        <NavBar activeSection={activeSection} setActiveSection={setActiveSection} setExpandedCard={setExpandedCard} />
        <BackArrow
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setExpandedCard={setExpandedCard}
          show={expandedCard === null}
        />
        {activeSection === "home" && <HomePage />}
        {activeSection === "cloud" && (
          <Section
            title="Cloud & DevOps"
            cards={projects.cloud}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
          />
        )}
        {activeSection === "ai" && (
          <Section
            title="AI/ML Projects"
            cards={projects.ai}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
          />
        )}
        {activeSection === "fullstack" && (
          <Section
            title="Full Stack Development"
            cards={projects.fullstack}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
          />
        )}
        {activeSection === "uiux" && (
          <Section
            title="UI/UX Design"
            cards={projects.uiux}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
            columnsLg={4}
            invisible={true}
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
        <Footer personalInfo={personalInfo} />
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
