import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Name, 4: Username
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(""); // Stores username error
  const [loading, setLoading] = useState(false); // Controls button states

  // ✅ Step 1: Send OTP
  const sendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/send-otp`, { email });
      setStep(2);
    } catch {
      alert("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/verify-otp`, { email, otp });

      if (response.data.newUser) {
        setStep(3); // Move to Name step
      } else {
        login(response.data.user); // Log in existing user
      }
    } catch {
      alert("Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 3: Save Name
  const saveName = () => {
    if (name.trim().length < 3) return alert("Name should be at least 3 characters.");
    setStep(4);
  };

  // ✅ Step 4: Save Username & Complete Signup
  const saveUsername = async () => {
    setLoading(true);
    setUsernameError(""); // Clear previous errors

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/save-admin`, { email, name, username });
      login(response.data.user); // Log in new user
    } catch (error) {
      if (error.response?.data?.error === "Username already exists") {
        setUsernameError("Username already exists. Try another one.");
      } else {
        alert("Failed to save details. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>

        {step === 1 && (
          <>
            <input
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-3 text-white placeholder-gray-400"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className={`w-full p-2 rounded ${email ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 cursor-not-allowed"}`}
              onClick={sendOtp}
              disabled={!email || loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-gray-400 mb-3">
              OTP has been sent to <span className="font-semibold text-white">{email}</span>.
              <br /> Check inbox or spam folder.
            </p>
            <input
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-3 text-white placeholder-gray-400"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className={`w-full p-2 rounded ${otp ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 cursor-not-allowed"}`}
              onClick={verifyOtp}
              disabled={!otp || loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-lg font-medium mb-2">Enter your name</h2>
            <input
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-3 text-white placeholder-gray-400"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className={`w-full p-2 rounded ${name.trim().length >= 3 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 cursor-not-allowed"}`}
              onClick={saveName}
              disabled={name.trim().length < 3}
            >
              Next
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-lg font-medium mb-2">Choose a username</h2>
            <input
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-3 text-white placeholder-gray-400"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && <p className="text-red-500 text-sm mb-2">{usernameError}</p>}
            <button
              className={`w-full p-2 rounded ${username.trim().length >= 3 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 cursor-not-allowed"}`}
              onClick={saveUsername}
              disabled={!username || loading}
            >
              {loading ? "Saving..." : "Save & Login"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
