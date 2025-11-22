import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode, SiGithub } from 'react-icons/si';

export default function Stats() {
  const [stats, setStats] = useState({
    leetcode: { 
      username: 'Yamuna_bsvy',
      profileUrl: 'https://leetcode.com/u/Yamuna_bsvy/',
      totalSolved: 96, 
      easy: 96, 
      medium: 103, 
      hard: 20, 
      acceptanceRate: '100%',
      isLoading: false,
      error: null
    },
    github: { 
      username: 'Yamuna-b',
      profileUrl: 'https://github.com/Yamuna-b',
      stars: 0,
      commits: 110,
      pullRequests: 10,
      issues: 7,
      contributedTo: 5,
      isLoading: false,
      error: null
    }
  });

  // Set initial stats (frontend only)
  useEffect(() => {
    // Set loading to false immediately since we're using static data
    setStats(prev => ({
      ...prev,
      github: {
        ...prev.github,
        isLoading: false
      },
      leetcode: {
        ...prev.leetcode,
        isLoading: false,
        // Update these with your actual stats
        totalSolved: 5,  // Update with your total solved
        easy: 1,         // Update with your easy count
        medium: 4,       // Update with your medium count
        hard: 0,         // Update with your hard count
        acceptanceRate: '99.9%'  // Update with your acceptance rate
      }
    }));
  }, []);
  
  // TODO: Add LeetCode and HackerRank API integration here

  return (
    <div className="py-12 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-2"
          >
            Coding Activity
          </motion.h2>
          <p className="text-blue-200 text-lg">My coding journey across platforms</p>
        </div>

        {/* GitHub Stats - Simplified */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
        >
          <div className="flex items-center mb-4">
            <SiGithub className="text-gray-300 text-3xl mr-3" />
            <h3 className="text-2xl font-semibold text-white">GitHub Activity</h3>
          </div>
          <div className="mt-4">
            <img 
              src={`https://ghchart.rshah.org/2B2D42/${stats.github.username}`}
              alt={`${stats.github.username}'s GitHub Contributions`}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 space-y-3 text-left pl-4">
              <div className="flex items-center">
                <span className="text-gray-400 w-48">Total Stars Earned:</span>
                <span className="text-white font-medium">{stats.github.stars}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 w-48">Total Commits (last year):</span>
                <span className="text-white font-medium">{stats.github.commits}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 w-48">Total PRs:</span>
                <span className="text-white font-medium">{stats.github.pullRequests}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 w-48">Total Issues:</span>
                <span className="text-white font-medium">{stats.github.issues}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 w-48">Contributed to (last year):</span>
                <span className="text-white font-medium">{stats.github.contributedTo}</span>
              </div>
            </div>
            <div className="text-blue-300 text-center text-lg mt-3">
              @{stats.github.username}'s contribution activity
            </div>
          </div>
        </motion.div>

        {/* LeetCode Stats */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <SiLeetcode className="text-orange-500 text-3xl mr-3" />
              <h3 className="text-2xl font-semibold text-white">LeetCode Activity</h3>
            </div>
            {stats.leetcode.isLoading && (
              <div className="text-yellow-400 text-sm">Loading...</div>
            )}
          </div>
          
          {stats.leetcode.isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-pulse text-gray-400">Loading LeetCode stats...</div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* LeetCode Stats */}
              <div className="w-full text-center">
                <div className="text-white text-xl mb-4">
                  {stats.leetcode.username} #{stats.leetcode.id}
                </div>
                <div className="flex justify-center space-x-6 text-lg">
                  <span className="text-green-400">Easy {stats.leetcode.easy}</span>
                  <span className="text-yellow-400">Medium {stats.leetcode.medium}</span>
                  <span className="text-red-400">Hard {stats.leetcode.hard}</span>
                </div>
              <div className="text-center mt-6">
                <a 
                  href={stats.leetcode.profileUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 text-lg font-medium inline-flex items-center"
                >
                  View LeetCode Profile →
                </a>
              </div>
            </div>
          </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
function StatItem({ label, value, color = "text-white" }) {
  return (
    <div>
      <div className="text-sm text-gray-400">{label}</div>
      <div className={`text-lg font-semibold ${color}`}>{value}</div>
    </div>
  );
}
