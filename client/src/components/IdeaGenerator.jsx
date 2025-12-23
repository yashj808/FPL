import { useState } from 'react';

const IdeaGenerator = ({ onSelectProblem }) => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedProblem, setGeneratedProblem] = useState(null);

  const handleGenerate = () => {
    if (!keyword.trim()) return;

    setLoading(true);
    // Simulate AI delay
    setTimeout(() => {
        setGeneratedProblem({
            id: 'gen-' + Date.now(),
            title: `Smart ${keyword} Solution`,
            description: `An innovative system to leverage advanced technology in the ${keyword} domain, addressing key inefficiencies and improving user outcomes through data-driven insights.`,
            category: keyword.charAt(0).toUpperCase() + keyword.slice(1),
            difficulty: 'Intermediate',
            tags: [keyword, 'Innovation', 'Tech']
        });
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-4">✨ AI Idea Generator</h2>
        <p className="mb-6 opacity-90">Enter a keyword (e.g., "Health", "Space", "Gaming") and get a unique, structured problem statement instantly.</p>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter a domain or keyword..."
            className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !keyword}
            className={`px-6 py-3 rounded-lg font-bold bg-white text-indigo-600 hover:bg-gray-100 transition-colors ${loading ? 'opacity-75' : ''}`}
          >
            {loading ? 'Generating...' : 'Generate Idea'}
          </button>
        </div>

        {generatedProblem && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 animate-fade-in">
             <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{generatedProblem.title}</h3>
                <span className="bg-green-400 text-green-900 text-xs px-2 py-1 rounded font-bold uppercase">Generated</span>
             </div>
             <p className="mb-4 text-indigo-100">{generatedProblem.description}</p>
             <button
               onClick={() => onSelectProblem(generatedProblem)}
               className="bg-white text-indigo-600 px-4 py-2 rounded font-semibold hover:bg-gray-50 shadow-sm"
             >
               Start Project with This Idea →
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaGenerator;
