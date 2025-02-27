import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiArrowRight } from "react-icons/fi";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    } else {
      setError("Please enter both username and password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="card overflow-hidden">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
              <FiUser size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-1">Welcome to AcePlan</h2>
            <p className="text-slate-500">Sign in to manage your study plan</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-slate-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="input-field pl-10"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-field pl-10"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <motion.p
                className="text-red-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              className="btn w-full flex items-center justify-center gap-2 py-2.5"
              whileTap={{ scale: 0.98 }}
            >
              <span>Sign in</span>
              <FiArrowRight size={16} />
            </motion.button>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm">
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  Forgot password?
                </a>
              </div>
              <div className="text-sm">
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  Create account
                </a>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
