INSERT INTO users (name, email) VALUES
('Test User', 'student@university.edu');

INSERT INTO problems (title, description, category, difficulty, tags) VALUES
('Smart Water Management System', 'Design a system to monitor and optimize water usage in urban apartment complexes using IoT sensors and data analytics.', 'IoT/Sustainability', 'Intermediate', ARRAY['IoT', 'Data Analytics', 'Smart City']),
('AI-Powered Traffic Control', 'Develop an adaptive traffic light control system that uses computer vision to adjust signal timings based on real-time traffic density.', 'AI/ML', 'Advanced', ARRAY['Computer Vision', 'Python', 'Urban Planning']),
('Blockchain-based Supply Chain', 'Create a transparent supply chain tracking system for agricultural products to ensure fair pricing and prevent fraud.', 'Blockchain', 'Advanced', ARRAY['Blockchain', 'Web3', 'Supply Chain']),
('Telemedicine Platform for Rural Areas', 'Build a low-bandwidth telemedicine app connecting patients in remote villages with doctors in cities.', 'Healthcare/Web', 'Intermediate', ARRAY['React', 'WebRTC', 'Healthcare']),
('Disaster Response Coordination App', 'A mobile app to coordinate volunteers and resources during natural disasters with offline capabilities.', 'Mobile App', 'Intermediate', ARRAY['Flutter/React Native', 'Offline-First', 'Social Impact']);
