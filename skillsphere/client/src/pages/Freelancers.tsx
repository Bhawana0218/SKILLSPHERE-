import { useState } from "react";
import type { ChangeEvent } from "react";
import API from "../services/api";

// Profile Type
interface Profile {
  _id: string;
  hourlyRate: string;
  user: {
    name: string;
  };
}

// Filters Type
interface Filters {
  skill: string;
  minRate: string;
  maxRate: string;
}

function Freelancers() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filters, setFilters] = useState<Filters>({
    skill: "",
    minRate: "",
    maxRate: "",
  });

  const search = async () => {
  try {
    const query = new URLSearchParams({
      skill: filters.skill,
      minRate: filters.minRate,
      maxRate: filters.maxRate,
    }).toString();

    const { data } = await API.get<Profile[]>(`/profile/search?${query}`);
    setProfiles(data);
  } catch (error) {
    console.error(error);
  }
};

  // Handle Input Change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-10 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl mb-4">Find Freelancers</h1>

      {/* Filters */}
      <input
        name="skill"
        placeholder="Skill (e.g. React)"
        value={filters.skill}
        onChange={handleChange}
        className="p-2 bg-gray-800 mb-2 w-full rounded"
      />

      <input
        name="minRate"
        placeholder="Min Rate"
        value={filters.minRate}
        onChange={handleChange}
        className="p-2 bg-gray-800 mb-2 w-full rounded"
      />

      <input
        name="maxRate"
        placeholder="Max Rate"
        value={filters.maxRate}
        onChange={handleChange}
        className="p-2 bg-gray-800 mb-2 w-full rounded"
      />

      <button
        onClick={search}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
      >
        Search
      </button>

      {/* Results */}
      <div className="mt-6 grid gap-4">
        {profiles.length === 0 ? (
          <p className="text-gray-400">No freelancers found</p>
        ) : (
          profiles.map((p) => (
            <div key={p._id} className="bg-gray-800 p-4 rounded">
              <h2 className="text-lg font-semibold">{p.user.name}</h2>
              <p className="text-green-400">₹{p.hourlyRate}/hr</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Freelancers;