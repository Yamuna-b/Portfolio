import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  ArrowLeft, Linkedin, Github, Download, Mail, Phone, Search, X, ExternalLink, Cloud, Database, Server, ArrowDownRight, Terminal, GitBranch, Image as ImageIcon
} from "lucide-react";
import "./App.css";
import { FaWhatsapp } from "react-icons/fa";
import { SiAmazon, SiC, SiCplusplus, SiCss3, SiDocker, SiExpress, SiFastapi, SiGit, SiGithubactions, SiHtml5, SiHuggingface, SiJavascript, SiLeetcode, SiLinux, SiMongodb, SiNodedotjs, SiOpenai, SiPostgresql, SiPython, SiPytorch, SiReact, SiSqlite, SiTailwindcss, SiTensorflow, SiTypescript } from "react-icons/si";
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

// ─── Quiet, deterministic studio background ─────────────────────────────────
function Bubbles({ canvasTheme = "hero" }) {
  return (
    <div className={`studio-background canvas-theme-${canvasTheme}`} aria-hidden="true">
      <div className="paint-field paint-field-blue" />
      <div className="paint-field paint-field-lavender" />
      <div className="paint-field paint-field-warm" />
      <div className="paint-field paint-field-yellow" />
      <div className="studio-grid" />
      <svg className="data-ribbon" viewBox="0 0 1200 1800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ribbonGradient" x1="0" x2="1">
            <stop offset="0" stopColor="#51B7FF" />
            <stop offset=".48" stopColor="#A78BFA" />
            <stop offset="1" stopColor="#FF8A7A" />
          </linearGradient>
        </defs>
        <path d="M140 20 C880 160 260 310 940 480 S260 780 970 940 S300 1240 950 1430 S650 1680 1080 1780" />
        <path className="ribbon-highlight" d="M140 20 C880 160 260 310 940 480 S260 780 970 940 S300 1240 950 1430 S650 1680 1080 1780" />
      </svg>
      <svg className="studio-doodles" viewBox="0 0 1200 1800" preserveAspectRatio="none">
        <path d="M84 110 C240 90 310 210 448 178 S650 102 770 200 S954 318 1112 250" />
        <path d="M92 520 C210 480 270 630 405 602 S600 490 730 590 S940 718 1082 628" />
        <path d="M78 930 C210 850 322 1010 458 964 S688 866 804 980 S990 1090 1120 1008" />
        <path d="M92 1360 C244 1298 336 1450 490 1418 S712 1324 858 1438 S1008 1510 1120 1460" />
        <path className="sketch-arrow" d="M188 358 l38 -10 -14 34" />
        <path className="sketch-arrow" d="M970 1158 l35 18 -29 18" />
        <circle cx="448" cy="178" r="5" /><circle cx="730" cy="590" r="5" /><circle cx="804" cy="980" r="5" /><circle cx="858" cy="1438" r="5" />
        <rect x="850" y="92" width="118" height="72" rx="4" /><path d="M865 112 h54 m-54 18 h72 m-72 18 h39" />
        <ellipse cx="196" cy="1138" rx="54" ry="16" /><path d="M142 1138 v55 c0 9 24 16 54 16 s54-7 54-16 v-55 m-108 26 c0 9 24 16 54 16 s54-7 54-16" />
      </svg>
      <span className="doodle-label label-one">idea → interface</span>
      <span className="doodle-label label-two">API · database · cloud</span>
      <span className="doodle-label label-three">build → test → deploy</span>
    </div>
  );
}

// --- Personal Data ---
const personalInfo = {
  name: "Yamuna",
  tagline1: "Backend-focused Software Engineer | Building scalable systems and developer-first products",
  tagline2: "Computer Science undergraduate targeting Software Developer roles, with strong experience in backend APIs, full-stack web apps, relational/noSQL databases, and cloud deployment.",
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
    logo: "/Logos/kevelllogo.jpg",
    company: "Kevell Corp",
    role: "Web Development Intern",
    duration: "Dec 2024",
    desc: "Built Petimony and other web apps, reusable frontend components, form handling, and integrated UIs with existing APIs.",
    bullets: [
      "Implemented React screens and reusable components that reduced duplicate UI code across internal tools and web apps like Petimony.",
      "Shipped and documented REST endpoints consumed by teammates during feature work.",
      "Collaborated through code review and iterative delivery to stabilize pages used by stakeholders."
    ]
  },
  {
    logo: "/Logos/Nittelogo.jpg",
    company: "IEEE AIDE 2025 — NMAM Institute of Technology",
    role: "IEEE Author",
    duration: "2025",
    desc: "Published research on carbon footprint awareness and mitigation at an international conference.",
    link: { text: "View Publication", url: IEEE_PUBLICATION_URL },
    bullets: [
      "Authored and presented sustainability research at the International Conference on AIDE 2025.",
      "Distilled methodology and findings for an academic audience and conference reviewers.",
    ],
    rightImage: "/Experience/IEEE/IEEE published paper screenshot.png"
  },
  {
    logo: "/Logos/Reccsarlogo.jpg",
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
    title: "MoneyMirror",
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
      demo: "https://drive.google.com/file/d/1H01AjMrU8kZ_mYTkO4IgUO7lQl5zsw2s/view?usp=sharing",
      live: "#", // TODO: replace with actual live website link if available
    },
    image: "/MoneyMirror.mp4",
  },
  {
    title: "LogBeacon",
    tagline: "Log analysis backend—parse structured logs, filter by time/status, and run regex queries for faster debugging with optional OpenAI summarization.",
    stack: ["TypeScript", "Express", "PostgreSQL", "Docker", "AWS"],
    bullets: [
      "TypeScript/Express service for structured log parsing, filtering, and regex search.",
      "PostgreSQL persistence with Docker deployment on AWS; query latency under 200 ms.",
      "Features: structured log ingestion, filters (time, level, service), regex search/incident linking, optional OpenAI summarization endpoint.",
    ],
    links: {
      github: "https://github.com/Yamuna-b/LogBeacon",
      demo: "https://drive.google.com/file/d/1VIW1KpCmgK-CLCpHbwdMd8BppwnZfHd-/view?usp=sharing",
      live: "#", // TODO: replace with actual live website link if available
    },
    image: "/LogBeacon.mp4",
  },
  {
    title: "MarineTaxaAi",
    tagline: "ML taxonomy platform—Streamlit dashboard and sequence/ML classifier for eDNA.",
    stack: ["Python", "Streamlit", "PyTorch", "ML Classifier"],
    bullets: [
      "Streamlit dashboard and ML classifier for classifying marine organisms.",
      "Reduced manual classification time by roughly 40% in evaluation runs.",
      "Owned the full stack from data ingestion to ML integration, mirroring ML platform patterns used in production ML teams.",
    ],
    links: {
      github: "https://github.com/Yamuna-b/MarineTaxaAi",
      demo: "https://drive.google.com/file/d/1aZN2iFA1QZwSP_ftBbqv21tr_xtpykPB/view?usp=sharing",
      live: "#", // TODO: replace with actual live website link if available
    },
    image: "/MarineTaxaAi.mp4",
  },
];

