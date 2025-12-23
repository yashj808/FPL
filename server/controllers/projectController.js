const pool = require('../config/db');
const crypto = require('crypto');

// Helper: Calculate roadmap dates
const calculateDates = (phases, startDate, hoursPerWeek) => {
  let currentDate = new Date(startDate);

  return phases.map(phase => {
    let phaseHours = 0;
    phase.tasks.forEach(task => {
        // Assign mock hours if not present
        task.estimated_hours = task.estimated_hours || 5;
        phaseHours += task.estimated_hours;
    });

    const weeksNeeded = Math.ceil(phaseHours / hoursPerWeek);
    const phaseStartDate = new Date(currentDate);
    // Add weeks to current date
    currentDate.setDate(currentDate.getDate() + (weeksNeeded * 7));
    const phaseEndDate = new Date(currentDate);

    return {
        ...phase,
        start_date: phaseStartDate,
        end_date: phaseEndDate
    };
  });
};

// Mock AI Roadmap Generator
const generateRoadmap = async (title, category) => {
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

  if (category && category.includes('AI')) {
      phases[1].tasks.push('Select AI model/framework');
      phases[2].tasks.push('Train/Fine-tune AI model');
  }

  return phases;
};

exports.createProject = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const { user_id, problem_id, title, category, deadline, hours_per_week } = req.body;

    // 1. Create Project
    const inviteToken = crypto.randomBytes(8).toString('hex');

    // Check if problem_id is string (generated) -> if so, insert it first?
    // For simplicity, we might just store null problem_id if it's generated on fly, or insert it.
    // Let's assume for this demo, if problem_id is string, we treat it as ad-hoc and insert "Custom Problem"
    // OR just use null and rely on title/category.
    // BETTER: If problem_id is not integer, insert into problems table first.

    let finalProblemId = problem_id;
    if (typeof problem_id === 'string' && problem_id.startsWith('gen-')) {
        const [probResult] = await connection.query(
            'INSERT INTO problems (title, description, category, difficulty, tags) VALUES (?, ?, ?, ?, ?)',
            [title, `Generated project for ${category}`, category, 'Intermediate', JSON.stringify(['Generated'])]
        );
        finalProblemId = probResult.insertId;
    }

    const [projectResult] = await connection.query(
      'INSERT INTO projects (user_id, problem_id, title, deadline, hours_per_week, invite_token) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, finalProblemId, title, deadline, hours_per_week, inviteToken]
    );
    const projectId = projectResult.insertId;

    // 1.5 Add Creator as Member (Owner)
    await connection.query(
        'INSERT INTO project_members (project_id, user_id, role) VALUES (?, ?, ?)',
        [projectId, user_id, 'owner']
    );

    // 2. Generate Roadmap
    let roadmapPhases = await generateRoadmap(title, category);

    // 2.5 Calculate Dates
    if (deadline && hours_per_week) {
        roadmapPhases = calculateDates(roadmapPhases, new Date(), hours_per_week);
    }

    // 3. Save Roadmap
    for (let i = 0; i < roadmapPhases.length; i++) {
      const phaseData = roadmapPhases[i];
      const [phaseResult] = await connection.query(
        'INSERT INTO roadmap_phases (project_id, title, order_index, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
        [projectId, phaseData.title, i, phaseData.start_date, phaseData.end_date]
      );
      const phaseId = phaseResult.insertId;

      for (let j = 0; j < phaseData.tasks.length; j++) {
        await connection.query(
          'INSERT INTO tasks (phase_id, title, order_index, estimated_hours) VALUES (?, ?, ?, ?)',
          [phaseId, phaseData.tasks[j], j, phaseData.tasks[j].estimated_hours || 5]
        );
      }
    }

    await connection.commit();
    res.status(201).json({ message: 'Project created successfully', projectId: projectId });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    connection.release();
  }
};

exports.getProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Get Project Info
    const [projectRows] = await pool.query(
      `SELECT p.*, prob.title as problem_title, prob.category
       FROM projects p
       LEFT JOIN problems prob ON p.problem_id = prob.id
       WHERE p.id = ?`,
      [id]
    );

    if (projectRows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const project = projectRows[0];

    // Get Members
    const [members] = await pool.query(
        `SELECT u.id, u.name, u.email, pm.role
         FROM project_members pm
         JOIN users u ON pm.user_id = u.id
         WHERE pm.project_id = ?`,
        [id]
    );
    project.members = members;

    // Get Roadmap (Phases & Tasks)
    const [phasesRows] = await pool.query(
      'SELECT * FROM roadmap_phases WHERE project_id = ? ORDER BY order_index',
      [id]
    );
    const phases = phasesRows;

    let totalTasks = 0;
    let completedTasks = 0;

    for (let phase of phases) {
      const [tasksRows] = await pool.query(
        'SELECT * FROM tasks WHERE phase_id = ? ORDER BY order_index',
        [phase.id]
      );
      phase.tasks = tasksRows;

      // Calculate Phase Progress
      const phaseTotal = tasksRows.length;
      const phaseCompleted = tasksRows.filter(t => t.status === 'completed').length;
      phase.progress = phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0;

      totalTasks += phaseTotal;
      completedTasks += phaseCompleted;
    }

    project.roadmap = phases;
    project.overall_progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Identify current phase
    const currentPhase = phases.find(p => p.progress < 100) || phases[phases.length - 1];
    project.current_phase = currentPhase ? currentPhase.title : 'Completed';

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.generateInvite = async (req, res) => {
    try {
        const { id } = req.params;
        // Verify user is owner (skipped for demo simplicity, assuming caller checks)
        const [rows] = await pool.query('SELECT invite_token FROM projects WHERE id = ?', [id]);
        if(rows.length === 0) return res.status(404).json({error: 'Project not found'});
        res.json({ token: rows[0].invite_token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.joinProject = async (req, res) => {
    try {
        const { token, user_id } = req.body;

        // Find project by token
        const [projects] = await pool.query('SELECT id FROM projects WHERE invite_token = ?', [token]);
        if (projects.length === 0) return res.status(404).json({ error: 'Invalid invite link' });

        const projectId = projects[0].id;

        // Check if already member
        const [existing] = await pool.query(
            'SELECT * FROM project_members WHERE project_id = ? AND user_id = ?',
            [projectId, user_id]
        );
        if (existing.length > 0) return res.status(400).json({ error: 'Already a member' });

        // Add member
        await pool.query(
            'INSERT INTO project_members (project_id, user_id, role) VALUES (?, ?, ?)',
            [projectId, user_id, 'member']
        );

        res.json({ message: 'Joined project successfully', projectId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
