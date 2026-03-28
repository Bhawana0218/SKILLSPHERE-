import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const chartData = [
  { month: "Jan", earnings: 2000 },
  { month: "Feb", earnings: 5000 },
  { month: "Mar", earnings: 8000 },
];

// Define User Type
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

function Dashboard() {
  const navigate = useNavigate();

  // Safely parse localStorage
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="p-10 text-white bg-gray-900 h-screen">
      <h1 className="text-3xl">
        Welcome {user?.name} ({user?.role})
      </h1>
      <LineChart width={400} height={200} data={chartData}>
  <XAxis dataKey="month" />
  <YAxis />
  <Tooltip />
  <Line type="monotone" dataKey="earnings" />
</LineChart>
    </div>
  );
}

export default Dashboard;