// Replace screenshot arrays as project captures become available. The rendering stays unchanged.
const portfolioContent = {
  identity: {
    label: "Backend / Cloud Engineer with AI specialization",
    location: "Madurai, Tamil Nadu, India",
    about: "Me - a backend focused developer who builds APIs, connects databases and AWS cloud services, handles deployment, logging and monitoring, and integrates GenAI features when needed.",
    aws: "Growing deeper in AWS across compute, storage, networking, security, IAM, infrastructure as code, observability, and cost optimization."
  },
  projects: [
    { ...featuredProjects[0], screenshots: ["/Projects/MoneyMirror_1.png", "/Projects/MoneyMirror_2.png", "/Projects/MoneyMirror_3.png"], problem: "Make future cash-flow pressure visible before it becomes a surprise.", website: "#" },
    { ...featuredProjects[1], screenshots: ["/Projects/LogBeacon_1.png", "/Projects/LogBeacon_2.png", "/Projects/LogBeacon_3.png"], problem: "Turn noisy logs into searchable, structured incident intelligence.", website: "#" },
    { ...featuredProjects[2], screenshots: ["/Projects/MarineTaxaAI_1.png", "/Projects/MarineTaxaAI_2.png", "/Projects/MarineTaxaAI_3.png"], problem: "Make sequence-based marine classification easier to inspect and explain.", website: "#" }
  ],
  internships: [
    { ...experience[0], projects: [{ name: "Petimony", description: "Pet shop and adoption flows with reusable responsive interfaces.", image: "/Experience/Internship 1/Petimony.png", github: "https://github.com/Yamuna-b/Petimony", stack: ["React", "APIs"] }, { name: "Railway Porter Seva", description: "Static booking UI for porter assistance at stations, with clear forms and simple user flows.", image: "/Others or Leadership services and more presentations etc/SIH.jpg", github: "#", stack: ["HTML", "CSS", "JavaScript"] }] },
    { ...experience[2], projects: [{ name: "RailwayPorterSeva", description: "Cloud-hosted service booking and assignment workflows.", image: "/Projects/MoneyMirror_1.png", github: "https://github.com/Yamuna-b/PorterSeva", stack: ["Node.js", "MongoDB", "AWS"] }, { name: "Client support realtime chat", description: "Real-time helpdesk support tool for delivery teams.", image: "/Projects/LogBeacon_1.png", github: "https://github.com/Yamuna-b/client-support-realtime-chat", stack: ["Express", "Socket.io", "Firebase"] }] },
    { ...experience[1], projects: [{ name: "ECOSAUR - IEEE AIDE 2025", description: "IEEE research publication, author certificate, and conference presentation proof from the AIDE 2025 platform at NMAM Institute of Technology.", images: ["/Experience/IEEE/IEEE published paper screenshot.png", "/Experience/IEEE/IEEE certfiicate.jpg", "/Experience/IEEE/Photo.jpg"], github: "#", stack: ["Research", "IEEE", "Conference"] }] }
  ],
  awards: [
    { title: "Kalasalingam - Designthon First Place", caption: "First place at Designthon during Euphoria '24, organized by the Department of Computer Applications at Kalasalingam Academy of Research and Education on March 26-27, 2024.", images: ["/Certification/First price Awards/kalasalingam_collage/showcase1.jpg", "/Certification/First price Awards/kalasalingam_collage/Award5.jpg", "/Certification/First price Awards/kalasalingam_collage/kalasalingam.jpeg"] },
    { title: "Sri Ramakrishna - Techathon Gold Rank", caption: "Prime Honours with a gold-rank placement in the Project Station category at Techathon '24, Sri Ramakrishna Institute of Technology, Coimbatore, on October 9, 2024.", images: ["/Certification/First price Awards/SriRamakrishna_project_collage/SriRamakrishna_project.jpg", "/Certification/Certificates/SriRamakrishna_paper.jpg"] },
    { title: "VCET - DesignVerse First Place", caption: "First place in the DesignVerse UI/UX Contest at Velammal College of Engineering and Technology on March 17, 2026, recognizing creative design, teamwork, and product styling.", images: ["/Certification/First price Awards/DesignVerse UI-UX Contest VCET_collage/Award1.jpg", "/Certification/First price Awards/DesignVerse UI-UX Contest VCET_collage/Pic.jpg", "/Certification/First price Awards/DesignVerse UI-UX Contest VCET_collage/Award2.jpg", "/Certification/Certificates/Vcet_Idea_contest.jpg"] }
  ],
  certificates: [
    { title: "Programming for Everybody", caption: "University of Michigan via Coursera | May 18, 2023 | Verification ID: KPPVFN6JLDXF. Getting Started with Python. Add the certificate description or learning outcome here later.", image: "/Certification/Certificates/Coursera Certificate 6.jpg" },
    { title: "Python Data Structures", caption: "University of Michigan via Coursera | June 14, 2023 | Verification ID: UM4QDDN8L9TW. Add the skills demonstrated or project context here later.", image: "/Certification/Certificates/Coursera Certificate 7.jpg" },
    { title: "Using Python to Access Web Data", caption: "University of Michigan via Coursera | July 8, 2023 | Verification ID: EXBMDC8E78MV. Add the course details here later.", image: "/Certification/Certificates/Coursera Certificate 6.jpg" },
    { title: "Using Databases with Python", caption: "University of Michigan via Coursera | August 14, 2023 | Verification ID: C6RQ7UHB7XSH. Add the database topics or project details here later.", image: "/Certification/Certificates/Coursera Certificate 7.jpg" },
    { title: "Python for Everybody Specialization", caption: "University of Michigan via Coursera | November 19, 2023 | Verification ID: XQEGE3CRGKG8. Five-course specialization covering Python, data structures, web data, databases, and visualization. Add the capstone details here later.", image: "/Certification/Certificates/Coursera Certificate 7.jpg" },
    { title: "Python Project for Data Science", caption: "IBM via Coursera | December 21, 2023 | Verification ID: DU7USM2J6P7E. Add the project and applied data-science details here later.", image: "/Certification/Certificates/Coursera Certificate 6.jpg" },
    { title: "Getting Started as a Java Developer", caption: "LinkedIn Learning | September 7, 2024 | Certificate ID: 52de3806135e24c404775f3fe4ac1d60ecfd777677fb320bbb825f4f32d3b3d3. Completed a 19-hour 18-minute learning path. Add the modules used here later.", image: "/Certification/Certificates/LinkedIn Learning-Java.jpg" },
    { title: "Cybersecurity for Beginners", caption: "Tata STRIVE, Tata Communications, and Microsoft | November 6, 2024 | 40-hour course track | Unique ID: 235823-27180565-1240. Add the security topics and practical takeaways here later.", image: "/Certification/Certificates/CYBERSECURITY.jpg" },
    { title: "Software Testing", caption: "NPTEL, IIT Madras, and IIIT Bangalore | July-October 2024 | Consolidated score: 53% (Assignments 18.75/25, Exam 34.5/75) | Roll No: NPTEL24CS91S258600949. Add the course topics here later." },
    { title: "Cloud Computing - Elite", caption: "NPTEL, IIT Kharagpur | July-October 2025 | Elite badge, consolidated score: 63% (Assignments 19.69/25, Exam 43.49/75) | Roll No: NPTEL25CS107S362301980. Add the cloud concepts or exam details here later." },
    { title: "Fundamentals of Deep Learning", caption: "NVIDIA Deep Learning Institute | October 4, 2025 | Certification ID: 8n0QXcICTQyEjeleLe58sw. Add the hands-on framework and model topics here later.", image: "/Certification/Certificates/NVIDIA.png" },
    { title: "Harness Certified Continuous Delivery & GitOps Developer", caption: "Harness University | May 7, 2026 | Final passing score: 86% | Certificate No: mzbb68t3uez9. Add the delivery pipeline and GitOps topics here later.", images: ["/Certification/Open Source Contributions/Harness Certified Continuous Delivery & GitOps Developer.jpg", "/Certification/badges/Harness Certified Continuous Delivery & GitOps Developer Badge.png"] },
    { title: "Advance Excel", caption: "GreyLearn | June 16, 2026 | Verification ID: LBZMHW2HC9. Add the spreadsheet skills covered here later.", image: "/Certification/Certificates/AdvanceExcel_GreyLearn.jpg" },
    { title: "C++ Programming", caption: "GreyLearn | June 16, 2026 | Verification ID: HB798NB187. Add the language concepts covered here later.", image: "/Certification/Certificates/C++Programming_GreyLearn.jpg" },
    { title: "Robotics Workshop - MOBIUS 2K24", caption: "Thiagarajar College of Engineering, Madurai | March 15, 2024 | Certificate reference: TCE/MOB24/W/165. Add the workshop activities and technical takeaways here later.", images: ["/Certification/Certificates/TCE/TCE_pic.jpg", "/Certification/Certificates/TCE/TCE_Mobius.jpg", "/Certification/Certificates/TCE/TCE.jpg", "/Certification/Certificates/TCE/Photo.jpg"] },
    { title: "Professional Career Counselling", caption: "Elewayte | October 25, 2024 | Certificate No: 24995. Add the webinar speaker and key career takeaways here later." },
    { title: "Web Development Domain Training", caption: "Kevell Corp, Madurai | December 9-19, 2024 | Completed a 10-day domain-specific training program. Add the training modules and project details here later.", image: "/Experience/Internship 1/Kevell certificate.jpg" },
    { title: "FullStack Web Development Internship", caption: "RECCSAR Pvt Ltd, Madurai | June 2-28, 2025 | Ref No: 2025/000375. Conduct and attitude were noted as satisfactory, hardworking, and punctual. Add the project details here later.", image: "/Experience/Internship 2/Reccsar certificate.jpeg" }
  ],
  badges: [
    { title: "GitHub Copilot: Prompt Quest", caption: "Wilco / GitHub | November 8, 2025. Technical communication and AI prompt engineering simulation track. Add the quest details here later.", image: "/Certification/Open Source Contributions/MLH_GitHub_Copilot_Prompt_certificate.png" },
    { title: "GitHub Copilot: Code Smarter Quest", caption: "Wilco / GitHub | November 9, 2025. Advanced backend development logic and system documentation simulation track. Add the quest details here later.", image: "/Certification/Open Source Contributions/MLH_GitHub_Copilot_Code_Smarter_Quest_certificate.png" },
    { title: "MongoDB Basics for Students", caption: "MongoDB, Inc. | November 9, 2025 | Credly badge ID: 458266ca-b6ca-4687-a861-58f894ba3232. Add the database topics here later.", images: ["/Certification/badges/mlh-mongodb-basics-for-students.png", "/Certification/Open Source Contributions/MLH_MongoDB_Basics_for_Students_Certificate.jpg"] },
    { title: "50 Days Consistency Badge 2025", caption: "LeetCode | 2025. Awarded for solving data structures and algorithms problems for more than 50 consecutive days. Add the problem-solving themes here later.", image: "/Certification/badges/Leetcode50.png" },
    { title: "Fundamentals of Deep Learning Badge", caption: "NVIDIA Deep Learning Institute | October 4, 2025. Add the badge context here later.", image: "/Certification/badges/badge_8.png" },
    { title: "Harness Certified CD & GitOps Badge", caption: "Harness University | May 7, 2026 | Badge companion to the Harness certificate. Add the delivery and GitOps details here later.", image: "/Certification/badges/Harness Certified Continuous Delivery & GitOps Developer Badge.png" },
    { title: "Community and contributor badges", caption: "A collection of contributor recognition from open-source and developer communities. Replace this long caption with individual program details later.", images: ["/Certification/badges/badge_5.png", "/Certification/badges/badge_6.png", "/Certification/badges/badge_7.png", "/Certification/badges/Contributor's badge.jpg"] }
  ],
  designs: ["/Projects/MoneyMirror_1.png", "/Projects/LogBeacon_1.png", "/Projects/MarineTaxaAI_1.png"],
  openSource: [
    { title: "Social Summer of Code Season 4", caption: "Program cohort contributor pass | 2024 | Member ID: #5734 | Verification code: 7766e62c419354d05b21041ee4064bd7yam. Add the contribution summary here later.", image: "/Certification/Open Source Contributions/SSOC24_Cert.png" },
    { title: "GirlScript Summer of Code 2025", caption: "Tech contributor ribbon badge | 2025. Add the repository, pull request, and contribution details here later.", image: "/Certification/badges/Contributor SSOC.png" },
    { title: "DevTown Community Growth", caption: "Certificate of appreciation | April 16, 2025 | Signed by co-founder Ashish Modi. Add the community work details here later.", image: "/Certification/Open Source Contributions/open_4.jpg" },
    { title: "Open Source Connect India", caption: "Contributor ID for open-source development sprints | August 15-30, 2025. Add the sprint and project details here later.", image: "/Certification/Open Source Contributions/open_2.png" }
  ],
  leadership: [
    { title: "Class Representative", caption: "Class Representative at Velammal College of Engineering and Technology | 2023-present. Representing classmates, coordinating communication between students and faculty, and helping organize academic updates and class-level responsibilities. Add specific initiatives and event details here later." },
    { title: "Placement Batch Head", caption: "Placement Batch Head | 2025-present. Supporting placement communication, coordinating batch-level updates, and helping classmates stay aligned with recruitment activities, schedules, and preparation. Add the companies, drives, or measurable outcomes here later." },
    { title: "Committee Head - Academic Cell", caption: "Committee Head, Academic Cell at Velammal College of Engineering and Technology | 2023-present. Contributing to academic coordination, peer support, and the planning of student-focused academic activities. Add committee projects and responsibilities here later." },
    { title: "Eco Club Active Volunteer", caption: "Active volunteer, VCET Eco Club | 2024-present. Participating in environmental awareness, campus sustainability, and community activities through the college Eco Club. These photos are kept together as one event and volunteering collage; add the activity names and dates here later.", images: ["/Certification/EcoClub.jpg", "/Others or Leadership services and more presentations etc/ECO club/Photo.jpg"] }
  ],
  currentWork: [
    { title: "Drive2Hire: AI-Assisted Placement FocusBar Browser Extension", caption: "Current project and upcoming conference paper. Drive2Hire is an AI-assisted browser extension designed to keep placement preparation focused inside the browser, helping students organize job-search activity, surface useful context, and reduce distraction during the placement journey. The project is being prepared for conference submission; add the paper title, authors, conference name, and submission date here later.", expectedImages: 3, images: ["/Upcoming/Drive2Hire/1.png", "/Upcoming/Drive2Hire/11.png"] }
  ],
  upcomingCertifications: [
    { title: "Ultimate AWS Certified Generative AI Developer Professional", caption: "Udemy | Upcoming certification course. Preparing for the Ultimate AWS Certified Generative AI Developer Professional course, with a focus on building and deploying generative AI applications on AWS. Add the enrollment date, completion target, and certificate details here later.", image: "/Upcoming/AWS/logo.webp" }
  ],
  campusContext: [
    { title: "Institution identity", caption: "Supporting campus identity assets from the portfolio collection. Keep or replace this caption with the exact context for the VCET and Velammal Bodhi Campus logos later.", images: ["/Logos/Vcetlogo.jpg", "/Logos/Vbcalogo.jpg"] }
  ],
  others: [
    { title: "Eco Club Active Volunteer", caption: "Active VCET Eco Club volunteer, participating in environmental awareness workshops and campus sustainability activities. Both Eco Club images are kept together as one collage.", images: ["/Others or Leadership services and more presentations etc/ECO club/EcoClub.jpg", "/Others or Leadership services and more presentations etc/ECO club/Photo.jpg"] },
    { title: "Library & study interests", caption: "Technical reading and study context from college, including the books and references that support the engineering journey. Both library images are kept together as one collage.", images: ["/Others or Leadership services and more presentations etc/Favourites in college/Library books_1.jpg", "/Others or Leadership services and more presentations etc/Favourites in college/Library books_2.jpg"] },
    { title: "Seminars, services & campus activities", caption: "A place for seminars, student services, volunteering, and other campus activities that do not belong to one certificate category. Add the event title and date here later.", image: "/Others or Leadership services and more presentations etc/SIH.jpg" }
  ],
  academicHistory: [
    { title: "B.E. Computer Science and Engineering", institution: "Velammal College of Engineering and Technology", period: "2023-2027", caption: "Current undergraduate study in computer science and engineering, with a focus on backend systems, cloud deployment, and applied AI.", images: ["/Logos/Vcetlogo.jpg"] },
    { title: "Higher Education", institution: "Velammal Bodhi Campus", period: "2017-2023", caption: "Higher secondary education before beginning the engineering degree.", images: ["/Logos/Vbcalogo.jpg"] },
    { title: "School", institution: "TVS Matriculation Higher Secondary School", period: "2011-2017", caption: "School education. Add the school logo when it is uploaded to the Logos folder.", expectedImages: 1, images: [] }
  ],
  linkedinPosts: [
    { title: "Project Expo · RAG Model · Menstrual Health", caption: "Project Expo post. Open the verified LinkedIn post to read the full caption.", image: "", url: "https://www.linkedin.com/posts/yamuna-bsvy_projectexpo-ragmodel-menstrualhealth-activity-7252692597985394690-2fyw?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEITI-gB1xhckvXVf8zOF2ITcORSU0OfRQY" },
    { title: "Designathon Euphoria 2024 · Teamwork", caption: "Designathon Euphoria 2024 post. Open the verified LinkedIn post to read the full caption.", image: "", url: "https://www.linkedin.com/posts/yamuna-bsvy_designathon-euphoria2024-teamwork-activity-7252674792670023680-_OI7?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEITI-gB1xhckvXVf8zOF2ITcORSU0OfRQY" },
  ]
};

