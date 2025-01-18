import axios from "axios";
import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const token = localStorage.getItem("usertoken");
  const validUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/validate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(response);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  useEffect(() => {
    validUser();
  }, []);
  return <div>Welcome, </div>;
}

export default Dashboard;
