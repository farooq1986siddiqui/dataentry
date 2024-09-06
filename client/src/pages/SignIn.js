import React, { useEffect } from "react";
import { SignInForm } from "../components/SignInForm";
import { useNavigate } from "react-router-dom";

export default function SigIn() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("adminID");
    if (user) {
      navigate("/addtask");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="sign">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <p style={{ fontSize: "0.75rem", margin: 0, color: "white" }}>
          Already have an account?
        </p>
        <h1 style={{ margin: 0 }}>Sign In!</h1>
      </div>
      <SignInForm />
    </div>
  );
}