const PROJECTS = {
  cloud: [],
  fullstack: [],
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
  ai: [],
  showcase: []
};

const projectCatalog = {
  backend: [
    {
      id: 1,
      title: "MoneyMirror",
      images: ["/MoneyMirror.mp4"],
      shortDesc: "Personal finance digital twin with cash-flow projections",
      fullDesc: "FastAPI backend for personal finance planning with JWT-secured REST APIs, PostgreSQL, and Docker.",
      tags: ["Backend", "FinTech", "FastAPI"],
      tools: ["FastAPI", "PostgreSQL", "JWT", "Docker"],
      links: {
        github: "https://github.com/Yamuna-b/Money_Mirror",
        demo: "https://drive.google.com/file/d/1H01AjMrU8kZ_mYTkO4IgUO7lQl5zsw2s/view?usp=sharing",
        live: "#"
      }
    },
    {
      id: 2,
      title: "NammaOorFix",
      images: [PLACEHOLDER_VIDEO],
      shortDesc: "Civic issue reporting with status workflows",
      fullDesc: "Backend + full-stack issue lifecycle platform from report to resolution for local civic workflows.",
      tags: ["Backend", "Civic Tech"],
      tools: ["Node.js", "MongoDB", "REST APIs"],
      links: { github: "https://github.com/Yamuna-b/Namma-Oor-Fix" }
    },
    {
      id: 3,
      title: "Petimony",
      images: ["/petimony.mp4"],
      shortDesc: "Pet shop and adoption platform",
      fullDesc: "Pet shop website with adoption flows, product highlights, and responsive UI.",
      tags: ["Full Stack", "Frontend"],
      tools: ["HTML", "CSS", "JavaScript"],
      links: { github: "https://github.com/Yamuna-b/Petimony" }
    },
    {
      id: 4,
      title: "client-support-realtime-chat",
      images: [PLACEHOLDER_VIDEO],
      shortDesc: "Realtime helpdesk chat widget",
      fullDesc: "Real-time helpdesk chat with Node.js, Express, Socket.io, and Firebase-backed messaging.",
      tags: ["Realtime", "Backend APIs"],
      tools: ["Node.js", "Express", "Socket.io", "Firebase"],
      links: { github: "https://github.com/Yamuna-b/client-support-realtime-chat" }
    },
    {
      id: 5,
      title: "RailwayPorterSeva",
      images: [PLACEHOLDER_VIDEO],
      shortDesc: "Service booking and assignment workflows",
      fullDesc: "Booking platform modeling job lifecycle, slot handling, and user-facing status tracking.",
      tags: ["Service Platform", "CRUD Workflows"],
      tools: ["Node.js", "Express", "MongoDB"],
      links: { github: "https://github.com/Yamuna-b/PorterSeva" }
    }
  ],
  ai: [
    {
      id: 1,
      title: "MarineTaxaAi",
      images: ["/MarineTaxaAi.mp4"],
      shortDesc: "ML-powered marine taxonomy platform",
      fullDesc: "Streamlit dashboard and sequence/ML classifier for marine taxonomy classification.",
      tags: ["AI/ML", "ML Classifier"],
      tools: ["Python", "Streamlit", "PyTorch", "Scikit-Learn"],
      links: {
        github: "https://github.com/Yamuna-b/MarineTaxaAi",
        demo: "https://drive.google.com/file/d/1aZN2iFA1QZwSP_ftBbqv21tr_xtpykPB/view?usp=sharing",
        live: "#"
      }
    },
    {
      id: 2,
      title: "ExoVision-SpaceApp",
      images: ["/ExoVision.mp4"],
      shortDesc: "Exoplanet classification from NASA Space Apps data",
      fullDesc: "Streamlit app for exoplanet classification using NASA public datasets and TensorFlow ML pipelines.",
      tags: ["AI/ML", "Astronomy"],
      tools: ["Python", "TensorFlow", "Streamlit"],
      links: { github: "https://github.com/Yamuna-b/nasa-spaceapps-exoplanet" }
    },
    {
      id: 3,
      title: "Self-Realizing Reflex Thermostat Agent for Smart Rooms",
      images: ["/SRA.mp4"],
      shortDesc: "Agentic reasoning and execution prototype",
      fullDesc: "Experimental plan-act-reflect style architecture for autonomous task execution.",
      tags: ["AI/ML", "Agents"],
      tools: ["Python"]
    },
    {
      id: 4,
      title: "Ecosaur",
      images: ["/ieee.png"],
      shortDesc: "Carbon footprint awareness and mitigation research",
      fullDesc: "Research published at IEEE AIDE 2025 on carbon footprint awareness and mitigation.",
      tags: ["Research", "Publication"],
      tools: ["Data Analysis", "Presentation"],
      links: { publication: IEEE_PUBLICATION_URL }
    }
  ],
  devops: [
    {
      id: 1,
      title: "LogBeacon",
      images: ["/LogBeacon.mp4"],
      shortDesc: "Log analysis backend on AWS",
      fullDesc: "TypeScript/Express log analysis service with PostgreSQL, Docker, and AWS deployment.",
      tags: ["Cloud + DevOps", "Observability", "Express"],
      tools: ["TypeScript", "Express", "PostgreSQL", "Docker", "AWS"],
      links: {
        github: "https://github.com/Yamuna-b/LogBeacon",
        demo: "https://drive.google.com/file/d/1VIW1KpCmgK-CLCpHbwdMd8BppwnZfHd-/view?usp=sharing",
        live: "#"
      }
    }
  ],
  frontend: [],
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
      title: "Designathon Euphoria'24",
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
  ]},
  { key: "backend", label: "Backend + Frontend", cards: () => projectCatalog.backend },
  { key: "ai", label: "AI / ML", cards: () => projectCatalog.ai },
  { key: "devops", label: "Cloud + DevOps", cards: () => projectCatalog.devops },
  { key: "designs", label: "Designs", cards: () => PROJECTS.uiux },
];

