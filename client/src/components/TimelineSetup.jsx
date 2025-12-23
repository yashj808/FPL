import { useState } from 'react';

const TimelineSetup = ({ problem, onConfirm, onCancel }) => {
  const [deadline, setDeadline] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate estimated duration (simple mock logic)
  // Assuming a standard project takes ~100 hours
  const totalHours = 100;
  const estimatedWeeks = Math.ceil(totalHours / hoursPerWeek);

  const handleConfirm = () => {
    if (!deadline) {
      alert("Please select a target deadline.");
      return;
    }
    setIsSubmitting(true);
    onConfirm({ deadline, hoursPerWeek });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-8 shadow-2xl">
        <h2 className="text-2xl font-bold mb-2">Project Planning</h2>
        <p className="text-gray-600 mb-6">Let's set up a realistic timeline for <strong>{problem.title}</strong>.</p>

        <div className="mb-6">
           <label className="block text-gray-700 font-medium mb-2">Target Deadline</label>
           <input
             type="date"
             className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
             min={new Date().toISOString().split('T')[0]}
             value={deadline}
             onChange={(e) => setDeadline(e.target.value)}
           />
        </div>

        <div className="mb-8">
           <label className="block text-gray-700 font-medium mb-2">Weekly Availability: <span className="text-blue-600 font-bold">{hoursPerWeek} hours</span></label>
           <input
             type="range"
             min="2"
             max="40"
             step="1"
             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
             value={hoursPerWeek}
             onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
           />
           <div className="flex justify-between text-xs text-gray-500 mt-2">
             <span>2 hrs/week</span>
             <span>40 hrs/week</span>
           </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-8 border border-blue-100">
           <h4 className="font-bold text-blue-800 mb-1">Estimated Timeline</h4>
           <p className="text-blue-700 text-sm">
             Based on your availability, this project will take approximately <strong>{estimatedWeeks} weeks</strong>.
           </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 text-gray-600 hover:text-gray-800 font-medium"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Project...' : 'Create Project Plan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelineSetup;
