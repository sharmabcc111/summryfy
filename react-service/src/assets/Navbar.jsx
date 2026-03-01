import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check session whenever route changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Logged out successfully");
    navigate("/");
  };

  return (


<nav className="fixed top-0 left-0 w-full h-[70px] bg-white/40 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto p-5 flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-blue-900 cursor-pointer"
        >
          Summaryfy
        </h1>

        {/* Right Side Buttons */}
        <div className="flex gap-4">

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            location.pathname !== "/" && (
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            )
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;