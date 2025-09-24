

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all' 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [problemsRes, solvedRes] = await Promise.all([
          axiosClient.get('/problem/getAllProblem'),
          user ? axiosClient.get('/problem/problemSolvedByUser') : Promise.resolve({ data: [] })
        ]);
        
        setProblems(problemsRes.data);
        if (user) setSolvedProblems(solvedRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags.includes(filters.tag);
    const statusMatch = filters.status === 'all' || 
                      (filters.status === 'solved' 
                        ? solvedProblems.some(sp => sp._id === problem._id)
                        : !solvedProblems.some(sp => sp._id === problem._id));
    return difficultyMatch && tagMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navigation Bar */}
      <nav className="navbar sticky top-0 z-10 bg-base-100 shadow-lg px-4 lg:px-8">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost text-xl font-bold text-primary">
            <span className="text-secondary">DSA</span>Deck
          </NavLink>
        </div>
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                {user?.firstName.charAt(0).toUpperCase()}
              </div>
            </div>
            <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-20">
              <li className="menu-title">
                <span>{user?.firstName} {user?.lastName}</span>
              </li>
              {user?.role === 'admin' && (
                <li>
                  <NavLink to="/admin" className="text-info">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className="text-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-4 lg:p-6 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Coding Challenges</h1>
          <p className="text-lg opacity-75">Sharpen your skills with our curated collection of problems</p>
        </div>

        {/* Filters */}
        <div className="bg-base-100 rounded-xl shadow-lg p-4 mb-8">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Status</span>
                </label>
                <select 
                  className="select select-bordered select-sm w-full md:w-40"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="all">All Problems</option>
                  <option value="solved">Solved</option>
                  <option value="unsolved">Unsolved</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Difficulty</span>
                </label>
                <select 
                  className="select select-bordered select-sm w-full md:w-40"
                  value={filters.difficulty}
                  onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Tags</span>
                </label>
                <select 
                  className="select select-bordered select-sm w-full md:w-40"
                  value={filters.tag}
                  onChange={(e) => setFilters({...filters, tag: e.target.value})}
                >
                  <option value="all">All Tags</option>
                  <option value="array">Array</option>
                  <option value="linkedList">Linked List</option>
                  <option value="graph">Graph</option>
                  <option value="dp">Dynamic Programming</option>
                  <option value="tree">Tree</option>
                  <option value="string">String</option>
                </select>
              </div>
            </div>
            
            <div className="stats shadow bg-base-200">
              <div className="stat">
                <div className="stat-title">Total Problems</div>
                <div className="stat-value text-primary">{problems.length}</div>
              </div>
              {user && (
                <div className="stat">
                  <div className="stat-title">Solved</div>
                  <div className="stat-value text-secondary">{solvedProblems.length}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Problems List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-base-200">
                    <th className="w-16 text-center">Status</th>
                    <th>Problem</th>
                    <th className="w-32">Difficulty</th>
                    <th className="w-48">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProblems.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="mt-4 text-lg">No problems match your filters</p>
                          <button 
                            className="btn btn-sm btn-ghost mt-2 text-primary"
                            onClick={() => setFilters({ difficulty: 'all', tag: 'all', status: 'all' })}
                          >
                            Clear Filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProblems.map(problem => (
                      <tr key={problem._id} className="hover:bg-base-200 transition-colors">
                        <td className="text-center">
                          {solvedProblems.some(sp => sp._id === problem._id) ? (
                            <div className="tooltip" data-tip="Solved">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ) : (
                            <div className="tooltip" data-tip="Unsolved">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-base-300 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </td>
                        <td>
                          <NavLink 
                            to={`/problem/${problem._id}`} 
                            className="font-semibold hover:text-primary transition-colors"
                          >
                            {problem.title}
                          </NavLink>
                        </td>
                        <td>
                          <span className={`badge ${getDifficultyBadgeColor(problem.difficulty)} font-bold py-2`}>
                            {problem.difficulty}
                          </span>
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-2">
                            {problem.tags.split(',').map(tag => (
                              <span key={tag} className="badge badge-outline badge-sm py-1.5">
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-12">
        <aside>
          <p>© 2025 DSA Deck - Practice coding skills with our challenges</p>
        </aside>
      </footer>
    </div>
  );
}

const getDifficultyBadgeColor = (difficulty) => {
  const lcDiff = difficulty.toLowerCase();
  if (lcDiff === 'easy') return 'badge-success';
  if (lcDiff === 'medium') return 'badge-warning';
  if (lcDiff === 'hard') return 'badge-error';
  return 'badge-neutral';
};

export default Homepage;