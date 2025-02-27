import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBook,
  FiClock,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiEye,
  FiFileText,
  FiImage,
  FiUser,
} from "react-icons/fi";
import SubjectForm from "./SubjectForm";

interface Subject {
  id: number;
  name: string;
  files: File[];
}

const Dashboard = () => {
  const [fieldOfStudy, setFieldOfStudy] = useState("BTech");
  const [goalHours, setGoalHours] = useState(10);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState<number | null>(null);

  const handleAddSubject = (name: string, files: File[]) => {
    const newSubject: Subject = {
      id: Date.now(),
      name,
      files,
    };
    setSubjects([...subjects, newSubject]);
    setShowSubjectForm(false);
  };

  const handleIncreaseGoal = () => {
    setGoalHours(goalHours + 1);
  };

  const handleDecreaseGoal = () => {
    if (goalHours > 1) {
      setGoalHours(goalHours - 1);
    }
  };

  const toggleExpandSubject = (id: number) => {
    setExpandedSubject(expandedSubject === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-indigo-600">AcePlan</h1>
            <div className="h-8 w-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
              <FiUser size={16} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <motion.div
              className="card space-y-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                  <FiBook className="mr-1.5" size={14} />
                  Field of Study
                </label>
                <select
                  className="input-field"
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                >
                  <option value="BTech">BTech</option>
                  <option value="MTech">MTech</option>
                  <option value="BBA">BBA</option>
                  <option value="MBA">MBA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                  <FiClock className="mr-1.5" size={14} />
                  Weekly Goal
                </label>
                <div className="flex items-center">
                  <button
                    onClick={handleDecreaseGoal}
                    className="bg-slate-100 hover:bg-slate-200 h-9 w-9 rounded-l flex items-center justify-center text-slate-600"
                  >
                    <FiChevronDown size={18} />
                  </button>
                  <div className="h-9 px-4 flex items-center justify-center border-y border-slate-200">
                    <span className="text-lg font-medium text-slate-700 w-8 text-center">
                      {goalHours}
                    </span>
                  </div>
                  <button
                    onClick={handleIncreaseGoal}
                    className="bg-slate-100 hover:bg-slate-200 h-9 w-9 rounded-r flex items-center justify-center text-slate-600"
                  >
                    <FiChevronUp size={18} />
                  </button>
                  <span className="ml-3 text-sm text-slate-500">
                    hours/week
                  </span>
                </div>
              </div>

              <hr className="border-slate-200" />

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3">
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-100 p-3 rounded">
                    <div className="text-xs text-slate-500 mb-1">Subjects</div>
                    <div className="text-xl font-semibold text-slate-800">
                      {subjects.length}
                    </div>
                  </div>
                  <div className="bg-slate-100 p-3 rounded">
                    <div className="text-xs text-slate-500 mb-1">Files</div>
                    <div className="text-xl font-semibold text-slate-800">
                      {subjects.reduce(
                        (acc, subj) => acc + subj.files.length,
                        0
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-slate-800">
                  Your Subjects
                </h2>
                <button
                  onClick={() => setShowSubjectForm(true)}
                  className="btn inline-flex items-center text-sm py-1.5"
                >
                  <FiPlus className="mr-1.5" size={14} />
                  Add Subject
                </button>
              </div>

              <AnimatePresence>
                {showSubjectForm && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6"
                  >
                    <SubjectForm
                      onSubmit={handleAddSubject}
                      onCancel={() => setShowSubjectForm(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {subjects.length > 0 ? (
                <motion.div layout className="space-y-3">
                  <AnimatePresence>
                    {subjects.map((subject) => (
                      <motion.div
                        key={subject.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layout
                        className="bg-slate-50 rounded-lg p-4 border border-slate-100"
                      >
                        <div
                          onClick={() => toggleExpandSubject(subject.id)}
                          className="cursor-pointer"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-slate-800">
                                {subject.name}
                              </h3>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {subject.files.length}{" "}
                                {subject.files.length === 1 ? "file" : "files"}
                              </p>
                            </div>
                            <button className="text-indigo-500 hover:text-indigo-700 text-sm flex items-center">
                              <FiEye className="mr-1" size={14} />
                              View
                            </button>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedSubject === subject.id &&
                            subject.files.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-3 pt-3 border-t border-slate-200"
                              >
                                <h4 className="text-xs font-medium text-slate-500 mb-2">
                                  Uploaded Materials
                                </h4>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                                  {subject.files.map((file, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center p-2 bg-white rounded border border-slate-100"
                                    >
                                      <div
                                        className={`h-7 w-7 rounded flex items-center justify-center mr-2 text-xs ${
                                          file.type.includes("pdf")
                                            ? "bg-red-100 text-red-600"
                                            : "bg-blue-100 text-blue-600"
                                        }`}
                                      >
                                        {file.type.includes("pdf") ? (
                                          <FiFileText size={12} />
                                        ) : (
                                          <FiImage size={12} />
                                        )}
                                      </div>
                                      <div className="text-xs text-slate-600 truncate max-w-full flex-1">
                                        {file.name}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                    <FiBook className="text-slate-400" size={20} />
                  </div>
                  <h3 className="text-sm font-medium text-slate-700 mb-1">
                    No subjects yet
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Add your first subject to get started
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
