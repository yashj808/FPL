import { useState, useEffect } from 'react';
import { MOCK_PROJECT_TEMPLATE } from '../data/mockData';

const ProjectDashboard = ({ projectId, projectData, onBack }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If projectData is passed directly (from App state), use it
    if (projectData) {
        setProject(projectData);
        setLoading(false);
    } else {
        // Fallback to mock template if testing isolated component
        // or if finding by ID from a global mock list (not implemented here for simplicity)
        setTimeout(() => {
            setProject(MOCK_PROJECT_TEMPLATE);
            setLoading(false);
        }, 300);
    }
  }, [projectId, projectData]);

  const [inviteToken, setInviteToken] = useState('');
  const [showInvite, setShowInvite] = useState(false);

  const generateInvite = () => {
    // Mock Invite
    setInviteToken(Math.random().toString(36).substring(7));
    setShowInvite(true);
  };

  const formatDate = (dateVal) => {
    if (!dateVal) return 'N/A';
    try {
        const d = new Date(dateVal);
        if (isNaN(d.getTime())) return 'Invalid Date';
        return d.toLocaleDateString();
    } catch (e) {
        return 'Invalid Date';
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!project) return <div className="text-center py-10">No Project</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => onBack('home')} className="text-blue-600 hover:underline">&larr; Back to Problems</button>
        <button
          onClick={() => onBack('portfolio')}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 shadow-sm"
        >
          View Portfolio
        </button>
      </div>

       {/* Header */}
       <header className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                <p className="text-gray-600 mb-2">Based on: {project.problem_title || 'Custom Problem'} <span className="text-gray-400">|</span> {project.category}</p>
                <div className="flex gap-4 text-sm mt-4">
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded">
                        <strong>Current Phase:</strong> {project.current_phase || 'N/A'}
                    </div>
                    <div className="bg-green-50 text-green-700 px-3 py-1 rounded">
                        <strong>Overall Progress:</strong> {project.overall_progress || 0}%
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="text-right">
                <h3 className="font-bold text-gray-700 mb-2">Team Members</h3>
                <div className="flex -space-x-2 justify-end mb-4">
                    {project.members && project.members.map(member => (
                        <div key={member.id} className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center border-2 border-white text-xs font-bold" title={member.name}>
                            {member.name ? member.name.charAt(0) : '?'}
                        </div>
                    ))}
                    <button
                        onClick={generateInvite}
                        className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center border-2 border-white hover:bg-gray-300"
                        title="Invite Member"
                    >
                        +
                    </button>
                </div>
                {showInvite && (
                    <div className="bg-yellow-50 p-2 rounded text-xs border border-yellow-200 absolute right-4 z-10 shadow-lg">
                        <p className="font-bold text-yellow-800 mb-1">Share this invite code:</p>
                        <code className="bg-white px-2 py-1 rounded border block text-center mb-1 select-all font-mono">{inviteToken}</code>
                        <button onClick={() => setShowInvite(false)} className="text-gray-500 hover:text-gray-800 underline text-xs">Close</button>
                    </div>
                )}
            </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${project.overall_progress || 0}%` }}></div>
        </div>
      </header>

      {/* Roadmap Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Project Roadmap & Timeline</h2>
        <div className="space-y-8">
          {project.roadmap && project.roadmap.map((phase, index) => (
            <div key={phase.id} className="relative pl-8 border-l-2 border-blue-200">
              {/* Timeline Dot */}
              <div className={`absolute -left-2.5 top-0 w-5 h-5 rounded-full border-4 border-white ${phase.progress === 100 ? 'bg-green-500' : (phase.progress > 0 ? 'bg-blue-500' : 'bg-gray-300')}`}></div>

              <div className="flex justify-between items-start mb-2">
                 <div>
                    <h3 className="text-xl font-semibold text-gray-800">{phase.title}</h3>
                    <p className="text-sm text-gray-500">
                        {formatDate(phase.start_date)} - {formatDate(phase.end_date)}
                    </p>
                 </div>
                 <span className={`text-sm font-bold px-2 py-1 rounded ${phase.progress === 100 ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'}`}>
                    {phase.progress || 0}% Done
                 </span>
              </div>

              <ul className="space-y-3 mt-4">
                {phase.tasks && phase.tasks.map(task => (
                  <li key={task.id} className="flex items-center p-3 bg-gray-50 rounded border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                    <input type="checkbox" className="mr-3 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" disabled checked={task.status === 'completed'} />
                    <div className="flex-grow">
                        <span className="text-gray-800 font-medium block">{task.title}</span>
                        <span className="text-xs text-gray-500">Est. {task.estimated_hours} hrs</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {(!project.roadmap || project.roadmap.length === 0) && <p className="text-gray-500">No roadmap available.</p>}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
