import React, { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import {
  BrainCircuit,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Building2,
  ChevronDown,
} from "lucide-react";

export default function InternLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlInviteCode = searchParams.get("code") || "";

  // ADDED: resetPassword expected from DatabaseContext
  const { db, registerIntern, loginIntern, resetPassword } = useDatabase();

  const [mode, setMode] = useState(urlInviteCode ? "signup" : "login");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ADDED: newPassword and confirmPassword to state
  const [formData, setFormData] = useState({
    name: "",
    inviteCode: urlInviteCode,
    course: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    githubUsername: "",
    phone: "",
    socialHandles: { linkedin: "", twitter: "" },
  });

  // CALCULATED STATE: Preserved as requested to eliminate cascading update errors.
  const matchedCompany = useMemo(() => {
    if (formData.inviteCode.length < 4) return null;

    const companiesList = Object.values(db.companies || {});
    return companiesList.find(
      (c) => c.inviteCode?.toUpperCase() === formData.inviteCode.toUpperCase(),
    );
  }, [formData.inviteCode, db.companies]);

  // VALIDATION HELPER: Checks for valid GitHub username formats
  const isValidGithubUsername = (username) => {
    // GitHub usernames are alphanumeric, max 39 chars, can contain single hyphens
    return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // --- FORGOT PASSWORD LOGIC ---
    if (mode === "forgot") {
      if (
        !formData.email ||
        !formData.newPassword ||
        !formData.confirmPassword
      ) {
        return setError("Please fill in all fields to reset your password.");
      }
      if (formData.newPassword !== formData.confirmPassword) {
        return setError("New passwords do not match.");
      }

      setIsAnalyzing(true);

      // Simulating network delay for context API call
      setTimeout(() => {
        setIsAnalyzing(false);

        // Execute resetPassword if it exists in your context, otherwise simulate success
        let result = { success: true };
        if (typeof resetPassword === "function") {
          result = resetPassword(
            formData.email.trim(),
            formData.newPassword.trim(),
          );
        }

        if (result && result.error) {
          setError(result.error);
        } else {
          setSuccessMsg("Password reset successfully! You can now log in.");
          setFormData({
            ...formData,
            email: "",
            newPassword: "",
            confirmPassword: "",
            password: "",
          });
          setTimeout(() => {
            setMode("login");
            setSuccessMsg("");
          }, 2500);
        }
      }, 1500);
      return;
    }

    // --- LOGIN LOGIC ---
    if (mode === "login") {
      if (!formData.email || !formData.password) {
        return setError("Please provide both email and password.");
      }

      const { intern, companyId } = loginIntern(
        formData.email.trim(),
        formData.password.trim(),
      );

      if (intern && companyId) {
        localStorage.setItem("activeInternId", intern.id);
        localStorage.setItem("activeCompanyId", companyId);
        navigate(`/intern/dashboard`);
      } else {
        setError("Invalid credentials. Please check your email and password.");
      }
    } else {
      // --- SIGNUP LOGIC ---
      if (!matchedCompany)
        return setError("Please provide a valid Company Invite Code.");
      if (!formData.course) return setError("Please select a course track.");

      // VALIDATION: Check Github Username
      if (
        !formData.githubUsername ||
        !isValidGithubUsername(formData.githubUsername.trim())
      ) {
        return setError(
          "Please provide a valid GitHub username (no spaces or special characters).",
        );
      }

      const submissionData = {
        ...formData,
        companyId: matchedCompany.id,
        inviteCode: formData.inviteCode.trim().toUpperCase(),
        password: formData.inviteCode.trim().toUpperCase(),
        socialHandles: {
          github: formData.githubUsername
            ? `https://github.com/${formData.githubUsername.trim()}`
            : "",
          linkedin: formData.socialHandles.linkedin,
          twitter: formData.socialHandles.twitter,
        },
      };

      const result = registerIntern(submissionData);

      if (result && result.success) {
        setSuccessMsg("Profile Initialized Successfully!");
        setIsAnalyzing(true);
        setTimeout(() => {
          localStorage.setItem("activeInternId", result.intern.id);
          localStorage.setItem("activeCompanyId", result.companyId);
          navigate(`/intern/dashboard`);
        }, 3000);
      } else {
        setError(
          result?.error ||
            "Registration failed. Email might already be in use.",
        );
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0f172a] font-sans selection:bg-indigo-500/30">
      {/* Left Sidebar Branding */}
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
            Connect your identity to your workspace. Enter your company's invite
            code below to seamlessly route to your personalized course tracks.
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-7/12 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-lg bg-[#1e293b] p-8 sm:p-10 rounded-[20px] border border-slate-700 shadow-2xl min-h-[500px] flex flex-col justify-center transition-all">
          {isAnalyzing && mode !== "forgot" ? (
            <div className="flex flex-col items-center justify-center space-y-6 py-8 animate-in fade-in duration-500">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-slate-900 p-5 rounded-full border border-indigo-500/30">
                  <Loader2 className="w-14 h-14 text-indigo-400 animate-spin" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Processing Profile...
              </h2>
              {successMsg && (
                <p className="text-indigo-400 font-medium animate-pulse">
                  {successMsg}
                </p>
              )}
            </div>
          ) : (
            <>
              {mode !== "forgot" && (
                <div className="flex bg-slate-900 rounded-lg p-1 mb-8 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError("");
                      setSuccessMsg("");
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
                      setSuccessMsg("");
                    }}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${
                      mode === "signup"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Register Intern
                  </button>
                </div>
              )}

              <h2 className="text-2xl font-bold text-white mb-6">
                {mode === "login" && "Welcome Back"}
                {mode === "signup" && "Initialize Profile"}
                {mode === "forgot" && "Reset Password"}
              </h2>

              {error && (
                <div className="mb-6 flex items-start gap-3 bg-rose-500/10 border border-rose-500/20 p-4 rounded-lg text-rose-400 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}
              {successMsg && (
                <div className="mb-6 flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg text-emerald-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>{successMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* LOGIN FORM */}
                {mode === "login" && (
                  <div className="space-y-4 animate-in fade-in">
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

                    <div className="space-y-2">
                      <input
                        required
                        placeholder="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        className="bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white w-full outline-none transition"
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setMode("forgot");
                            setError("");
                            setSuccessMsg("");
                          }}
                          className="text-sm text-indigo-400 hover:text-indigo-300 transition"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* FORGOT PASSWORD FORM */}
                {mode === "forgot" && (
                  <div className="space-y-4 animate-in fade-in">
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
                    <input
                      required
                      placeholder="New Password"
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          newPassword: e.target.value,
                        })
                      }
                      className="bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white w-full outline-none transition"
                    />
                    <input
                      required
                      placeholder="Confirm New Password"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white w-full outline-none transition"
                    />
                  </div>
                )}

                {/* SIGNUP FORM */}
                {mode === "signup" && (
                  <div className="space-y-4 animate-in fade-in">
                    <input
                      required
                      placeholder="Enter Company Invite Code..."
                      type="text"
                      value={formData.inviteCode}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          inviteCode: e.target.value,
                          course: "",
                        });
                      }}
                      className="bg-slate-900 border border-indigo-500/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white w-full outline-none transition uppercase placeholder:normal-case shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                    />

                    {matchedCompany && (
                      <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 space-y-3 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                          <Building2 className="w-5 h-5" />
                          <span>
                            Matched Workspace: {matchedCompany.companyName}
                          </span>
                        </div>

                        <div className="relative">
                          <select
                            required
                            value={formData.course}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                course: e.target.value,
                              })
                            }
                            className="bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-2.5 text-white w-full outline-none transition appearance-none text-sm pr-10"
                          >
                            <option value="" disabled>
                              Select your Course Track...
                            </option>
                            {(matchedCompany.offeredCourses || []).map(
                              (courseName, idx) => (
                                <option key={idx} value={courseName}>
                                  {courseName}
                                </option>
                              ),
                            )}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        </div>
                      </div>
                    )}

                    {/* RESTRUCTURED FORM INPUTS */}

                    {/* 1. Full Name */}
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

                    {/* 2. GitHub Username */}
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

                    {/* 3. Email Address */}
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

                    {/* 4. Social Handles (Flexed Grid) */}
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

                    {/* 5. Phone Number (Last) */}
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
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-4 rounded-lg mt-6 transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isAnalyzing && (mode === "forgot" || mode === "signup") && (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}
                  {mode === "login" && "Authenticate Identity"}
                  {mode === "signup" && "Register & Sync Profile"}
                  {mode === "forgot" && "Update Password"}
                </button>

                {mode === "forgot" && (
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setError("");
                        setSuccessMsg("");
                      }}
                      className="text-sm text-slate-400 hover:text-white transition"
                    >
                      ← Back to System Login
                    </button>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
