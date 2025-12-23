import { useState, useEffect } from 'react';

const MentorshipConnect = ({ onBack, projectId }) => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [notes, setNotes] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null); // null, 'success', 'error'

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/mentors`)
      .then(res => res.json())
      .then(data => setMentors(data))
      .catch(err => console.error('Error fetching mentors:', err));
  }, []);

  const handleBookSession = () => {
    if (!projectId) {
      alert("Please create or select a project first.");
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/mentors/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mentor_id: selectedMentor.id,
        project_id: projectId,
        notes: notes
      })
    })
    .then(res => {
      if (res.ok) {
        setBookingStatus('success');
        setTimeout(() => {
          setSelectedMentor(null);
          setBookingStatus(null);
          setNotes('');
        }, 2000);
      } else {
        setBookingStatus('error');
      }
    })
    .catch(() => setBookingStatus('error'));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center"
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-3xl font-bold mb-2">Mentor Connect</h2>
      <p className="text-gray-600 mb-8">Get guidance from industry experts for your project.</p>

      {!projectId && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700">
            Note: You need to start a project to book a session. You can still browse mentors below.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map(mentor => (
          <div key={mentor.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{mentor.name}</h3>
                <p className="text-blue-600 font-medium">{mentor.title} at {mentor.company}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {mentor.name.charAt(0)}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Expertise</p>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.split(',').map((skill, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-6 line-clamp-3">{mentor.bio}</p>

            <button
              onClick={() => setSelectedMentor(mentor)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              disabled={!projectId}
            >
              Book Session
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-4">Book with {selectedMentor.name}</h3>

            {bookingStatus === 'success' ? (
              <div className="text-green-600 text-center py-8">
                <p className="text-xl font-bold">Session Booked!</p>
                <p>Check your email for calendar invite.</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">What do you want to discuss?</label>
                  <textarea
                    className="w-full border border-gray-300 rounded p-2 h-32"
                    placeholder="Describe your questions or blockers..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedMentor(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBookSession}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Confirm Booking
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorshipConnect;
