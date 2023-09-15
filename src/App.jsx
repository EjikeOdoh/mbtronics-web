import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const token = queryParameters.get("token");

  console.log(id, token);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    // Add your reset password logic here
    if (!password || !confirmPassword) {
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

      axios
        .post(
          `https://mbtronics-backend.onrender.com/api/v1/auth/resetpassword?token=${token}&id=${id}`,
          {
            password,
          }
        )
        .then((response) => {
          if (response.data.status === "Success") {
            setMessage("Hurray! You can now login with your new password");
          } else {
            setMessage("Ouch! There was an error, please try again later.");
          }
        });

      // const response = await fetch("/api/reset-password", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      // if (response.ok) {
      //   setMessage("Password reset successfully");
      // } else {
      //   const data = await response.json();
      //   setMessage(data.message || "Password reset failed");
      // }
    } catch (error) {
      console.error("Password reset error:", error);
      setMessage("An error occurred while resetting your password");
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
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
          <p className="reset-password-message">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
