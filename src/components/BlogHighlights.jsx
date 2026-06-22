import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaMedium } from "react-icons/fa";

const MEDIUM_PROFILE = "https://medium.com/@yamuna_b";

const publishedPosts = [
  {
    title: "Why a CSE Student Like Me Wants to Be a Blogger",
    url: "https://medium.com/@yamuna_b/why-a-cse-student-like-me-wants-to-be-a-blogger-a10aa3cc305c",
    date: "May 5, 2026",
    topic: "blogging · computer-science",
    excerpt:
      "On paper, I'm just another Computer Science student from Tamil Nadu — inside, I'm someone who feels a little too much about code, people, and small moments. Coding builds systems. Writing builds me.",
  },
  {
    title: "A Quiet Beginning: A CSE Student Who Wants to Write",
    url: "https://medium.com/@yamuna_b/a-quiet-beginning-a-cse-student-who-wants-to-write-dcec543c5cd5",
    date: "Apr 4, 2026",
    topic: "careers · programming",
    excerpt:
      "I didn't grow up thinking I would be a blogger — just a head full of thoughts that never fully fit into exam papers or lab records. This is my first step toward writing about tech, interviews, and projects honestly.",
  },
];

function BlogCard({ post, idx }) {
  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08 }}
      className="group flex flex-col rounded-xl border overflow-hidden transition-all duration-200 hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-950/20"
      style={{ borderColor: "rgba(51,65,85,0.5)", background: "rgba(10,14,22,0.6)" }}
    >
      <div
        className="relative px-4 py-5 border-b border-slate-800/80"
        style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(139,92,246,0.1) 50%, rgba(10,14,22,0.9) 100%)" }}
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center shrink-0">
            <FaMedium className="w-4 h-4 text-slate-200" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-500/80 mb-1">{post.topic}</p>
            <p className="text-xs text-slate-500">{post.date}</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-400 leading-relaxed line-clamp-4 italic border-l-2 border-sky-500/30 pl-3">
          &ldquo;{post.excerpt}&rdquo;
        </p>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-slate-100 group-hover:text-sky-300 leading-snug mb-3 line-clamp-2">
          {post.title}
        </h3>
        <span className="text-xs font-semibold text-sky-400 mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">
          Read on Medium <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </motion.a>
  );
}

export default function BlogHighlights() {
  return (
    <>
      <p className="text-sm text-slate-400 mb-6 max-w-2xl leading-relaxed">
        Notes on engineering, interviews, and lessons from building products — published on Medium.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {publishedPosts.map((post, idx) => (
          <BlogCard key={post.url} post={post} idx={idx} />
        ))}
      </div>

      <a
        href={MEDIUM_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-slate-400 hover:text-sky-400 transition-colors"
      >
        <FaMedium className="w-4 h-4" /> View all posts on Medium
      </a>
    </>
  );
}