// Helper to check if the file is a video
const isVideo = file => typeof file === "string" && file.match(/\.(mp4|webm|ogg)$/i);

// ─── Profile Avatar ────────────────────────────────────────────────────────
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
        <div className="profile-image-placeholder"><ImageIcon size={34} /><span>Profile photo placeholder</span></div>
      </motion.div>
    </motion.div>
  );
}

function FeaturedThumb({ media, title }) {
  if (isVideo(media))
    return <video src={media} muted loop playsInline autoPlay className="absolute inset-0 w-full h-full object-cover" />;
  return <img src={media} alt={title || ""} className="absolute inset-0 w-full h-full object-cover" />;
}

// ─── Contact block ─────────────────────────────────────────────────────────
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

  </div>
);

// ─── Skill pill ────────────────────────────────────────────────────────────
function SkillPill({ label }) {
  return (
    <span className="px-2.5 py-1 rounded-md text-xs font-medium border transition-colors duration-200 hover:border-sky-500/50 hover:text-sky-300 hover:bg-sky-950/30"
      style={{ background: "rgba(30,40,60,0.6)", borderColor: "rgba(100,116,139,0.3)", color: "#cbd5e1" }}>
      {label}
    </span>
  );
}

// ─── Section card ──────────────────────────────────────────────────────────
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

