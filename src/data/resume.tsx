import { Icons } from "@/components/icons";
import { HomeIcon, FolderIcon, Award, BookOpen, Cpu, ShieldCheck } from "lucide-react";
import { faReact, faNodeJs, faGitAlt, faTypescript, faDocker, faPython, faJava, faJs, faHtml5, faCss3Alt } from "@fortawesome/free-brands-svg-icons";
import { faLeaf, faDatabase, faServer, faCloud, faBrain, faCode } from "@fortawesome/free-solid-svg-icons";

export const DATA = {
  name: "Yamuna B",
  initials: "YB",
  url: "https://yamuna-b.vercel.app",
  location: "Madurai, Tamil Nadu, India",
  locationLink: "https://www.google.com/maps/place/Madurai,+Tamil+Nadu",
  description: "Backend / Cloud Engineer with AI specialization",
  summary:
    "**[[highlight:Backend & Cloud Engineer]]** specializing in AI integration, based in Madurai, India.\n\nFinal-year Computer Science student at **Velammal College of Engineering and Technology** (Graduating 2027).\n\nI turn ideas into dependable systems — building REST APIs, connecting databases & AWS cloud services, handling deployment & monitoring, and integrating GenAI features when needed.\n\nGrowing deeper in AWS across compute, storage, networking, security, IAM, infrastructure as code, observability, and cost optimization.",

  avatarUrl: "/yamuna-portrait.webp",
  
  stats: [
    { value: "140+", label: "GitHub contributions in last year", href: "https://github.com/Yamuna-b" },
    { value: "324", label: "LeetCode problems solved", href: "https://leetcode.com/u/Yamuna_bsvy/" },
    { value: "IEEE 2025", label: "Conference Research Publication", href: "https://ieeexplore.ieee.org/document/10986878" },
    { value: "1st Place", label: "3x Project & Design Competition Winner", href: "https://www.linkedin.com/in/yamuna-bsvy/" },
  ],

  quotes: [
    "The people who are crazy enough to think they can change the world are the ones who do.",
    "So many movies to watch, languages to learn, instruments to play, places to visit, books to read, lives to live and so little time.",
    "It only takes one big win to erase all the losses. Just one!",
    "Consistency matters as much as a single breakthrough."
  ],

  systems: [
    { step: "01", name: "Idea", description: "Problem statement & design" },
    { step: "02", name: "Interface", description: "Responsive UI & prototypes" },
    { step: "03", name: "API", description: "REST & realtime endpoints" },
    { step: "04", name: "Backend services", description: "Business logic & auth" },
    { step: "05", name: "Database", description: "Relational & NoSQL schemas" },
    { step: "06", name: "Cloud deployment", description: "CI/CD & cloud infrastructure" },
  ],

  skills: [
    { name: "Java", icon: faJava, category: "Languages" },
    { name: "Python", icon: faPython, category: "Languages" },
    { name: "C++", icon: faCode, category: "Languages" },
    { name: "JavaScript", icon: faJs, category: "Languages" },
    { name: "TypeScript", icon: faTypescript, category: "Languages" },
    { name: "HTML5", icon: faHtml5, category: "Frontend" },
    { name: "CSS3", icon: faCss3Alt, category: "Frontend" },
    { name: "React", icon: faReact, category: "Frontend" },
    { name: "FastAPI", icon: faServer, category: "Backend" },
    { name: "Node.js", icon: faNodeJs, category: "Backend" },
    { name: "Express.js", icon: faServer, category: "Backend" },
    { name: "REST APIs", icon: faServer, category: "Backend" },
    { name: "PostgreSQL", icon: faDatabase, category: "Database" },
    { name: "MongoDB", icon: faLeaf, category: "Database" },
    { name: "SQLite", icon: faDatabase, category: "Database" },
    { name: "Docker", icon: faDocker, category: "DevOps & Cloud" },
    { name: "Git", icon: faGitAlt, category: "DevOps & Cloud" },
    { name: "GitHub Actions", customIcon: Icons.github, category: "DevOps & Cloud" },
    { name: "AWS", icon: faCloud, category: "DevOps & Cloud" },
    { name: "scikit-learn", icon: faBrain, category: "AI & ML" },
  ],

  tools: [
    {
      name: "VS Code / Cursor",
      description: "Code editor and AI-assisted IDE for building backend APIs and web applications.",
      href: "https://code.visualstudio.com",
      customIcon: Icons.vscode,
    },
    {
      name: "Docker",
      description: "Containerization for consistent environment setup and microservice isolation.",
      href: "https://www.docker.com",
      icon: faDocker,
    },
    {
      name: "Git & GitHub",
      description: "Version control, code hosting, and automated CI/CD workflows via GitHub Actions.",
      href: "https://github.com/Yamuna-b",
      icon: faGitAlt,
    },
    {
      name: "AWS",
      description: "Cloud infrastructure spanning compute, storage, networking, security, IAM, and observability.",
      href: "https://aws.amazon.com",
      icon: faCloud,
    },
    {
      name: "PostgreSQL & MongoDB",
      description: "Relational and document database storage for schema design and data modeling.",
      href: "https://www.postgresql.org",
      icon: faDatabase,
    },
  ],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "#projects", icon: FolderIcon, label: "Projects" },
    { href: "#achievements", icon: Award, label: "Achievements" },
    { href: "#certifications", icon: ShieldCheck, label: "Certifications" },
    { href: "#education", icon: BookOpen, label: "Education" },
  ],

  contact: {
    email: "yamuna.bsvy@gmail.com",
    phone: "+91 96291 63099",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Yamuna-b",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/yamuna-bsvy/",
        icon: Icons.linkedin,
        navbar: true,
      },
      LeetCode: {
        name: "LeetCode",
        url: "https://leetcode.com/u/Yamuna_bsvy/",
        icon: Icons.leetcode,
        navbar: true,
      },
      WhatsApp: {
        name: "WhatsApp",
        url: "https://wa.me/919629163099",
        icon: Icons.whatsapp,
        navbar: true,
      },
      Email: {
        name: "Send Email",
        url: "mailto:yamuna.bsvy@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Reccsar Private Limited",
      href: "https://github.com/Yamuna-b",
      badges: ["Internship"],
      location: "Madurai, India",
      title: "Cloud & Full Stack Web Intern",
      logoUrl: "/stuffs/Logos/Reccsarlogo.jpg",
      start: "2025",
      end: "2025",
      impact: "Built real-time chat widget & NammaOorFix civic portal",
      description:
        "Built client-support-realtime-chat widget with authentication, agent assignment, and live messaging using Socket.io, Node.js, Express, and Firebase. Developed NammaOorFix full-stack civic issue reporting portal with React/Vite frontend, Node.js/Express + MongoDB backend, JWT auth, geospatial clustering, and officer dashboards.",
      links: [
        {
          type: "NammaOorFix GitHub",
          href: "https://github.com/Yamuna-b/NammaOorFix",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Realtime Chat GitHub",
          href: "https://github.com/Yamuna-b/client-support-realtime-chat",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      company: "Kevell Corp",
      href: "https://github.com/Yamuna-b",
      badges: ["Internship"],
      location: "Madurai, India",
      title: "Web Development Intern",
      logoUrl: "/stuffs/Logos/kevelllogo.jpg",
      start: "2024",
      end: "2024",
      impact: "Designed Petimony pet site & RailwayPorterSeva static booking UI",
      description:
        "Designed and implemented Petimony responsive multi-page pet products site with clean UI, mobile layout, and interactive elements. Built RailwayPorterSeva static booking UI for station porter assistance using HTML, CSS, JavaScript.",
      links: [
        {
          type: "Petimony GitHub",
          href: "https://github.com/Yamuna-b/Petimony",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "PorterSeva GitHub",
          href: "https://github.com/Yamuna-b/PorterSeva",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
  ],

  education: [
    {
      school: "Velammal College of Engineering and Technology",
      href: "https://vcet.ac.in/",
      degree: "B.E. Computer Science and Engineering (Final-year, Graduating 2027)",
      logoUrl: "/stuffs/Logos/Vcetlogo.jpg",
      start: "2023",
      end: "2027",
    },
    {
      school: "Velammal Bodhi Campus",
      href: "#",
      degree: "Higher Secondary Education",
      logoUrl: "/stuffs/Logos/Vbcalogo.jpg",
      start: "2017",
      end: "2023",
    },
    {
      school: "TVS Matriculation Higher Secondary School",
      href: "#",
      degree: "Secondary School Education",
      logoUrl: "/stuffs/Logos/Tvslogo.jpg",
      start: "2011",
      end: "2017",
    },
  ],

  projects: [
    {
      title: "MoneyMirror",
      href: "https://github.com/Yamuna-b/MoneyMirror",
      dates: "2024",
      active: true,
      description:
        "Personal finance digital twin—enter salary, EMIs, savings, and expenses to simulate cash flow, runway, and low-balance risk over short-term horizons. Make future cash-flow pressure visible before it becomes a surprise.",
      technologies: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "SQLite",
        "Docker",
        "GitHub Actions",
        "Hugging Face",
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/Yamuna-b/MoneyMirror",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Demo Video",
          href: "https://drive.google.com/file/d/1H01AjMrU8kZ_mYTkO4IgUO7lQl5zsw2s/view?usp=sharing",
          icon: <Icons.globe className="size-3" />,
        },
        { type: "Live Website", href: "https://yamunabalamurugan-moneymirror.hf.space/", icon: <Icons.globe className="size-3" /> },
      ],
      image: "/stuffs/Projects/MoneyMirror.png",
      video: "",
    },
    {
      title: "LogBeacon",
      href: "https://github.com/Yamuna-b/LogBeacon",
      dates: "2024",
      active: true,
      description:
        "Log analysis backend that ingests structured logs and supports filtering by time, level, service, and search text, with incident linking and optional summarization. Turn noisy logs into searchable, structured incident intelligence.",
      technologies: [
        "React",
        "Vite",
        "TypeScript",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Prisma",
        "Zod",
        "Vercel",
        "Render",
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/Yamuna-b/LogBeacon",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Demo Video",
          href: "https://drive.google.com/file/d/1VIW1KpCmgK-CLCpHbwdMd8BppwnZfHd-/view?usp=sharing",
          icon: <Icons.globe className="size-3" />,
        },
        { type: "Live Website", href: "https://logbeacon.onslate.in", icon: <Icons.globe className="size-3" /> },
      ],
      image: "/stuffs/Projects/LogBeacon.png",
      video: "",
    },
    {
      title: "MarineTaxaAi",
      href: "https://github.com/Yamuna-b/MarineTaxaAi",
      dates: "2024",
      active: true,
      description:
        "Python-based eDNA pipeline that encodes FASTQ/CSV sequence data into k-mer and GC-content features and predicts marine species using scikit-learn models. Make sequence-based marine classification easier to inspect and explain.",
      technologies: [
        "Python",
        "FastAPI",
        "Streamlit",
        "scikit-learn",
        "NumPy",
        "pandas",
        "Biopython",
        "Plotly",
        "DBSCAN",
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/Yamuna-b/MarineTaxaAi",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Demo Video",
          href: "https://drive.google.com/file/d/1aZN2iFA1QZwSP_ftBbqv21tr_xtpykPB/view?usp=sharing",
          icon: <Icons.globe className="size-3" />,
        },
        { type: "Live Website", href: "https://marine-taxa-ai.vercel.app", icon: <Icons.globe className="size-3" /> },
      ],
      image: "/stuffs/Projects/MarineTaxaAI.png",
      video: "",
    },
    {
      title: "NammaOorFix",
      href: "https://github.com/Yamuna-b/NammaOorFix",
      dates: "2024",
      active: true,
      description:
        "Full-stack civic issue reporting portal with React/Vite frontend and Node.js/Express + MongoDB backend, including JWT auth, geospatial clustering, and officer dashboards.",
      technologies: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "MongoDB",
        "JWT",
        "BcryptJS",
        "Multer",
        "ml-kmeans",
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/Yamuna-b/NammaOorFix",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/stuffs/Experience/Internship 2/NammaOorFix.png",
      video: "",
    },
    {
      title: "Realtime Support Chat",
      href: "https://github.com/Yamuna-b/client-support-realtime-chat",
      dates: "2024",
      active: true,
      description:
        "Real-time helpdesk widget with authentication, agent assignment, chat history, and live messaging between clients and support staff.",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Node.js",
        "Express",
        "Socket.io",
        "Firebase",
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/Yamuna-b/client-support-realtime-chat",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/stuffs/Experience/Internship 2/ClientSupportRealtimeChat.png",
      video: "",
    },
    {
      title: "Petimony",
      href: "https://github.com/Yamuna-b/Petimony",
      dates: "2024",
      active: true,
      description:
        "Designed and implemented a responsive multi-page pet products site with clean UI, mobile-friendly layout, and interactive elements like sliders and hover effects.",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Git",
        "GitHub Pages",
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/Yamuna-b/Petimony",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/stuffs/Experience/Internship 1/Petimony.png",
      video: "",
    },
    {
      title: "RailwayPorterSeva",
      href: "https://github.com/Yamuna-b/PorterSeva",
      dates: "2024",
      active: true,
      description:
        "Built a static booking UI for porter assistance at stations using HTML, CSS, and JavaScript, focusing on clear forms and simple flows for users.",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Git",
        "GitHub Pages",
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/Yamuna-b/PorterSeva",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/stuffs/Experience/Internship 1/RailwayPorterSystem.png",
      video: "",
    },
    {
      title: "ExoVision AI (Exoplanets)",
      href: "https://github.com/Yamuna-b/ExoVision-SpaceApp",
      dates: "NASA Space Apps Project",
      active: true,
      description:
        "Built an AI-powered platform for classifying exoplanet candidates from NASA Kepler, K2, and TESS datasets using Random Forest and SVM models, with interactive visualizations and explainable AI.",
      technologies: [
        "Python",
        "Streamlit",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Plotly",
        "LIME/SHAP",
        "SQLite",
        "Docker",
      ],
      links: [{ type: "GitHub", href: "https://github.com/Yamuna-b/ExoVision-SpaceApp", icon: <Icons.github className="size-3" /> }],
      image: "/projects/exovision-ai.png",
      video: "",
    },
  ],

  publication: {
    title: "IEEE AIDE 2025",
    description: "Carbon footprint awareness and mitigation research presented as an IEEE conference publication.",
    link: "https://ieeexplore.ieee.org/document/10986878",
    image: "/stuffs/Experience/IEEE.png",
  },

  achievements: [
    {
      title: "Kalasalingam - Designthon First Place",
      link: "https://www.linkedin.com/posts/yamuna-bsvy_designathon-euphoria2024-teamwork-activity-7252674792670023680-_OI7",
      image: "/stuffs/Certification/First price Awards/Kalasalingam.png",
    },
    {
      title: "Sri Ramakrishna - Techathon Gold Rank",
      link: "https://www.linkedin.com/posts/yamuna-bsvy_projectexpo-ragmodel-menstrualhealth-activity-7252692597985394690-2fyw",
      image: "/stuffs/Certification/First price Awards/SriRamakrishna_project.png",
    },
    {
      title: "VCET - DesignVerse First Place",
      link: "https://www.linkedin.com/in/yamuna-bsvy/",
      image: "/stuffs/Certification/First price Awards/VCET.png",
    },
  ],

  certificationsList: [
    {
      "name": "University of Michigan - Python for Everybody Specialization",
      "image": "/stuffs/Certification/Certificates/Coursera Certificate 6.jpg"
    },
    {
      "name": "NVIDIA - Fundamentals of Deep Learning",
      "image": "/stuffs/Certification/Certificates/NVIDIA.png"
    },
    {
      "name": "Sri Ramakrishna — Paper Presentation",
      "image": "/stuffs/Certification/Certificates/SriRamakrishna_paper.jpg"
    },
    {
      "name": "IBM - Python Project for Data Science",
      "image": "/stuffs/Certification/Certificates/Coursera Certificate 7.jpg"
    },
    {
      "name": "GreyLearn - C++ Programming",
      "image": "/stuffs/Certification/Certificates/C++Programming_GreyLearn.jpg"
    },
    {
      "name": "LinkedIn Learning - Getting Started as a Java Developer",
      "image": "/stuffs/Certification/Certificates/LinkedIn Learning-Java.jpg"
    },
    {
      "name": "Tata STRIVE - Cybersecurity for Beginners",
      "image": "/stuffs/Certification/Certificates/CYBERSECURITY.jpg"
    },
    {
      "name": "GreyLearn - Advance Excel",
      "image": "/stuffs/Certification/Certificates/AdvanceExcel_GreyLearn.jpg"
    },
    {
      "name": "VCET — Idea Contest",
      "image": "/stuffs/Certification/Certificates/Vcet_Idea_contest.jpg"
    },
    {
      "name": "Thiagarajar College of Engineering - Robotics Workshop (MOBIUS 2K24)",
      "image": "/stuffs/Certification/Certificates/TCE_Workshop.png"
    }
  ],

  openSourceContributions: [
    {
      "name": "Harness Certified Continuous Delivery & GitOps Developer",
      "image": "/stuffs/Certification/Open Source Contributions/Harness Certified Continuous Delivery & GitOps Developer.jpg"
    },
    {
      "name": "GitHub Copilot Code Smarter Quest",
      "image": "/stuffs/Certification/Open Source Contributions/MLH_GitHub_Copilot_Code_Smarter_Quest_certificate.png"
    },
    {
      "name": "Social Summer of Code Season 4 Contributor",
      "image": "/stuffs/Certification/Open Source Contributions/SSOC24_Cert.png"
    },
    {
      "name": "MongoDB Basics for Students",
      "image": "/stuffs/Certification/Open Source Contributions/MLH_MongoDB_Basics_for_Students_Certificate.jpg"
    },
    {
      "name": "GitHub Copilot Prompt Quest",
      "image": "/stuffs/Certification/Open Source Contributions/MLH_GitHub_Copilot_Prompt_certificate.png"
    },
    {
      "name": "Open Source Connect India (OSCI) Contributor",
      "image": "/stuffs/Certification/Open Source Contributions/open_2.png"
    },
    {
      "name": "MLH Global Hack Week — Swag",
      "image": "/stuffs/Certification/Open Source Contributions/open_4.jpg"
    }
  ],

  platformBadges: [
    {
      "name": "Harness Continuous Delivery & GitOps Developer Badge",
      "image": "/stuffs/Certification/badges/Harness Certified Continuous Delivery & GitOps Developer Badge.png"
    },
    {
      "name": "Social Summer of Code — Contributor Badge",
      "image": "/stuffs/Certification/badges/Contributor SSOC.png"
    },
    {
      "name": "GSSoC 2025 — Tech Contributor Badge",
      "image": "/stuffs/Certification/badges/Contributor's badge.jpg"
    },
    {
      "name": "MLH — MongoDB Basics for Students Badge",
      "image": "/stuffs/Certification/badges/mlh-mongodb-basics-for-students.png"
    },
    {
      "name": "SQL Badge",
      "image": "/stuffs/Certification/badges/badge_8.png"
    },
    {
      "name": "LeetCode Badge",
      "image": "/stuffs/Certification/badges/Leetcode.png"
    }
  ],

  leetCodeStats: {
    username: "Yamuna_bsvy",
    profileUrl: "https://leetcode.com/u/Yamuna_bsvy/",
    totalSolved: 324,
    easy: 126,
    medium: 157,
    hard: 41,
    contestRating: 1396,
    contestsAttended: 2,
    activeDays: 116,
    maxStreak: 36,
    languages: [
      { name: "Python", count: 176 },
      { name: "Java", count: 89 },
      { name: "MySQL", count: 50 },
    ],
  },

  responsibilities: [
    { title: "Class Representative", description: "Representing academic concerns and student leadership." },
    { title: "Placement Batch Head", description: "Coordinating placement activities, drives, and student readiness." },
    { title: "Committee Head - Academic Cell", description: "Managing academic events, seminars, and student support." },
  ],

  volunteerActivities: [
    { title: "Eco Club Active Volunteer", image: "/stuffs/Others or Leadership services and more presentations etc/ECO_Club.png" },
    { title: "Library & Study Interests", image: "/stuffs/Others or Leadership services and more presentations etc/Library Books Favourites in clg.png" },
    { title: "Campus Seminars & Activities", image: "/stuffs/Others or Leadership services and more presentations etc/SIH.jpg" },
  ],

  upcoming: [
    { title: "Drive2Hire Browser Extension", description: "AI-Assisted Placement FocusBar Browser Extension & research paper in preparation.", image: "/stuffs/Upcoming/Drive2Hire.png" },
    { title: "AWS Generative AI Certification", description: "Ultimate AWS Certified Generative AI Developer Professional.", image: "/stuffs/Upcoming/logo.webp" },
  ],
} as const;
