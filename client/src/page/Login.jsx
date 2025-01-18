import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [name, setName] = useState("");

  function handleShowBtn() {
    setIsOpen((isOpen) => !isOpen);
  }

  function keyEvent(e) {
    if (e.key === "Enter") {
      console.log(e.key);
      handleSubmitBtn(e);
    }
  }

  async function handleSubmitBtn(e) {
    e.preventDefault();
    if (email == "" || password == "") {
      alert("Enter the Email and Password!!");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/users/login",
          { email, password }
        );
        // console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem("usertoken", response.data.token);
          navigate("/dashboard", { state: response.data });
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form className="flex flex-col justify-center items-center gap-4 p-10 shadow-2xl rounded-xl">
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-blue-900">Welcome, Log In</h1>
          <p className="text-gray-500 p-3">
            Hi, we are glad you are back, Please login.
          </p>
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="email" className="font-bold text-blue-900">
            Email
          </label>
          <input
            placeholder="Enter your email address"
            type="email"
            id="email"
            className="border border-gray-300 placeholder:text-gray-400 px-2 py-1 w-96 rounded-md focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={keyEvent}
            required
          />
        </div>
        <div className="relative flex flex-col gap-2 mb-4">
          <label htmlFor="password" className="font-bold text-blue-900">
            Password
          </label>
          <input
            placeholder="Enter your password"
            type={isOpen ? "text" : "password"}
            id="password"
            className="border border-gray-300 placeholder:text-gray-400 px-2 py-1 w-96 rounded-md focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={keyEvent}
            required
          />
          {!isOpen && (
            <FaEyeSlash
              className="absolute bottom-2.5 right-2.5"
              onClick={handleShowBtn}
            />
          )}
          {isOpen && (
            <FaEye
              className="absolute bottom-2.5 right-2.5"
              onClick={handleShowBtn}
            />
          )}
        </div>
        <button
          type="submit"
          onClick={handleSubmitBtn}
          className=" py-2 text-xl text-white bg-blue-900 w-96 rounded-md"
        >
          Login
        </button>
        <p className="flex gap-1">
          Don&apos;t have an Account?
          <Link to={"/register"} className="text-blue-900">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
