import type { ReactNode } from "react";

//& simple split - `engineering` (cool), `product` (warm).
export type TagKind = "engineering" | "product";
export type Tag = { label: string; kind: TagKind };

const eng = (label: string): Tag => ({ label, kind: "engineering" });
const prod = (label: string): Tag => ({ label, kind: "product" });

export type Role = {
  company: string;
  title: string;
  href: string;
  start: string;
  end: string;
  description: ReactNode;
  tags: Tag[];
};

export type Project = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
  repo: { owner: string; name: string; href: string };
  live: { href: string; status: "online" | "offline" } | null;
  tags: Tag[];
  featured: boolean;
};

const ext = (href: string, children: ReactNode) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="link">
    {children}
  </a>
);

export const about: ReactNode[] = [
  <>
    Most recently a Technical Support Engineer at{" "}
    {ext("https://www.taguchi.com.au/", "Taguchi")}, troubleshooting complex
    technical issues, contributing to software improvements, and collaborating
    with global development teams on a marketing automation platform serving
    clients across APAC, EU, and US. I&apos;m currently open to software
    engineering roles.
  </>,
  <>
    My technical foundation is strengthened by professional experience at{" "}
    {ext("https://music.youtube.com/", "Google")},{" "}
    {ext("https://consumer.huawei.com/en/mobileservices/music/", "Huawei")},
    and {ext("https://www.sonymusic.com/", "Sony Music")}, leading digital
    product launches and engagement strategies throughout the APAC region.
    That background in product management informs my approach to software
    development, understanding both business objectives driving technical
    decisions and engineering considerations that shape user experiences.
  </>,
  <>
    Specializing in full-stack development using Python, JavaScript, React,
    and Vue.js, with a focus on creating solutions that balance technical
    excellence with practical business needs. Currently exploring AI/ML and
    data security to expand technical capabilities and build more
    intelligent, secure, data-driven applications.
  </>,
];