// ─── HomePage ──────────────────────────────────────────────────────────────
function ProofStack({ images, label, altPrefix, className = "" }) {
  const visibleImages = images?.filter(Boolean) || [];
  return (
    <div className={`proof-stack proof-stack-collage proof-stack-${Math.min(Math.max(visibleImages.length, 1), 4)} ${className}`}>
      {visibleImages.length ? visibleImages.map((image, index) => <img key={image} src={image} alt={`${altPrefix} proof ${index + 1}`} />) : <div className="proof-placeholder"><ImageIcon size={22} /><span>{label}</span><small>Add image 01</small></div>}
    </div>
  );
}

function TechLogos({ items }) {
  const icons = { FastAPI: SiFastapi, PostgreSQL: SiPostgresql, Docker: SiDocker, AWS: SiAmazon, TypeScript: SiTypescript, Express: SiExpress, "Node.js": SiNodedotjs, Python: SiPython, PyTorch: SiPytorch, MongoDB: SiMongodb, React: SiReact, Git: SiGit };
  return <div className="tech-logo-row">{items.map(item => { const Icon = icons[item]; return <span key={item} className="tech-logo-chip">{Icon ? <Icon aria-hidden="true" /> : <span className="tech-dot" />} {item}</span>; })}</div>;
}

function EvidenceCollage({ item, type, index }) {
  const images = (typeof item === "string" ? [item] : item.images?.length ? item.images : [item.image]).filter(Boolean);
  const title = typeof item === "string" ? `${type} evidence ${index + 1}` : item.title;
  const expectedImages = typeof item === "string" ? images.length : Math.max(item.expectedImages || 0, images.length);
  const slots = expectedImages ? Array.from({ length: expectedImages }, (_, slotIndex) => images[slotIndex] || null) : [null];
  return (
    <div className={`bento-image bento-image-${Math.min(Math.max(slots.length, 1), 4)}`}>
      {slots.map((image, imageIndex) => image ? <img key={`${image}-${imageIndex}`} src={image} alt={`${title} proof ${imageIndex + 1}`} /> : <div className="bento-empty" key={`empty-${imageIndex}`}><ImageIcon size={24} /><span>Add proof image {imageIndex + 1}</span></div>)}
    </div>
  );
}

