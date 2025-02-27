import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBook,
  FiClock,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiEye,
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
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">AcePlan</h1>
          <motion.div
            className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-xl font-bold">JS</span>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="col-span-1"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="card space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiBook className="mr-2" />
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
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiClock className="mr-2" />
                  Weekly Goal (hours)
                </label>
                <div className="flex items-center">
                  <motion.button
                    onClick={handleDecreaseGoal}
                    className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 h-10 w-10 rounded-l-lg flex items-center justify-center"
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiChevronDown />
                  </motion.button>
                  <div className="h-10 px-6 flex items-center justify-center border-t border-b border-gray-300">
                    <motion.span
                      key={goalHours}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-2xl font-semibold text-indigo-800"
                    >
                      {goalHours}
                    </motion.span>
                  </div>
                  <motion.button
                    onClick={handleIncreaseGoal}
                    className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 h-10 w-10 rounded-r-lg flex items-center justify-center"
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiChevronUp />
                  </motion.button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Quick Stats
                  </h3>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="font-medium text-indigo-800">Subjects</div>
                    <div className="text-2xl font-bold text-indigo-900">
                      {subjects.length}
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="font-medium text-purple-800">
                      Study Files
                    </div>
                    <div className="text-2xl font-bold text-purple-900">
                      {subjects.reduce(
                        (acc, subj) => acc + subj.files.length,
                        0
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="col-span-1 lg:col-span-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Your Subjects
                </h3>
                <motion.button
                  onClick={() => setShowSubjectForm(true)}
                  className="btn flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlus />
                  <span>Add Subject</span>
                </motion.button>
              </div>

              <AnimatePresence>
                {showSubjectForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mb-6"
                  >
                    <SubjectForm
                      onSubmit={handleAddSubject}
                      onCancel={() => setShowSubjectForm(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {subjects.length > 0 ? (
                <motion.ul layout className="divide-y divide-gray-200">
                  <AnimatePresence>
                    {subjects.map((subject) => (
                      <motion.li
                        key={subject.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        layout
                        className="py-4"
                      >
                        <div
                          onClick={() => toggleExpandSubject(subject.id)}
                          className="cursor-pointer"
                        >
                          <motion.div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">
                                {subject.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {subject.files.length}{" "}
                                {subject.files.length === 1 ? "file" : "files"}{" "}
                                uploaded
                              </p>
                            </div>
                            <motion.div
                              className="text-indigo-600 hover:text-indigo-800 flex items-center"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiEye className="mr-1" />
                              <span>View</span>
                            </motion.div>
                          </motion.div>
                        </div>

                        <AnimatePresence>
                          {expandedSubject === subject.id &&
                            subject.files.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 pt-4 border-t border-gray-100"
                              >
                                <h5 className="text-sm font-medium text-gray-700 mb-2">
                                  Uploaded Materials:
                                </h5>
                                <ul className="space-y-2">
                                  {subject.files.map((file, idx) => (
                                    <motion.li
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      className="flex items-center p-2 bg-gray-50 rounded"
                                    >
                                      <div
                                        className={`w-8 h-8 rounded flex items-center justify-center mr-3 ${
                                          file.type.includes("pdf")
                                            ? "bg-red-100 text-red-700"
                                            : "bg-blue-100 text-blue-700"
                                        }`}
                                      >
                                        {file.type.includes("pdf")
                                          ? "PDF"
                                          : "IMG"}
                                      </div>
                                      <div className="text-sm">{file.name}</div>
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              ) : (
                <motion.div
                  className="py-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="mx-auto w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <FiBook className="text-indigo-600 text-3xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No subjects added yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Add your first subject to start tracking your study plan
                  </p>
                  <motion.button
                    onClick={() => setShowSubjectForm(true)}
                    className="btn inline-flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiPlus className="mr-2" />
                    Add Your First Subject
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default Dashboard;
