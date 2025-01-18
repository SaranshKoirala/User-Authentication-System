import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("usertoken");
  const [user, setUser] = useState("");

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/auth",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUser(response.data.user.name);
      } catch (error) {
        navigate("/*");
        console.log("Error:", error.message);
      }
    }
    fetch();
  }, [token, user, navigate]);
  return <div>Welcome, {user} </div>;
}

export default Dashboard;
