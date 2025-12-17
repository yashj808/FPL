import { useState, useEffect } from 'react';

const ProblemBank = ({ onSelectProblem }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/problems`)
      .then(res => res.json())
      .then(data => {
        setProblems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading problems...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Real-World Problem Bank</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map(problem => (
          <div key={problem.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{problem.category}</span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${problem.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {problem.difficulty}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{problem.title}</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">{problem.description}</p>

            <div className="mb-4">
              {problem.tags.map(tag => (
                <span key={tag} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-1">#{tag}</span>
              ))}
            </div>

            <button
              onClick={() => onSelectProblem(problem)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors mt-auto"
            >
              Start Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemBank;
