import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
  localStorage.clear();

  // force redirect + refresh
  window.location.href = "/"; 
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-1 flex justify-between items-center shadow-md sticky top-0 z-50">
      
      {/* Logo */}
      {token ? (
  <img
    src="/Logo.png"
    alt="Logo"
    className="h-40 w-48 -my-10 cursor-pointer"
    onClick={() => navigate("/home")}
  />
) : (
  <h1
    className="text-xl font-bold cursor-pointer"
    onClick={() => navigate("/")}
  >
    SkillSphere
  </h1>
)}

      {/* Links */}
      <div className="flex gap-6 items-center">

        <Link to="/dashboard" className="hover:text-blue-400">
          Dashboard
        </Link>

        <Link to="/jobs" className="hover:text-blue-400">
          Jobs
        </Link>

        <Link to="/freelancers" className="hover:text-blue-400">
          Freelancers
        </Link>

        <Link to="/profile" className="hover:text-blue-400">
          Profile
        </Link>

        {/* Auth Buttons */}
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/" className="hover:text-blue-400">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;