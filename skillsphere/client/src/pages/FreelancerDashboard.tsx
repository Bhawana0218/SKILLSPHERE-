import { useEffect, useState } from "react";
import API from "../services/api";

// Analytics Type
interface Analytics {
  totalProposals: number;
  totalEarnings: number;
  avgRating: number;
  totalReviews: number;
}

function FreelancerDashboard() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get<Analytics>("/analytics");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  if (!data) {
    return <p className="text-white p-10">Loading...</p>;
  }

  return (
    <div className="p-10 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl mb-6">📊 Freelancer Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded">
          <h3>Total Proposals</h3>
          <p className="text-2xl">{data.totalProposals}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <h3>Total Earnings</h3>
          <p className="text-2xl">₹{data.totalEarnings}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <h3>Average Rating</h3>
          <p className="text-2xl">⭐ {data.avgRating}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <h3>Total Reviews</h3>
          <p className="text-2xl">{data.totalReviews}</p>
        </div>
      </div>
    </div>
  );
}

export default FreelancerDashboard;