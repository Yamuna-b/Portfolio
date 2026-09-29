import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown, { type Components } from "react-markdown";
import { remarkMarks } from "@/lib/remark-marks";
import { Highlight, type HighlightType } from "@/components/highlight";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PersonSchema } from "@/components/schema/person-schema";
import { Metadata } from 'next';
import { Icons } from "@/components/icons";
import ShinyButton from "@/components/ui/shiny-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlipAvatar } from "@/components/flip-avatar";
import { GitHubHoverCard } from "@/components/github-hover-card";
import { LinkedInHoverCard } from "@/components/linkedin-hover-card";
import { GithubContributions } from "@/components/lazy-client";
import { Award, BookOpen, Cpu, ExternalLink, FileText, MapPin, Sparkles, Trophy, CheckCircle2, ArrowRight, Users, BriefcaseBusiness, GraduationCap } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

const HOME_DESCRIPTION =
  "Yamuna B - Backend / Cloud Engineer with AI specialization from Madurai, India. Building practical APIs, cloud services, and AI solutions.";

export const metadata: Metadata = {
  title: DATA.name,
  description: HOME_DESCRIPTION,
  openGraph: {
    title: DATA.name,
    description: HOME_DESCRIPTION,
    url: DATA.url,
    siteName: DATA.name,
    images: [
      {
        url: `${DATA.url}/yamuna_avatar.jpg`,
        width: 1200,
        height: 630,
        alt: `${DATA.name}'s Portfolio`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DATA.name,
    description: HOME_DESCRIPTION,
    images: [`${DATA.url}/yamuna_avatar.jpg`],
  },
};

const summaryComponents: Components = {
  mark: ({ node, children, ...props }) => {
    const { "data-type": type, "data-order": order } = props as Record<string, string>;
    return (
      <Highlight type={type as HighlightType} order={Number(order)}>
        {children}
      </Highlight>
    );
  },
};

function SectionLabel({ label }: { label: string }) {
  return (
    <span className="inline-block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
      {label}
    </span>
  );
}

export default function Page() {
  return (
    <main className="flex min-h-[100dvh] flex-col space-y-14 sm:space-y-16">
      <PersonSchema />

      {/* ─── HERO ─── */}
      <section id="hero">
        <div className="mx-auto w-full space-y-6">
          <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-col flex flex-1 space-y-2">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`hey, ${DATA.name.split(" ")[0]} here`}
                as="h1"
              />
              <BlurFade delay={BLUR_FADE_DELAY * 1.2}>
                <div className="inline-flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1 text-foreground font-semibold">
                    <MapPin className="size-3.5 text-primary" />
                    {DATA.location}
                  </span>
                  <span>·</span>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary font-semibold">
                    Graduating 2027
                  </span>
                </div>
              </BlurFade>
              <BlurFadeText
                className="max-w-[600px] text-muted-foreground md:text-xl font-medium"
                delay={BLUR_FADE_DELAY * 1.5}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="profile-wrapper">
                <FlipAvatar
                  src={DATA.avatarUrl}
                  hoverSrc="/yamuna_avatar.jpg"
                  alt={DATA.name}
                  fallback={DATA.initials}
                />
              </div>
            </BlurFade>
          </div>

          {/* Action Links */}
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-xs sm:text-sm font-medium text-background transition-all hover:opacity-90 shadow-sm"
              >
                View selected work
                <ArrowRight className="size-3.5" />
              </a>
              <a
                href="#resume"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs sm:text-sm font-medium text-foreground transition-all hover:bg-muted"
              >
                <FileText className="size-3.5" />
                View resume
              </a>
            </div>
          </BlurFade>

          {/* About Summary */}
          <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
            <Markdown
              className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert [&_a:has(.rough-mark)]:no-underline"
              remarkPlugins={[remarkMarks]}
              components={summaryComponents}
            >
              {DATA.summary}
            </Markdown>
          </BlurFade>

          {/* Proof points / Stats */}
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <ul className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground">
              {DATA.stats.map((stat, i) => (
                <li key={stat.label} className="flex items-baseline gap-x-3">
                  <a
                    href={stat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap hover:underline flex items-baseline gap-1.5"
                  >
                    <span className="font-bold tabular-nums text-foreground">{stat.value}</span>{" "}
                    <span className="text-muted-foreground">{stat.label}</span>
                  </a>
                  {i < DATA.stats.length - 1 && (
                    <span aria-hidden className="hidden text-muted-foreground/40 sm:inline">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </BlurFade>

          {/* Social links */}
          <BlurFade delay={BLUR_FADE_DELAY * 3.5}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {Object.entries(DATA.contact.social).map(([name, social]) => {
                const socialLink = (
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border/60 bg-card/40 p-2.5 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-card hover:text-foreground"
                    aria-label={name}
                  >
                    <social.icon className="size-5" />
                  </a>
                );

                if (name === "GitHub") {
                  return (
                    <GitHubHoverCard key={name}>
                      {socialLink}
                    </GitHubHoverCard>
                  );
                }

                if (name === "LinkedIn") {
                  return (
                    <LinkedInHoverCard key={name}>
                      {socialLink}
                    </LinkedInHoverCard>
                  );
                }

                return (
                  <Tooltip key={name}>
                    <TooltipTrigger asChild>
                      {socialLink}
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{social.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ─── QUOTES / PHILOSOPHY ─── */}
      <section id="philosophy">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
            <SectionLabel label="Engineering Philosophy" />
            <h2 className="mt-1 text-lg font-bold tracking-tight">"I turn ideas into dependable systems."</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {DATA.quotes.map((quote, idx) => (
                <blockquote key={idx} className="relative rounded-xl border border-border/50 border-l-2 border-l-primary/60 bg-gradient-to-br from-primary/5 to-background/70 p-5 sm:p-6">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/80">{["Think boldly", "Stay curious", "Keep going", "Show up daily"][idx]}</p>
                  <p className="font-serif text-base leading-relaxed text-foreground/90 sm:text-lg">“{quote}”</p>
                </blockquote>
              ))}
            </div>
          </div>
        </BlurFade>
      </section>

      {/* ─── SYSTEMS WORKFLOW (01-06) ─── */}
      <section id="workflow">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <SectionLabel label="Development Lifecycle" />
          <h2 className="mt-1 text-xl font-bold tracking-tight">The Systems I Work With</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {DATA.systems.map((sys) => (
              <div key={sys.step} className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/40 p-3.5 transition-all hover:border-border hover:bg-card/80">
                <span className="text-2xl font-extrabold text-muted-foreground/30 group-hover:text-primary/40 transition-colors">
                  {sys.step}
                </span>
                <h3 className="mt-1 text-sm font-semibold text-foreground">{sys.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{sys.description}</p>
              </div>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <SectionLabel label="Portfolio" />
            <h2 className="mt-1.5 text-xl font-bold tracking-tight">Featured Work & Systems</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6.5}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {DATA.projects.map((project) => (
                <div key={project.title} className="relative overflow-hidden rounded-xl">
                  <ProjectCard
                    {...project}
                    tags={Array.from(project.technologies)}
                  />
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ─── WORK EXPERIENCE ─── */}
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <SectionLabel label="Experience" />
            <h2 className="mt-1.5 text-xl font-bold tracking-tight">Internships & Professional Work</h2>
          </BlurFade>
          <div className="space-y-3">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 7.5 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  impact={work.impact}
                  href={work.href}
                  badges={work.badges}
                  period={work.start === work.end ? work.start : `${work.start} - ${work.end}`}
                  description={work.description}
                  links={"links" in work ? work.links : undefined}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESEARCH & PUBLICATIONS ─── */}
      <section id="research">
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <SectionLabel label="Research & Publications" />
          <h2 className="mt-1.5 text-xl font-bold tracking-tight">IEEE Conference Publication</h2>
          <div className="mt-3 overflow-hidden rounded-xl border border-border/60 bg-card/40 p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 space-y-1.5">
                <div className="inline-flex items-center gap-2">
                  <Badge variant="outline" className="text-xs border-primary/40 text-primary">
                    IEEE AIDE 2025
                  </Badge>
                  <span className="text-xs text-muted-foreground">Conference Paper</span>
                </div>
                <h3 className="text-base font-semibold">Carbon Footprint Awareness and Mitigation Research</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Published research exploring software-based carbon tracking, energy awareness models, and mitigation strategies presented at IEEE AIDE 2025.
                </p>
              </div>
              <a
                href={DATA.publication.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-medium hover:bg-muted transition-colors shrink-0"
              >
                View Publication
                <ExternalLink className="size-3.5" />
              </a>
            </div>
            {DATA.publication.image && (
              <div className="mt-4 overflow-hidden rounded-lg border border-border/40">
                <img src={DATA.publication.image} alt="IEEE Publication" className="block h-auto w-full object-contain" />
              </div>
            )}
          </div>
        </BlurFade>
      </section>

      {/* ─── ACHIEVEMENTS & AWARDS ─── */}
      <section id="achievements">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <SectionLabel label="Honors & Awards" />
          <h2 className="mt-1.5 text-xl font-bold tracking-tight">First Place & Competition Wins</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {DATA.achievements.map((ach) => (
              <a
                key={ach.title}
                href={ach.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/40 transition-all hover:border-border hover:shadow-md"
              >
                <div className="shrink-0 bg-muted/20">
                  <img src={ach.image} alt={ach.title} className="block h-auto w-full object-contain" />
                </div>
                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-semibold text-foreground group-hover:underline line-clamp-2">{ach.title}</span>
                    <Trophy className="size-4 text-amber-500 shrink-0" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* ─── LEETCODE & CODING STATS ─── */}
      <section id="coding" className="min-w-0 w-full">
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <SectionLabel label="Consistency & Problem Solving" />
          <h2 className="mt-1.5 text-xl font-bold tracking-tight">Coding Activity & LeetCode</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {/* LeetCode Card */}
            <div className="min-w-0 w-full rounded-xl border border-border/60 bg-card/40 p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Icons.leetcode className="size-6 text-amber-500" />
                  <div>
                    <h3 className="text-sm font-semibold">LeetCode Profile</h3>
                    <p className="text-xs text-muted-foreground">@{DATA.leetCodeStats.username}</p>
                  </div>
                </div>
                <a
                  href={DATA.leetCodeStats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                >
                  View Profile <ExternalLink className="size-3" />
                </a>
              </div>

              <div className="grid grid-cols-2 min-[420px]:grid-cols-4 gap-2 text-center pt-2">
                <div className="rounded-lg bg-background/60 p-2 border border-border/40">
                  <span className="text-lg font-bold text-foreground">{DATA.leetCodeStats.totalSolved}</span>
                  <p className="text-[10px] text-muted-foreground">Total Solved</p>
                </div>
                <div className="rounded-lg bg-emerald-500/10 p-2 border border-emerald-500/20">
                  <span className="text-lg font-bold text-emerald-500">{DATA.leetCodeStats.easy}</span>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Easy</p>
                </div>
                <div className="rounded-lg bg-amber-500/10 p-2 border border-amber-500/20">
                  <span className="text-lg font-bold text-amber-500">{DATA.leetCodeStats.medium}</span>
                  <p className="text-[10px] text-amber-600 dark:text-amber-400">Medium</p>
                </div>
                <div className="rounded-lg bg-rose-500/10 p-2 border border-rose-500/20">
                  <span className="text-lg font-bold text-rose-500">{DATA.leetCodeStats.hard}</span>
                  <p className="text-[10px] text-rose-600 dark:text-rose-400">Hard</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground pt-1 border-t border-border/40">
                <span><strong>Rating:</strong> {DATA.leetCodeStats.contestRating}</span>

                <span><strong>Active Days:</strong> {DATA.leetCodeStats.activeDays}</span>

                <span><strong>Max Streak:</strong> {DATA.leetCodeStats.maxStreak} days</span>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="min-w-0 w-full rounded-xl border border-border/60 bg-card/40 p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Icons.github className="size-6 text-foreground" />
                  <div>
                    <h3 className="text-sm font-semibold">GitHub Activity</h3>
                    <p className="text-xs text-muted-foreground">140+ contributions in the last year</p>
                  </div>
                </div>
                <a
                  href={DATA.contact.social.GitHub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                >
                  View Profile <ExternalLink className="size-3" />
                </a>
              </div>
              <div className="min-w-0 max-w-full pt-2">
                <GithubContributions />
              </div>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <SectionLabel label="Technologies" />
            <h2 className="mt-1.5 text-xl font-bold tracking-tight">Tools & Tech Stack</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 11.5}>
            <div className="flex flex-wrap gap-2">
              {DATA.skills.map((skill) => (
                <Badge key={skill.name} variant="secondary" className="inline-flex items-center gap-1.5 border border-border/50 px-3 py-1.5 text-xs sm:text-sm font-medium">
                  {"customIcon" in skill ? (
                    <skill.customIcon className="size-4" />
                  ) : (
                    <FontAwesomeIcon icon={skill.icon} className="size-4" />
                  )}
                  {skill.name}
                </Badge>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {[
        { id: "certifications", label: "Credentials", title: "Certifications & Courses", items: DATA.certificationsList },
        { id: "open-source", label: "Community & Collaboration", title: "Open Source Contributions", items: DATA.openSourceContributions },
        { id: "platform-badges", label: "Platform Achievements", title: "Platform Badges", items: DATA.platformBadges },
      ].map((group) => (
        <section key={group.id} id={group.id} aria-labelledby={group.id + "-heading"}>
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <SectionLabel label={group.label} />
            <h2 id={group.id + "-heading"} className="mt-1.5 text-xl font-bold tracking-tight">{group.title}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {group.items.map((item) => (
                <div key={item.image} className="self-start overflow-hidden rounded-xl border border-border/50 bg-card/40 transition-all hover:border-border">
                  <a href={item.image} target="_blank" rel="noopener noreferrer" className="block bg-muted/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" aria-label={"Open full image: " + item.name}>
                    <img src={item.image} alt={item.name} loading="lazy" className="block h-auto w-full object-contain" />
                  </a>
                  <p className="border-t border-border/40 p-3 text-xs font-medium leading-relaxed text-foreground">{item.name}</p>
                </div>
              ))}
            </div>
          </BlurFade>
        </section>
      ))}

      {/* ─── LEADERSHIP & VOLUNTEERING ─── */}
      <section id="leadership">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <SectionLabel label="Leadership & Community" />
          <h2 className="mt-1.5 text-xl font-bold tracking-tight">Responsibility Beyond The Code</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {DATA.responsibilities.map((resp, index) => {
              const Icon = [Users, BriefcaseBusiness, GraduationCap][index];
              const accents = [
                { card: "border-emerald-500/30 from-emerald-500/15", icon: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", label: "Student Representation" },
                { card: "border-blue-500/30 from-blue-500/15", icon: "bg-blue-500/15 text-blue-700 dark:text-blue-300", label: "Career Readiness" },
                { card: "border-violet-500/30 from-violet-500/15", icon: "bg-violet-500/15 text-violet-700 dark:text-violet-300", label: "Academic Leadership" },
              ][index];
              return (
                <div key={resp.title} className={"relative rounded-2xl border bg-gradient-to-br to-card p-5 shadow-sm transition-shadow hover:shadow-lg sm:p-6 " + accents.card}>
                  <div className={"mb-5 flex size-12 items-center justify-center rounded-xl " + accents.icon}>
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{accents.label}</p>
                  <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground sm:min-h-[3rem]">{resp.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{resp.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {DATA.volunteerActivities.map((vol) => (
              <div key={vol.title} className="overflow-hidden rounded-xl border border-border/50 bg-card/40">
                <img src={vol.image} alt={vol.title} className="block h-auto w-full object-contain" />
                <div className="p-3 text-xs font-semibold text-foreground text-center">
                  {vol.title}
                </div>
              </div>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* ─── UPCOMING / BUILDING NEXT ─── */}
      <section id="upcoming">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <SectionLabel label="Future Outlook" />
          <h2 className="mt-1.5 text-xl font-bold tracking-tight">What I Am Building Next</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {DATA.upcoming.map((item) => (
              <div key={item.title} className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card/40 p-4">
                <img src={item.image} alt={item.title} className="block h-auto w-full rounded-lg object-contain border border-border/40" />
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* ─── RESUME ─── */}
      <section id="resume" aria-labelledby="resume-heading">
        <BlurFade delay={BLUR_FADE_DELAY * 14.5}>
          <SectionLabel label="Resume" />
          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-3">
            <h2 id="resume-heading" className="text-xl font-bold tracking-tight">My Resume</h2>
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
              Open full screen <ExternalLink className="size-3.5" />
            </a>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Read my resume below, with no download needed.</p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border/60 bg-white">
            <img
              src="/resume-preview/page-1.png"
              alt="Yamuna B resume: education, technical skills, experience, projects, achievements, and certifications. Open the full PDF for selectable text and links."
              width={1273}
              height={1800}
              loading="lazy"
              className="block h-auto w-full"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            For selectable text and clickable links, <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">open the original PDF.</a>
          </p>
        </BlurFade>
      </section>

      {/* ─── EDUCATION ─── */}
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <SectionLabel label="Academic Journey" />
            <h2 className="mt-1.5 text-xl font-bold tracking-tight">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 15.5 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/60 via-card/40 to-card/20 py-12 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.18) 1px, transparent 0)",
                backgroundSize: "16px 16px",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-foreground/10 blur-3xl"
            />
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
              <SectionLabel label="Get in touch" />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Let’s build something dependable.</h2>
              <p className="max-w-[500px] text-sm text-muted-foreground">
                Open to backend, cloud, and software-development roles. Feel free to reach out via email or WhatsApp.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${DATA.contact.email}`}
                  className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-background/70 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-background"
                >
                  <Avatar className="size-6">
                    <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
                    <AvatarFallback>{DATA.initials}</AvatarFallback>
                  </Avatar>
                  {DATA.contact.email}
                </a>
                <a
                  href={DATA.contact.phone}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 transition-all hover:-translate-y-0.5"
                >
                  <Icons.whatsapp className="size-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border/40 pt-8 pb-4">
        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">{DATA.name}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Backend / Cloud Engineer from India.
                <br />Building practical software and cloud solutions.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Links</p>
              <div className="flex flex-col gap-1.5">
                {DATA.navbar.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors w-fit"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Profiles</p>
              <div className="flex flex-col gap-1.5">
                <a href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors w-fit">
                  GitHub
                </a>
                <a href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors w-fit">
                  LinkedIn
                </a>
                <a href={DATA.contact.social.LeetCode.url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors w-fit">
                  LeetCode
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-border/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} {DATA.name}.
            </p>

          </div>
        </BlurFade>
      </footer>
    </main>
  );
}

