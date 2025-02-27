import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiFile, FiPaperclip } from "react-icons/fi";

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
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-slate-800">
            Add New Subject
          </h3>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 p-1 rounded"
            aria-label="Close"
          >
            <FiX size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="subjectName"
              className="block text-xs font-medium text-slate-700 mb-1"
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
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Upload Notes (PDF/Images)
            </label>
            <div
              className={`mt-1 border-2 border-dashed rounded p-5 flex flex-col items-center justify-center ${
                dragActive
                  ? "border-indigo-300 bg-indigo-50"
                  : "border-slate-200"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={openFileSelector}
              style={{ cursor: "pointer" }}
            >
              <div className="text-center">
                <div className="p-2 rounded-full bg-slate-100 text-slate-500 mx-auto mb-2">
                  <FiPaperclip size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-600">
                    <span className="font-medium text-indigo-600">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-slate-400">
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
            </div>

            {files.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-medium text-slate-500 mb-2">
                  Selected files:
                </p>
                <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-thin pr-1">
                  <AnimatePresence>
                    {files.map((file, idx) => (
                      <motion.div
                        key={file.name + idx}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between p-2 bg-white rounded border border-slate-100"
                      >
                        <div className="flex items-center truncate mr-2">
                          <div
                            className={`w-6 h-6 rounded flex items-center justify-center mr-2 ${
                              file.type.includes("pdf")
                                ? "bg-red-100 text-red-600"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            <FiFile size={12} />
                          </div>
                          <span className="text-xs truncate max-w-[180px]">
                            {file.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-slate-400 hover:text-slate-600 p-1 rounded flex-shrink-0"
                        >
                          <FiX size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary text-sm py-1.5 px-3"
            >
              Cancel
            </button>
            <button type="submit" className="btn text-sm py-1.5 px-3">
              Save Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectForm;
