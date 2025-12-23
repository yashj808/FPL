DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS roadmap_phases;
DROP TABLE IF EXISTS mentorship_sessions;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS mentors;
DROP TABLE IF EXISTS problems;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    company VARCHAR(100),
    expertise VARCHAR(255), -- Comma separated or just text
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE problems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    difficulty VARCHAR(50),
    tags JSON, -- Using JSON for array storage in MySQL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    problem_id INT,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'planning',
    portfolio_summary TEXT, -- For the portfolio generator
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (problem_id) REFERENCES problems(id)
);

CREATE TABLE mentorship_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    mentor_id INT,
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, completed, cancelled
    scheduled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- For demo, we just say "now" or "future"
    notes TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES mentors(id) ON DELETE CASCADE
);

CREATE TABLE roadmap_phases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    title VARCHAR(100) NOT NULL,
    order_index INT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phase_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    order_index INT NOT NULL,
    FOREIGN KEY (phase_id) REFERENCES roadmap_phases(id) ON DELETE CASCADE
);
