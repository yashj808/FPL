INSERT INTO users (name, email, skill_level, domain_interest) VALUES
('Student One', 'student1@university.edu', 'Intermediate', '["Web", "AI"]'),
('Student Two', 'student2@university.edu', 'Beginner', '["IoT"]');

INSERT INTO mentors (name, title, company, expertise, bio) VALUES
('Dr. Sarah Chen', 'Senior AI Researcher', 'DeepMind', 'AI/ML, Computer Vision', '10+ years in AI research with a focus on sustainable computing.'),
('James Wilson', 'Lead Software Architect', 'Google', 'Cloud Architecture, Scalability', 'Expert in distributed systems and cloud infrastructure.'),
('Anita Patel', 'Product Manager', 'Microsoft', 'Product Strategy, UX/UI', 'Passionate about helping students find product-market fit.'),
('David Kim', 'Blockchain Developer', 'Coinbase', 'Blockchain, Smart Contracts', 'Specializes in DeFi and supply chain transparency solutions.');

INSERT INTO problems (title, description, category, difficulty, tags) VALUES
('Smart Water Management System', 'Design a system to monitor and optimize water usage in urban apartment complexes using IoT sensors and data analytics.', 'IoT/Sustainability', 'Intermediate', '["IoT", "Data Analytics", "Smart City"]'),
('AI-Powered Traffic Control', 'Develop an adaptive traffic light control system that uses computer vision to adjust signal timings based on real-time traffic density.', 'AI/ML', 'Advanced', '["Computer Vision", "Python", "Urban Planning"]'),
('Blockchain-based Supply Chain', 'Create a transparent supply chain tracking system for agricultural products to ensure fair pricing and prevent fraud.', 'Blockchain', 'Advanced', '["Blockchain", "Web3", "Supply Chain"]'),
('Telemedicine Platform for Rural Areas', 'Build a low-bandwidth telemedicine app connecting patients in remote villages with doctors in cities.', 'Healthcare/Web', 'Intermediate', '["React", "WebRTC", "Healthcare"]'),
('Disaster Response Coordination App', 'A mobile app to coordinate volunteers and resources during natural disasters with offline capabilities.', 'Mobile App', 'Intermediate', '["Flutter/React Native", "Offline-First", "Social Impact"]');
