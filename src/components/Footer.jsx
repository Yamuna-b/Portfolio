import React from "react";
import { Linkedin, Github, Instagram, Mail, Phone } from "lucide-react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { SiLeetcode, SiHackerrank } from "react-icons/si";

export default function Footer({ personalInfo }) {
  return (
    <footer className="bg-[#13131c] border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.jpg"
                alt="Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
              />
              <h3 className="text-2xl font-bold text-white">Yamuna</h3>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-4">
              Full-stack developer and cloud enthusiast passionate about building
              innovative solutions. Experienced in React, Node.js, Python, AWS, and DevOps.
            </p>
            <div className="flex gap-3">
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Github className="w-5 h-5 text-white" />
              </a>
              <a href={personalInfo.social.instagram} target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-pink-600 hover:bg-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href={personalInfo.social.telegram} target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaTelegramPlane className="w-5 h-5 text-white" />
              </a>
              <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-yellow-600 hover:bg-yellow-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <SiLeetcode className="w-5 h-5 text-white" />
              </a>
              <a href={personalInfo.social.hackerrank} target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <SiHackerrank className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-100 hover:text-blue-300 text-sm transition-colors duration-200">About Me</a></li>
              <li><a href="#" className="text-blue-100 hover:text-blue-300 text-sm transition-colors duration-200">Projects</a></li>
              <li><a href="#" className="text-blue-100 hover:text-blue-300 text-sm transition-colors duration-200">Experience</a></li>
              <li><a href="#" className="text-blue-100 hover:text-blue-300 text-sm transition-colors duration-200">Certifications</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Contact</h4>
            <div className="space-y-3">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-blue-100 hover:text-blue-300 text-sm transition-colors duration-200">
                <Mail className="w-4 h-4" />
                <span>{personalInfo.email}</span>
              </a>
              <a href={`https://wa.me/${personalInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 text-blue-100 hover:text-green-400 text-sm transition-colors duration-200">
                <FaWhatsapp className="w-4 h-4" />
                <span>{personalInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm mb-4 md:mb-0">
            Copyright © 2024 <span className="text-blue-400 font-semibold">Yamuna</span>. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-blue-200 hover:text-blue-400 text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-blue-200 hover:text-blue-400 text-sm transition-colors duration-200">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
