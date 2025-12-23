DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS roadmap_phases;
DROP TABLE IF EXISTS mentorship_sessions;
DROP TABLE IF EXISTS project_members;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS mentors;
DROP TABLE IF EXISTS problems;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    skill_level VARCHAR(50), -- Beginner, Intermediate, Advanced
    domain_interest JSON, -- Array of strings e.g. ["AI", "Web"]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    company VARCHAR(100),
    expertise VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE problems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    difficulty VARCHAR(50),
    tags JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- This will be the creator/owner initially
    problem_id INT, -- Can be null if generated on the fly? Let's keep it linked or create ad-hoc problems.
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'planning',
    portfolio_summary TEXT,
    deadline DATE,
    hours_per_week INT,
    invite_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
    -- FOREIGN KEY (problem_id) REFERENCES problems(id) -- Relaxed constraint for generated problems if needed
);

CREATE TABLE project_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    role VARCHAR(50) DEFAULT 'member', -- owner, member
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE mentorship_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    mentor_id INT,
    status VARCHAR(50) DEFAULT 'scheduled',
    scheduled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phase_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    order_index INT NOT NULL,
    estimated_hours INT DEFAULT 0,
    FOREIGN KEY (phase_id) REFERENCES roadmap_phases(id) ON DELETE CASCADE
);
