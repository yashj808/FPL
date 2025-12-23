import { useState, useEffect } from 'react';
import { MOCK_MENTORS } from '../data/mockData';

const MentorshipConnect = ({ projectId, onBack }) => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate Fetch
    setTimeout(() => {
        setMentors(MOCK_MENTORS);
        setLoading(false);
    }, 500);
  }, []);

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBook = () => {
    setShowSuccess(true);
    setTimeout(() => {
        setShowSuccess(false);
        setSelectedMentor(null);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={onBack} className="text-blue-600 mb-6 hover:underline">&larr; Back to Dashboard</button>

      <h1 className="text-3xl font-bold mb-2 text-gray-900">Find a Mentor</h1>
      <p className="text-gray-600 mb-8">Connect with industry experts to guide you through your project challenges.</p>

      {loading ? (
          <div className="text-center py-10">Loading Mentors...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map(mentor => (
                <div key={mentor.id} className="bg-white p-6 rounded-lg shadow border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
                        {mentor.image ? <img src={mentor.image} alt={mentor.name} /> : <span className="w-full h-full flex items-center justify-center text-3xl text-gray-400 font-bold">{mentor.name.charAt(0)}</span>}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                    <p className="text-blue-600 font-medium mb-1">{mentor.role}</p>
                    <p className="text-gray-500 text-sm mb-4">{mentor.company}</p>
                    <div className="bg-gray-50 px-3 py-2 rounded text-xs text-gray-600 mb-6 w-full">
                        <strong>Expertise:</strong> {mentor.expertise}
                    </div>
                    <button
                        onClick={() => setSelectedMentor(mentor)}
                        className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
                    >
                        Book Session
                    </button>
                </div>
            ))}
        </div>
      )}

      {selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                {!showSuccess ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Book with {selectedMentor.name}</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Select Date & Time</label>
                            <input
                                type="datetime-local"
                                className="w-full border rounded p-2"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setSelectedMentor(null)} className="px-4 py-2 text-gray-600">Cancel</button>
                            <button onClick={handleBook} className="px-4 py-2 bg-green-600 text-white rounded font-bold">Confirm Booking</button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-6">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
                        <h3 className="text-xl font-bold mb-2">Session Booked!</h3>
                        <p className="text-gray-600">You will receive a calendar invite shortly.</p>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default MentorshipConnect;
