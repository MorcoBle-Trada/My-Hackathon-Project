/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { initialDatabase } from "../data/seedData";

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(() => {
    const saved = localStorage.getItem("talentos_db");
    if (saved) return JSON.parse(saved);
    return initialDatabase;
  });

  useEffect(() => {
    localStorage.setItem("talentos_db", JSON.stringify(db));
  }, [db]);

  const generateSkillsForCourse = (course) => {
    const normalizedCourse = course.toLowerCase();
    const maps = {
      fullstack: ["React", "Node.js", "MongoDB", "Express", "Docker"],
      frontend: ["React", "Vue", "CSS3", "HTML5", "Figma"],
      backend: ["Python", "Django", "PostgreSQL", "Docker", "AWS"],
      uiux: ["Figma", "User Research", "Prototyping", "CSS"],
      //  ADDED DATA ANALYTICS SKILLS
      "data analytics": ["Python", "SQL", "Tableau", "Pandas", "Excel"],
      "data-analytics": ["Python", "SQL", "Tableau", "Pandas", "Excel"],
    };
    return (
      maps[normalizedCourse] || ["Problem Solving", "Communication", "Teamwork"]
    );
  };

  const registerStudent = (data) => {
    const courseKey = data.course;
    const upperAcademyId = data.academyId.toUpperCase();

    //  1. STRICT PATTERN CHECK (e.g., FULL-2016)
    // Exactly 4 letters, a hyphen, and exactly 4 numbers.
    const idPattern = /^[A-Z]{4}-\d{4}$/;
    if (!idPattern.test(upperAcademyId)) {
      return {
        success: false,
        error: "Invalid format. Expected format: FULL-2016 or DATA-1002",
      };
    }

    //  2. EXCLUSIVE WHITELIST CHECK
    // Reads from your seedData VIP list. Added updated fallbacks just in case.
    const approvedIds = db.validAcademyIds || [
      "FULL-2016",
      "FULL-2017",
      "DATA-1002",
      "UXUI-1001",
      "BACK-1001",
    ];

    if (!approvedIds.includes(upperAcademyId)) {
      return {
        success: false,
        error: "Access Denied: This Academy ID is not in our official records.",
      };
    }

    //  3. DUPLICATE CHECK
    const courseData = db.courses[courseKey] || {
      name: courseKey,
      students: [],
    };
    const isDuplicate = courseData.students.some(
      (s) =>
        s.academyId === upperAcademyId ||
        s.githubUsername.toLowerCase() === data.githubUsername.toLowerCase(),
    );

    if (isDuplicate) {
      return {
        success: false,
        error:
          "An account with this Academy ID or GitHub Username already exists.",
      };
    }

    //  4. AI SIMULATION & DATA GENERATION
    const generatedRepos = Math.floor(Math.random() * 50) + 10;
    const generatedProjects = Math.floor(Math.random() * 5) + 3;
    const simulatedExperience = Math.max(1, Math.floor(generatedRepos / 10));

    const aiGeneratedBio = `AI Analysis: Based on repository data and commit history across ${generatedRepos} repositories, @${data.githubUsername} is identified as a high-potential ${courseKey} engineer with demonstrated expertise in modern development workflows and a strong trajectory for impact.`;

    const newStudent = {
      id: `stu-${courseKey}-${crypto.randomUUID().slice(0, 6)}`,
      name: data.name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        data.name,
      )}&background=random&color=fff&size=256`,
      course: courseKey,
      academyId: upperAcademyId,
      githubUsername: data.githubUsername,
      email: data.email,
      yearsOfExperience: simulatedExperience,
      phone: data.phone,
      socialHandles: data.socialHandles,
      bio: aiGeneratedBio,
      repoCount: generatedRepos,
      skills: generateSkillsForCourse(courseKey),
      projects: Array(generatedProjects).fill({
        name: "Capstone Project",
        url: "#",
      }),
      examScore: null,
      assignmentScore: null,
      behaviorScore: null,
      finalPerformanceScore: null,
      isNew: true,
    };

    //  5. SAVE TO DATABASE
    setDb((prev) => ({
      ...prev,
      courses: {
        ...prev.courses,
        [courseKey]: {
          ...courseData,
          students: [newStudent, ...courseData.students],
        },
      },
    }));

    return { success: true, student: newStudent };
  };

  const updateStudentProfile = (courseKey, id, updates) => {
    setDb((prev) => {
      const courseData = prev.courses[courseKey];
      if (!courseData) return prev;

      const studentIndex = courseData.students.findIndex((s) => s.id === id);
      if (studentIndex === -1) return prev;

      const updatedStudents = [...courseData.students];
      updatedStudents[studentIndex] = {
        ...updatedStudents[studentIndex],
        ...updates,
      };

      return {
        ...prev,
        courses: {
          ...prev.courses,
          [courseKey]: {
            ...courseData,
            students: updatedStudents,
          },
        },
      };
    });
  };

  const updateScores = (courseKey, id, scores) => {
    const total =
      Number(scores.examScore) * 0.4 +
      Number(scores.assignmentScore) * 0.3 +
      Number(scores.behaviorScore) * 0.3;

    setDb((prev) => {
      const courseData = prev.courses[courseKey];
      if (!courseData) return prev;

      const studentIndex = courseData.students.findIndex((s) => s.id === id);
      if (studentIndex === -1) return prev;

      const updatedStudents = [...courseData.students];
      updatedStudents[studentIndex] = {
        ...updatedStudents[studentIndex],
        ...scores,
        finalPerformanceScore: Number(total.toFixed(1)),
      };

      return {
        ...prev,
        courses: {
          ...prev.courses,
          [courseKey]: {
            ...courseData,
            students: updatedStudents,
          },
        },
      };
    });
  };

  const clearNewStatus = (courseKey, studentId) => {
    setDb((prev) => {
      const courseData = prev.courses[courseKey];
      if (!courseData) return prev;

      const studentIndex = courseData.students.findIndex(
        (s) => s.id === studentId,
      );
      if (studentIndex === -1 || !courseData.students[studentIndex].isNew)
        return prev;

      const updatedStudents = [...courseData.students];
      updatedStudents[studentIndex] = {
        ...updatedStudents[studentIndex],
        isNew: false,
      };

      return {
        ...prev,
        courses: {
          ...prev.courses,
          [courseKey]: {
            ...courseData,
            students: updatedStudents,
          },
        },
      };
    });
  };

  const loginStudent = (academyId, githubUsername) => {
    let foundStudent = null;
    let foundCourseKey = null;
    Object.entries(db.courses).forEach(([key, course]) => {
      const student = course.students.find(
        (s) =>
          s.academyId.toUpperCase() === academyId.toUpperCase() &&
          s.githubUsername.toLowerCase() === githubUsername.toLowerCase(),
      );
      if (student) {
        foundStudent = student;
        foundCourseKey = key;
      }
    });
    return { student: foundStudent, courseKey: foundCourseKey };
  };

  return (
    <DatabaseContext.Provider
      value={{
        db,
        registerStudent,
        updateStudentProfile,
        updateScores,
        clearNewStatus,
        loginStudent,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
