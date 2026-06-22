from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src" / "App.jsx"
text = p.read_text(encoding="utf-8")

replacements = [
    (
        'images: ["/fullstack1.png"],\n      shortDesc: "Digital twin backend for personal finance simulation",\n      fullDesc: "API-first backend to simulate multi-month cash-flow scenarios with structured data modeling and forecasting flows.",\n      tags: ["Backend", "FinTech", "REST"],\n      tools: ["Python", "PostgreSQL", "Docker"],',
        'images: ["/MoneyMirror.mp4"],\n      shortDesc: "Personal finance digital twin with cash-flow projections",\n      fullDesc: "FastAPI backend for personal finance planning with JWT-secured REST APIs, PostgreSQL, and Docker.",\n      tags: ["Backend", "FinTech", "FastAPI"],\n      tools: ["FastAPI", "PostgreSQL", "JWT", "Docker"],',
    ),
    ('images: ["/fullstack2.png"],', 'images: [PLACEHOLDER_VIDEO],'),
    (
        'tools: ["React", "Node.js", "Express", "MongoDB"],\n      links: { github: "https://github.com/Yamuna-b/petimony" }',
        'tools: ["HTML", "CSS", "JavaScript"],\n      links: {\n        github: "https://github.com/Yamuna-b/Petimony",\n        live: "https://petimony.onrender.com",\n      }',
    ),
    (
        'images: ["/fullstack5.png"],\n      shortDesc: "Realtime customer support console",\n      fullDesc: "Conversation and assignment workflows with API endpoints and realtime updates for support operations.",\n      tags: ["Realtime", "Backend APIs"],\n      tools: ["Node.js", "Socket.io", "React"],',
        'images: [PLACEHOLDER_VIDEO],\n      shortDesc: "Realtime helpdesk chat widget",\n      fullDesc: "Real-time helpdesk chat with Node.js, Express, Socket.io, and Firebase-backed messaging.",\n      tags: ["Realtime", "Backend APIs"],\n      tools: ["Node.js", "Express", "Socket.io", "Firebase"],',
    ),
    ('images: ["/fullstack4.png"],', 'images: [PLACEHOLDER_VIDEO],'),
    (
        'shortDesc: "Marine species classification",\n      fullDesc: "Computer vision pipeline for marine organism classification with preprocessing and model evaluation loops.",\n      tags: ["AI/ML", "Computer Vision"],\n      tools: ["Python", "PyTorch", "OpenCV"],',
        'shortDesc: "AI-powered marine taxonomy platform",\n      fullDesc: "Feature extraction with UMAP + HDBSCAN and LLM-assisted classification via FastAPI on AWS.",\n      tags: ["AI/ML", "LLM"],\n      tools: ["FastAPI", "PyTorch", "LLM", "Docker", "AWS"],',
    ),
    ('tools: ["Python", "TensorFlow", "Keras"],', 'tools: ["Python", "TensorFlow", "Streamlit"],'),
    (
        'title: "Menstrual Health AI Chatbot",\n      images: ["/SRA.mp4"],\n      shortDesc: "AI-assisted health guidance chatbot",\n      fullDesc: "Conversational assistant focused on menstrual health guidance with intent-aware response flows.",\n      tags: ["AI/ML", "NLP"],\n      tools: ["Python", "TensorFlow"],\n      links: { github: "https://github.com/Yamuna-b/FitFinder" },',
        'title: "FitFinder",\n      images: [PLACEHOLDER_VIDEO],\n      shortDesc: "AIML virtual try-on and wardrobe visualizer",\n      fullDesc: "Virtual try-on and wardrobe visualization app built with Python and a Flask-style web stack.",\n      tags: ["AI/ML", "Computer Vision"],\n      tools: ["Python", "Flask", "HTML", "CSS"],\n      links: { github: "https://github.com/Yamuna-b/FitFinder" },',
    ),
    (
        'images: ["/backend2.png"],\n      shortDesc: "Agentic reasoning and execution prototype",\n      fullDesc: "Experimental plan-act-reflect style architecture for autonomous task execution.",\n      tags: ["AI/ML", "Agents"],\n      tools: ["Python", "Agent loops"],\n      links: { github: "https://github.com/Yamuna-b/RepoDocs" },',
        'images: ["/SRA.mp4"],\n      shortDesc: "Agentic reasoning and execution prototype",\n      fullDesc: "Experimental plan-act-reflect style architecture for autonomous task execution.",\n      tags: ["AI/ML", "Agents"],\n      tools: ["Python"],',
    ),
    (
        'title: "Ecosaur",\n      images: ["/showcase6.jpg"],\n      shortDesc: "Carbon footprint awareness and analysis",\n      fullDesc: "Research-oriented analytics project exploring footprint awareness, mitigation strategies, and reporting.",\n      tags: ["AI/ML", "Sustainability"],\n      tools: ["Python", "Data Analytics"],\n      links: { github: "https://github.com/Yamuna-b/RepoDocs" },',
        'title: "Ecosaur Research",\n      images: ["/showcase6.jpg"],\n      shortDesc: "Carbon footprint awareness and mitigation research",\n      fullDesc: "Research published at IEEE AIDE 2025 on carbon footprint awareness and mitigation.",\n      tags: ["Research", "Publication"],\n      tools: ["Data Analysis", "Presentation"],\n      links: { publication: IEEE_PUBLICATION_URL },',
    ),
    (
        'images: ["/backend1.png"],\n      shortDesc: "Observability and incident workflow platform",\n      fullDesc: "Structured log and incident tracking flows to improve engineering visibility, triage, and escalation.",\n      tags: ["DevOps", "Observability"],\n      tools: ["Node.js", "Express", "MongoDB"],',
        'images: ["/LogBeacon.mp4"],\n      shortDesc: "Log analysis backend on AWS",\n      fullDesc: "FastAPI log analysis service with PostgreSQL, Docker, and AWS deployment.",\n      tags: ["DevOps", "Observability", "FastAPI"],\n      tools: ["FastAPI", "PostgreSQL", "Docker", "AWS"],',
    ),
    (
        'images: ["/cloud1.png"],\n      shortDesc: "Automated build and deploy workflows",\n      fullDesc: "Reusable CI/CD pipelines for lint/build/test and deployment automation.",\n      tags: ["CI/CD", "GitHub Actions"],\n      tools: ["Docker", "Node.js"],\n      links: { github: "https://github.com/Yamuna-b/RepoDocs" },',
        'images: [PLACEHOLDER_VIDEO],\n      shortDesc: "Automated build and deploy workflows",\n      fullDesc: "Reusable CI/CD pipelines for lint/build/test and deployment automation.",\n      tags: ["CI/CD", "GitHub Actions"],\n      tools: ["Docker", "GitHub Actions", "Node.js"],\n      links: { github: "https://github.com/Yamuna-b/LogBeacon" },',
    ),
    (
        'images: ["/fullstack3.png"],\n      shortDesc: "Ergonomic e-commerce frontend",\n      fullDesc: "Frontend-focused shopping experience with responsive layouts and ergonomic interaction patterns.",\n      tags: ["Frontend", "UI/UX"],\n      tools: ["React", "Tailwind CSS"],',
        'images: [PLACEHOLDER_VIDEO],\n      shortDesc: "Ergonomic e-commerce frontend",\n      fullDesc: "Responsive ergonomic products storefront built with HTML, CSS, and JavaScript.",\n      tags: ["Frontend", "UI/UX"],\n      tools: ["HTML", "CSS", "JavaScript"],',
    ),
    (
        'title: "Ecosaur Research Publication",\n      images: ["/showcase6.jpg"],\n      shortDesc: "Conference-level sustainability research",\n      fullDesc: "Presented carbon footprint awareness and mitigation research in an academic setting.",\n      tags: ["Research", "Publication"],\n      tools: ["Data Analysis", "Presentation"],\n      links: { github: "https://github.com/Yamuna-b/RepoDocs" },',
        'title: "Ecosaur — IEEE Publication",\n      images: ["/showcase6.jpg"],\n      shortDesc: "IEEE AIDE 2025 research publication",\n      fullDesc: "Published carbon footprint awareness and mitigation research at IEEE AIDE 2025.",\n      tags: ["Research", "Publication"],\n      tools: ["Data Analysis", "Presentation"],\n      links: { publication: IEEE_PUBLICATION_URL },',
    ),
    (
        'title: "Designthon Euphoria\u201924",\n      images: ["/showcase1.jpg"],\n      shortDesc: "Design competition recognition",\n      fullDesc: "Awarded for innovation and presentation quality in a university designthon.",\n      tags: ["Highlight", "Award"],\n      tools: ["Design Thinking"],\n      links: { github: "https://github.com/Yamuna-b/RepoDocs" },',
        'title: "Designthon Euphoria\u201924",\n      images: ["/showcase1.jpg"],\n      shortDesc: "First prize — design competition",\n      fullDesc: "Awarded first prize for innovation and presentation at Kalasalingam University.",\n      tags: ["Highlight", "Award"],\n      tools: ["Design Thinking", "Figma"],',
    ),
    (
        'title: "Menstrual Health AI Chatbot",\n      images: ["/SRA.mp4"],\n      shortDesc: "AI chatbot for menstrual health",\n      fullDesc: "Chatbot offering resources for PCOD, PMS, PMDD.",\n      tags: ["AI", "Chatbot", "Healthcare"],\n      tools: ["Python", "TensorFlow"],\n      links: { github: "https://github.com/Yamuna-b/FitFinder" }',
        'title: "FitFinder",\n      images: [PLACEHOLDER_VIDEO],\n      shortDesc: "AIML virtual try-on and wardrobe visualizer",\n      fullDesc: "Virtual try-on and wardrobe visualization app built with Python and a Flask-style web stack.",\n      tags: ["AI", "Computer Vision"],\n      tools: ["Python", "Flask", "HTML"],\n      links: { github: "https://github.com/Yamuna-b/FitFinder" }',
    ),
]

for old, new in replacements:
    if old not in text:
        print("MISSING:", old[:70].replace("\n", " "))
    else:
        text = text.replace(old, new, 1)

dup_block = '''const PLACEHOLDER_VIDEO = "/petimony.mp4";
const IEEE_PUBLICATION_URL = "https://ieeexplore.ieee.org/document/10986878";

'''
if text.count("const PLACEHOLDER_VIDEO") > 1:
    text = text.replace(dup_block, "", 1)

project_media = '''const projectMedia = (primary, fallback = PLACEHOLDER_VIDEO) => {
  if (!primary) return [fallback];
  return [primary];
};

'''
text = text.replace(project_media, "")

p.write_text(text, encoding="utf-8")
print("updated", p)
