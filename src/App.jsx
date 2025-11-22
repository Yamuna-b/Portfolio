import React, { useRef, useState, useEffect } from "react";
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
import { SiLeetcode, SiHackerrank } from "react-icons/si";
import Footer from "./components/Footer";
import Badges from "./components/Badges";
import Stats from "./components/Stats";

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
            className={`absolute rounded-full ${color} opacity-20 blur-xl`}
            style={{ width: size, height: size }}
            initial={{ top: `${top}%`, left: `${left}%` }}
            animate={{
              top: [`${top}%`, `${top + driftY}%`, `${top}%`],
              left: [`${left}%`, `${left + driftX}%`, `${left}%`],
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
  tagline1: "Cloud Developer & DevOps Engineer",
  tagline2: "Full Stack Developer | UI/UX Designer",
  email: "yamuna.bsvy@gmail.com",
  phone: "+91-9629163099",
  whatsapp: "919629163099",
  bio: "Full-stack developer and second-year Computer Science student. Skilled in React.js, Node.js, Python, Java, and MongoDB, with interests in quantum computing, AI, cloud computing, and DevOps. Passionate about building impactful applications and contributing to innovative projects.",
  bio2: "Experienced Cloud Developer and DevOps Engineer with a strong background in cloud infrastructure, automation, and continuous integration. Skilled in full-stack development and UI/UX design, with a growing interest in AI/ML. Adept at designing and implementing robust cloud solutions, managing DevOps pipelines, and creating user-centric web and mobile applications.",
  techStacks: [
    "React", "Node.js", "Python", "Java", "MongoDB", "AWS", "Docker", "Figma", "TypeScript", "Django", "Kubernetes"
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
    hackerrank: "https://www.hackerrank.com/profile/yamuna_bsvy"
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
    publication: {
      url: "https://ieeexplore.ieee.org/document/10986878",
      label: "View Publication"
    }
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
  { src: "/badge6.png", title: "HackerRank Stars" },
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
  fullstack: {
    frontend: [
      {
        id: 1,
        title: "E-commerce Frontend",
        images: ["/fullstack1.png", "/fullstack1.png"],
        shortDesc: "React.js shopping platform",
        fullDesc: "Responsive e-commerce site using React, Redux, and Material-UI.",
        tags: ["React", "Redux"],
        tools: ["Material-UI"],
        links: { github: "#" }
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
      }
    ],
    backend: [
      {
        id: 1,
        title: "Node.js API",
        images: ["/fullstack1.png"],
        shortDesc: "REST API for e-commerce",
        fullDesc: "Node.js REST API with authentication and MongoDB.",
        tags: ["Node.js", "MongoDB"],
        tools: ["Express"],
        links: { github: "#" }
      },
      {
        id: 2,
        title: "Django Blog API",
        images: ["/fullstack1.png"],
        shortDesc: "Blog backend with Django",
        fullDesc: "RESTful blog backend using Django REST Framework.",
        tags: ["Django", "REST"],
        tools: ["DRF"],
        links: { github: "#" }
      },
      {
        id: 3,
        title: "GraphQL API",
        images: ["/backend1.png"],
        shortDesc: "GraphQL server",
        fullDesc: "Built GraphQL API with Apollo Server.",
        tags: ["GraphQL", "Apollo"],
        tools: ["Node.js"],
        links: { github: "#" }
      },
      {
        id: 4,
        title: "Microservices Backend",
        images: ["/backend2.png"],
        shortDesc: "Distributed services",
        fullDesc: "Microservices architecture with message queues.",
        tags: ["Microservices", "RabbitMQ"],
        tools: ["Docker"],
        links: { github: "#" }
      }
    ],
    both: [
      {
        id: 1,
        title: "Full Stack Social App",
        images: ["/fullstack1.png", "/fullstack1.png", "/fullstack1.png"],
        shortDesc: "MERN stack social media app",
        fullDesc: "A social platform built with MongoDB, Express, React, and Node.js.",
        tags: ["MERN", "Full Stack"],
        tools: ["React", "Node.js"],
        links: { github: "#" }
      },
      {
        id: 2,
        title: "E-learning Platform",
        images: ["/fullstack4.png"],
        shortDesc: "Complete LMS system",
        fullDesc: "Learning management system with video courses.",
        tags: ["MERN", "LMS"],
        tools: ["MongoDB", "React"],
        links: { github: "#" }
      },
      {
        id: 3,
        title: "Real-time Chat App",
        images: ["/fullstack5.png"],
        shortDesc: "Socket.io chat application",
        fullDesc: "Real-time messaging with Socket.io and React.",
        tags: ["Socket.io", "Real-time"],
        tools: ["React", "Node.js"],
        links: { github: "#" }
      }
    ]
  },
  uiux: {
    logos: [
      {
        id: 1,
        title: "Petimony Logo",
        images: ["/logo1.png"],
        shortDesc: "Logo for my Pet Shop Website \"Petimony\" ",
        fullDesc: "Designed brand logos for startups and hackathons.",
        tags: ["Logo", "Branding"],
        tools: ["Canva"],
        links: { View: "https://www.canva.com/design/DAGZbrazmE8/sRe7S7TdueIYuTtv3MOoJA/edit?utm_content=DAGZbrazmE8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" }
      },
      {
        id: 2,
        title: "Petimony Logo",
        images: ["/logo2.png"],
        shortDesc: "Logo for my Pet Shop Website \"Petimony\" ",
        fullDesc: "Designed brand logos for startups and hackathons.",
        tags: ["Logo", "Branding"],
        tools: ["Canva"],
        links: { View: "" }
      },
      {
        id: 3,
        title: "Pro Planet Logo",
        images: ["/logo3.png"],
        shortDesc: "Eco-friendly platform logo",
        fullDesc: "Logo for Smart India Hackathon project.",
        tags: ["Logo", "Sustainability"],
        tools: ["Figma"],
        links: { behance: "#" }
      },
      {
        id: 4,
        title: "Petimony Logo",
        images: ["/logo2.png"],
        shortDesc: "Logo for my Pet Shop Website \"Petimony\" ",
        fullDesc: "Designed brand logos for startups and hackathons.",
        tags: ["Logo", "Branding"],
        tools: ["Canva"],
        links: { View: "" }
      },
      {
        id: 5,
        title: "Petimony Logo",
        images: ["/logo3.png"],
        shortDesc: "Logo for my Pet Shop Website \"Petimony\" ",
        fullDesc: "Designed brand logos for startups and hackathons.",
        tags: ["Logo", "Branding"],
        tools: ["Canva"],
        links: { View: "" }
      },
      {
        id: 6,
        title: "Petimony Logo",
        images: ["/logo1.png"],
        shortDesc: "Logo for my Pet Shop Website \"Petimony\" ",
        fullDesc: "Designed brand logos for startups and hackathons.",
        tags: ["Logo", "Branding"],
        tools: ["Canva"],
        links: { View: "" }
      },
      {
        id: 7,
        title: "Petimony Logo",
        images: ["/logo3.png"],
        shortDesc: "Logo for my Pet Shop Website \"Petimony\" ",
        fullDesc: "Designed brand logos for startups and hackathons.",
        tags: ["Logo", "Branding"],
        tools: ["Canva"],
        links: { View: "" }
      }
    ],
    posters: [
      {
        id: 1,
        title: "Music Festival Poster",
        images: ["/poster2.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster for annual music festival.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 2,
        title: "Music Festival Poster",
        images: ["/poster3.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster for annual music festival.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 3,
        title: "Music Festival Poster",
        images: ["/poster4.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster for annual music festival.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 4,
        title: "Music Festival Poster",
        images: ["/poster1.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster for annual music festival.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 5,
        title: "Music Festival Poster",
        images: ["/poster5.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster for annual music festival.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      },
      {
        id: 6,
        title: "Music Festival Poster",
        images: ["/poster6.png"],
        shortDesc: "Vibrant event poster",
        fullDesc: "Poster for annual music festival.",
        tags: ["Poster", "Event"],
        tools: ["Photoshop"],
        links: { behance: "#" }
      }
    ],
    prototypes: [
      {
        id: 1,
        title: "App Prototype",
        images: ["/poster1.png", "/poster1.png"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for Pro Planet App.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 2,
        title: "Cherry Milkshake",
        images: ["/video1.mp4"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for Pro Planet App.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 3,
        title: "",
        images: ["/video2.mp4"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for Pro Planet App.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 4,
        title: "",
        images: ["/video3.mp4"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for Pro Planet App.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 5,
        title: "",
        images: ["/video4.mp4"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for Pro Planet App.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      },
      {
        id: 6,
        title: "",
        images: ["/video5.mp4"],
        shortDesc: "Mobile app prototype",
        fullDesc: "High-fidelity prototype for Pro Planet App.",
        tags: ["Prototype", "Mobile"],
        tools: ["Figma"],
        links: { figma: "#" }
      }
    ],
    powerpoints: [
      {
        id: 1,
        title: "Pro Planet Demo",
        images: ["/planner1.png","/video1.mp4"],
        shortDesc: "Interactive PowerPoint",
        fullDesc: "Demo presentation for Smart India Hackathon.",
        tags: ["PowerPoint", "Demo"],
        tools: ["PowerPoint"],
        links: { download: "#" }
      }
    ],
    planners: [
      {
        id: 1,
        title: "Productivity Planner",
        images: ["/planner1.png"],
        shortDesc: "Custom productivity planner",
        fullDesc: "Designed planner to boost productivity.",
        tags: ["Planner", "Productivity"],
        tools: ["Figma"],
        links: { download: "#" }
      }
    ]
  },
  ai: [
    {
      id: 1,
      title: "Menstrual Health AI Chatbot",
      images: ["/video1.mp4", "/ai1.png"],
      shortDesc: "AI chatbot for menstrual health",
      fullDesc: "Chatbot offering resources for PCOD, PMS, PMDD.",
      tags: ["AI", "Chatbot"],
      tools: ["Python", "TensorFlow"],
      links: { github: "#" }
    },
    {
      id: 2,
      title: "Face Recognition",
      images: ["/ai2.png"],
      shortDesc: "Real-time face recognition",
      fullDesc: "Built with OpenCV and deep learning.",
      tags: ["AI", "Vision"],
      tools: ["OpenCV"],
      links: { github: "#" }
    },
    {
      id: 3,
      title: "Face Recognition",
      images: ["/ai1.png"],
      shortDesc: "Real-time face recognition",
      fullDesc: "Built with OpenCV and deep learning.",
      tags: ["AI", "Vision"],
      tools: ["OpenCV"],
      links: { github: "#" }
    },
    {
      id: 4,
      title: "NLP Sentiment Analysis",
      images: ["/ai3.png"],
      shortDesc: "Text sentiment analyzer",
      fullDesc: "ML model to analyze sentiment in customer reviews.",
      tags: ["NLP", "ML"],
      tools: ["Python", "NLTK"],
      links: { github: "#" }
    },
    {
      id: 5,
      title: "Image Classification",
      images: ["/ai4.png"],
      shortDesc: "CNN-based classifier",
      fullDesc: "Deep learning image classification using CNN.",
      tags: ["CNN", "Deep Learning"],
      tools: ["TensorFlow"],
      links: { github: "#" }
    },
    {
      id: 6,
      title: "Recommendation System",
      images: ["/ai5.png"],
      shortDesc: "Product recommendation AI",
      fullDesc: "Collaborative filtering recommendation engine.",
      tags: ["ML", "Recommendations"],
      tools: ["Scikit-learn"],
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
    { key: "fullstack", label: "Full Stack" },
    { key: "uiux", label: "UI/UX" },
    { key: "ai", label: "AI" },
    { key: "showcase", label: "Visual Highlights" }
  ];
  return (
    <>
      <style>{`
        .nav-shine {
          position: relative;
          transition: color 0.5s;
          transition-delay: 0.5s;
        }
        .nav-shine:hover, .nav-shine:focus {
          color: rgba(255, 255, 255, 0.2);
          transition-delay: 0s;
        }
        .nav-shine::before {
          content: attr(data-text);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #d83bff;
          text-shadow: 0 0 10px #d83bff, 0 0 30px #d83bff, 0 0 80px #d83bff;
          letter-spacing: 40px;
          white-space: nowrap;
          text-align: center;
          opacity: 0;
          transition: 0.5s;
          font-size: 0.65em;
          font-weight: 500;
          z-index: -1;
          pointer-events: none;
        }
        .nav-shine:hover::before {
          opacity: 1;
          letter-spacing: 6px;
          transition-delay: 0.5s;
        }
      `}</style>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#13131c]/95 backdrop-blur border-b border-gray-800 flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-2">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-14 h-14 rounded-full object-cover border-2 border-blue-400 shadow"
            style={{ background: "#23233a" }}
          />
          <span className="font-bold text-xl text-white">Yamuna</span>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-x-12">
            {navItems.map(({ key, label }) => (
              <button
                key={key}
                data-text={label}
                onClick={() => {
                  setExpandedCard(null);
                  setActiveSection(key);
                }}
                className={`nav-shine text-lg font-bold ${activeSection === key ? (key === "showcase" ? "text-yellow-300 underline" : "text-blue-300") : "text-white"}`}
                style={key === "home" || key === "showcase" ? { marginLeft: 32, marginRight: 32 } : {}}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <Linkedin className="w-6 h-6 text-blue-400 hover:scale-110 transition" />
          </a>
          <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" title="GitHub">
            <Github className="w-6 h-6 text-gray-200 hover:scale-110 transition" />
          </a>
          <a href={personalInfo.social.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
            <Instagram className="w-6 h-6 text-pink-400 hover:scale-110 transition" />
          </a>
          <a href={personalInfo.social.telegram} target="_blank" rel="noopener noreferrer" title="Telegram">
            <FaTelegramPlane className="w-6 h-6 text-blue-400 hover:scale-110 transition" />
          </a>
          <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer" title="LeetCode">
            <SiLeetcode className="w-6 h-6 text-yellow-300 hover:scale-110 transition" />
          </a>
          <a href={personalInfo.social.hackerrank} target="_blank" rel="noopener noreferrer" title="HackerRank">
            <SiHackerrank className="w-6 h-6 text-green-400 hover:scale-110 transition" />
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
      className="fixed top-20 left-8 z-[120] p-1.5 bg-[#222230]/90 backdrop-blur rounded-full shadow-lg border border-gray-700"
      style={{ width: 36, height: 36 }}
    >
      <ArrowLeft className="w-4 h-4 text-white" />
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
      className="relative w-60 h-60 mx-auto flex items-center justify-center select-none"
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
        className="w-44 h-44 bg-gradient-to-br from-[#23233a] via-[#181829] to-[#23233a] rounded-full flex items-center justify-center border-4 border-blue-300 shadow-xl z-10 overflow-hidden"
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
    <section className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-[#101018] via-[#181829] to-[#23233a]">
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
            <h3 className="text-base font-semibold text-blue-200 mt-4 mb-2">Skills</h3>
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
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="w-7 h-7 text-blue-400 hover:scale-110 transition" /></a>
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer"><Github className="w-7 h-7 text-gray-200 hover:scale-110 transition" /></a>
              <a href={personalInfo.social.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="w-7 h-7 text-pink-400 hover:scale-110 transition" /></a>
              <a href={personalInfo.social.telegram} target="_blank" rel="noopener noreferrer"><FaTelegramPlane className="w-7 h-7 text-blue-400 hover:scale-110 transition" /></a>
              <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer"><SiLeetcode className="w-7 h-7 text-yellow-300 hover:scale-110 transition" /></a>
              <a href={personalInfo.social.hackerrank} target="_blank" rel="noopener noreferrer"><SiHackerrank className="w-7 h-7 text-green-400 hover:scale-110 transition" /></a>
            </div>
            <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-900 to-fuchsia-800 text-white rounded-2xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download Resume
            </button>
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
                  {exp.publication && (
                    <a
                      href={exp.publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-4 py-2 bg-gradient-to-r from-blue-700 to-fuchsia-700 text-white rounded-xl font-bold text-sm shadow-lg hover:scale-105 hover:bg-blue-800 transition-all duration-200"
                    >
                      {exp.publication.label}
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
          {/* Languages & Soft Skills */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#181829] rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <h2 className="text-xl font-bold text-blue-300 mb-4">Languages & Soft Skills</h2>
            <div className="mb-4">
              <div className="text-sm font-semibold mb-1 text-white">Languages</div>
              {personalInfo.languages.map(lang => (
                <div key={lang.name} className="flex justify-between text-blue-100 text-sm py-1 px-2 rounded hover:bg-[#23233a] transition-colors">
                  <span>{lang.name}</span>
                  <span className="text-blue-400 font-semibold">{lang.level}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="text-sm font-semibold mb-1 text-white">Soft Skills</div>
              <div className="flex flex-wrap gap-2">
                {personalInfo.softSkills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-900 text-blue-100 rounded-full text-xs hover:bg-blue-800 hover:scale-105 transition-all duration-200 cursor-default">{skill}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Badges Section */}
        <div className="mt-12">
          <Badges />
        </div>

        {/* Coding Stats Section */}
        <div className="mt-12">
          <Stats />
        </div>
      </div>
    </section>
  );
}

// --- Project Card Grid, Tabs, Modal, and App Component ---
function ProjectGrid({ cards, expandedCard, setExpandedCard }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 auto-rows-auto">
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
            className="relative group rounded-2xl shadow-lg border border-gray-800 cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center min-h-[220px] bg-[#0d0d15]"
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
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                pagination={{ clickable: true }}
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

            {/* If you have mixed images/videos or multiple videos, you can expand logic here if needed */}

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
                    {project.links && Object.entries(project.links).map(([key, url]) => (
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
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <section className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-[#101018] via-[#181829] to-[#23233a]">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8">{title}</h1>
        <div className="flex gap-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-blue-900 text-blue-100 shadow"
                  : "bg-[#181829] text-blue-200 hover:bg-blue-800"
              }`}
            >{tab.label}</button>
          ))}
        </div>
        <ProjectGrid
          cards={cardsByTab[activeTab] || []}
          expandedCard={expandedCard}
          setExpandedCard={setExpandedCard}
        />
      </div>
    </section>
  );
}

// Visual Highlights + Certifications Carousel + Badges
function ShowcaseSection() {
  return (
    <div className="space-y-16 py-4">
      <Stats />
      <section className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-[#101018] via-[#181829] to-[#23233a]">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Visual Highlights</h1>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            navigation
            loop
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="rounded-2xl"
          >
            {projects.showcase.map(item => (
              <SwiperSlide key={item.id}>
                <div className="bg-[#181829] rounded-2xl shadow-xl p-6 flex flex-col items-center">
                  {item.images && item.images.length > 1 ? (
                    <Swiper
                      modules={[Pagination, Autoplay]}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 2500, disableOnInteraction: false }}
                      loop
                      className="rounded-xl w-full mb-4"
                    >
                      {item.images.map((img, i) => (
                        <SwiperSlide key={i}>
                          <img src={img} alt={item.title} className="object-contain h-72 w-auto max-w-full rounded-xl mx-auto" />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : item.images && item.images.length === 1 ? (
                    <img src={item.images[0]} alt={item.title} className="object-contain h-72 w-auto max-w-full rounded-xl mx-auto mb-4" />
                  ) : (
                    <div className="w-full h-72 bg-blue-900 rounded-xl flex items-center justify-center text-blue-300 text-lg">Coming Soon</div>
                  )}
                  <div className="text-white text-xl font-bold mb-2">{item.title}</div>
                  <div className="text-sm text-blue-100">{item.desc}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Certifications Carousel */}
          <h2 className="text-xl font-bold text-blue-300 mt-12 mb-4 text-center">Certifications</h2>
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={3}
            spaceBetween={24}
            navigation
            loop
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            className="rounded-2xl"
          >
            {certifications.map((img, idx) => (
              <SwiperSlide key={idx}>
                {img.src
                  ? <img src={img.src} alt={img.title} className="object-contain h-48 w-auto max-w-full rounded-xl mx-auto" />
                  : <div className="w-full h-48 bg-blue-900 rounded-xl flex items-center justify-center text-blue-300 text-lg">Coming Soon</div>
                }
                <div className="text-blue-100 text-center text-xs mt-2">{img.title}</div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Platform Badges Carousel */}
          <h2 className="text-xl font-bold text-blue-300 mt-12 mb-4 text-center">Platform Badges</h2>
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={3}
            spaceBetween={24}
            navigation
            loop
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            className="rounded-2xl"
          >
            {platformBadges.map((badge, idx) => (
              <SwiperSlide key={idx}>
                {badge.src
                  ? <img src={badge.src} alt={badge.title} className="object-contain h-48 w-auto max-w-full rounded-xl mx-auto" />
                  : <div className="w-full h-48 bg-blue-900 rounded-xl flex items-center justify-center text-blue-300 text-lg">Coming Soon</div>
                }
                <div className="text-blue-100 text-center text-xs mt-2">{badge.title}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <Badges />
      
      {/* Project Showcase */}
      <section className="py-16 bg-gradient-to-br from-[#101018] via-[#181829] to-[#23233a]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Project Showcase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.cloud.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-[#1a1a2e] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                {item.images && item.images.length > 1 ? (
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="w-full h-48 mb-4"
                  >
                    {item.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <img 
                          src={img} 
                          alt={item.title} 
                          className="object-cover w-full h-full rounded-lg" 
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : item.images && item.images.length === 1 ? (
                  <div className="h-48 mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={item.images[0]} 
                      alt={item.title} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-blue-900 rounded-lg flex items-center justify-center text-blue-300 text-lg mb-4">
                    Coming Soon
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm">
                  {item.desc || 'No description available.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Section for Cloud, AI, etc.
function Section({ title, cards, expandedCard, setExpandedCard }) {
  return (
    <section className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-[#101018] via-[#181829] to-[#23233a]">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8">{title}</h1>
        <ProjectGrid cards={cards} expandedCard={expandedCard} setExpandedCard={setExpandedCard} />
      </div>
    </section>
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

// Main App
export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [expandedCard, setExpandedCard] = useState(null);

  const fullStackTabs = [
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "both", label: "Both" }
  ];
  const uiuxTabs = [
    { key: "logos", label: "Logo Designs" },
    { key: "posters", label: "Posters & Brochures" },
    { key: "prototypes", label: "Prototypes & Videos" },
    { key: "powerpoints", label: "Interactive PowerPoints" },
    { key: "planners", label: "Planners & Productivity" }
  ];

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
        {activeSection === "fullstack" && (
          <TabbedSection
            title="Full Stack Development"
            tabs={fullStackTabs}
            cardsByTab={projects.fullstack}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
          />
        )}
        {activeSection === "uiux" && (
          <TabbedSection
            title="UI/UX Design"
            tabs={uiuxTabs}
            cardsByTab={projects.uiux}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
          />
        )}
        {activeSection === "ai" && (
          <Section
            title="AI Projects"
            cards={projects.ai}
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
