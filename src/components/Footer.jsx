import React from "react";
import { Linkedin, Github, Instagram, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function FooterLink({ href, children, onClick, download }) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="block w-full text-left text-slate-400 hover:text-sky-400 text-sm transition-colors"
      >
        {children}
      </button>
    );
  }
  return (
    <a href={href} download={download} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
      {children}
    </a>
  );
}

export default function Footer({ personalInfo, scrollHomeTo, openResumePreview }) {
  const go =
    typeof scrollHomeTo === "function"
      ? id => () => scrollHomeTo(id)
      : () => () => {};

  return (
    <footer className="bg-[#0f1117] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.jpg"
                alt=""
                className="w-11 h-11 rounded-full object-cover ring-2 ring-sky-700"
              />
              <h3 className="text-xl font-bold text-slate-100 tracking-tight">Yamuna</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Backend-focused software engineer building APIs, reliable services, and data-aware systems—with clear architecture and pragmatic DevOps habits.
            </p>
            <div className="flex gap-2.5 mt-5">
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-900/80 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
              </a>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <Github className="w-4 h-4 text-slate-200" />
              </a>
              <a
                href={personalInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
              </a>
              <a
                href={personalInfo.social.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <SiLeetcode className="w-4 h-4 text-amber-500" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-4 text-sm uppercase tracking-wide">Navigate</h4>
            <ul className="space-y-2">
              <li>
                <FooterLink onClick={go("about")}>About</FooterLink>
              </li>
              <li>
                <FooterLink onClick={go("projects")}>Projects</FooterLink>
              </li>
              <li>
                <FooterLink onClick={go("experience")}>Experience</FooterLink>
              </li>
              <li>
                <FooterLink onClick={openResumePreview}>Preview</FooterLink>
              </li>
              <li>
                <FooterLink href="/resume.pdf" download="Yamuna_Resume.pdf">
                  Download
                </FooterLink>
              </li>
              <li>
                <FooterLink onClick={go("contact")}>Contact</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500 border-t border-slate-800 pt-8 justify-between items-center">
          <span>© {new Date().getFullYear()} Yamuna</span>
          <div className="flex items-center gap-4">
            <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-sky-400">
              <Mail className="w-4 h-4 shrink-0" />
              Email
            </a>
            <a
              href={`https://wa.me/${personalInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400"
            >
              <FaWhatsapp className="w-4 h-4 shrink-0" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
