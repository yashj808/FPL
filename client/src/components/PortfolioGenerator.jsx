import { useState, useEffect } from 'react';

const PortfolioGenerator = ({ projectId, onBack }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div>Loading Portfolio...</div>;
  if (!project) return <div>Project not found</div>;

  const completedPhases = project.roadmap ? project.roadmap.filter(p => p.status === 'completed').length : 0;
  const totalPhases = project.roadmap ? project.roadmap.length : 0;
  const progressPercentage = totalPhases > 0 ? Math.round((completedPhases / totalPhases) * 100) : 0;

  return (
    <div className="bg-gray-100 min-h-screen p-8 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden print:shadow-none">

        {/* Actions Bar (Hidden on Print) */}
        <div className="p-4 bg-gray-800 text-white flex justify-between items-center print:hidden">
          <button onClick={onBack} className="text-gray-300 hover:text-white">← Back to Dashboard</button>
          <button
            onClick={handlePrint}
            className="bg-blue-600 px-4 py-2 rounded font-bold hover:bg-blue-500"
          >
            Export to PDF / Print
          </button>
        </div>

        {/* Portfolio Content */}
        <div className="p-12">
          {/* Header */}
          <header className="border-b-2 border-gray-100 pb-8 mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{project.title}</h1>
            <p className="text-xl text-gray-500">{project.category} Project</p>
            <div className="mt-4 flex items-center gap-4">
               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                 Status: {project.status.toUpperCase()}
               </span>
               <span className="text-gray-400">|</span>
               <span className="text-gray-600">
                 Date: {new Date(project.created_at).toLocaleDateString()}
               </span>
            </div>
          </header>

          {/* Problem Statement */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm border-l-4 border-blue-600 pl-3">
              The Problem
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{project.problem_title}</h3>
              <p className="text-gray-700 leading-relaxed">
                {/* We assume we have the description from the fetch */}
                (Problem Description would be here. For now, using title as placeholder context.)
                The goal of this project was to address challenges in {project.category} by building a robust solution.
              </p>
            </div>
          </section>

          {/* Solution & Tech Stack */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm border-l-4 border-blue-600 pl-3">
              Solution & Technologies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-2">Approach</h3>
                <p className="text-gray-700">
                  We adopted a structured development lifecycle, starting from requirements gathering to iterative development and testing.
                  The solution focuses on scalability and user experience.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Key Technologies</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {/* Mocking tech stack based on category */}
                  <li>Frontend: React, TailwindCSS</li>
                  <li>Backend: Node.js, Express</li>
                  <li>Database: MySQL</li>
                  {project.category && project.category.includes('AI') && <li>AI/ML: Python, TensorFlow/PyTorch</li>}
                  {project.category && project.category.includes('IoT') && <li>Hardware: Arduino/Raspberry Pi</li>}
                </ul>
              </div>
            </div>
          </section>

          {/* Development Roadmap */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm border-l-4 border-blue-600 pl-3">
              Development Journey
            </h2>
            <div className="space-y-4">
              {project.roadmap && project.roadmap.map((phase, idx) => (
                <div key={idx} className="flex items-start">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4 text-sm">
                     {idx + 1}
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-800">{phase.title}</h4>
                     <p className="text-sm text-gray-500">
                       {phase.tasks ? `${phase.tasks.length} Key Deliverables` : 'Tasks defined'}
                     </p>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer / Contact */}
          <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
             <p>Generated by ProjNavigator • {new Date().getFullYear()}</p>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default PortfolioGenerator;
