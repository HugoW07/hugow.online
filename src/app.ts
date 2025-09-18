import express, { Request, Response } from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// CV data
const cvData = {
  personal: {
    name: "Hugo Wilinski.",
    title: "Full Stack Developer",
    email: "h@qarek.nu",
    phone: "+46 73 510 31 57",
    location: "Växjö, Sweden",
    website: "hugow.online",
    linkedin: "linkedin.com/in/Hugo Wilinski",
    github: "github.com/HugoW07",
  },
  summary:
    "Passionate full-stack developer with expertise in modern web technologies. I create innovative solutions that bridge the gap between design and functionality, delivering exceptional user experiences.",
  skills: {
    technical: [
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    frameworks: ["Express.js", "Next.js", "Vue.js", "Django", "FastAPI"],
    tools: ["Git", "VS Code", "Figma", "Postman", "Railway", "Vercel"],
  },
  experience: [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations AB",
      period: "2022 - Present",
      description:
        "Lead development of scalable web applications using React and Node.js. Improved application performance by 40% and mentored junior developers.",
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions Inc",
      period: "2020 - 2022",
      description:
        "Developed responsive user interfaces and collaborated with design teams to implement pixel-perfect designs. Built reusable component libraries.",
    },
    {
      title: "Junior Developer",
      company: "StartupTech",
      period: "2019 - 2020",
      description:
        "Contributed to various projects using modern JavaScript frameworks. Gained experience in agile development methodologies.",
    },
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      school: "Royal Institute of Technology (KTH)",
      period: "2017 - 2019",
    },
    {
      degree: "Bachelor of Science in Information Technology",
      school: "Stockholm University",
      period: "2014 - 2017",
    },
  ],
  projects: [
    {
      name: "E-commerce Platform",
      tech: ["React", "Node.js", "PostgreSQL"],
      description:
        "Built a full-featured e-commerce platform with payment integration and admin dashboard.",
    },
    {
      name: "Task Management App",
      tech: ["Vue.js", "Express", "MongoDB"],
      description:
        "Developed a collaborative task management application with real-time updates.",
    },
    {
      name: "Weather Dashboard",
      tech: ["TypeScript", "Next.js", "API Integration"],
      description:
        "Created an interactive weather dashboard with data visualization and forecasting.",
    },
  ],
};

// Routes
app.get("/", (req: Request, res: Response) => {
  res.render("index", { cv: cvData });
});

app.get("/api/cv", (req: Request, res: Response) => {
  res.json(cvData);
});

app.listen(PORT, () => {
  console.log(`🚀 CV website running on port ${PORT}`);
  console.log(`📱 Visit: http://localhost:${PORT}`);
});
