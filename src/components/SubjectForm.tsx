import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiUpload, FiFile } from "react-icons/fi";

interface SubjectFormProps {
  onSubmit: (name: string, files: File[]) => void;
  onCancel: () => void;
}

const SubjectForm = ({ onSubmit, onCancel }: SubjectFormProps) => {
  const [subjectName, setSubjectName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...fileArray]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...fileArray]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName.trim()) {
      setError("Please enter a subject name");
      return;
    }
    onSubmit(subjectName, files);
  };

  const openFileSelector = () => {
    // Trigger click on the hidden file input
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      className="glass-effect rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Add New Subject</h3>
          <motion.button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX />
          </motion.button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="subjectName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject Name
            </label>
            <input
              type="text"
              id="subjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="input-field"
              placeholder="e.g. Mathematics, Physics"
            />
            {error && (
              <motion.p
                className="mt-1 text-sm text-red-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Notes (PDF/Images)
            </label>
            <motion.div
              className={`mt-1 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center ${
                dragActive
                  ? "border-indigo-400 bg-indigo-50"
                  : "border-gray-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={openFileSelector}
              whileHover={{ backgroundColor: "rgb(238, 242, 255)" }}
              animate={dragActive ? { scale: 1.02 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ cursor: "pointer" }}
            >
              <div className="space-y-2 text-center">
                <motion.div
                  className="mx-auto p-3 rounded-full bg-indigo-100 text-indigo-600"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                  }}
                >
                  <FiUpload className="text-2xl" />
                </motion.div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-gray-600">
                    <span
                      className="font-medium text-indigo-600 hover:underline cursor-pointer"
                      onClick={openFileSelector}
                    >
                      Click to browse
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </div>
            </motion.div>

            {files.length > 0 && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Selected files:
                </p>
                <motion.ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  <AnimatePresence>
                    {files.map((file, idx) => (
                      <motion.li
                        key={file.name + idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded flex items-center justify-center mr-3 ${
                              file.type.includes("pdf")
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            <FiFile />
                          </div>
                          <span className="text-sm truncate max-w-[200px]">
                            {file.name}
                          </span>
                        </div>
                        <motion.button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiX />
                        </motion.button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </motion.div>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <motion.button
              type="button"
              onClick={onCancel}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Subject
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SubjectForm;
