export const MOCK_PROBLEMS = [
  {
    id: 1,
    title: "AI-Powered Waste Sorting",
    description: "Build a system that uses computer vision to categorize waste items into recyclable, organic, and hazardous categories to improve municipal waste management.",
    category: "Environment",
    difficulty: "Intermediate",
    tags: ["AI", "Computer Vision", "IoT"]
  },
  {
    id: 2,
    title: "Decentralized Voting System",
    description: "Create a secure, transparent voting application using blockchain technology to prevent fraud and ensure verifiable results for local communities.",
    category: "Blockchain",
    difficulty: "Advanced",
    tags: ["Blockchain", "Security", "Web3"]
  },
  {
    id: 3,
    title: "Mental Health Chatbot",
    description: "Develop a compassionate chatbot using NLP to provide initial support, resources, and daily check-ins for students facing academic stress.",
    category: "Health",
    difficulty: "Intermediate",
    tags: ["AI", "NLP", "Healthcare"]
  },
  {
    id: 4,
    title: "Smart Traffic Management",
    description: "Simulate and optimize traffic light timings based on real-time density data to reduce congestion in urban areas.",
    category: "Smart City",
    difficulty: "Advanced",
    tags: ["Simulation", "Data Science", "Algorithms"]
  }
];

export const MOCK_MENTORS = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Senior AI Researcher",
    company: "DeepMind",
    expertise: "Machine Learning, Computer Vision",
    image: null
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Staff Engineer",
    company: "Netflix",
    expertise: "Distributed Systems, Backend",
    image: null
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Product Designer",
    company: "Airbnb",
    expertise: "UX/UI, User Research",
    image: null
  },
  {
    id: 4,
    name: "Michael Chang",
    role: "Blockchain Developer",
    company: "ConsenSys",
    expertise: "Smart Contracts, Ethereum",
    image: null
  }
];

export const MOCK_PROJECT_TEMPLATE = {
    id: 1,
    title: "My AI Waste Sorter Project",
    problem_title: "AI-Powered Waste Sorting",
    category: "Environment",
    current_phase: "Planning & Requirements",
    overall_progress: 15,
    members: [
        { id: 1, name: "You" }
    ],
    roadmap: [
        {
            id: 'p1',
            title: 'Planning & Requirements',
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 86400000 * 7).toISOString(),
            progress: 60,
            tasks: [
                { id: 't1', title: 'Define project scope and deliverables', estimated_hours: 5, status: 'completed' },
                { id: 't2', title: 'Identify target audience', estimated_hours: 3, status: 'completed' },
                { id: 't3', title: 'Select technology stack', estimated_hours: 4, status: 'pending' },
            ]
        },
        {
            id: 'p2',
            title: 'Design & Architecture',
            start_date: new Date(Date.now() + 86400000 * 8).toISOString(),
            end_date: new Date(Date.now() + 86400000 * 21).toISOString(),
            progress: 0,
            tasks: [
                { id: 't4', title: 'Design database schema', estimated_hours: 8, status: 'pending' },
                { id: 't5', title: 'Create API specifications', estimated_hours: 6, status: 'pending' },
            ]
        },
        {
            id: 'p3',
            title: 'Core Development',
            start_date: new Date(Date.now() + 86400000 * 22).toISOString(),
            end_date: new Date(Date.now() + 86400000 * 50).toISOString(),
            progress: 0,
            tasks: [
                { id: 't6', title: 'Implement backend API', estimated_hours: 20, status: 'pending' },
                { id: 't7', title: 'Develop frontend components', estimated_hours: 20, status: 'pending' },
            ]
        }
    ]
};
