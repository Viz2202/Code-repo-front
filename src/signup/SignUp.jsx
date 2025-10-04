import { useState } from "react";
import axios from "axios";
import { backendURL } from "../../request";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    emailid: "",
    github_username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const data = {
      name: formData.name,
      emailid: formData.emailid,
      github_username: formData.github_username,
      password: formData.password,
    };

    e.preventDefault();
    await axios.post(`${backendURL}/login/signup`, data).then((response) => {
      console.log("Sign Up Successful");
      navigate("/");
    });
  };

  return (
    <div
      className="border rounded-lg shadow"
      style={{
        padding: "50px 150px",
        margin: "120px 300px 0 300px",
        backgroundColor: "#353535",
      }}
    >
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

      <div className="space-y-4">
        <div style={{ margin: "30px 0" }}>
          <label
            className="block text-sm font-medium"
            style={{ marginBottom: "8px" }}
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div style={{ margin: "30px 0" }}>
          <label className="block text-sm font-medium mb-2" style={{ marginBottom: "8px" }}>Email</label>
          <input
            type="email"
            name="emailid"
            value={formData.emailid}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div style={{ margin: "30px 0" }}>
          <label className="block text-sm font-medium mb-2" style={{ marginBottom: "8px" }}>
            Github Username
          </label>
          <input
            type="text"
            name="github_username"
            value={formData.github_username}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Github Username"
          />
        </div>

        <div style={{ margin: "30px 0" }}>
          <label className="block text-sm font-medium" style={{ marginBottom: "8px" }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
