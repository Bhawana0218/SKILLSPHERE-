import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

// Job Type
interface Job {
  _id: string;
  title: string;
  description: string;
  budget: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  budget: string;
  skillsRequired: string[]; 
}

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
  keyword: "",
  minBudget: "",
  maxBudget: "",
  skills: "",
});


  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      const { data } = await API.get<Job[]>("/jobs");
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchJobs = async () => {
  const query = new URLSearchParams(filters).toString();
  const { data } = await API.get(`/jobs/search?${query}`);
  setJobs(data);
};

  return (
    <div className="p-10 bg-gray-900 text-white min-h-screen">

{/* // New  */}

<h1 className="text-3xl mb-6">Search For a Jobs</h1>

      <div className="mb-6 space-y-2">
  <input placeholder="Search jobs..."
    className="p-2 w-full bg-gray-800"
    onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
  />

  <div className="flex gap-2">
    <input placeholder="Min Budget"
      className="p-2 bg-gray-800"
      onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
    />

    <input placeholder="Max Budget"
      className="p-2 bg-gray-800"
      onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
    />
  </div>

  <input placeholder="Skills (React,Node)"
    className="p-2 w-full bg-gray-800"
    onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
  />

  <button onClick={searchJobs}
    className="bg-blue-600 px-4 py-2 rounded">
    Search
  </button>
</div>

{/* //New */}

      <h1 className="text-3xl mb-6">Available Jobs</h1>

      <div className="grid gap-6">
        {jobs.map((job) => (
          <Link to={`/jobs/${job._id}`} key={job._id}>
            <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700">
              <h2 className="text-xl font-bold">{job.title}</h2>

              <p>
                {job.description.length > 100
                  ? job.description.substring(0, 100) + "..."
                  : job.description}
              </p>

              <div className="mt-2">
                {job.skillsRequired?.map((skill, i) => (
                    <span
                    key={i}
                    className="bg-blue-600 px-2 py-1 mr-2 rounded">
                        {skill}
                    </span>
                ))}
                </div>

              <p className="text-green-400 mt-2">₹{job.budget}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Jobs;