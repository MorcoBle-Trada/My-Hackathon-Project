

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import { BrainCircuit, AlertCircle, Loader2 } from "lucide-react";

export default function StudentLogin() {
  const navigate = useNavigate();
  const { db, registerStudent, loginStudent } = useDatabase();

  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false); // 🌟 NEW: Processing state

  const [formData, setFormData] = useState({
    name: "",
    academyId: "",
    course: "",
    githubUsername: "",
    email: "",
    phone: "",
    socialHandles: { linkedin: "", twitter: "" },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      // Login returns an object with student and courseKey directly
      const { student, courseKey } = loginStudent(
        formData.academyId.trim().toUpperCase(),
        formData.githubUsername.trim(),
      );

      if (student && courseKey) {
        navigate(`/student/${courseKey}/${student.id}`);
      } else {
        setError(
          "Invalid credentials. Academy ID or GitHub Username not found in the system.",
        );
      }
    } else {
      // SIGNUP LOGIC
      if (!formData.course) return setError("Please select a course database.");

      const submissionData = {
        ...formData,
        academyId: formData.academyId.trim().toUpperCase(),
        socialHandles: {
          github: `https://github.com/${formData.githubUsername}`,
          linkedin: formData.socialHandles.linkedin,
          twitter: formData.socialHandles.twitter,
        },
      };

      // We call the function and get the result 'package'
      const result = registerStudent(submissionData);

      // 🌟 FIX: Check for success, show animation, then redirect
      if (result && result.success) {
        setIsAnalyzing(true); // Turn on the cool loading screen

        // Wait 3 seconds to process, then redirect to dashboard
        setTimeout(() => {
          navigate(`/student/${result.student.course}/${result.student.id}`);
        }, 3000);
      } else {
        // This will now show "Access Denied" or "Invalid Format" properly!
        setError(result?.error || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0f172a] font-sans selection:bg-indigo-500/30">
      {/* LEFT SIDE: BRANDING PANEL */}
      <div className="w-full md:w-5/12 bg-gradient-to-br from-indigo-950 via-[#0f172a] to-slate-900 p-8 lg:p-12 flex flex-col items-center justify-center border-r border-slate-800 shadow-2xl relative overflow-hidden min-h-[40vh] md:min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center justify-center max-w-md mx-auto text-center h-full">
          <div className="flex items-center justify-center gap-3 text-white mb-8">
            <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30">
              <BrainCircuit className="w-8 h-8 text-indigo-400" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight">
              TalentOS
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
            AI-Powered Talent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Intelligence Platform
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Connect your identity to our ecosystem. Our AI generates your skill
            profile, analyzes your GitHub repositories, and calculates
            performance scores to match you seamlessly with top industry job
            descriptions.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: AUTHENTICATION CARD */}
      <div className="w-full md:w-7/12 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-lg bg-[#1e293b] p-8 sm:p-10 rounded-[20px] border border-slate-700 shadow-2xl min-h-[500px] flex flex-col justify-center">
          {/* 🌟 NEW: Conditional Rendering for the "Processing" State */}
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center space-y-6 py-8 animate-in fade-in duration-500">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-slate-900 p-5 rounded-full border border-indigo-500/30">
                  <Loader2 className="w-14 h-14 text-indigo-400 animate-spin" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Processing Profile...
                </h2>
                <p className="text-slate-400 text-sm">
                  Allocating hub resources and generating AI baseline.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* TOGGLE SYSTEM */}
              <div className="flex bg-slate-900 rounded-lg p-1 mb-8 border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${
                    mode === "login"
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  System Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError("");
                  }}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${
                    mode === "signup"
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Create Account
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6">
                {mode === "login" ? "Welcome Back" : "Initialize Profile"}
              </h2>

              {error && (
                <div className="mb-6 flex items-start gap-3 bg-rose-500/10 border border-rose-500/20 p-4 rounded-lg text-rose-400 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <input
                    required
                    placeholder="Academy ID (e.g., FULL-2016)"
                    type="text"
                    value={formData.academyId}
                    onChange={(e) =>
                      setFormData({ ...formData, academyId: e.target.value })
                    }
                    className="bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white w-full outline-none transition uppercase placeholder:normal-case"
                  />

                  <input
                    required
                    placeholder="GitHub Username"
                    type="text"
                    value={formData.githubUsername}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        githubUsername: e.target.value,
                      })
                    }
                    className="bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white w-full outline-none transition"
                  />
                </div>

                {mode === "signup" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <input
                      required
                      placeholder="Full Name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white w-full outline-none transition"
                    />

                    <select
                      required
                      value={formData.course}
                      onChange={(e) =>
                        setFormData({ ...formData, course: e.target.value })
                      }
                      className="bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white w-full outline-none transition appearance-none"
                    >
                      <option value="" disabled>
                        Select Database Segment (Course)
                      </option>
                      {Object.entries(db.courses).map(
                        ([courseKey, courseData]) => (
                          <option key={courseKey} value={courseKey}>
                            {courseData.name}
                          </option>
                        ),
                      )}
                    </select>

                    <input
                      required
                      placeholder="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white w-full outline-none transition"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        placeholder="LinkedIn URL"
                        type="url"
                        value={formData.socialHandles.linkedin}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialHandles: {
                              ...formData.socialHandles,
                              linkedin: e.target.value,
                            },
                          })
                        }
                        className="bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white w-full outline-none transition"
                      />
                      <input
                        placeholder="Twitter URL"
                        type="url"
                        value={formData.socialHandles.twitter}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialHandles: {
                              ...formData.socialHandles,
                              twitter: e.target.value,
                            },
                          })
                        }
                        className="bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white w-full outline-none transition"
                      />
                    </div>

                    <input
                      required
                      placeholder="Phone Number"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white w-full outline-none transition"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-4 rounded-lg mt-6 transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
                >
                  {mode === "login"
                    ? "Authenticate Identity"
                    : "Run AI Analysis & Register"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
