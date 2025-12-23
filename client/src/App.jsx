import { useState } from 'react';
import ProblemBank from './components/ProblemBank';
import ProjectDashboard from './components/ProjectDashboard';
import MentorshipConnect from './components/MentorshipConnect';
import PortfolioGenerator from './components/PortfolioGenerator';
import UserOnboarding from './components/UserOnboarding';
import IdeaGenerator from './components/IdeaGenerator';
import TimelineSetup from './components/TimelineSetup';
import { MOCK_PROJECT_TEMPLATE } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('onboarding');
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);

  // Local state for projects (Mock DB)
  const [projects, setProjects] = useState([]);

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
  };

  const handleCreateProject = ({ deadline, hoursPerWeek }) => {
    const totalPhases = MOCK_PROJECT_TEMPLATE.roadmap.length;
    const start = new Date();
    const end = new Date(deadline);
    const totalDuration = end - start;
    const phaseDuration = totalDuration / totalPhases;

    // Generate Mock Project with distributed dates
    const newProject = {
        ...MOCK_PROJECT_TEMPLATE,
        id: Date.now(),
        title: selectedProblem.title.startsWith('My ') ? selectedProblem.title : `My ${selectedProblem.title} Project`,
        problem_title: selectedProblem.title,
        category: selectedProblem.category,
        overall_progress: 0,
        current_phase: 'Planning',
        roadmap: MOCK_PROJECT_TEMPLATE.roadmap.map((p, index) => {
            const pStart = new Date(start.getTime() + (phaseDuration * index));
            const pEnd = new Date(pStart.getTime() + phaseDuration);
            return {
                ...p,
                start_date: pStart.toISOString(),
                end_date: pEnd.toISOString()
            };
        })
    };

    setProjects([...projects, newProject]);
    setCurrentProjectId(newProject.id);
    setSelectedProblem(null);
    setCurrentView('project');
  };

  const currentProjectData = projects.find(p => p.id === currentProjectId);

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
            <button onClick={() => setCurrentView('mentors')} className="text-gray-600 hover:text-blue-600">Mentors</button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {currentView === 'onboarding' && (
           <UserOnboarding
             userId={1}
             onComplete={(profile) => {
               setUserProfile(profile);
               setCurrentView('home');
             }}
           />
        )}

        {currentView === 'home' && (
          <div className="flex flex-col items-center">
            <header className="w-full bg-blue-600 text-white py-16 text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Turn Real Problems into Impactful Projects</h1>
              <p className="text-xl opacity-90">Discover, Plan, and Build with Mentor Guidance.</p>
            </header>

            <div className="container mx-auto px-4">
              <IdeaGenerator onSelectProblem={handleSelectProblem} />
              <div className="border-t border-gray-200 my-8 pt-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Or Choose from our Problem Bank</h2>
                <ProblemBank onSelectProblem={handleSelectProblem} />
              </div>
            </div>

            {selectedProblem && (
              <TimelineSetup
                problem={selectedProblem}
                onConfirm={handleCreateProject}
                onCancel={() => setSelectedProblem(null)}
              />
            )}
          </div>
        )}

        {currentView === 'project' && (
          <ProjectDashboard
            projectId={currentProjectId}
            projectData={currentProjectData}
            onBack={(action) => {
              if (action === 'portfolio') setCurrentView('portfolio');
              else setCurrentView('home');
            }}
          />
        )}

        {currentView === 'portfolio' && (
          <PortfolioGenerator
            projectId={currentProjectId}
            projectData={currentProjectData}
            onBack={() => setCurrentView('project')}
          />
        )}

        {currentView === 'mentors' && (
          <MentorshipConnect
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
