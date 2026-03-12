import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDatabase } from '../../context/DatabaseContext';
import { ArrowLeft, CheckCircle2, AlertCircle, Save, Mail, Phone, Linkedin, Twitter, Briefcase } from 'lucide-react';
import Card from '../../components/shared/Card';
import SkillBadge from '../../components/shared/SkillBadge';
import PerformanceBadge from '../../components/shared/PerformanceBadge';

// Helper to ensure URLs are clickable
const formatUrl = (url) => {
  if (!url) return '';
  return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
};

export default function AdminStudentProfile() {
  const { courseKey, id } = useParams();
  const navigate = useNavigate();
  const { db, updateScores, clearNewStatus } = useDatabase();
  
  const course = db.courses[courseKey];
  const student = course?.students.find(s => s.id === id);

  // Added new states for the button animation
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [scores, setScores] = useState({
    examScore: student?.examScore || '',
    assignmentScore: student?.assignmentScore || '',
    behaviorScore: student?.behaviorScore || ''
  });

  useEffect(() => {
    if (student?.isNew) {
      clearNewStatus(courseKey, student.id);
    }
  }, [student, courseKey, clearNewStatus]);

  if (!student) return <div className="p-8 text-white pt-20">Student not found.</div>;

  const handleScoreChange = (e) => {
    setScores({ ...scores, [e.target.name]: e.target.value });
  };

  const handleSaveScores = (e) => {
    e.preventDefault();
    setIsSaving(true); // Trigger "Processing..." state

    // 600ms artificial delay to make it feel secure
    setTimeout(() => {
      updateScores(courseKey, student.id, scores);
      setIsSaving(false);
      setIsSaved(true); // Trigger the green "Saved!" state

      // Reset the button back to normal after 3 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }, 600);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <button onClick={() => navigate(`/admin/database/${courseKey}`)} className="text-slate-400 hover:text-white flex items-center gap-2 transition font-medium">
        <ArrowLeft className="w-4 h-4"/> Back to {course.name} Cohort
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile & Info */}
        <div className="lg:col-span-1 space-y-6">
          
          <Card className="p-6 flex flex-col items-center text-center">
            {/* FIXED: Added object-top to the profile image below */}
            <img src={student.avatar} alt={student.name} className="w-32 h-32 rounded-full border-4 border-slate-700 object-cover object-top mb-4 shadow-xl"/>
            <h2 className="text-2xl font-bold text-white mb-1">{student.name}</h2>
            <p className="text-indigo-400 font-medium mb-4 text-sm">{course.name}</p>
            
            <div className="w-full pt-4 border-t border-slate-800/50 flex justify-between items-center text-left">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Academy ID</p>
                <p className="text-white font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">{student.academyId}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1 flex items-center justify-end gap-1"><Briefcase className="w-3 h-3" /> Experience</p>
                <p className="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">{student.yearsOfExperience || 0} Years</p>
              </div>
            </div>
          </Card>

          {/* NEW: Contact & Socials Card */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800/50 pb-2">Contact Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-rose-500/10 p-2 rounded-md"><Mail className="w-4 h-4 text-rose-400" /></div>
                <a href={`mailto:${student.email}`} className="text-sm text-slate-300 hover:text-white truncate transition">{student.email || 'Not provided'}</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/10 p-2 rounded-md"><Phone className="w-4 h-4 text-emerald-500" /></div>
                <a href={`https://wa.me/${student.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-300 hover:text-emerald-400 truncate transition">{student.phone || 'Not provided'}</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/10 p-2 rounded-md"><Linkedin className="w-4 h-4 text-blue-500" /></div>
                {student.socialHandles?.linkedin ? (
                  <a href={formatUrl(student.socialHandles.linkedin)} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-300 hover:text-blue-400 truncate transition">LinkedIn Profile</a>
                ) : <span className="text-sm text-slate-500">Not provided</span>}
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-sky-500/10 p-2 rounded-md"><Twitter className="w-4 h-4 text-sky-400" /></div>
                {student.socialHandles?.twitter ? (
                  <a href={formatUrl(student.socialHandles.twitter)} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-300 hover:text-sky-400 truncate transition">Twitter Profile</a>
                ) : <span className="text-sm text-slate-500">Not provided</span>}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800/50 pb-2">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {student.skills?.map(skill => <SkillBadge key={skill} skill={skill} />)}
            </div>
          </Card>
        </div>

        {/* Right Column: Grading */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 md:p-8 border-indigo-500/20 shadow-xl shadow-indigo-500/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-800/50 pb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-indigo-500" />
                  Official Assessment
                </h2>
                <p className="text-slate-400 mt-1 text-sm">Input raw grades to generate final performance score.</p>
              </div>
              <PerformanceBadge score={student.finalPerformanceScore} />
            </div>

            <form onSubmit={handleSaveScores} className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Exam (40%)</label>
                  <input type="number" max="100" min="0" required name="examScore" value={scores.examScore} onChange={handleScoreChange} className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition shadow-inner"/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Projects (30%)</label>
                  <input type="number" max="100" min="0" required name="assignmentScore" value={scores.assignmentScore} onChange={handleScoreChange} className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition shadow-inner"/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Soft Skills (30%)</label>
                  <input type="number" max="100" min="0" required name="behaviorScore" value={scores.behaviorScore} onChange={handleScoreChange} className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition shadow-inner"/>
                </div>
              </div>

              {student.finalPerformanceScore === null && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-200">This student's score is Pending. Saving these scores will publish their final grade.</p>
                </div>
              )}

              {/* The new dynamic Save Button */}
              <button 
                type="submit" 
                disabled={isSaving}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] ${
                  isSaved 
                    ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20' 
                    : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'
                }`}
              >
                {isSaving ? (
                  <span className="flex items-center gap-2 animate-pulse">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : isSaved ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" /> Grades Securely Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" /> Save Assessment
                  </>
                )}
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}