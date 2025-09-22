import path from "path";
import { readFileSync, existsSync } from "fs";
import ejs from "ejs";

const PORT = process.env.PORT || 3000;

// CV data
const cvData = {
  personal: {
    name: "Hugo Wilinski.",
    title: "Full Stack Developer",
    email: "h@qarek.nu",
    phone: "+46 73 510 31 57",
    location: "Växjö, Sweden",
    website: "hugow.online",
    linkedin: "linkedin.com/in/hugow07",
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
      company: "Telenor",
      period: "2022 - Present",
      description:
        "Lead development of scalable web applications using React and Node.js. Improved application performance by 40% and mentored junior developers.",
    },
    {
      title: "Frontend Developer",
      company: "H&M",
      period: "2020 - 2022",
      description:
        "Developed responsive user interfaces and collaborated with design teams to implement pixel-perfect designs. Built reusable component libraries.",
    },
    {
      title: "Junior Developer",
      company: "OpenAI",
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

// Helper function to get MIME type
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".ttf": "font/ttf",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
  };
  return mimeTypes[ext] || "text/plain";
}

// Helper function to serve static files
async function serveStaticFile(filePath: string): Promise<Response | null> {
  const fullPath = path.join(process.cwd(), "public", filePath);

  if (!existsSync(fullPath)) {
    return null;
  }

  try {
    const file = Bun.file(fullPath);
    const mimeType = getMimeType(fullPath);

    return new Response(file, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error(`Error serving static file ${fullPath}:`, error);
    return null;
  }
}

// Helper function to render EJS template
async function renderTemplate(
  templateName: string,
  data: any
): Promise<string> {
  const templatePath = path.join(process.cwd(), "views", `${templateName}.ejs`);

  if (!existsSync(templatePath)) {
    throw new Error(`Template ${templateName} not found`);
  }

  const templateContent = readFileSync(templatePath, "utf-8");
  return ejs.render(templateContent, data);
}

// Create Bun server
const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    try {
      // Handle API routes
      if (pathname === "/api/cv") {
        return new Response(JSON.stringify(cvData, null, 2), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      // Handle static files
      if (
        pathname.startsWith("/styles/") ||
        pathname.startsWith("/js/") ||
        pathname.startsWith("/images/") ||
        pathname.startsWith("/favicon.ico")
      ) {
        const staticResponse = await serveStaticFile(pathname);
        if (staticResponse) {
          return staticResponse;
        }
      }

      // Handle root route and SPA routing
      if (pathname === "/" || pathname.startsWith("/#")) {
        const html = await renderTemplate("index", { cv: cvData });
        return new Response(html, {
          headers: { "Content-Type": "text/html" },
        });
      }

      // 404 for other routes
      return new Response("Not Found", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    } catch (error) {
      console.error("Server error:", error);
      return new Response("Internal Server Error", {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }
  },
});

console.log(`🚀 CV website running on port ${PORT}`);
console.log(`📱 Visit: http://localhost:${PORT}`);
console.log(`⚡ Powered by Bun ${Bun.version}`);
