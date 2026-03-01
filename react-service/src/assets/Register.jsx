import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    city: ""
  });

  // 🔥 LOGIN API
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "http://localhost:8080/auth/login",
        {
          params: {
            email: loginData.email,
            password: loginData.password
          }
        }
      );

      localStorage.setItem("token", response.data.token);

      alert("Login Successful ✅");
      navigate("/upload");

    } catch (error) {
      alert("Invalid Credentials ❌");
    }
  };

  // 🔥 REGISTER API
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/auth/register",
        registerData
      );

      alert("Registered Successfully ✅");
      setIsLogin(true);

    } catch (error) {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 font-sans">

      {/* ✅ Navbar */}
      <Navbar />

      {/* Padding top because navbar is fixed */}
      <div className="pt-32 flex items-center justify-center">

        <div className="bg-gray-100 p-8 rounded-2xl shadow-2xl w-[400px]">

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-8 py-3 rounded-xl font-bold text-lg transition
                ${isLogin ? "bg-blue-900 text-white" : "bg-white text-blue-900 border border-blue-900"}`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`px-8 py-3 rounded-xl font-bold text-lg transition
                ${!isLogin ? "bg-blue-900 text-white" : "bg-white text-blue-900 border border-blue-900"}`}
            >
              Register
            </button>
          </div>

          {isLogin ? (
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <h2 className="text-center text-blue-900 text-xl font-semibold">
                Login
              </h2>

              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="p-3 rounded-lg border border-gray-400"
              />

              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="p-3 rounded-lg border border-gray-400"
              />

              <button
                type="submit"
                className="p-3 rounded-lg bg-blue-900 text-white"
              >
                LOGIN
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
              <h2 className="text-center text-blue-900 text-xl font-semibold">
                Register
              </h2>

              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                className="p-3 rounded-lg border border-gray-400"
              />

              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                className="p-3 rounded-lg border border-gray-400"
              />

              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                className="p-3 rounded-lg border border-gray-400"
              />

              <select
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, gender: e.target.value })
                }
                className="p-3 rounded-lg border border-gray-400"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                placeholder="City"
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, city: e.target.value })
                }
                className="p-3 rounded-lg border border-gray-400"
              />

              <button
                type="submit"
                className="p-3 rounded-lg bg-blue-900 text-white"
              >
                REGISTER
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}

export default Register;