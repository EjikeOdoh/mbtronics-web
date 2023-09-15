import React, { useState } from "react";
import "./styles.css";

function App() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    // Add your reset password logic here
    if (!email || !password || !confirmPassword) {
      setMessage("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      // Make an API request to reset the password
      // For example, using fetch or Axios
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setMessage("Password reset successfully");
      } else {
        const data = await response.json();
        setMessage(data.message || "Password reset failed");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setMessage("An error occurred while resetting your password");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <div className="reset-password-form">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleResetPassword}>Reset Password</button>
        {message && <p className="reset-password-message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
