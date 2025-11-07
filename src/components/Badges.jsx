import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Code, Cloud, Palette, Zap, Trophy, Star, CheckCircle } from "lucide-react";

const badgesData = {
  skills: [
    { id: 1, name: "React Expert", icon: Code, color: "from-blue-500 to-cyan-500", level: "Advanced" },
    { id: 2, name: "Cloud Architect", icon: Cloud, color: "from-purple-500 to-pink-500", level: "Intermediate" },
    { id: 3, name: "UI/UX Designer", icon: Palette, color: "from-orange-500 to-red-500", level: "Advanced" },
    { id: 4, name: "DevOps Pro", icon: Zap, color: "from-green-500 to-emerald-500", level: "Intermediate" },
    { id: 5, name: "Full Stack Dev", icon: Code, color: "from-indigo-500 to-purple-500", level: "Advanced" },
    { id: 6, name: "Python Expert", icon: Code, color: "from-yellow-500 to-orange-500", level: "Advanced" },
  ],
  achievements: [
    { id: 1, name: "IEEE Published", icon: Trophy, color: "from-yellow-400 to-amber-500", desc: "Research paper published" },
    { id: 2, name: "Hackathon Winner", icon: Award, color: "from-purple-400 to-pink-500", desc: "Multiple wins" },
    { id: 3, name: "100+ Problems", icon: CheckCircle, color: "from-green-400 to-emerald-500", desc: "LeetCode solved" },
    { id: 4, name: "Open Source", icon: Star, color: "from-blue-400 to-cyan-500", desc: "Contributor" },
    { id: 5, name: "Cloud Certified", icon: Award, color: "from-orange-400 to-red-500", desc: "AWS & Azure" },
    { id: 6, name: "Design Master", icon: Palette, color: "from-pink-400 to-rose-500", desc: "UI/UX awards" },
  ],
  platforms: [
    { id: 1, name: "LeetCode", badge: "⭐ Knight", color: "from-yellow-500 to-orange-500", rating: "1800+" },
    { id: 2, name: "HackerRank", badge: "⭐⭐⭐⭐⭐", color: "from-green-500 to-emerald-500", rating: "5 Stars" },
    { id: 3, name: "GitHub", badge: "🏆 Pro", color: "from-gray-600 to-gray-800", rating: "100+ repos" },
    { id: 4, name: "CodeChef", badge: "⭐ 3 Star", color: "from-blue-500 to-indigo-500", rating: "1600+" },
  ]
};

export default function Badges() {
  const [activeTab, setActiveTab] = useState("skills");

  const tabs = [
    { key: "skills", label: "Skill Badges", icon: Code },
    { key: "achievements", label: "Achievements", icon: Trophy },
    { key: "platforms", label: "Platform Badges", icon: Star },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-2"
        >
          Badges & Achievements
        </motion.h2>
        <p className="text-blue-200">Showcasing skills, achievements & platform recognition</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-[#181829] text-blue-300 hover:bg-[#23233a]"
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Skill Badges */}
      {activeTab === "skills" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {badgesData.skills.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="bg-[#181829] rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden">
                  {/* Gradient background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl transition-shadow`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{badge.name}</h3>
                    <span className={`px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${badge.color} text-white`}>
                      {badge.level}
                    </span>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Achievement Badges */}
      {activeTab === "achievements" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {badgesData.achievements.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative group cursor-pointer"
              >
                <div className="bg-[#181829] rounded-2xl p-6 border-2 border-gray-700 hover:border-transparent transition-all duration-300 overflow-hidden">
                  {/* Animated gradient border on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} 
                       style={{ padding: "2px", borderRadius: "1rem" }}>
                    <div className="bg-[#181829] w-full h-full rounded-2xl" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:animate-pulse`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg text-center mb-2">{badge.name}</h3>
                    <p className="text-blue-300 text-sm text-center">{badge.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Platform Badges */}
      {activeTab === "platforms" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {badgesData.platforms.map((badge, idx) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ scale: 1.03 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[#181829] to-[#23233a] rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-2xl mb-2">{badge.name}</h3>
                    <div className="text-3xl mb-2">{badge.badge}</div>
                    <p className="text-blue-300 text-sm">{badge.rating}</p>
                  </div>
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-12`}>
                    <Star className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                {/* Progress bar effect */}
                <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${badge.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ delay: idx * 0.15 + 0.3, duration: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
