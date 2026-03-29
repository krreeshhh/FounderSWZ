import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Jaiganesh Lakshmanan",
  initials: "JG",
  url: "https://jaiganesh.vercel.app",
  location: "Kovalam, Chennai",
  locationLink: "https://www.google.com/maps/place/kovalam",
  description:
    "Founder & CEO SecureWorldz |Cybersecurity Educator | Security Strategist  | Busy Building dragotool.shop",
  summary:
    "I’m a technology enthusiast with a strong interest in cybersecurity, driven by curiosity about how systems work and how they can be protected from real-world threats. Over time, I’ve explored multiple domains ranging from software development and networking to offensive and defensive security, which gave me practical exposure to the industry. As the Founder & CEO of [Secure Worldz](https://secureworldz.vercel.app), whether it’s building secure solutions, guiding others, or consulting on security and technology, I’m always focused on creating something impactful.",
  avatarUrl: "/main.jpeg",
  skills: [
    "Penetration Testing",
    "Security Training",
    "Tools development",
    "Vulnerability Assessment",
    "Security Code Review",
    "Programming",
    "Development with AI",
    "Web Technology with Testing"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" }
  ],
  contact: {
    email: "info.secureworldz@gmail.com",
    tel: "+918754419387",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/jaiganeshtech/",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/jaiganeshlakshmanan/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/Cyberjaitech",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@jai_tech1",
        icon: Icons.youtube,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/thecyberjai",
        icon: Icons.instagram,
        navbar: true,
      },
      calander: {
        name: "Calander",
        url: "https://cal.com/jaiganesh-lakshamanan-meet",
        icon: Icons.calander,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Founder & CEO",
      href: "https://secureworldz.vercel.app",
      badges: [],
      location: "Remote",
      title: "Secure Worldz",
      logoUrl: "/companies/SW.jpg",
      start: "2024",
      end: "Present",
      description:
        "Founded and leading a cybersecurity-focused venture delivering secure technology solutions, tools, and learning platforms. Designed and developed security-driven applications and frameworks across software and cybersecurity domains. Conduct cybersecurity training, mentorship programs, and community initiatives for students and professionals. Provide consulting on secure system architecture, threat analysis, and best security practices. Lead project planning, product strategy, and technical decision-making.",
    },
    {
      company: "Cybersecurity Engineer / Security Researcher",
      href: "https://secureworldz.vercel.app",
      badges: [],
      location: "Remote",
      title: "Independent / Projects-based",
      logoUrl: "/assets/2.jpg",
      start: "2024",
      end: "Present",
      description:
        "Worked across offensive and defensive security including vulnerability assessment, penetration testing, and system hardening. Built hands-on projects in networking, web security, and automation using Python and modern technologies.Researched real-world attack vectors and mitigation strategies aligned with industry standards.",
    },
    {
      company: "Cybersecurity Trainer & Tech Speaker",
      href: "https://secureworldz.vercel.app",
      badges: [],
      location: "Remote",
      title: "Independent / Secure Worldz",
      logoUrl: "/assets/3.jpg",
      start: "2024",
      end: "Present",
      description:
        "Delivered hands-on cybersecurity training and technical workshops to 1000+ students across colleges and institutions. Invited as a Chief Guest and Guest Speaker for technical events, seminars, and cybersecurity awareness programs. Conducted sessions on cybersecurity fundamentals, ethical hacking, career guidance, and real-world security practices. Collaborated with educational institutions and communities to promote cybersecurity awareness and skill development.",
    },
    {
      company: "Cybersecurity Mentor & Community Lead",
      href: "https://secureworldz.vercel.app",
      badges: [],
      location: "Remote",
      title: "Secure Worldz",
      logoUrl: "/assets/4.jpg",
      start: "2024",
      end: "Present",
      description:
        "Mentored students and early-career professionals in cybersecurity, networking, and secure development practices. Built and managed a growing cybersecurity community through workshops, live sessions, and online platforms. Guided learners on career paths, certifications, hands-on labs, and real-world security exposure. Actively supported learners by sharing industry insights, practical knowledge, and project guidance.",
    },
  ],
  projects: [
    {
      title: "Malware Research",
      href: "/",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "Malware research is the defensive practice of safely studying malicious software to understand how it works.",
      links: [
        {
          type: "Website",
          href: "/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/malware.jpg",
      tags: ["Malware", "Research", "Security"],
    },
    {
      title: "SQL Injection Tester",
      href: "/",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "A simple tool to safely detect SQL Injection vulnerabilities in web apps.",
      links: [
        {
          type: "Website",
          href: "/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/sql.jpg",
    },
    {
      title: "Information Gathering & Recon Toolkit",
      href: "/",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "This is a lightweight information gathering tool I built to automate the recon phase during ethical hacking, bug bounty hunting, or security assessments.",
      links: [
        {
          type: "Website",
          href: "/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/recon.jpg",
    },
    {
      title: "Drago — Founder & Product Lead",
      href: "https://dragotool.shop",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "A marketplace for real-world technology and cybersecurity products built by practitioners and engineers who work with technology every day.",
      links: [
        {
          type: "Website",
          href: "https://dragotool.shop",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/Drago.png",
    },
    {
      title: "ProWorldz — Platform Description",
      href: "/",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "ProWorldz is a professional technology and cybersecurity ecosystem focused on practical learning, real-world skills, and industry exposure.",
      technologies: [],
      links: [
        {
          type: "Website",
          href: "/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/proworldz.png",
    },
    {
      title: "Kovalam Panchayat",
      href: "https://kovalampanchayat.com/",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "Developed the complete official Kovalam Panchayat website building the entire platform from design to deployment to provide easy access to local services, community updates, and essential public information.",
      technologies: [],
      links: [
        {
          type: "Website",
          href: "https://kovalampanchayat.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/kovalam.png",
    },
    {
      title: "CTF Page",
      href: "/",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "This is a custom-built CTF platform I developed to help students practice real world cybersecurity challenges in a structured and interactive environment.",
      links: [
        {
          type: "Website",
          href: "/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/CTF.png",
      tags: ["CTF", "Cybersecurity", "Education"],
    }, {
      title: "ProWorldz lab",
      href: "/",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "This is an interactive lab system I developed to transform theoretical cybersecurity concepts into practical, task driven learning.",
      links: [
        {
          type: "Website",
          href: "/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/Lab.png",
      tags: ["Lab", "Education", "Security"],
    },
  ],
  hackathons: [
    {
      title: "Yukthi CTF",
      dates: "Dec 19 - 20, 2025",
      location: "Savitha Engineering College",
      description:
        "Being on the organizing side gave me a whole new perspective on what goes into creating a successful CTF event.",
      image:
        "hackathon/yukthi.jpg",
      mlh: "",
      links: [],
    },
    {
      title: "Entrepreneurship Cell (E-Cell)",
      dates: "Dec 19 - 20, 2024",
      location: "Prince Dr.k Vasudevan Engineering College and Technology",
      description:
        "Winner First Prize for a Drone Project, recognized for innovation, technical implementation, and real world application.",
      image:
        "hackathon/e-cell.png",
      mlh: "",
      links: [],
    },
    {
      title: "SIH",
      dates: "Dec 19 - 20, 2024",
      location: "Prince Dr.k Vasudevan Engineering College and Technology",
      description:
        "Internal Hackathon Winner (Smart India Hackathon – SIH), recognized for innovative problem-solving, strong technical implementation, and effective teamwork in developing a practical solution.",
      image:
        "hackathon/sih.png",
      mlh: "",
      links: [],
    },
    {
      title: "Science Exploration Hackathon",
      dates: "Dec 19 - 20, 2024",
      location: "Prince Dr.k Vasudevan Engineering College and Technology",
      description:
        "Participated in a Science Exploration Hackathon, where I presented an innovative idea for automatic minute water detection to cut off electrical current. ",
      image:
        "hackathon/Science.jpg",
      mlh: "",
      links: [],
    },
  ],
} as const;
