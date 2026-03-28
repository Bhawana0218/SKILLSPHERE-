import { useNavigate } from "react-router-dom";

const pages = [
  { name: "Browse Jobs", path: "/jobs", icon: "💼" },
  { name: "Create Job", path: "/create-job", icon: "➕" },
  { name: "Freelancers", path: "/freelancers", icon: "👨‍💻" },
  { name: "Dashboard", path: "/dashboard", icon: "📊" },
  { name: "Freelancer Dashboard", path: "/freelancer-dashboard", icon: "📈" },
  { name: "Profile", path: "/profile", icon: "👤" },
  { name: "Proposals", path: "/proposals", icon: "📄" },
  { name: "Book Slot", path: "/book-slot", icon: "📅" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      
      {/* HERO SECTION */}
      <div className="text-center py-20 bg-linear-to-r from-indigo-600 to-blue-600">
        <h1 className="text-5xl font-bold mb-4">
          SkillSphere 🚀
        </h1>
        <p className="text-lg text-gray-200">
          Intelligent Hyperlocal Freelance Ecosystem
        </p>
      </div>

      {/* NAVIGATION GRID */}
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {pages.map((page, index) => (
          <div
            key={index}
            onClick={() => navigate(page.path)}
            className="cursor-pointer bg-[#1E293B] p-6 rounded-2xl 
                       hover:scale-105 hover:shadow-2xl transition duration-300 
                       flex flex-col items-center justify-center text-center"
          >
            <div className="text-4xl mb-3">{page.icon}</div>
            <h2 className="text-lg font-semibold">{page.name}</h2>
          </div>
        ))}

      </div>

      {/* FOOTER */}
      <div className="text-center py-6 text-gray-400">
        © 2026 SkillSphere • Built with ❤️
      </div>

    </div>
  );
}