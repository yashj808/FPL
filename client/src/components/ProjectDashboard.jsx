import { useState, useEffect } from 'react';

const ProjectDashboard = ({ projectId, onBack }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/projects/${projectId}`)
      .then(res => res.json())
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [projectId]);

  if (loading) return <div className="text-center py-10">Loading project details...</div>;
  if (!project) return <div className="text-center py-10 text-red-500">Project not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-blue-600 hover:underline">&larr; Back to Problems</button>
        <button
          onClick={() => onBack('portfolio')}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 shadow-sm"
        >
          View Portfolio
        </button>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
        <p className="text-gray-600">Based on: {project.problem_title} ({project.category})</p>
      </header>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Project Roadmap</h2>
        <div className="space-y-6">
          {project.roadmap.map((phase, index) => (
            <div key={phase.id} className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Phase {index + 1}: {phase.title}</h3>
              <ul className="space-y-2">
                {phase.tasks.map(task => (
                  <li key={task.id} className="flex items-center p-2 bg-gray-50 rounded border border-gray-100">
                    <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" disabled />
                    <span className="text-gray-700">{task.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