function ProofBento({ items, type = "certificate" }) {
  return <div className={`proof-bento proof-bento-${type}`}>{items.map((item, index) => <motion.figure key={typeof item === "string" ? item : item.title} className={`bento-item bento-item-${index + 1}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * .06 }}><EvidenceCollage item={item} type={type} index={index} />{typeof item !== "string" && <figcaption><strong>{item.title}</strong><span>{item.caption}</span></figcaption>}</motion.figure>)}</div>;
}

function AcademicTimeline({ items }) {
  return <div className="academic-timeline">{items.map((item, index) => <motion.article className="academic-entry" key={item.title} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * .08 }}><div className="academic-logo-wrap">{item.images?.[0] ? <img src={item.images[0]} alt={`${item.institution} logo`} /> : <div className="academic-logo-placeholder"><ImageIcon size={18} /></div>}</div><div className="academic-entry-content"><div className="academic-entry-heading"><h3>{item.title}</h3><span>{item.period}</span></div><strong>{item.institution}</strong><p>{item.caption}</p></div></motion.article>)}</div>;
}

function LinkedInPostsSection() {
  return (
    <section id="linkedin-posts" className="linkedin-posts-section evidence-section">
      <div className="section-intro"><p className="eyebrow">09 / LINKEDIN FIELD NOTES</p><h2>Thoughts from the build loop.</h2><p>Short reflections on backend systems, cloud learning, research, and the work around the work.</p></div>
      <div className="linkedin-post-grid">
        {portfolioContent.linkedinPosts.map((post, index) => (
          <motion.article key={`${post.title}-${index}`} className="linkedin-post-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * .1 }}>
            <div className="linkedin-post-image">{post.image ? <img src={post.image} alt={`${post.title} LinkedIn post`} /> : <div className="post-placeholder"><Linkedin size={24} /><strong>Post image</strong><span>Add a verified LinkedIn image</span></div>}</div>
            <div className="linkedin-post-copy"><span className="post-number">0{index + 1} / LINKEDIN</span><h3>{post.title}</h3><p>{post.caption}</p>{post.url ? <a href={post.url} target="_blank" rel="noopener noreferrer" className="project-links"><Linkedin size={15} /> Read post</a> : <span className="post-status">Add post URL and caption in portfolioContent</span>}</div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main className="studio-page">
      <div className="studio-wrap">
        <section className="studio-hero" data-canvas-theme="hero">
          <div className="hero-copy">
            <p className="eyebrow">BACKEND · CLOUD · AI SYSTEMS</p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>YAMUNA<span>.</span></motion.h1>
            <p className="hero-label">{portfolioContent.identity.label}</p>
            <p className="hero-statement">I build practical software - from backend APIs and databases to cloud-deployed products.</p>
            <p className="hero-detail">{portfolioContent.identity.location} · Final-year Computer Science student · Graduating 2027</p>
            <div className="hero-actions">
              <a href="#projects" className="studio-button studio-button-primary">View selected work <ArrowDownRight size={16} /></a>
              <a href="/Resume.pdf" download="Yamuna_Resume.pdf" className="studio-button">Download resume <Download size={15} /></a>
            </div>
            <div className="social-row">
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub</a>
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn</a>
              <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer"><SiLeetcode size={16} /> LeetCode</a>
            </div>
          </div>
          <div className="hero-portrait-wrap">
            <div className="portrait-cloud" />
            <div className="hero-portrait-frame"><div className="hero-portrait-placeholder"><ImageIcon size={34} /><span>Profile photo placeholder</span></div></div>
          </div>
        </section>

        <div className="system-rail" aria-hidden="true"><span /><span /><span /><span /></div>

        <section id="about" className="now-strip scroll-mt-28"><div className="now-label">01 / ABOUT NOW</div><div><h2>I turn ideas into dependable systems.</h2><p>{portfolioContent.identity.about}</p><p>{portfolioContent.identity.aws}</p></div><div className="now-stamp">GRADUATING<br /><strong>2027</strong></div></section>

        <blockquote className="canvas-quote quote-world">“The people who are crazy enough to think they can change the world are the ones who do.”</blockquote>

        <section className="approach-section"><div className="section-intro"><p className="eyebrow">ENGINEERING IDENTITY</p><h2>The systems I work with.</h2><p>Idea → Interface → API → Backend services → Database → Cloud deployment.</p></div><div className="approach-flow">{["Idea", "Interface", "API", "Backend services", "Database", "Cloud deployment"].map((step, index) => <div className="approach-node" key={step}><strong>{step}</strong>{index < 5 && <b>→</b>}</div>)}</div></section>

        <section id="projects" className="studio-section scroll-mt-28" data-canvas-theme="projects">
          <div className="section-art section-art-projects" aria-hidden="true"><span className="art-ledger-line" /><span className="art-ledger-line" /><span className="art-ledger-line" /><i className="art-spark">✦</i></div>
          <div className="section-intro"><p className="eyebrow">FEATURED PROJECTS</p><h2>Three systems, three kinds of useful.</h2><p>Images stay visible. Demo videos and links remain actions, not background decoration.</p></div>
          <div className="project-stories">
            {portfolioContent.projects.map((project, idx) => (
              <motion.article key={project.title} className={`project-story ${idx % 2 === 1 ? "project-story-reverse" : ""}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
                <ProofStack images={project.screenshots} label={`${project.title} screenshots`} altPrefix={project.title} />
                <div className="project-copy"><p className="project-index">0{idx + 1} / {idx === 0 ? "FINANCE SYSTEM" : idx === 1 ? "OBSERVABILITY" : "BIOINFORMATICS"}</p><h3>{project.title}</h3><p className="project-tagline">{project.tagline}</p><p className="project-problem">{project.problem}</p><TechLogos items={project.stack} /><div className="project-links"><a href={project.links.github} target="_blank" rel="noopener noreferrer"><Github size={15} /> GitHub</a><a href={project.links.demo} target="_blank" rel="noopener noreferrer"><ExternalLink size={15} /> Demo video</a><a href={project.website === "#" ? undefined : project.website} className={project.website === "#" ? "is-disabled" : ""} aria-disabled={project.website === "#"}>{project.website === "#" ? "Website / Coming soon" : "Website"}</a></div></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="skills" className="studio-section skill-section scroll-mt-28"><div className="section-art section-art-skills" aria-hidden="true"><span className="art-node art-node-a" /><span className="art-node art-node-b" /><span className="art-node art-node-c" /><span className="art-connector" /></div><div className="section-intro"><p className="eyebrow">03 / WORKING TOOLKIT</p><h2>The tools behind the build.</h2><p>A clear view of the languages, frameworks, data systems, and delivery tools I use across the stack.</p></div><div className="toolkit-map"><div className="map-node map-core"><Terminal size={22} /><strong>BUILD LOOP</strong><small>idea → system → deployment → impact</small></div>{personalInfo.skillGroups.slice(0, 5).map((group, idx) => <div className={`map-node map-node-${idx}`} key={group.title}><div className="map-node-icon">{idx === 0 ? <GitBranch size={18} /> : idx === 1 ? <Server size={18} /> : idx === 2 ? <Database size={18} /> : idx === 3 ? <Cloud size={18} /> : <Terminal size={18} />}</div><strong>{group.title}</strong><div className="node-items">{group.items.slice(0, 6).map(item => { const icons = { Java: Terminal, "C++": SiCplusplus, C: SiC, Python: SiPython, JavaScript: SiJavascript, SQL: Database, FastAPI: SiFastapi, "Node.js": SiNodedotjs, "Express.js": SiExpress, "REST APIs": Cloud, PostgreSQL: SiPostgresql, MongoDB: SiMongodb, SQLite: SiSqlite, AWS: SiAmazon, Docker: SiDocker, Git: SiGit, "CI/CD": SiGithubactions, Linux: SiLinux, React: SiReact, "HTML": SiHtml5, CSS: SiCss3, "Tailwind CSS": SiTailwindcss, PyTorch: SiPytorch, TensorFlow: SiTensorflow, "Hugging Face": SiHuggingface, LLM: SiOpenai }; const Icon = icons[item] || Terminal; return <span key={item}><Icon aria-hidden="true" /><b>{item}</b></span>; })}</div></div>)}</div></section>

        <section id="experience" className="studio-section timeline-section scroll-mt-28"><div className="section-art section-art-experience" aria-hidden="true"><span className="art-tape" /><span className="art-star">✦</span><span className="art-pencil-line" /></div><div className="section-intro"><p className="eyebrow">INTERNSHIP STORY</p><h2>Learning in public, shipping with care.</h2></div><div className="internship-stories">{portfolioContent.internships.map(internship => <article className="internship-story" key={internship.company}><div className="internship-heading"><img src={internship.logo} alt={`${internship.company} logo`} /><div><p className="project-index">EXPERIENCE</p><h3>{internship.role} - {internship.company}</h3><p>{internship.desc}</p></div></div><div className="internship-rule" /><div className="internship-projects">{internship.projects.map(project => <div className="internship-project" key={project.name}><ProofStack images={project.images || [project.image]} label={`${project.name} image`} altPrefix={project.name} /><div><h4>{project.name}</h4><p>{project.description}</p><TechLogos items={project.stack} /><div className="project-links"><a href={project.github === "#" ? undefined : project.github} className={project.github === "#" ? "is-disabled" : ""} aria-disabled={project.github === "#"}><Github size={15} /> GitHub</a><a href="#" className="is-disabled" aria-disabled="true"><ExternalLink size={15} /> Demo video / Coming soon</a></div></div></div>)}</div></article>)}</div></section>

        <blockquote className="canvas-quote quote-life">“So many movies to watch, languages to learn, instruments to play, places to visit, books to read, lives to live and so little time.”</blockquote>

        <section id="publication" className="evidence-section publication-section"><div className="section-intro"><p className="eyebrow">06 / RESEARCH, DOCUMENTED</p><h2>IEEE AIDE 2025</h2><p>Carbon footprint awareness and mitigation research presented as an IEEE conference publication.</p><a className="studio-button studio-button-primary" href={IEEE_PUBLICATION_URL} target="_blank" rel="noopener noreferrer">View publication <ExternalLink size={15} /></a></div><div className="publication-collage"><img className="publication-page" src="/Experience/IEEE/IEEE published paper screenshot.png" alt="IEEE publication proof" /><img className="publication-certificate" src="/Experience/IEEE/IEEE certfiicate.jpg" alt="IEEE author certificate" /><img className="publication-event-photo" src="/Experience/IEEE/Photo.jpg" alt="IEEE conference presentation" /><span className="hand-note">author / presenter</span></div></section>

        <section id="awards" className="evidence-section"><div className="section-intro"><p className="eyebrow">07 / FIRST PRIZE</p><h2>First Prize, worth framing.</h2><p>DesignVerse and other verified first-prize achievements, presented as large editorial proof.</p></div><ProofBento items={portfolioContent.awards} type="awards" /></section>

        <section id="certifications" className="evidence-section"><div className="section-intro"><p className="eyebrow">08 / CERTIFICATIONS</p><h2>Other certificates and courses.</h2><p>Technical courses, internship certificates, cloud learning, AI/ML study, and event certificates.</p></div><ProofBento items={portfolioContent.certificates} type="certificate" /></section>

        <section id="open-source" className="evidence-section"><div className="section-intro"><p className="eyebrow">OPEN SOURCE & BADGES</p><h2>Contribution proof.</h2></div><div className="proof-columns"><div><h3>Open source contribution certificates</h3><ProofBento items={portfolioContent.openSource} type="opensource" /></div><div><h3>Platform badges</h3><ProofBento items={portfolioContent.badges} type="badges" /></div></div></section>

        <section id="leadership" className="evidence-section"><div className="section-intro"><p className="eyebrow">10 / LEADERSHIP & VOLUNTEERING</p><h2>Responsibility beyond the code.</h2><p>Class representation, placement coordination, academic committee leadership, and active Eco Club volunteering, with space for the longer story behind each role.</p></div><ProofBento items={portfolioContent.leadership} type="leadership" /></section>

        <section id="current-work" className="evidence-section current-work-section"><div className="section-intro"><p className="eyebrow">11 / CURRENT WORK & UPCOMING</p><h2>What I am building next.</h2><p>Current project work, conference preparation, and the next certification in progress.</p></div><div className="current-work-grid"><div><h3>Project + paper in preparation</h3><ProofBento items={portfolioContent.currentWork} type="current-work" /></div><div><h3>Upcoming certification</h3><ProofBento items={portfolioContent.upcomingCertifications} type="upcoming" /></div></div></section>

        <section id="academics" className="evidence-section academic-section"><div className="section-intro"><p className="eyebrow">ACADEMICS</p><h2>Education and academic journey.</h2><p>College, higher education, and school history restored from the earlier portfolio version.</p></div><AcademicTimeline items={portfolioContent.academicHistory} /></section>

        <section id="others" className="evidence-section others-section"><div className="section-intro"><p className="eyebrow">OTHERS: LEADERSHIP, VOLUNTEERING & CAMPUS LIFE</p><h2>The work around the work.</h2><p>Seminars, volunteering, services, study interests, and campus activities that complete the student story.</p></div><ProofBento items={portfolioContent.others} type="others" /></section>

        <LinkedInPostsSection />

        <section id="coding-activity" className="studio-stats evidence-section"><div className="section-intro"><p className="eyebrow">10 / PROBLEM SOLVING</p><h2>Consistency matters as much as a single breakthrough.</h2></div><Stats /><blockquote className="canvas-quote quote-win">“It only takes one big win to erase all the losses. Just one!”</blockquote></section>

        <section id="resume" className="resume-section evidence-section"><div className="section-intro"><p className="eyebrow">THE FULL VERSION</p><h2>Read the resume in context.</h2><p>The full PDF stays visible here, with a direct download below it.</p></div><div className="resume-frame"><iframe src="/Resume.pdf" title="Yamuna Balamurugan resume preview" /></div><div className="resume-actions"><a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="studio-button studio-button-primary">Open full PDF <ExternalLink size={15} /></a><a href="/Resume.pdf" download="Yamuna_Balamurugan_Resume.pdf" className="studio-button"><Download size={15} /> Download resume</a></div></section>

        <section id="education" className="education-section evidence-section"><div className="education-copy"><p className="eyebrow">12 / EDUCATION + CONTACT</p><h2>B.E. Computer Science and Engineering</h2><p>Final-year undergraduate · Velammal College of Engineering and Technology · Madurai · Graduating 2027</p><div className="language-list"><span>English</span><span>Tamil</span><span>Hindi / Basic</span></div></div><div id="contact" className="studio-contact"><div className="section-art section-art-contact" aria-hidden="true"><span className="art-horizon" /><span className="art-sun" /></div><div><p className="eyebrow">OPEN CHANNEL</p><h2>Let’s build something dependable.</h2><p>Open to backend, cloud, and software-development roles.</p></div><div className="contact-actions"><a href={`mailto:${personalInfo.email}`} className="studio-button studio-button-primary"><Mail size={16} /> {personalInfo.email}</a><div className="social-row"><a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn</a><a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub</a><a href={`https://wa.me/${personalInfo.whatsapp}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp size={16} /> WhatsApp</a></div></div></div></section>
      </div>
    </main>
  );
}

// ─── Media Swiper ───────────────────────────────────────────────────────────
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

    Object.values(videoRefs.current).forEach(v => {
      if (v) { v.pause(); v.currentTime = 0; }
    });
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
          {project.links && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[210] flex flex-wrap gap-3 justify-center">
              {project.links.github && project.links.github !== "#" && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-100 transition-all hover:scale-105 border border-slate-700"
                  style={{ background: "rgba(30,40,55,0.9)" }}>
                  GitHub
                </a>
              )}
              {project.links.demo && project.links.demo !== "#" && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }}>
                  Demo
                </a>
              )}
              {project.links.live && project.links.live !== "#" && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #10b981, #34d399)" }}>
                  Live
                </a>
              )}
              {project.links.behance && project.links.behance !== "#" && (
                <a href={project.links.behance} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #1769ff, #408bff)" }}>
                  Behance
                </a>
              )}
              {project.links.figma && project.links.figma !== "#" && (
                <a href={project.links.figma} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #f24e1e, #ff7262)" }}>
                  Figma
                </a>
              )}
              {project.links.publication && project.links.publication !== "#" && (
                <a href={project.links.publication} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #a78bfa)" }}>
                  Publication
                </a>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

// ─── Project Grid ───────────────────────────────────────────────────────────
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
              <video src={images[0]} muted loop playsInline autoPlay className="w-full h-full object-contain" />
            )}
            {singleVideo && expanded && (
              <MediaSwiper mediaList={images} className="w-full h-full" showControls />
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
    <div className="min-h-screen pt-24 sm:pt-32 pb-16" style={{ background: "linear-gradient(170deg, #08090e 0%, #0c111a 40%, #08090e 100%)" }}>
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
    const onKeyDown = event => { if (event.key === "Escape") onClose(); };
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
          <iframe src="/resume.pdf" width="100%" height="100%" frameBorder="0" title="Resume Preview" />
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
    <div className="min-h-screen pt-24 sm:pt-32 pb-16" style={{ background: "linear-gradient(170deg, #08090e 0%, #0c111a 40%, #08090e 100%)" }}>
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
  const [canvasTheme, setCanvasTheme] = useState("hero");
  const [expandedProject, setExpandedProject] = useState(null);
  const [isResumePreviewOpen, setResumePreviewOpen] = useState(false);

  const scrollHomeTo = useCallback(sectionId => {
    setExpandedProject(null);
    setActiveSection("home");
    queueMicrotask(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  useEffect(() => {
    const themeSections = [
      [".studio-hero", "hero"], ["#about", "about"], [".approach-section", "identity"],
      ["#projects", "projects"], ["#skills", "skills"], ["#experience", "experience"],
      ["#publication", "research"], ["#awards", "recognition"], ["#certifications", "certifications"], ["#open-source", "opensource"], ["#leadership", "leadership"], ["#current-work", "current-work"], ["#campus-context", "campus"],
      ["#academics", "academics"], ["#others", "others"], ["#linkedin-posts", "linkedin"], ["#coding-activity", "coding"], ["#resume", "resume"], ["#education", "contact"]
    ];
    const sections = themeSections.map(([selector, theme]) => {
      const section = document.querySelector(selector);
      if (section) section.dataset.canvasTheme = theme;
      return section;
    }).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.dataset.canvasTheme) setCanvasTheme(visible.target.dataset.canvasTheme);
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: "-18% 0px -30%" });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <div className={`min-h-screen font-sans text-slate-200 antialiased canvas-shell canvas-shell-${canvasTheme}`}>
        <Bubbles canvasTheme={canvasTheme} />
        {activeSection === "home" && <HomePage />}
        {activeSection === "projects" && (
          <ProjectsOverview expandedProject={expandedProject} setExpandedProject={setExpandedProject} />
        )}
        {activeSection === "highlights" && <HighlightsSection />}
        {activeSection === "video" && (
          <section className="min-h-screen pt-32 sm:pt-36 pb-16" style={{ background: "linear-gradient(170deg, #08090e 0%, #0c111a 40%, #08090e 100%)" }}>
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
