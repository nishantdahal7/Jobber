import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BuyerDashboard } from "../components/Dashboard/BuyerDashboard";
import { ProviderDashboard } from "../components/Dashboard/ProviderDashboard";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout, userData } = useAuth();
  console.log("USER DATA", userData);
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    logout()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        setError("Failed to log out");
      });
  }

  // TODO: CREATE AND DISPLAY A SIDEBAR USING THE USERDATA OBJECT.
  if (userData.userType === "Buyer") {
    return <BuyerDashboard />;
  }
  return <ProviderDashboard />;
}
