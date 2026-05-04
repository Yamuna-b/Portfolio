import React from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode, SiGithub } from 'react-icons/si';

export default function Stats() {
  const ghUser = 'Yamuna-b';
  const lcUrl = 'https://leetcode.com/u/Yamuna_bsvy/';
  const ghUrl = 'https://github.com/Yamuna-b';

  return (
    <div className="py-12 bg-[#12141b] border border-slate-800 rounded-2xl">
      <div className="w-full px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2"
          >
            Coding activity
          </motion.h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Actively solving DSA problems on LeetCode and maintaining backend project repositories on GitHub.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-[#0f1117] rounded-xl p-6 border border-slate-800"
          >
            <div className="flex items-center gap-2 mb-4">
              <SiGithub className="text-slate-300 text-2xl" />
              <h3 className="text-lg font-semibold text-slate-100">GitHub</h3>
            </div>
            <img
              src={`https://ghchart.rshah.org/0e7490/${ghUser}`}
              alt={`${ghUser} contribution graph`}
              className="w-full h-auto rounded-lg border border-slate-800"
            />
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
            className="bg-[#0f1117] rounded-xl p-6 border border-slate-800 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-3">
              <SiLeetcode className="text-orange-500 text-2xl" />
              <h3 className="text-lg font-semibold text-slate-100">LeetCode</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Focusing on structured practice and contest-style problems alongside coursework and internship delivery.
            </p>
            <a
              href={lcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-orange-400 hover:text-orange-300 w-fit"
            >
              View profile →
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
