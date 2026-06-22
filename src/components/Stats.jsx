import React from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode, SiGithub } from 'react-icons/si';

export default function Stats() {
  const ghUser = 'Yamuna-b';
  const lcUrl = 'https://leetcode.com/u/Yamuna_bsvy/';
  const ghUrl = 'https://github.com/Yamuna-b';

  const leetcodeStats = [
    { label: 'Total solved', value: '321' },
    { label: 'Easy', value: '124' },
    { label: 'Medium', value: '156' },
    { label: 'Hard', value: '41' },
  ];

  const contestStats = [
    { label: 'Contest rating', value: '1,416' },
    { label: 'Contests attended', value: '1' },
    { label: 'Active days (1 yr)', value: '139' },
    { label: 'Max streak', value: '36 days' },
  ];

  const gfgStats = [
    { label: 'Python', value: '176' },
    { label: 'Java', value: '85' },
    { label: 'MySQL', value: '50' },
  ];

  return (
    <div className="py-10 sm:py-12 bg-[#12141b] border border-slate-800 rounded-2xl">
      <div className="w-full px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3"
          >
            Coding activity
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-[#0f1117] rounded-xl p-5 sm:p-6 border border-slate-800"
          >
            <div className="flex items-center gap-2 mb-4">
              <SiGithub className="text-slate-300 text-2xl shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-slate-100">GitHub</h3>
                <p className="text-xs text-slate-500">140+ contributions in the last year</p>
              </div>
            </div>
            <div className="overflow-x-auto -mx-1 px-1">
              <img
                src={`https://ghchart.rshah.org/0e7490/${ghUser}`}
                alt={`${ghUser} GitHub contribution graph`}
                className="w-full min-w-[280px] h-auto rounded-lg border border-slate-800"
                loading="lazy"
              />
            </div>
            <a
              href={ghUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm font-semibold text-sky-400 hover:text-sky-300"
            >
              View profile →
            </a>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="bg-[#0f1117] rounded-xl p-5 sm:p-6 border border-slate-800"
          >
            <div className="flex items-center gap-2 mb-4">
              <SiLeetcode className="text-orange-500 text-2xl shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-slate-100">LeetCode</h3>
                <p className="text-xs text-slate-500">84% acceptance · 315 submissions past year</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {leetcodeStats.map(stat => (
                <div key={stat.label} className="rounded-lg bg-slate-900/80 border border-slate-800 px-3 py-2 text-center">
                  <div className="text-lg font-bold text-orange-400">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-wide text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {contestStats.map(stat => (
                <div key={stat.label} className="rounded-lg bg-slate-900/60 border border-slate-800/80 px-3 py-2">
                  <div className="text-sm font-semibold text-slate-200">{stat.value}</div>
                  <div className="text-[10px] text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-800 pt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">GeeksforGeeks</p>
              <div className="flex flex-wrap gap-2">
                {gfgStats.map(stat => (
                  <span key={stat.label} className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-950/40 text-emerald-300 border border-emerald-900/50">
                    {stat.label}: {stat.value}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={lcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm font-semibold text-orange-400 hover:text-orange-300"
            >
              View LeetCode profile →
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
