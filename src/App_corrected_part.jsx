// --- Contact Section ---
const ContactSection = () => (
  <section id="contact" className="py-16 bg-background-dark text-center">
    <div className="max-w-4xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
      <p className="text-blue-200 mb-8">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 bg-primary-medium text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors">
          <Mail className="w-5 h-5" />
          <span>{personalInfo.email}</span>
        </a>
        <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 bg-blue-500/20 text-blue-300 px-6 py-3 rounded-full hover:bg-blue-500/40 transition-colors">
          <Phone className="w-5 h-5" />
          <span>{personalInfo.phone}</span>
        </a>
        <a href={`https://wa.me/${personalInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500/20 text-green-300 px-6 py-3 rounded-full hover:bg-green-500/40 transition-colors">
          <FaWhatsapp className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  </section>
);

// --- Home Section ---
const HomeSection = () => (
  <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-12 relative overflow-hidden">
    <ProfileAvatar />
    <motion.h1 
      className="text-4xl sm:text-5xl font-extrabold text-white mt-6 mb-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      {personalInfo.name}
    </motion.h1>
    <motion.p 
      className="text-lg text-blue-300 font-medium"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      {personalInfo.tagline1}
    </motion.p>
    <motion.p 
      className="text-md text-blue-200 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
    >
      {personalInfo.tagline2}
    </motion.p>
    <motion.div 
      className="max-w-2xl mx-auto text-blue-100/90 mb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.7 }}
    >
      {personalInfo.bio}
    </motion.div>
    <motion.a 
      href="/resume.pdf" 
      download
      className="flex items-center gap-2 bg-primary-medium text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-dark transition-transform hover:scale-105 shadow-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, delay: 0.9 }}
    >
      <Download className="w-5 h-5" />
      Download Resume
    </motion.a>

    <div className="mt-16 w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-background-dark/50 border border-primary-medium/30 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <h2 className="text-xl font-bold text-blue-300 mb-4">Experience</h2>
          {experience.map((exp, idx) => (
            <motion.div 
              key={exp.company} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + idx * 0.1 }}
              className="mb-4 flex items-start gap-3 p-3 rounded-xl hover:bg-[#23233a] transition-colors duration-200"
            >
              <img src={exp.logo} loading="lazy" className="w-10 h-10 rounded-full mt-1 object-cover border-2 border-blue-400" alt="Logo" />
              <div>
                <div className="text-sm font-semibold text-white">{exp.role} @ {exp.company}</div>
                <div className="text-xs text-blue-400">{exp.duration}</div>
                <div className="text-xs text-blue-100">{exp.desc}</div>
                {exp.publication && (
                  <a href={exp.publication.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-light hover:underline mt-1 inline-block">
                    {exp.publication.label}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="space-y-8">
          <motion.div 
            className="bg-background-dark/50 border border-primary-medium/30 rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 className="text-xl font-bold text-blue-300 mb-4">Education</h2>
            {education.map((edu, idx) => (
              <motion.div 
                key={edu.degree} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + idx * 0.1 }}
                className="mb-3 flex items-center gap-3 p-3 rounded-xl hover:bg-[#23233a] transition-colors duration-200"
              >
                <img src={edu.logo} loading="lazy" className="w-10 h-10 rounded-full object-cover border-2 border-blue-400" alt="Logo" />
                <div>
                  <div className="text-sm font-semibold text-white">{edu.degree}</div>
                  <div className="text-xs text-blue-400">{edu.year}</div>
                  <div className="text-xs text-blue-100">{edu.org}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="bg-background-dark/50 border border-primary-medium/30 rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <h2 className="text-xl font-bold text-blue-300 mb-4">Languages & Soft Skills</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 class="font-semibold text-white mb-2">Languages</h3>
                {personalInfo.languages.map(lang => <p key={lang.name} className="text-blue-200">{lang.name}: <span class="text-blue-300">{lang.level}</span></p>)}
              </div>
              <div>
                <h3 class="font-semibold text-white mb-2">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.softSkills.map(skill => <span key={skill} className="bg-blue-900/50 text-blue-200 text-xs px-2 py-1 rounded">{skill}</span>)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

function ProjectGrid({ cards, setExpandedCard }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {cards.map((project, idx) => {
        const images = project.images || [];
        return (
          <motion.div
            key={project.id || idx}
            className="bg-background-dark/50 border border-primary-medium/30 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-primary-light/20 hover:border-primary-light/50 group cursor-pointer relative"
            onClick={() => setExpandedCard(project)}
            onMouseEnter={() => setHoveredCard(project.id)}
            onMouseLeave={() => setHoveredCard(null)}
            layoutId={`card-container-${project.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className="h-48 overflow-hidden bg-slate-800/50">
              {images.length > 0 ? (
                <MediaSwiper mediaList={images} isCard={true} />
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">No Media</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-md font-bold text-white mb-1 truncate">{project.title}</h3>
              <p className="text-xs text-slate-300 h-8 overflow-hidden">{project.shortDesc || project.desc}</p>
            </div>
            <AnimatePresence>
              {hoveredCard === project.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center"
                >
                  <h3 className="text-lg font-bold text-primary-light mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3 justify-center">
                    {(project.tags || []).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-900/70 text-blue-200 text-xs rounded-full border border-blue-400/50">{tag}</span>
                    ))}
                  </div>
                  <button className="text-sm text-white font-semibold mt-auto bg-primary-medium/70 px-4 py-2 rounded-full">View Details</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function ProjectModal({ project, setExpandedCard }) {
  if (!project) return null;

  const media = project.images || [];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-lg"
      onClick={() => setExpandedCard(null)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        layoutId={`card-container-${project.id}`}
        className="relative bg-[#1a1a2e] rounded-2xl shadow-2xl w-[95vw] max-w-5xl h-[90vh] p-8 flex flex-col md:flex-row gap-8 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={() => setExpandedCard(null)} className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/80">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="w-full md:w-1/2 h-1/2 md:h-full flex-shrink-0">
          <MediaSwiper mediaList={media} className="w-full h-full rounded-xl" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary-medium scrollbar-track-background-dark">
          <h2 className="text-3xl font-bold mb-2 text-white">{project.title}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {(project.tags || []).map(tag => (
              <span key={tag} className="px-3 py-1 bg-blue-900 text-blue-100 text-xs rounded-full">{tag}</span>
            ))}
          </div>
          <p className="mb-4 text-sm text-blue-100">{project.fullDesc || project.desc}</p>
          
          <div className="mt-auto pt-4">
            <h3 className="font-semibold text-white mb-2">Tools Used</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {(project.tools || []).map(tool => (
                <span key={tool} className="px-3 py-1 bg-fuchsia-900 text-fuchsia-100 text-xs rounded-full">{tool}</span>
              ))}
            </div>

            <h3 className="font-semibold text-white mb-2">Links</h3>
            <div className="flex flex-wrap gap-4">
              {Object.entries(project.links || {}).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline capitalize">
                  {key}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const isVideo = file => typeof file === "string" && file.match(/\.(mp4|webm|ogg)$/i);

function MediaSwiper({ mediaList, className, isCard = false }) {
  if (!mediaList || mediaList.length === 0) return <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-400">No Media</div>;

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={!isCard}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={mediaList.length > 1}
      slidesPerView={1}
      className={className}
    >
      {mediaList.map((media, i) => (
        <SwiperSlide key={i} className="!h-full flex items-center justify-center bg-black">
          {isVideo(media) ? (
            <video
              src={media}
              muted
              autoPlay={mediaList.length === 1}
              playsInline
              loop={mediaList.length === 1}
              controls={!isCard}
              className="w-full h-full object-contain"
              style={{ pointerEvents: isCard ? "none" : "auto" }}
            />
          ) : (
            <img
              src={media}
              loading="lazy"
              alt=""
              className="w-full h-full object-contain"
              draggable={false}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const allProjects = [
    ...projects.cloud,
    ...projects.fullstack.frontend,
    ...projects.fullstack.backend,
    ...projects.fullstack.both,
    ...projects.uiux.logos,
    ...projects.uiux.posters,
    ...projects.uiux.prototypes,
    ...projects.uiux.powerpoints,
    ...projects.uiux.planners,
    ...projects.ai,
    ...projects.showcase,
    ...awards
  ];

  const handleSearch = (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const results = allProjects.filter(p => 
      p.title.toLowerCase().includes(lowerCaseQuery) || 
      (p.tags && p.tags.some(t => t.toLowerCase().includes(lowerCaseQuery))) ||
      (p.tools && p.tools.some(t => t.toLowerCase().includes(lowerCaseQuery)))
    );
    setSearchResults(results);
  };

  const renderContent = () => {
    if (searchResults.length > 0) {
      return <ProjectGrid cards={searchResults} setExpandedCard={setExpandedCard} />;
    }

    switch (activeSection) {
      case "home": return <HomeSection />;
      case "devops": return <ProjectGrid cards={projects.cloud} setExpandedCard={setExpandedCard} />;
      case "fullstack": return <ProjectGrid cards={[...projects.fullstack.frontend, ...projects.fullstack.backend, ...projects.fullstack.both]} setExpandedCard={setExpandedCard} />;
      case "uiux": return <ProjectGrid cards={[...projects.uiux.logos, ...projects.uiux.posters, ...projects.uiux.prototypes, ...projects.uiux.powerpoints, ...projects.uiux.planners]} setExpandedCard={setExpandedCard} />;
      case "ai": return <ProjectGrid cards={projects.ai} setExpandedCard={setExpandedCard} />;
      case "showcase": return <ProjectGrid cards={projects.showcase} setExpandedCard={setExpandedCard} />;
      case "awards": return <ProjectGrid cards={awards} setExpandedCard={setExpandedCard} />;
      default: return <HomeSection />;
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white font-sans">
      <Bubbles />
      <NavBar activeSection={activeSection} setActiveSection={setActiveSection} setExpandedCard={setExpandedCard} />
      <BackArrow activeSection={activeSection} setActiveSection={setActiveSection} show={true} setExpandedCard={setExpandedCard} />
      <main className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchBar onSearch={handleSearch} />
          {renderContent()}
        </div>
      </main>
      <AnimatePresence>
        {expandedCard && <ProjectModal project={expandedCard} setExpandedCard={setExpandedCard} />}
      </AnimatePresence>
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
