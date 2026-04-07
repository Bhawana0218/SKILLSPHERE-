import { useState } from "react";
import type { ChangeEvent } from "react";
import API from "../../services/api";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";

interface Profile {
  _id: string;
  hourlyRate: number | string;
  name?: string;
  user?: {
    name?: string;
  };
}

interface Filters {
  skill: string;
  minRate: string;
  maxRate: string;
}

export default function Freelancers() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    skill: "",
    minRate: "",
    maxRate: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const getDisplayName = (profile: Profile) => {
    const nestedName = profile.user?.name?.trim();
    if (nestedName) return nestedName;

    const topLevelName = profile.name?.trim();
    if (topLevelName) return topLevelName;

    return "Freelancer";
  };

  const search = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        skill: filters.skill,
        minRate: filters.minRate,
        maxRate: filters.maxRate,
      }).toString();

      const { data } = await API.get<Profile[]>(`/profile/search?${query}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      setProfiles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-cyan-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="text-cyan-600" /> Find Freelancers
          </h1>
          <p className="text-gray-600 mt-2">Discover skilled professionals for your next project</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              name="skill"
              placeholder="Skill (React, Node...)"
              value={filters.skill}
              onChange={handleChange}
              className="px-4 py-3 border rounded-xl text-black focus:ring-2 focus:ring-cyan-500 outline-none"
            />

            <input
              name="minRate"
              placeholder="Min Rs."
              value={filters.minRate}
              onChange={handleChange}
              className="px-4 py-3 border rounded-xl text-black focus:ring-2 focus:ring-cyan-500 outline-none"
            />

            <input
              name="maxRate"
              placeholder="Max Rs."
              value={filters.maxRate}
              onChange={handleChange}
              className="px-4 py-3 border rounded-xl text-black focus:ring-2 focus:ring-cyan-500 outline-none"
            />

            <button
              onClick={search}
              className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded-xl shadow-md transition"
            >
              <Search size={18} /> Search
            </button>
          </div>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-500">Searching freelancers...</p>
        ) : profiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16 text-center">
            <div className="w-28 h-28 rounded-full bg-linear-to-br from-cyan-100 to-blue-200 flex items-center justify-center shadow-inner mb-6">
              <Search className="w-14 h-14 text-cyan-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Freelancers Found</h2>
            <p className="text-gray-500 max-w-md">
              We could not find freelancers matching your search. Try adjusting your filters or searching a different skill.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {profiles.map((profile, index) => {
              const displayName = getDisplayName(profile);
              const rate = Number(profile.hourlyRate) || 0;

              return (
                <motion.div
                  key={profile._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{displayName}</h2>
                      <p className="text-sm text-gray-500">Freelancer</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-2xl font-bold text-cyan-600">Rs. {rate}</span>
                    <span className="text-gray-500 text-sm"> / hour</span>
                  </div>

                  <button className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-xl hover:opacity-90 transition">
                    View Profile
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
