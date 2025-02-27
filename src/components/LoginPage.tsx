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
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="glass-effect rounded-3xl overflow-hidden p-8"
          whileHover={{
            boxShadow:
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FiUser className="text-white text-3xl" />
              </div>
            </motion.div>
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-1"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to AcePlan
            </motion.h2>
            <motion.p
              className="text-gray-600"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Sign in to manage your study plan
            </motion.p>
          </div>

          <motion.form
            className="space-y-6"
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
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
                  <FiLock className="text-gray-400" />
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
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              className="btn w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Sign in</span>
              <FiArrowRight />
            </motion.button>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Create account
                </a>
              </div>
            </div>
          </motion.form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
