DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS roadmap_phases;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS problems;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE problems (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    difficulty VARCHAR(50),
    tags TEXT[], -- Array of strings
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    problem_id INTEGER REFERENCES problems(id),
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'planning', -- planning, in-progress, completed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roadmap_phases (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    order_index INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' -- pending, in-progress, completed
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    phase_id INTEGER REFERENCES roadmap_phases(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, in-progress, completed
    order_index INTEGER NOT NULL
);
