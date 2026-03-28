import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// Pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import JobDetails from "./pages/JobDetails";
import Freelancers from "./pages/Freelancers";
import Profile from "./pages/Profile";
import Proposals from "./pages/Proposals";
import BookSlot from "./pages/BookSlot";
import FreelancerDashboard from "./pages/FreelancerDashboard";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// if (!user) {
//   return <Navigate to="/login" />;
// }

// const navigate = useNavigate();

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* 🌐 PUBLIC ROUTES */}
       
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/freelancer-dashboard"
          element={
            <ProtectedRoute>
              <FreelancerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* 💼 JOB ROUTES */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route
          path="/create-job"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />

        {/* 📄 PROPOSALS */}
        <Route
          path="/proposals/:jobId"
          element={
            <ProtectedRoute>
              <Proposals />
            </ProtectedRoute>
          }
        />

        {/* 👨‍💻 FREELANCERS */}
        <Route path="/freelancers" element={<Freelancers />} />

        {/* 📅 BOOK SLOT */}
        <Route
          path="/book-slot/:freelancerId/:jobId"
          element={
            <ProtectedRoute>
              <BookSlot />
            </ProtectedRoute>
          }
        />

        {/* ❌ FALLBACK */}
        <Route path="*" element={<h1 className="text-white text-center mt-10">404 - Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;