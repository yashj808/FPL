import { useState } from 'react';

const UserOnboarding = ({ userId, onComplete }) => {
  const [step, setStep] = useState(1);
  const [skillLevel, setSkillLevel] = useState('');
  const [interests, setInterests] = useState([]);

  const availableInterests = ['Web Development', 'AI/ML', 'IoT', 'Blockchain', 'Mobile App', 'Cybersecurity', 'Data Science'];

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = () => {
    // Mock Submission (Frontend only mode)
    setTimeout(() => {
        onComplete({ skillLevel, interests });
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome to ProjNavigator</h2>
        <p className="text-gray-600 text-center mb-8">Let's personalize your experience to find the perfect project.</p>

        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">What is your current skill level?</h3>
            <div className="space-y-3">
              {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                <div
                  key={level}
                  className={`p-4 border rounded-lg cursor-pointer flex items-center transition-colors ${skillLevel === level ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                  onClick={() => setSkillLevel(level)}
                >
                  <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${skillLevel === level ? 'border-blue-600' : 'border-gray-400'}`}>
                    {skillLevel === level && <div className="w-3 h-3 rounded-full bg-blue-600"></div>}
                  </div>
                  <span className="font-medium text-lg">{level}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!skillLevel}
                className={`px-6 py-2 rounded-lg font-semibold text-white ${skillLevel ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Next Step →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Which domains interest you?</h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {availableInterests.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full border font-medium transition-colors ${
                    interests.includes(interest)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
               <button
                onClick={() => setStep(1)}
                className="text-gray-500 hover:text-gray-800"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={interests.length === 0}
                className={`px-6 py-2 rounded-lg font-semibold text-white ${interests.length > 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Start My Journey
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOnboarding;
