import { useState } from 'react';
import ProblemBank from './components/ProblemBank';
import ProjectDashboard from './components/ProjectDashboard';

function App() {
  const [currentView, setCurrentView] = useState('home'); // home, project
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const handleSelectProblem = (problem) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Create Project
    fetch(`${apiUrl}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 1, // Hardcoded user for demo
        problem_id: problem.id,
        title: `My ${problem.title} Project`,
        category: problem.category
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.projectId) {
        setCurrentProjectId(data.projectId);
        setCurrentView('project');
      }
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            ProjNavigator
          </div>
          <div className="space-x-4">
            <button onClick={() => setCurrentView('home')} className="text-gray-600 hover:text-blue-600">Problems</button>
            {currentProjectId && (
              <button onClick={() => setCurrentView('project')} className="text-gray-600 hover:text-blue-600">Current Project</button>
            )}
            <button className="text-gray-600 hover:text-blue-600">Mentors</button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {currentView === 'home' && (
          <div className="flex flex-col items-center">
            <header className="w-full bg-blue-600 text-white py-16 text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Turn Real Problems into Impactful Projects</h1>
              <p className="text-xl opacity-90">Discover, Plan, and Build with Mentor Guidance.</p>
            </header>
            <ProblemBank onSelectProblem={handleSelectProblem} />
          </div>
        )}

        {currentView === 'project' && (
          <ProjectDashboard
            projectId={currentProjectId}
            onBack={() => setCurrentView('home')}
          />
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; 2024 ProjNavigator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
