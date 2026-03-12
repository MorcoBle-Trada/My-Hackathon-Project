
export const initialDatabase = {
  validAcademyIds: [
  
    "FULL-2001", "FULL-2002", "FULL-2003", "FULL-2004", "FULL-2005", 
    "FULL-2006", "FULL-2007", "FULL-2008", "FULL-2009", "FULL-2010", 
    "FULL-2011", "FULL-2012", "FULL-2013", "FULL-2014", "FULL-2015", 
    "DATA-1001", "TEST-1234", "ACAD-1234",

  
    "FULL-2016", 
    "FULL-2017",
    "FULL-2018",
    "DATA-1002",
    "DATA-1003",
    "UXUI-1001",
    "UXUI-1002",
    "BACK-1001",
    "BACK-1002",
    "FEND-1001"
  ],
  courses: {
    fullstack: {
      name: "Fullstack Development",
      students: [
        { 
          id: "fs-1", academyId: "FULL-2001", name: "Emmanuel Ogbonna", 
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "eogbonna-dev", repoCount: 42, yearsOfExperience: 2, skills: ["React", "Node.js", "MongoDB", "Express"], projects: [{ name: "E-Commerce API", url: "#" }], bio: "Passionate fullstack engineer focusing on scalable MERN applications.", socialHandles: { github: "https://github.com/eogbonna-dev", linkedin: "", twitter: "" }, examScore: 88, assignmentScore: 92, behaviorScore: 95, finalPerformanceScore: 91.3, isNew: false 
        },
        { 
          id: "fs-2", academyId: "FULL-2002", name: "Sarah Chen", 
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "schen-codes", repoCount: 35, yearsOfExperience: 3, skills: ["React", "Python", "Django", "PostgreSQL"], projects: [{ name: "AI Content Gen", url: "#" }], bio: "Backend-heavy fullstack engineer obsessed with API performance.", socialHandles: { github: "https://github.com/schen-codes", linkedin: "", twitter: "" }, examScore: 94, assignmentScore: 89, behaviorScore: 98, finalPerformanceScore: 93.7, isNew: false 
        },
        { 
          id: "fs-3", academyId: "FULL-2003", name: "Marcus Johnson", 
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "marcusj-dev", repoCount: 28, yearsOfExperience: 1, skills: ["Next.js", "Node.js", "GraphQL", "Redis"], projects: [{ name: "Real-time Chat App", url: "#" }], bio: "Product-minded engineer bridging design and complex backend logic.", socialHandles: { github: "https://github.com/marcusj-dev", linkedin: "", twitter: "" }, examScore: 82, assignmentScore: 85, behaviorScore: 90, finalPerformanceScore: 85.3, isNew: false 
        },
        { 
          id: "fs-4", academyId: "FULL-2004", name: "Priya Patel", 
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "priya-builds", repoCount: 51, yearsOfExperience: 4, skills: ["Vue.js", "Node.js", "AWS", "DynamoDB"], projects: [{ name: "Serverless Analytics", url: "#" }], bio: "Cloud-native fullstack developer. I love building serverless architectures.", socialHandles: { github: "https://github.com/priya-builds", linkedin: "", twitter: "" }, examScore: 96, assignmentScore: 95, behaviorScore: 92, finalPerformanceScore: 94.5, isNew: false 
        },
        { 
          id: "fs-5", academyId: "FULL-2005", name: "Liam O'Connor", 
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "loconnor99", repoCount: 19, yearsOfExperience: 1, skills: ["Angular", "Java", "Spring Boot", "MySQL"], projects: [{ name: "Banking Portal", url: "#" }], bio: "Enterprise software enthusiast transitioning to modern web frameworks.", socialHandles: { github: "https://github.com/loconnor99", linkedin: "", twitter: "" }, examScore: 78, assignmentScore: 82, behaviorScore: 88, finalPerformanceScore: 82.2, isNew: false 
        },
        { 
          id: "fs-6", academyId: "FULL-2006", name: "Aisha Hassan", 
          avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "aisha-tech", repoCount: 45, yearsOfExperience: 2, skills: ["React", "Express", "MongoDB", "Jest"], projects: [{ name: "Interactive Portfolio", url: "#" }], bio: "Frontend-leaning fullstack dev with an eye for micro-interactions.", socialHandles: { github: "https://github.com/aisha-tech", linkedin: "", twitter: "" }, examScore: 91, assignmentScore: 88, behaviorScore: 94, finalPerformanceScore: 91.0, isNew: false 
        },
        { 
          id: "fs-7", academyId: "FULL-2007", name: "David Kim", 
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "dkim-codes", repoCount: 62, yearsOfExperience: 5, skills: ["SvelteKit", "Go", "PostgreSQL", "Docker"], projects: [{ name: "Microservices Architect", url: "#" }], bio: "High-performance systems engineer. I build fast, concurrent backend services.", socialHandles: { github: "https://github.com/dkim-codes", linkedin: "", twitter: "" }, examScore: 98, assignmentScore: 97, behaviorScore: 95, finalPerformanceScore: 96.8, isNew: false 
        },
        { 
          id: "fs-8", academyId: "FULL-2008", name: "Elena Rostova", 
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "elena-r", repoCount: 22, yearsOfExperience: 1, skills: ["React", "Node.js", "Firebase", "Tailwind"], projects: [{ name: "Community Forum", url: "#" }], bio: "Former designer turned fullstack developer. I build beautiful apps.", socialHandles: { github: "https://github.com/elena-r", linkedin: "", twitter: "" }, examScore: 85, assignmentScore: 89, behaviorScore: 92, finalPerformanceScore: 88.3, isNew: false 
        },
        { 
          id: "fs-9", academyId: "FULL-2009", name: "James Wilson", 
          avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "jwilson-web", repoCount: 31, yearsOfExperience: 2, skills: ["Vue.js", "Laravel", "PHP", "MySQL"], projects: [{ name: "CMS Platform", url: "#" }], bio: "TALL stack advocate. Building robust monolithic applications.", socialHandles: { github: "https://github.com/jwilson-web", linkedin: "", twitter: "" }, examScore: 88, assignmentScore: 84, behaviorScore: 85, finalPerformanceScore: 85.9, isNew: false 
        },
        { 
          id: "fs-10", academyId: "FULL-2010", name: "Nina Patel", 
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "nina-codes", repoCount: 38, yearsOfExperience: 3, skills: ["React", "Python", "FastAPI", "MongoDB"], projects: [{ name: "Data Viz Dashboard", url: "#" }], bio: "Fullstack developer with a background in data science and API design.", socialHandles: { github: "https://github.com/nina-codes", linkedin: "", twitter: "" }, examScore: 93, assignmentScore: 91, behaviorScore: 96, finalPerformanceScore: 93.3, isNew: false 
        },
        { 
          id: "fs-11", academyId: "FULL-2011", name: "Omar Farooq", 
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "omar-f", repoCount: 15, yearsOfExperience: 0, skills: ["HTML", "CSS", "JavaScript", "Node.js"], projects: [{ name: "Weather App", url: "#" }], bio: "Recent bootcamp graduate eager to build production-ready applications.", socialHandles: { github: "https://github.com/omar-f", linkedin: "", twitter: "" }, examScore: 75, assignmentScore: 78, behaviorScore: 85, finalPerformanceScore: 78.9, isNew: false 
        },
        { 
          id: "fs-12", academyId: "FULL-2012", name: "Chloe Martin", 
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "chloe-m-dev", repoCount: 29, yearsOfExperience: 2, skills: ["React", "GraphQL", "Node.js", "Prisma"], projects: [{ name: "Blog Platform", url: "#" }], bio: "Specializing in modern data fetching and schema-first API design.", socialHandles: { github: "https://github.com/chloe-m-dev", linkedin: "", twitter: "" }, examScore: 89, assignmentScore: 90, behaviorScore: 92, finalPerformanceScore: 90.2, isNew: false 
        },
        { 
          id: "fs-13", academyId: "FULL-2013", name: "Carlos Gomez", 
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "cgomez-code", repoCount: 48, yearsOfExperience: 4, skills: ["Angular", "C#", ".NET Core", "SQL Server"], projects: [{ name: "ERP System", url: "#" }], bio: "Enterprise .NET developer with strong architectural patterns experience.", socialHandles: { github: "https://github.com/cgomez-code", linkedin: "", twitter: "" }, examScore: 92, assignmentScore: 88, behaviorScore: 90, finalPerformanceScore: 90.2, isNew: false 
        },
        { 
          id: "fs-14", academyId: "FULL-2014", name: "Maya Singh", 
          avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "maya-s", repoCount: 25, yearsOfExperience: 1, skills: ["React", "Next.js", "Supabase", "Tailwind"], projects: [{ name: "Habit Tracker", url: "#" }], bio: "Building fast, SEO-friendly applications with the modern Jamstack.", socialHandles: { github: "https://github.com/maya-s", linkedin: "", twitter: "" }, examScore: null, assignmentScore: null, behaviorScore: null, finalPerformanceScore: null, isNew: false 
        },
        { 
          id: "fs-15", academyId: "FULL-2015", name: "Lucas Silva", 
          avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "fullstack", githubUsername: "lucas-silva-dev", repoCount: 55, yearsOfExperience: 5, skills: ["React Native", "Node.js", "MongoDB", "WebSockets"], projects: [{ name: "Mobile Delivery App", url: "#" }], bio: "Web and mobile fullstack engineer. Expert in real-time communication.", socialHandles: { github: "https://github.com/lucas-silva-dev", linkedin: "", twitter: "" }, examScore: null, assignmentScore: null, behaviorScore: null, finalPerformanceScore: null, isNew: false 
        }
      ]
    },
    frontend: { name: "Frontend Development", students: [] },
    backend: { name: "Backend Engineering", students: [] },
    uiux: { name: "UI/UX Design", students: [] },
    data_analytics: {
      name: "Data Analytics",
      students: [
        { 
          id: "da-1", 
          academyId: "DATA-1001", 
          name: "Chidi Benson", 
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop&crop=faces",
          course: "data_analytics", 
          githubUsername: "chidi-data", 
          repoCount: 15, 
          yearsOfExperience: 1, 
          skills: ["Python", "SQL", "PowerBI", "Excel"], 
          projects: [{ name: "Sales Forecasting Tool", url: "#" }], 
          bio: "Turning raw data into actionable business insights.", 
          socialHandles: { github: "#", linkedin: "", twitter: "" }, 
          examScore: 90, 
          assignmentScore: 85, 
          behaviorScore: 95, 
          finalPerformanceScore: 89.5, 
          isNew: true 
        }
      ]
    }
  }
};