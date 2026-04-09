/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

import { initialDatabase } from "../components/data/seedData";

export const globalStandardCourses = [
  "Frontend Engineering",
  "Backend Engineering",
  "Fullstack Development",
  "Cloud & DevOps",
  "Data Analytics & AI",
  "UI/UX Design",
  "Product Management",
];

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(() => {
    const saved = localStorage.getItem("talentos_b2b_db");
    if (saved) return JSON.parse(saved);
    return initialDatabase;
  });

  useEffect(() => {
    localStorage.setItem("talentos_b2b_db", JSON.stringify(db));
  }, [db]);

  const generateSkillsForRole = (role) => {
    const normalizedRole = role?.toLowerCase() || "";

    const skillLibrary = [
      {
        keywords: ["frontend", "react", "ui", "web", "html"],
        skills: [
          "React",
          "Tailwind CSS",
          "JavaScript (ES6+)",
          "HTML5/CSS3",
          "Figma",
        ],
      },
      {
        keywords: ["backend", "node", "api", "server", "python", "sql"],
        skills: ["Node.js", "Express", "PostgreSQL", "REST APIs", "Docker"],
      },
      {
        keywords: ["fullstack", "software", "engineering"],
        skills: ["React", "Node.js", "MongoDB", "Express", "System Design"],
      },
      {
        keywords: ["data", "ai", "analytics", "machine", "intelligence"],
        skills: [
          "Python",
          "SQL",
          "Pandas/NumPy",
          "Power BI",
          "Machine Learning",
        ],
      },
      {
        keywords: ["design", "ux", "ui", "product design", "figma"],
        skills: [
          "User Research",
          "Wireframing",
          "Figma",
          "Prototyping",
          "Design Systems",
        ],
      },
      {
        keywords: ["cloud", "devops", "aws", "azure", "infrastructure"],
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD Pipelines", "Terraform"],
      },
      {
        keywords: ["product", "management", "agile", "scrum", "strategy"],
        skills: [
          "Agile/Scrum",
          "Jira",
          "Market Analysis",
          "Product Roadmap",
          "User Stories",
        ],
      },
    ];

    const match = skillLibrary.find((item) =>
      item.keywords.some((key) => normalizedRole.includes(key)),
    );

    return match
      ? match.skills
      : [
          "Problem Solving",
          "Critical Thinking",
          "Technical Documentation",
          "Agile Workflow",
          "Team Collaboration",
        ];
  };

  const registerCompany = (data) => {
    const companyId = data.companyName.toLowerCase().replace(/\s+/g, "-");
    const companies = db.companies || {};

    // 1. Check if the company name already exists
    if (companies[companyId]) {
      return {
        success: false,
        error: "A company with this name is already registered.",
      };
    }

    // Check if the admin email already exists across any company
    const emailExists = Object.values(companies).some(
      (c) => c.adminEmail.toLowerCase() === data.email.toLowerCase(),
    );

    if (emailExists) {
      return {
        success: false,
        error: "An admin account with this email is already registered.",
      };
    }

    const generatedRegCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    const newCompany = {
      id: companyId,
      fullName: data.fullName,
      role: data.role || "Admin",
      companyName: data.companyName,
      industry: data.industry,
      adminEmail: data.email,
      adminPassword: data.password,
      inviteCode: generatedRegCode,
      offeredCourses: data.offeredCourses || [],
      interns: [],
    };

    setDb((prev) => ({
      ...prev,
      companies: { ...prev.companies, [companyId]: newCompany },
    }));

    return { success: true, companyId };
  };

  // console.log below the variable declaration
  const loginAdmin = (email, password) => {
    const companies = db.companies || {};

    const company = Object.values(companies).find(
      (c) => c.adminEmail === email && c.adminPassword === password,
    );

    console.log("Current Company Data:", company); // Safely logs after initialization

    if (company) return { success: true, companyId: company.id };
    return { success: false, error: "Invalid admin email or password." };
  };

  const regenerateCompanyCode = (companyId) => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setDb((prev) => {
      const company = prev.companies[companyId];
      if (!company) return prev;
      return {
        ...prev,
        companies: {
          ...prev.companies,
          [companyId]: { ...company, inviteCode: newCode },
        },
      };
    });
    return newCode;
  };

  const resetAdminPassword = (email, newPassword) => {
    let foundCompanyId = null;
    const companies = db.companies || {};

    for (const [id, company] of Object.entries(companies)) {
      if (company.adminEmail.toLowerCase() === email.toLowerCase()) {
        foundCompanyId = id;
        break;
      }
    }

    if (!foundCompanyId) {
      return { success: false, error: "No workspace found with this email." };
    }

    setDb((prev) => ({
      ...prev,
      companies: {
        ...prev.companies,
        [foundCompanyId]: {
          ...prev.companies[foundCompanyId],
          adminPassword: newPassword,
        },
      },
    }));

    return { success: true };
  };

  //  UPDATE COMPANY PROFILE
  const updateCompanyProfile = (companyId, updates) => {
    setDb((prev) => {
      const company = prev.companies[companyId];
      if (!company) return prev;

      return {
        ...prev,
        companies: {
          ...prev.companies,
          [companyId]: {
            ...company,
            ...updates,
          },
        },
      };
    });

    return { success: true };
  };

  //  ADD DEPARTMENT
  const addDepartment = (companyId, departmentName) => {
    const company = db.companies[companyId];
    if (!company)
      return { success: false, error: "Company workspace not found." };

    const currentCourses = company.offeredCourses || company.courses || [];

    if (currentCourses.includes(departmentName)) {
      return { success: false, error: "This department already exists." };
    }

    setDb((prev) => ({
      ...prev,
      companies: {
        ...prev.companies,
        [companyId]: {
          ...prev.companies[companyId],
          offeredCourses: [...currentCourses, departmentName],
        },
      },
    }));

    return { success: true };
  };

  //  EDIT DEPARTMENT
  const editDepartment = (companyId, oldName, newName) => {
    const company = db.companies[companyId];
    if (!company)
      return { success: false, error: "Company workspace not found." };

    const currentCourses = company.offeredCourses || company.courses || [];
    if (currentCourses.includes(newName)) {
      return {
        success: false,
        error: "A department with this name already exists.",
      };
    }

    setDb((prev) => {
      const companyToUpdate = prev.companies[companyId];

      const updatedCourses = (
        companyToUpdate.offeredCourses ||
        companyToUpdate.courses ||
        []
      ).map((course) => (course === oldName ? newName : course));

      // Update interns so they aren't stuck in a deleted/old department track
      const updatedInterns = companyToUpdate.interns.map((intern) =>
        intern.course === oldName ? { ...intern, course: newName } : intern,
      );

      return {
        ...prev,
        companies: {
          ...prev.companies,
          [companyId]: {
            ...companyToUpdate,
            offeredCourses: updatedCourses,
            interns: updatedInterns,
          },
        },
      };
    });

    return { success: true };
  };

  // DELETE DEPARTMENT
  const deleteDepartment = (companyId, departmentName) => {
    setDb((prev) => {
      const company = prev.companies[companyId];
      if (!company) return prev;

      const currentCourses = company.offeredCourses || company.courses || [];

      // Reassign interns to "Unassigned" instead of leaving them orphaned
      const updatedInterns = company.interns.map((intern) =>
        intern.course === departmentName
          ? { ...intern, course: "Unassigned" }
          : intern,
      );

      return {
        ...prev,
        companies: {
          ...prev.companies,
          [companyId]: {
            ...company,
            offeredCourses: currentCourses.filter(
              (course) => course !== departmentName,
            ),
            interns: updatedInterns,
          },
        },
      };
    });

    return { success: true };
  };

  //  STUDENT RESET PASSWORD (Used in InternLogin.jsx)
  const resetPassword = (email, newPassword) => {
    let foundCompanyId = null;
    let foundInternId = null;

    const companies = db.companies || {};

    // Find the intern and identify which company they belong to
    for (const [compId, company] of Object.entries(companies)) {
      const intern = company.interns.find(
        (i) => i.email.toLowerCase() === email.toLowerCase(),
      );
      if (intern) {
        foundCompanyId = compId;
        foundInternId = intern.id;
        break; // Stop searching once found
      }
    }

    if (!foundCompanyId || !foundInternId) {
      return {
        success: false,
        error: "No student account found with this email.",
      };
    }

    // Update the state for that specific intern
    setDb((prev) => {
      const company = prev.companies[foundCompanyId];
      const updatedInterns = company.interns.map((i) =>
        i.id === foundInternId ? { ...i, password: newPassword } : i,
      );

      return {
        ...prev,
        companies: {
          ...prev.companies,
          [foundCompanyId]: {
            ...company,
            interns: updatedInterns,
          },
        },
      };
    });

    return { success: true };
  };

  const registerIntern = (data) => {
    const {
      companyId,
      inviteCode,
      course,
      name,
      email,
      phone,
      socialHandles,
      password,
      githubUsername,
    } = data;

    const company = db.companies[companyId];
    if (!company)
      return { success: false, error: "Company workspace not found." };

    if (company.inviteCode?.toUpperCase() !== inviteCode.toUpperCase()) {
      return { success: false, error: "Invalid Company Invite Code." };
    }

    const isDuplicate = company.interns.some(
      (s) => s.email.toLowerCase() === email.toLowerCase(),
    );
    if (isDuplicate)
      return { success: false, error: "This email is already registered." };

    const prefix =
      company.companyName
        .replace(/[^a-zA-Z]/g, "")
        .substring(0, 3)
        .toUpperCase() || "INT";
    const academyId = `${prefix}-${(company.interns.length + 1).toString().padStart(3, "0")}`;

    const repoCount = Math.floor(Math.random() * 35) + 5;
    const projectCount = Math.floor(Math.random() * 4) + 2;
    const aiBio = `TalentOS Intelligence: ${name} demonstrates exceptional promise within the ${course} track. Showcasing a strong foundation in ${generateSkillsForRole(course)[0]}, predictive modeling indicates a seamless technical and cultural fit for driving immediate impact at ${company.companyName}.`;

    const newIntern = {
      id: `intern-${crypto.randomUUID()}`,
      academyId,
      name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&bold=true`,
      companyId,
      companyName: company.companyName,
      course,
      githubUsername: githubUsername || "",
      email: email.toLowerCase(),
      phone,
      password,
      socialHandles: socialHandles || { linkedin: "", twitter: "" },
      yearsOfExperience: 1,
      bio: aiBio,
      repoCount,
      skills: generateSkillsForRole(course),
      projects: Array(projectCount).fill({
        name: "Assigned Company Project",
        url: "#",
      }),
      examScore: null,
      assignmentScore: null,
      behaviorScore: null,
      finalPerformanceScore: null,
      isNew: true,
    };

    setDb((prev) => {
      const currentCompany = prev.companies[companyId];
      return {
        ...prev,
        companies: {
          ...prev.companies,
          [companyId]: {
            ...currentCompany,
            interns: [newIntern, ...currentCompany.interns],
          },
        },
      };
    });

    return { success: true, intern: newIntern, companyId };
  };

  //   fallback (|| {}) to prevent crash if db.companies is undefined
  const loginIntern = (email, password) => {
    let foundIntern = null;
    let foundCompanyId = null;

    const companies = db.companies || {};

    Object.entries(companies).forEach(([compId, company]) => {
      const intern = company.interns.find(
        (s) =>
          s.email.toLowerCase() === email.toLowerCase() &&
          s.password === password,
      );
      if (intern) {
        foundIntern = intern;
        foundCompanyId = compId;
      }
    });

    return { intern: foundIntern, companyId: foundCompanyId };
  };

  const updateStudentProfile = (companyId, internId, updates) => {
    setDb((prev) => {
      const company = prev.companies[companyId];
      if (!company) return prev;
      const updatedInterns = company.interns.map((i) =>
        i.id === internId ? { ...i, ...updates } : i,
      );
      return {
        ...prev,
        companies: {
          ...prev.companies,
          [companyId]: { ...company, interns: updatedInterns },
        },
      };
    });
  };

  const updateScores = (companyId, internId, scores) => {
    const total =
      Number(scores.examScore) * 0.4 +
      Number(scores.assignmentScore) * 0.3 +
      Number(scores.behaviorScore) * 0.3;

    setDb((prev) => {
      const company = prev.companies[companyId];
      if (!company) return prev;
      const updatedInterns = company.interns.map((i) =>
        i.id === internId
          ? { ...i, ...scores, finalPerformanceScore: Number(total.toFixed(1)) }
          : i,
      );
      return {
        ...prev,
        companies: {
          ...prev.companies,
          [companyId]: { ...company, interns: updatedInterns },
        },
      };
    });
  };

  const clearNewStatus = (companyId, internId) => {
    setDb((prev) => {
      const company = prev.companies[companyId];
      if (!company) return prev;
      const updatedInterns = company.interns.map((i) =>
        i.id === internId ? { ...i, isNew: false } : i,
      );
      return {
        ...prev,
        companies: {
          ...prev.companies,
          [companyId]: { ...company, interns: updatedInterns },
        },
      };
    });
  };

  // Upgraded to handle UI search, ID, or Email securely)
  const removeIntern = (companyId, identifier) => {
    const company = db.companies[companyId];
    if (!company)
      return { success: false, error: "Company workspace not found." };

    // 1. Verify if the intern actually exists before trying to delete
    const internExists = company.interns.some(
      (i) =>
        i.id === identifier ||
        i.email.toLowerCase() === identifier.toLowerCase(),
    );

    if (!internExists) {
      return { success: false, error: "Student not found in your roster." };
    }

    // 2. Perform the deletion
    setDb((prev) => {
      const compToUpdate = prev.companies[companyId];
      return {
        ...prev,
        companies: {
          ...prev.companies,
          [companyId]: {
            ...compToUpdate,
            interns: compToUpdate.interns.filter(
              (i) =>
                i.id !== identifier &&
                i.email.toLowerCase() !== identifier.toLowerCase(),
            ),
          },
        },
      };
    });

    return { success: true };
  };

  return (
    <DatabaseContext.Provider
      value={{
        db,
        registerCompany,
        loginAdmin,
        registerIntern,
        loginIntern,
        updateCompanyProfile,
        updateStudentProfile,
        updateScores,
        clearNewStatus,
        removeIntern, // Fully upgraded
        regenerateCompanyCode,
        resetAdminPassword,
        resetPassword, // Added student password reset
        addDepartment,
        editDepartment,
        deleteDepartment,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
