import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\S).+$/;

    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Email must end with a 3-letter domain like .com");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 1 uppercase letter and 1 other character."
      );
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = storedUsers.some((user) => user.email === email);
    if (emailExists) {
      setError("This email is already registered.");
      return;
    }

    const newUser = { name, email, password };

    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setError("");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-200 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-800">
            Create Account
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Fill in the details to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#1f2b6c] focus:ring-4 focus:ring-[#1f2b6c]/10"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Email
            </label>
            <input
              type="text"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#1f2b6c] focus:ring-4 focus:ring-[#1f2b6c]/10"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#1f2b6c] focus:ring-4 focus:ring-[#1f2b6c]/10"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#1f2b6c] hover:bg-[#162052] text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#1f2b6c] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;