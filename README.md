# Portfolio

A professional FAANG-style portfolio website built with React, Vite, and TailwindCSS.

## Features

- **Clean Minimal Navigation**: Dropdown-based PROJECTS menu for professional organization
- **Smart Search**: Real-time project filtering across all categories
- **Responsive Design**: Works perfectly on all devices
- **Video Support**: Auto-playing video demos for projects
- **Social Integration**: LinkedIn, GitHub, LeetCode, Medium, Instagram
- **Modern UI**: Dark theme with smooth animations using Framer Motion

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Swiper** - Carousel components
- **React Icons** - Icon library

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. **Clone the repository** (if not already cloned)
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Running the Project

### Development Mode

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

To create an optimized production build:
```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

To preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
portfolio/
├── public/              # Static assets (images, videos, PDFs)
├── src/
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Entry point
│   └── components/     # Reusable components
│       └── Footer.jsx  # Footer component
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## Navigation Structure

- **HOME** - Hero section with profile and overview
- **PROJECTS ▾** (Dropdown)
  - Backend + Frontend
  - AI/ML
  - DevOps & Cloud
  - Designs
- **HIGHLIGHTS** - Certifications, awards, achievements
- **CONTACT** - Contact information and social links

## Adding New Projects

To add a new project, update the `projectCatalog` object in `src/App.jsx`:

```javascript
{
  title: "Your Project Name",
  tagline: "Brief description",
  stack: ["React", "Node.js"],
  bullets: ["Key feature 1", "Key feature 2"],
  links: {
    github: "https://github.com/your-repo",
    live: "https://your-demo-url"
  },
  image: "/your-image.jpg"
}
```

## Adding Images/Videos

Place your images and videos in the `public/` folder and reference them with absolute paths:
- Images: `/your-image.jpg`
- Videos: `/your-video.mp4`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in Vercel
3. Vercel will auto-detect Vite and deploy

### Netlify

1. Run `npm run build`
2. Drag and drop the `dist` folder to Netlify

### GitHub Pages

1. Run `npm run build`
2. Deploy the `dist` folder to GitHub Pages

## Customization

### Personal Information

Update the `personalInfo` object in `src/App.jsx` with your details:
- Name, email, phone, WhatsApp
- Social media links
- Skills and languages
- Experience and education

### Theme Colors

Modify TailwindCSS configuration in `tailwind.config.js` to customize colors.

## Troubleshooting

### Port Already in Use

If port 5173 is in use, Vite will automatically use the next available port.

### Images Not Loading

Ensure all images are in the `public/` folder and referenced with absolute paths starting with `/`.

### Videos Not Playing

Check that video files are in the `public/` folder and have correct file extensions (.mp4, .webm, .ogg).

## License

This project is open source and available for personal and commercial use.

## Author

**Yamuna** - Full Stack Developer

---

Built with ❤️ using React and Vite
