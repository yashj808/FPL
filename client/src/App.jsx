import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/`)
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">ProjNavigator</h1>
        <p className="text-xl text-gray-700">Your Guided Academic Project Builder</p>
      </header>

      <main className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome</h2>
          <p className="text-gray-600 mb-4">
            ProjNavigator is an interactive, mentor-guided platform that helps engineering students systematically discover real-world problems, design structured solutions, and build meaningful projects.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="text-blue-700">Backend Status: <span className="font-semibold">{message || 'Loading...'}</span></p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
            <h3 className="text-lg font-bold mb-2">Problem Discovery</h3>
            <p className="text-sm text-gray-600">Find real-world problems and check problem-solution fit.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
            <h3 className="text-lg font-bold mb-2">Structured Builder</h3>
            <p className="text-sm text-gray-600">Step-by-step roadmap generator and progress tracking.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
            <h3 className="text-lg font-bold mb-2">Mentor Connect</h3>
            <p className="text-sm text-gray-600">Get guidance from industry pros and peers.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
            <h3 className="text-lg font-bold mb-2">Portfolio Generator</h3>
            <p className="text-sm text-gray-600">Create presentation-ready portfolios automatically.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
