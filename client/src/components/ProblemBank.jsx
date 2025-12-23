import { useState } from 'react';
import { MOCK_PROBLEMS } from '../data/mockData';

const ProblemBank = ({ onSelectProblem }) => {
  const [filter, setFilter] = useState('All');

  const filteredProblems = filter === 'All'
    ? MOCK_PROBLEMS
    : MOCK_PROBLEMS.filter(p => p.category === filter);

  const categories = ['All', ...new Set(MOCK_PROBLEMS.map(p => p.category))];

  return (
    <div className="w-full max-w-6xl mx-auto mb-16">
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${filter === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredProblems.map(problem => (
          <div key={problem.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wide">{problem.category}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded ${problem.difficulty === 'Beginner' ? 'text-green-600 bg-green-50' : problem.difficulty === 'Intermediate' ? 'text-orange-600 bg-orange-50' : 'text-red-600 bg-red-50'}`}>
                {problem.difficulty}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{problem.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{problem.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {problem.tags.map(tag => (
                <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">#{tag}</span>
              ))}
            </div>

            <button
              onClick={() => onSelectProblem(problem)}
              className="w-full py-2 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Solve This Problem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemBank;