export const roles: Role[] = [
  {
    company: "Taguchi",
    title: "Technical Support Engineer",
    href: "https://www.taguchi.com.au/",
    start: "2025",
    end: "2026",
    description:
      "Troubleshot and debugged technical issues for the Taguchi® Marketing Automation Platform, implementing fixes and providing actionable solutions to clients across global markets (APAC, EU, US). Collaborated with cross-functional development, product, and account management teams to escalate and resolve complex technical issues. Contributed to software improvements through independent development tasks and bug fixes using Python, Vue, JavaScript, HTML, CSS. Developed and maintained frontend components including JavaScript/HTML email templates for marketing automation campaigns, while enhancing support documentation to improve team efficiency and client self-service capabilities.",
    tags: [
      eng("Python"),
      eng("SQL"),
      eng("JavaScript"),
      eng("Vue.js"),
      eng("HTML"),
      eng("CSS"),
      eng("Git"),
      prod("Power BI"),
      prod("Marketing Automation"),
    ],
  },
  {
    company: "Google",
    title: "Music Content & Promotion Manager",
    href: "https://music.youtube.com/",
    start: "2023",
    end: "2024",
    description:
      "Developed and executed strategies to promote and enhance engagement of music consumption across YouTube Music. Leveraged an understanding of culture and entertainment trends to foster deep connections between artists and fans. Managed music programming across playlists and user experiences to implement scalable solutions, while conducting metrics-based analyses to optimize campaign performance. Expanded YouTube Music's global programming strategies, driving improvements and innovative features with a focus on the Indonesian market.",
    tags: [
      prod("Music Programming"),
      prod("Content Curation"),
      prod("Data Analytics"),
      prod("Consumer Research"),
      prod("Campaign Management"),
      prod("Partner Marketing"),
    ],
  },
  {
    company: "Huawei",
    title: "Content Operations Manager, Chief Editor",
    href: "https://consumer.huawei.com/en/mobileservices/music/",
    start: "2020",
    end: "2022",
    description:
      "Led a team of 12 in launching Huawei's mobile music app across Southeast Asia, collaborating with regional music labels to pioneer operations in five markets. Oversaw Huawei's consumer cloud services and entertainment operations. Drove local activations and led new feature launches that boosted daily active users by 40% and increased paid subscriptions by 25% across APAC. Managed campaign creation, digital activations, and music curation, onboarding key label partners and coordinating with cross-functional teams to ensure efficient content workflows. Additionally, established core operational frameworks to meet performance targets and KPIs quarterly.",
    tags: [
      prod("Music Ops"),
      prod("Content Strategy"),
      prod("Project Management"),
      prod("Music Curation"),
      prod("Partner Management"),
      prod("Campaign Strategy"),
    ],
  },
  {
    company: "Sony Music",
    title: "Digital Marketing Executive",
    href: "https://www.sonymusic.com/",
    start: "2016",
    end: "2019",
    description: (
      <>
        Managed marketing campaigns for international and local artists,
        overseeing social media accounts across{" "}
        {ext("https://www.facebook.com/sonymusicsg/", "Facebook")},{" "}
        {ext("https://x.com/sonymusicsg", "X")}, and{" "}
        {ext("https://www.instagram.com/sonymusicsg", "Instagram")}, and
        co-managing artist pages for{" "}
        {ext("https://www.facebook.com/TheSamWillows/", "The Sam Willows")},{" "}
        {ext("https://www.facebook.com/TheSamWillows/", "Sezairi")}, and{" "}
        {ext("https://www.facebook.com/tabithanauser/", "Tabitha Nauser")}. Led
        digital campaigns and social ad-buy integrations, while also handling
        playlist curation and campaign management for{" "}
        {ext("https://open.spotify.com/user/sonymusicsg", "Filtr Singapore on Spotify")}
        . Managed accounts for Ultra Records and represented Singapore in APAC
        marketing campaigns for international artists, including the launch of
        the EDM label {ext("https://www.liquidstate.co/", "Liquid State")}.
      </>
    ),
    tags: [
      prod("Digital Strategy"),
      prod("Social Media"),
      prod("Content Curation"),
      prod("Facebook Ads"),
      prod("Spotify Ads"),
      prod("Campaign Management"),
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "music-rewrapped",
    name: "Music Re-Wrapped",
    summary:
      "A personal Spotify dashboard that turns listening data into insight and event discovery.",
    description:
      "Full-stack app that brings your Spotify data to life: top tracks and favourite genres in one dashboard, paired with curated live-event recommendations so the insights lead somewhere.",
    image: {
      src: "/projects/music-rewrapped.png",
      alt: "Music Re-Wrapped landing page: a green-to-black gradient with the title, the tagline “Learn more about your music taste”, and a Login with Spotify button",
      width: 1612,
      height: 1136,
    },
    repo: {
      owner: "shondoe11",
      name: "music-rewrapped",
      href: "https://github.com/shondoe11/music-rewrapped",
    },
    live: { href: "https://musicrewrapped.onrender.com/", status: "online" },
    tags: [
      eng("Python"),
      eng("Flask"),
      eng("PostgreSQL"),
      eng("JavaScript"),
      eng("React"),
      eng("TailwindCSS"),
    ],
    featured: true,
  },
  {
    slug: "maskoff",
    name: "MaskOFF",
    summary:
      "MERN platform combining job search, professional networking and encrypted real-time messaging.",
    description:
      "Full-stack MERN platform built around job posts: customisable profiles with public and anonymous modes, encrypted chat, friend management, and an integrated hiring flow from application to conversation.",
    image: {
      src: "/projects/maskoff.png",
      alt: "MaskOFF welcome screen on a black background with the heading “Welcome to MASKoff” in purple monospace type and a Login/Register button",
      width: 1600,
      height: 1168,
    },
    repo: {
      owner: "manxzo",
      name: "MaskOFF-Client",
      href: "https://github.com/manxzo/MaskOFF-Client",
    },
    live: { href: "https://www.maskup.space/", status: "offline" },
    tags: [
      eng("TypeScript"),
      eng("MongoDB"),
      eng("Express"),
      eng("React"),
      eng("Node"),
      eng("HeroUI"),
    ],
    featured: true,
  },
  {
    slug: "anything-dash",
    name: "Anything-Dash",
    summary: "First React project: a modular dashboard with full CRUD and live external data.",
    description:
      "My first React project: a modular personal dashboard with full CRUD against Airtable and live data from several external APIs, covering weather, crypto prices, football standings and anime.",
    image: {
      src: "/projects/anything-dash.png",
      alt: "Anything-Dash dashboard showing a Singapore weather forecast, a cryptocurrency price table, a to-do list, and Premier League football standings",
      width: 2516,
      height: 1768,
    },
    repo: {
      owner: "shondoe11",
      name: "anything-dash",
      href: "https://github.com/shondoe11/anything-dash",
    },
    live: { href: "https://anything-dash.netlify.app/", status: "online" },
    tags: [eng("React"), eng("Vite"), eng("Bootstrap"), eng("Airtable")],
    featured: false,
  },
  {
    slug: "blackjack",
    name: "Blackjack Browser Game",
    summary: "First web app: a working game of Blackjack in vanilla JavaScript.",
    description:
      "My first web application: a classic game of Blackjack in vanilla JavaScript with betting, a dealer, and a persistent leaderboard, built to demonstrate DOM manipulation and game-state logic.",
    image: {
      src: "/projects/blackjack.png",
      alt: "Blackjack browser game mid-hand: the player holds an ace and a seven of spades on a green felt table with Hit, Stand, Cash Out and Reset buttons",
      width: 1284,
      height: 933,
    },
    repo: {
      owner: "shondoe11",
      name: "blackjack-game",
      href: "https://github.com/shondoe11/blackjack-game",
    },
    live: { href: "https://shondoe11.github.io/blackjack-game/", status: "online" },
    tags: [eng("JavaScript"), eng("HTML"), eng("CSS")],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
