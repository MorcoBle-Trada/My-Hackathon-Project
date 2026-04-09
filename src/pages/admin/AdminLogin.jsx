import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Building,
  User,
  Briefcase,
  AlertCircle,
  BookOpen,
  X,
  Plus,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  useDatabase,
  globalStandardCourses,
} from "../../context/DatabaseContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  // 🌟 Pulled in db to check for existing emails directly on the frontend
  const { loginAdmin, registerCompany, resetAdminPassword, db } = useDatabase();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // 🌟 Added Confirm Password
  const [firstName, setFirstName] = useState(""); // 🌟 Split First Name
  const [otherName, setOtherName] = useState(""); // 🌟 Split Other Name
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");

  //  See PassWord State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Track States
  const [offeredCourses, setOfferedCourses] = useState([]);
  const [customTrackInput, setCustomTrackInput] = useState("");
  const [localCustomTracks, setLocalCustomTracks] = useState([]);

  // Forgot Password Modal States 🌟
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Close modals on Escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setIsForgotModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const allAvailableTracks = [...globalStandardCourses, ...localCustomTracks];

  const handleCourseToggle = (course) => {
    setOfferedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course],
    );
  };

  const addCustomTrack = () => {
    if (!customTrackInput.trim()) return;
    if (allAvailableTracks.includes(customTrackInput.trim())) {
      setCustomTrackInput("");
      return;
    }
    setLocalCustomTracks((prev) => [...prev, customTrackInput.trim()]);
    setOfferedCourses((prev) => [...prev, customTrackInput.trim()]);
    setCustomTrackInput("");
  };

  // 🌟 Made function async to handle database calls properly
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      // 🌟 Added await
      const res = await loginAdmin(email, password);
      if (res.success) {
        localStorage.setItem("activeAdminCompanyId", res.companyId);
        navigate("/admin/dashboard");
      } else {
        setError(res.error);
      }
    } else {
      // 🌟 Added Validation for Password Confirmation
      if (password !== confirmPassword) {
        setError("Passwords do not match. Please try again.");
        return;
      }

      // 🌟 Added Validation for Existing Email with Safe Optional Chaining (?.)
      if (db && db.companies) {
        const emailExists = Object.values(db.companies).some(
          (company) => company?.email?.toLowerCase() === email?.toLowerCase(),
        );

        if (emailExists) {
          setError("An Admin account with this email already exists.");
          return;
        }
      }

      if (offeredCourses.length === 0) {
        setError("Please select at least one department/track.");
        return;
      }

      // 🌟 Added await
      const res = await registerCompany({
        firstName, // 🌟 Passing Split Names
        otherName,
        fullName: `${firstName} ${otherName}`.trim(), // 🌟 Kept Full Name for backward compatibility
        role,
        companyName,
        email,
        password,
        offeredCourses,
      });

      if (res.success) {
        localStorage.setItem("activeAdminCompanyId", res.companyId);
        navigate("/admin/dashboard");
      } else {
        setError(res.error);
      }
    }
  };

  // 🌟 Logic to handle the mock password reset (Made async)
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setForgotError("");

    if (newPassword !== confirmNewPassword) {
      setForgotError("New passwords do not match.");
      return;
    }

    // 🌟 Added await
    const res = await resetAdminPassword(forgotEmail, newPassword);

    if (res.success) {
      setForgotSuccess(true);
      setTimeout(() => {
        setIsForgotModalOpen(false);
        setForgotSuccess(false);
        setForgotEmail("");
        setNewPassword("");
        setConfirmNewPassword("");
      }, 2500); // Close modal automatically after 2.5 seconds
    } else {
      setForgotError(res.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6 relative overflow-hidden text-slate-200 font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800/60 p-10 rounded-[2rem] shadow-2xl relative z-10 my-8">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 p-4 rounded-2xl border border-indigo-500/20 mb-5 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight text-center mb-2">
            {isLogin ? "Welcome Back" : "Setup Workspace"}
          </h1>
          <p className="text-sm text-slate-400 text-center max-w-sm">
            {isLogin
              ? "Access your command center and manage your talent pool."
              : "Create your organization's talent database in seconds."}
          </p>
        </div>

        {/* Sleek Toggle Switch */}
        <div className="flex bg-slate-950/50 p-1.5 rounded-2xl mb-8 border border-slate-800/80 max-w-sm mx-auto backdrop-blur-md">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
              isLogin
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
              !isLogin
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-400 text-sm max-w-lg mx-auto animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
          {!isLogin && (
            <>
              {/* Group 1: Personal Info & Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                    First Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Jane"
                      className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 rounded-2xl pl-11 pr-4 py-3.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                    Other Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="text"
                      required
                      value={otherName}
                      onChange={(e) => setOtherName(e.target.value)}
                      placeholder="e.g. Doe"
                      className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 rounded-2xl pl-11 pr-4 py-3.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm shadow-inner"
                    />
                  </div>
                </div>

                {/* 🌟 SWAPPED: Company Name now comes first (Left) */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                    Company Name
                  </label>
                  <div className="relative group">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Corp"
                      className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 rounded-2xl pl-11 pr-4 py-3.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm shadow-inner"
                    />
                  </div>
                </div>

                {/* 🌟 SWAPPED: Your Role now comes second (Right) */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                    Your Role
                  </label>
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Head of HR"
                      className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 rounded-2xl pl-11 pr-4 py-3.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* Department Trigger Button */}
              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                  Active Departments / Tracks
                </label>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 rounded-2xl px-5 py-4 flex items-center justify-between hover:border-indigo-500/50 hover:bg-slate-900 transition-all group shadow-inner"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span
                      className={`font-medium ${offeredCourses.length ? "text-slate-200" : "text-slate-500"}`}
                    >
                      {offeredCourses.length
                        ? `${offeredCourses.length} Department(s) Selected`
                        : "Select departments to manage..."}
                    </span>
                  </div>
                  <div className="bg-slate-800 p-1.5 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                    <Plus className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
                  </div>
                </button>
              </div>
            </>
          )}

          {/* Email & Password (Always Visible) */}
          <div className="space-y-2 pt-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
              Work Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 rounded-2xl pl-12 pr-4 py-3.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type={showPassword ? "text" : "password"} // 🌟 Changed type logic
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 rounded-2xl pl-12 pr-12 py-3.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none shadow-inner"
              />
              {/* 🌟 Eye Icon Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* 🌟 Forgot Password Link (Only in Login Mode) */}
            {isLogin && (
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-[13px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          {/* 🌟 Confirm Password (Only in Register Mode) */}
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type={showConfirmPassword ? "text" : "password"} // 🌟 Changed type logic
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 rounded-2xl pl-12 pr-12 py-3.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none shadow-inner"
                />
                {/* 🌟 Eye Icon Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98] mt-8"
          >
            {isLogin ? "Access Workspace" : "Initialize Workspace"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* TRACK SELECTION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#0B0F19]/90 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-slate-900 border border-slate-700/50 w-full max-w-2xl rounded-[2rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            <div className="p-6 sm:p-8 border-b border-slate-800/60 flex items-center justify-between bg-slate-800/20">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Configure Departments
                </h2>
                <p className="text-sm text-slate-400 mt-1.5">
                  Select the tracks your organization will be managing.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2.5 bg-slate-800/50 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {allAvailableTracks.map((course) => (
                  <label
                    key={course}
                    className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${offeredCourses.includes(course) ? "bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]" : "bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900"}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${offeredCourses.includes(course) ? "bg-indigo-500 border-indigo-500 scale-105" : "bg-slate-900 border-slate-700"}`}
                    >
                      {offeredCourses.includes(course) && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={offeredCourses.includes(course)}
                      onChange={() => handleCourseToggle(course)}
                    />
                    <span
                      className={`text-sm font-semibold tracking-wide ${offeredCourses.includes(course) ? "text-white" : "text-slate-400"}`}
                    >
                      {course}
                    </span>
                  </label>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-800/60">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 block pl-1">
                  Create Custom Department
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1 group">
                    <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="text"
                      value={customTrackInput}
                      onChange={(e) => setCustomTrackInput(e.target.value)}
                      placeholder="e.g. Prompt Engineering..."
                      className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 rounded-2xl pl-12 pr-4 py-3.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm transition-all shadow-inner"
                      onKeyDown={(e) => e.key === "Enter" && addCustomTrack()}
                    />
                  </div>
                  {/* 🌟 UPDATED BUTTON HERE */}
                  <button
                    type="button"
                    disabled={!customTrackInput.trim()}
                    onClick={addCustomTrack}
                    className={`px-6 rounded-2xl text-sm font-bold transition-all duration-300 shadow-sm ${
                      customTrackInput.trim()
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25 cursor-pointer"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-slate-950/80 border-t border-slate-800/60 flex justify-end backdrop-blur-md">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-white text-slate-950 hover:bg-slate-200 px-8 py-3 rounded-xl font-bold transition-colors shadow-lg"
              >
                Confirm Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 MOCK FORGOT PASSWORD MODAL */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#0B0F19]/90 backdrop-blur-sm transition-opacity"
            onClick={() => setIsForgotModalOpen(false)}
          ></div>

          <div className="bg-slate-900 border border-slate-700/50 w-full max-w-md rounded-[2rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-6 sm:p-8 border-b border-slate-800/60 flex items-center justify-between bg-slate-800/20">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500/20 p-2 rounded-xl border border-indigo-500/20">
                  <KeyRound className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Reset Password
                </h2>
              </div>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="p-2 bg-slate-800/50 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {forgotSuccess ? (
                <div className="text-center py-6 animate-in fade-in zoom-in">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Password Reset!
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Your password has been successfully updated. You can now
                    login.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  {forgotError && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2 text-rose-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <p className="font-medium">{forgotError}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                      Admin Email
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="admin@company.com"
                        className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 rounded-xl pl-11 pr-4 py-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 outline-none text-sm transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                      New Password
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 rounded-xl pl-11 pr-4 py-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 outline-none text-sm transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                      Confirm New Password
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                      <input
                        type="password"
                        required
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 rounded-xl pl-11 pr-4 py-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 outline-none text-sm transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98] mt-4"
                  >
                    Update Password
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
