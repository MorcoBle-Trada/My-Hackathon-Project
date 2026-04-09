import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import {
  User,
  Building,
  Upload,
  Save,
  Plus,
  Briefcase,
  Loader2,
  HardDrive,
  Download,
  Trash2,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  Search,
  ChevronDown,
  X,
  CheckCircle,
} from "lucide-react";
import Card from "../../components/shared/Card";

export default function AdminSettings() {
  const { db, updateCompanyProfile, addDepartment, removeIntern } =
    useDatabase();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("profile");
  const [isPageLoading, setIsPageLoading] = useState(true);

  // 1. GET ACTIVE COMPANY
  const activeCompanyId = localStorage.getItem("activeAdminCompanyId");
  const company = db.companies?.[activeCompanyId];

  // Form States (Initialized intelligently if company data is already loaded)
  const [editName, setEditName] = useState(
    company?.fullName || "Administrator",
  );
  const [editRole, setEditRole] = useState(company?.role || "HR Lead");
  const [editCompanyName, setEditCompanyName] = useState(
    company?.companyName || "",
  ); // 🌟 NEW STATE FOR ORG NAME
  const [newDeptName, setNewDeptName] = useState("");

  // 🌟 NEW STATES FOR STUDENT SEARCH DROPDOWN
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [internIdToDelete, setInternIdToDelete] = useState("");

  // 🌟 IN-APP NOTIFICATION STATE
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // 🌟 NEW CUSTOM CONFIRMATION MODAL STATE
  const [confirmDialog, setConfirmDialog] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
    confirmText: "Confirm",
    isDanger: false,
  });

  // 🌟 FIX: DYNAMICALLY UPDATE STATES WHEN COMPANY DATA LOADS ASYNCHRONOUSLY
  // This render-phase state update replaces the previous useEffect and prevents cascading renders.
  const [isDataLoaded, setIsDataLoaded] = useState(!!company);
  if (company && !isDataLoaded) {
    setEditName(company.fullName || "Administrator");
    setEditRole(company.role || "HR Lead");
    setEditCompanyName(company.companyName || "");
    setIsDataLoaded(true);
  }

  useEffect(() => {
    if (!company && !isPageLoading) {
      navigate("/admin");
      return;
    }
    const timer = setTimeout(() => setIsPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, [company, navigate, isPageLoading]);

  const adminAvatar = useMemo(() => {
    return (
      company?.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(editName || "Admin")}&background=4f46e5&color=fff&bold=true`
    );
  }, [company?.avatar, editName]);

  const departmentsList = useMemo(() => {
    return (
      company?.offeredCourses ||
      company?.courses ||
      company?.courseTracks ||
      company?.departments ||
      []
    );
  }, [company]);

  // 🌟 FILTER INTERNS BASED ON SEARCH QUERY
  const filteredInterns = useMemo(() => {
    const internsList = company?.interns || [];
    if (!searchQuery) return internsList;

    const lowerQuery = searchQuery.toLowerCase();
    return internsList.filter(
      (intern) =>
        intern.name.toLowerCase().includes(lowerQuery) ||
        intern.academyId?.toLowerCase().includes(lowerQuery) ||
        intern.email.toLowerCase().includes(lowerQuery),
    );
  }, [company?.interns, searchQuery]);

  if (isPageLoading || (!company && isPageLoading)) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] w-full">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <p className="text-slate-400 font-medium animate-pulse">
          Loading settings...
        </p>
      </div>
    );
  }

  // Helper to show temporary in-app notifications
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 4000); // Auto-dismiss after 4 seconds
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, show: false });
  };

  // --- HANDLERS ---
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (updateCompanyProfile) {
      updateCompanyProfile(activeCompanyId, {
        fullName: editName,
        role: editRole,
        companyName: editCompanyName, // 🌟 ADDED DYNAMIC ORG NAME SAVE
      });
      showNotification("Profile updated successfully!");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (updateCompanyProfile) {
          updateCompanyProfile(activeCompanyId, { avatar: reader.result });
          showNotification("Profile picture updated!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewDepartment = (e) => {
    e.preventDefault();
    if (!newDeptName.trim()) return;
    if (addDepartment) {
      addDepartment(activeCompanyId, newDeptName.trim());
      setNewDeptName("");
      showNotification("New track added successfully!");
    }
  };

  // 🌟 UPGRADED EXPORT HANDLER (NOW FILTERS AVATAR & HANDLES NESTED DATA)
  const handleExportData = () => {
    const interns = company?.interns || [];

    if (interns.length === 0) {
      showNotification("No intern records found to export.", "error");
      return;
    }

    // 🛑 Define fields to EXCLUDE from the CSV
    const keysToExclude = ["avatar", "password"];

    // 1. Get ALL unique headers dynamically, skipping excluded keys
    const headerSet = new Set();
    interns.forEach((intern) => {
      Object.keys(intern).forEach((key) => {
        if (!keysToExclude.includes(key)) {
          headerSet.add(key);
        }
      });
    });
    const headers = Array.from(headerSet);
    const csvRows = [];

    // 2. Add the header row (properly escaped)
    csvRows.push(
      headers
        .map((header) => `"${String(header).replace(/"/g, '""')}"`)
        .join(","),
    );

    // 3. Loop through interns and map their data to rows
    for (const intern of interns) {
      const values = headers.map((header) => {
        const val = intern[header];
        let stringVal = "";

        if (val !== null && val !== undefined) {
          // Handle nested objects/arrays to avoid [object Object] rendering
          stringVal =
            typeof val === "object" ? JSON.stringify(val) : String(val);
        }

        // Convert to string, escape inner double quotes, and wrap in double quotes
        const escapedVal = stringVal.replace(/"/g, '""');
        return `"${escapedVal}"`;
      });
      csvRows.push(values.join(","));
    }

    // 4. Combine into a single CSV string (Add UTF-8 BOM for Excel compatibility)
    const csvString = "\uFEFF" + csvRows.join("\n");
    const dataBlob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${company.companyName || "company"}_interns_report.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification("CSV report downloaded successfully!");
  };

  // 🌟 UPGRADED CLEAR STORAGE HANDLER
  const handleClearStorage = () => {
    setConfirmDialog({
      show: true,
      title: "Force Cache Reset",
      message:
        "Are you sure you want to clear local storage? This will log you out and require you to sign back in.",
      confirmText: "Yes, Reset",
      isDanger: true,
      onConfirm: () => {
        localStorage.clear();
        window.location.href = "/";
      },
    });
  };

  // 🌟 UPGRADED DELETE HANDLER
  const handleDeleteIntern = (e) => {
    e.preventDefault();
    if (!internIdToDelete) return;

    const studentName = selectedIntern ? selectedIntern.name : internIdToDelete;

    setConfirmDialog({
      show: true,
      title: "Remove Intern",
      message: `Are you sure you want to permanently remove ${studentName} from your roster? This action cannot be undone.`,
      confirmText: "Remove Student",
      isDanger: true,
      onConfirm: () => {
        if (removeIntern) {
          const result = removeIntern(activeCompanyId, internIdToDelete);

          if (result.success) {
            showNotification(`${studentName} has successfully been removed.`);
            // Reset form states
            setInternIdToDelete("");
            setSearchQuery("");
            setSelectedIntern(null);
          } else {
            showNotification(
              result.error || "Failed to remove student.",
              "error",
            );
          }
        }
        closeConfirmDialog();
      },
    });
  };

  // --- TABS CONFIG (INDIVIDUALIZED) ---
  const tabs = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "organization", label: "Organization Tracks", icon: Building },
    { id: "export", label: "Export Database", icon: Download },
    { id: "sync", label: "Sync / Clear Storage", icon: RefreshCw },
    { id: "remove", label: "Remove Student", icon: Trash2 },
  ];

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 relative">
      {/* 🌟 CUSTOM CONFIRMATION MODAL */}
      {confirmDialog.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              {confirmDialog.isDanger && (
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              )}
              {confirmDialog.title}
            </h3>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              {confirmDialog.message}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={closeConfirmDialog}
                className="px-4 py-2 rounded-lg font-bold text-slate-300 hover:bg-slate-800 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className={`px-4 py-2 rounded-lg font-bold text-white transition shadow-lg text-sm ${
                  confirmDialog.isDanger
                    ? "bg-rose-600 hover:bg-rose-500 shadow-rose-500/20"
                    : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20"
                }`}
              >
                {confirmDialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 IN-APP NOTIFICATION BANNER */}
      {notification.show && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl animate-in slide-in-from-top-5 fade-in ${
            notification.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          <span className="font-medium">{notification.message}</span>
          <button
            onClick={() =>
              setNotification({ show: false, message: "", type: "success" })
            }
            className="ml-4 hover:bg-slate-800 p-1 rounded-md transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="pb-6 border-b border-slate-800/60 text-center md:text-left">
        <h1 className="text-3xl font-black text-white tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-slate-400 mt-2">
          Fine-tune your administrative profile and organization data.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* SIDEBAR NAVIGATION */}
        <Card className="w-full md:w-72 p-2 flex flex-row md:flex-col gap-1 shrink-0 bg-slate-900 border-slate-800/60 overflow-x-auto shadow-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-bold whitespace-nowrap ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" /> {tab.label}
                </div>
                {isActive && (
                  <ChevronRight className="w-4 h-4 hidden md:block" />
                )}
              </button>
            );
          })}
        </Card>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 w-full">
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <Card className="p-6 bg-slate-900 border-slate-800/60 animate-in slide-in-from-right-4">
              <h2 className="text-xl font-bold text-white mb-6">
                Personal & Organization Information
              </h2>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-4 mx-auto lg:mx-0">
                  <img
                    src={adminAvatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-slate-800 shadow-xl"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 text-sm text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-lg font-bold transition"
                  >
                    <Upload className="w-4 h-4" /> Change Photo
                  </button>
                </div>
                <form
                  onSubmit={handleSaveProfile}
                  className="flex-1 w-full space-y-4"
                >
                  {/* 🌟 NEW ORGANIZATION NAME FIELD */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      value={editCompanyName}
                      onChange={(e) => setEditCompanyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Position / Role
                    </label>
                    <input
                      type="text"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 transition"
                      required
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-6 rounded-lg transition shadow-lg shadow-indigo-600/20"
                    >
                      <Save className="w-4 h-4" /> Save Profile
                    </button>
                  </div>
                </form>
              </div>
            </Card>
          )}

          {/* ORGANIZATION TAB */}
          {activeTab === "organization" && (
            <Card className="p-6 bg-slate-900 border-slate-800/60 animate-in slide-in-from-right-4">
              <h2 className="text-xl font-bold text-white mb-2">
                Active Departments
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                Configure the tracks your organization offers to interns.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {departmentsList.map((dept, idx) => {
                  const deptName = typeof dept === "string" ? dept : dept.name;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-slate-950 border border-slate-800 rounded-xl"
                    >
                      <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <p className="font-bold text-white">{deptName}</p>
                    </div>
                  );
                })}
              </div>
              <div className="pt-6 border-t border-slate-800/60">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                  Add New Department
                </h3>
                <form
                  onSubmit={handleAddNewDepartment}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="text"
                    value={newDeptName}
                    onChange={(e) => setNewDeptName(e.target.value)}
                    placeholder="e.g. Fullstack Engineering"
                    className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 transition"
                    required
                  />
                  <button
                    type="submit"
                    disabled={!newDeptName.trim()}
                    className={`flex items-center justify-center gap-2 font-bold py-2.5 px-6 rounded-lg transition ${
                      newDeptName.trim()
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <Plus className="w-4 h-4" /> Add Track
                  </button>
                </form>
              </div>
            </Card>
          )}

          {/* EXPORT DATA TAB */}
          {activeTab === "export" && (
            <Card className="p-8 bg-slate-900 border-indigo-500/20 animate-in slide-in-from-right-4">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-indigo-500/10 rounded-full text-indigo-400">
                  <Download className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Export Intern Records (CSV)
                </h2>
                <p className="text-slate-400 text-sm max-w-md">
                  Securely download a complete CSV report of your organization's
                  interns. This spreadsheet will contain all student data for
                  your records.
                </p>
                <button
                  onClick={handleExportData}
                  className="mt-4 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-indigo-600/20"
                >
                  <Download className="w-5 h-5" /> Download .CSV Report
                </button>
              </div>
            </Card>
          )}

          {/* SYNC / CLEAR TAB */}
          {activeTab === "sync" && (
            <Card className="p-8 bg-slate-900 border-amber-500/20 animate-in slide-in-from-right-4">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-amber-500/10 rounded-full text-amber-500">
                  <RefreshCw className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Sync & Clear Cache
                </h2>
                <p className="text-slate-400 text-sm max-w-md">
                  If you are experiencing data inconsistencies, clearing the
                  local cache will force a fresh sync from the primary data
                  source.
                  <span className="block mt-2 font-bold text-amber-500/80 underline italic">
                    Note: This will log you out of your current session.
                  </span>
                </p>
                <button
                  onClick={handleClearStorage}
                  className="mt-4 flex items-center gap-2 bg-amber-600/20 hover:bg-amber-600/30 text-amber-500 border border-amber-500/30 font-bold py-3 px-8 rounded-xl transition"
                >
                  <RefreshCw className="w-5 h-5" /> Force Cache Reset
                </button>
              </div>
            </Card>
          )}

          {/* REMOVE STUDENT TAB */}
          {activeTab === "remove" && (
            <Card className="p-6 bg-slate-900 border-rose-900/30 animate-in slide-in-from-right-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-rose-400">
                  Remove Intern Records
                </h3>
              </div>
              <p className="text-sm text-slate-400 mb-6">
                Search and select a student to remove from your organization.
                This action is permanent and irreversible.
              </p>

              <form
                onSubmit={handleDeleteIntern}
                className="flex flex-col sm:flex-row gap-3"
              >
                {/* 🌟 SEARCHABLE DROPDOWN WRAPPER */}
                <div className="relative flex-1">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSelectedIntern(null);
                        setInternIdToDelete("");
                        setIsDropdownOpen(true);
                      }}
                      onFocus={() => setIsDropdownOpen(true)}
                      placeholder="Search by name, ID, or email..."
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg pl-10 pr-10 py-2.5 outline-none focus:border-rose-500 transition cursor-text"
                    />
                    <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>

                  {/* DROPDOWN MENU */}
                  {isDropdownOpen && (
                    <div className="absolute z-20 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl max-h-60 overflow-y-auto p-1 animate-in fade-in slide-in-from-top-2">
                      {filteredInterns.length > 0 ? (
                        filteredInterns.map((intern) => (
                          <div
                            key={intern.id}
                            onClick={() => {
                              setSelectedIntern(intern);
                              setInternIdToDelete(intern.id); // Save the ID for deletion
                              setSearchQuery(
                                `${intern.name} (${intern.academyId})`,
                              ); // Show name in input
                              setIsDropdownOpen(false); // Close dropdown
                            }}
                            className="flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg cursor-pointer transition"
                          >
                            <img
                              src={intern.avatar}
                              alt={intern.name}
                              className="w-8 h-8 rounded-full bg-slate-900 object-cover"
                            />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white">
                                {intern.name}
                              </span>
                              <span className="text-xs text-slate-400">
                                {intern.email}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-sm text-slate-400 text-center">
                          No matching students found.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!internIdToDelete}
                  className={`flex items-center justify-center gap-2 font-bold py-2.5 px-6 rounded-lg transition shrink-0 ${
                    internIdToDelete
                      ? "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <Trash2 className="w-4 h-4" /> Remove Intern
                </button>
              </form>

              {/* Click-away overlay to close dropdown */}
              {isDropdownOpen && (
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
