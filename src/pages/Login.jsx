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
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white  w-[85vw] lg:w-[30vw] p-3 shadow rounded mb-16 lg:mb-0">
        <div className="w-full text-center">
          <h1 className="text-lg font-bold">Nasara Admin</h1>
        </div>
        <p className="text-xs text-gray-500 text-center mb-2">Login or Signup</p>

        {step === 1 && (
          <>
            <InputField label="Email" value={email} onChange={setEmail} placeholder="Enter email" />
            <Button onClick={sendOtp} disabled={!email || loading} loading={loading} text="Continue" />
          </>
        )}

        {step === 2 && (
          <>
            <InputField label="Enter OTP" value={otp} onChange={setOtp} placeholder="Enter OTP" />
            <p className="text-xs text-gray-500">OTP sent to <span className="font-semibold text-black">{email}</span></p>
            <p className="text-xs text-gray-500">Check Inbox or Spam folder</p>
            <Button onClick={verifyOtp} disabled={!otp || loading} loading={loading} text="Verify" />
          </>
        )}

        {step === 3 && (
          <>
            <InputField label="Your full name" value={name} onChange={setName} placeholder="Enter name" />
            <Button onClick={saveName} disabled={name.trim().length < 3} text="Next" />
          </>
        )}

        {step === 4 && (
          <>
            <InputField label="Username" value={username} onChange={setUsername} placeholder="Choose username" />
            {usernameError && <p className="text-red-500 text-xs mb-2">{usernameError}</p>}
            <Button onClick={saveUsername} disabled={!username || loading} loading={loading} text="Save & Login" />
          </>
        )}

        <p className="text-gray-500 text-center mt-2 text-[10px]">
          Mukhtar Alam © 2025 <span className="text-blue-500 underline">Terms & Conditions</span>
        </p>
      </div>
    </div>
  );
}

// ✅ Reusable InputField Component
const InputField = ({ label, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1 text-xs">
    <label>{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 outline-none focus:border-black w-full"
      placeholder={placeholder}
    />
  </div>
);

// ✅ Reusable Button Component
const Button = ({ onClick, disabled, loading, text }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="bg-black text-white w-full p-2 rounded mt-3 text-xs disabled:bg-gray-500 disabled:cursor-not-allowed active:bg-gray-800"
  >
    {loading ? "Processing..." : text}
  </button>
);
