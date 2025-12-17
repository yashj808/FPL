const pool = require('../config/db');

// Mock AI Roadmap Generator
const generateRoadmap = async (projectTitle, problemCategory) => {
  // In a real app, this would call GPT-4.
  // Here we use template logic based on category.

  const phases = [
    {
      title: 'Planning & Requirements',
      tasks: [
        'Define project scope and deliverables',
        'Identify target audience and use cases',
        'Select technology stack',
        'Create functional requirements document'
      ]
    },
    {
      title: 'Design & Architecture',
      tasks: [
        'Design database schema',
        'Create API specifications',
        'Design UI/UX wireframes',
        'Setup project repository and CI/CD'
      ]
    },
    {
      title: 'Core Development',
      tasks: [
        'Implement backend API endpoints',
        'Develop frontend components',
        'Integrate database',
        'Implement core business logic'
      ]
    },
    {
      title: 'Testing & Refinement',
      tasks: [
        'Write unit and integration tests',
        'Perform user acceptance testing',
        'Fix bugs and optimize performance',
        'Prepare documentation'
      ]
    }
  ];

  // Customize slightly based on category
  if (problemCategory && problemCategory.includes('AI')) {
      phases[1].tasks.push('Select AI model/framework');
      phases[2].tasks.push('Train/Fine-tune AI model');
  }

  return phases;
};

exports.createProject = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { user_id, problem_id, title, category } = req.body;

    // 1. Create Project
    const projectResult = await client.query(
      'INSERT INTO projects (user_id, problem_id, title) VALUES ($1, $2, $3) RETURNING *',
      [user_id, problem_id, title]
    );
    const project = projectResult.rows[0];

    // 2. Generate Roadmap
    const roadmapPhases = await generateRoadmap(title, category);

    // 3. Save Roadmap
    for (let i = 0; i < roadmapPhases.length; i++) {
      const phaseData = roadmapPhases[i];
      const phaseResult = await client.query(
        'INSERT INTO roadmap_phases (project_id, title, order_index) VALUES ($1, $2, $3) RETURNING id',
        [project.id, phaseData.title, i]
      );
      const phaseId = phaseResult.rows[0].id;

      for (let j = 0; j < phaseData.tasks.length; j++) {
        await client.query(
          'INSERT INTO tasks (phase_id, title, order_index) VALUES ($1, $2, $3)',
          [phaseId, phaseData.tasks[j], j]
        );
      }
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Project created successfully', projectId: project.id });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
};

exports.getProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Get Project Info
    const projectResult = await pool.query(
      `SELECT p.*, prob.title as problem_title, prob.category
       FROM projects p
       JOIN problems prob ON p.problem_id = prob.id
       WHERE p.id = $1`,
      [id]
    );

    if (projectResult.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const project = projectResult.rows[0];

    // Get Roadmap (Phases & Tasks)
    const phasesResult = await pool.query(
      'SELECT * FROM roadmap_phases WHERE project_id = $1 ORDER BY order_index',
      [id]
    );
    const phases = phasesResult.rows;

    for (let phase of phases) {
      const tasksResult = await pool.query(
        'SELECT * FROM tasks WHERE phase_id = $1 ORDER BY order_index',
        [phase.id]
      );
      phase.tasks = tasksResult.rows;
    }

    project.roadmap = phases;
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
