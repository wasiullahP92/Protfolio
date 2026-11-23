import http from 'http';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../server.js';
import { seedDatabase } from '../utils/seedData.js';

let mongod;
let server;
let baseUrl;
let adminToken = '';

async function setup() {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test_jwt_secret_key_12345';
  process.env.ADMIN_EMAIL = 'wasiwebsolution@gmail.com';
  process.env.ADMIN_PASSWORD = 'AdminSecurePass123!';

  console.log('\n[Test Suite] Initializing in-memory MongoDB server...');
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  // If already connected, disconnect first
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(uri);
  console.log('[Test Suite] Connected to in-memory MongoDB');

  // Seed initial data
  await seedDatabase();

  // Start HTTP server on dynamic port
  server = http.createServer(app);
  await new Promise((resolve) => {
    server.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      console.log(`[Test Suite] Test server running on ${baseUrl}\n`);
      resolve();
    });
  });
}

async function teardown() {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongod) {
    await mongod.stop();
  }
  console.log('\n[Test Suite] Teardown complete.');
}

// Simple test assertion helper
let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failed++;
  }
}

async function runTests() {
  try {
    await setup();

    console.log('--- 1. HEALTH CHECK & GENERAL ---');
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200 && healthData.status === 'online', 'GET /api/health returns 200 and status online');

    console.log('\n--- 2. AUTHENTICATION (JWT & BCRYPT) ---');
    // Wrong password
    const failLogin = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'wasiwebsolution@gmail.com', password: 'WrongPassword' }),
    });
    assert(failLogin.status === 401, 'POST /api/auth/login with wrong password returns 401');

    // Valid login
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'wasiwebsolution@gmail.com', password: 'AdminSecurePass123!' }),
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200 && Boolean(loginData.token), 'POST /api/auth/login returns 200 with JWT token');
    adminToken = loginData.token;

    // Get Admin Profile without token
    const noAuthMe = await fetch(`${baseUrl}/api/auth/me`);
    assert(noAuthMe.status === 401, 'GET /api/auth/me without token returns 401 Unauthorized');

    // Get Admin Profile with token
    const authMe = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const meData = await authMe.json();
    assert(authMe.status === 200 && meData.admin.email === 'wasiwebsolution@gmail.com', 'GET /api/auth/me with Bearer token returns admin profile');

    // Logout
    const logoutRes = await fetch(`${baseUrl}/api/auth/logout`, { method: 'POST' });
    assert(logoutRes.status === 200, 'POST /api/auth/logout returns 200');

    console.log('\n--- 3. PROJECTS CRUD API ---');
    // GET all projects
    const getProjects = await fetch(`${baseUrl}/api/projects`);
    const projectsData = await getProjects.json();
    assert(getProjects.status === 200 && Array.isArray(projectsData.data) && projectsData.data.length > 0, 'GET /api/projects returns seeded projects list');

    const firstProjectId = projectsData.data[0]._id;
    // GET single project by ID
    const getSingle = await fetch(`${baseUrl}/api/projects/${firstProjectId}`);
    const singleData = await getSingle.json();
    assert(getSingle.status === 200 && singleData.data._id === firstProjectId, 'GET /api/projects/:id returns single project');

    // POST create project without auth
    const unauthPost = await fetch(`${baseUrl}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test Project' }),
    });
    assert(unauthPost.status === 401, 'POST /api/projects without JWT returns 401 Protected');

    // POST create project with auth
    const createProjectRes = await fetch(`${baseUrl}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        title: 'Fresh Test Commerce Project',
        shortDescription: 'Short description for unit test',
        fullDescription: 'Full in-depth project description for backend test',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
        technologies: ['WordPress', 'WooCommerce', 'REST API'],
        category: 'E-Commerce',
        liveUrl: 'https://demo.example.com',
        featured: true,
      }),
    });
    const createdProjectData = await createProjectRes.json();
    assert(createProjectRes.status === 201 && createdProjectData.data.title === 'Fresh Test Commerce Project', 'POST /api/projects with JWT creates project');
    const createdId = createdProjectData.data._id;

    // PUT update project
    const updateProjectRes = await fetch(`${baseUrl}/api/projects/${createdId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        title: 'Updated Test Commerce Project',
      }),
    });
    const updatedData = await updateProjectRes.json();
    assert(updateProjectRes.status === 200 && updatedData.data.title === 'Updated Test Commerce Project', 'PUT /api/projects/:id updates project');

    // DELETE project
    const deleteProjectRes = await fetch(`${baseUrl}/api/projects/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(deleteProjectRes.status === 200, 'DELETE /api/projects/:id deletes project');

    console.log('\n--- 4. SKILLS CRUD API ---');
    // GET all skills
    const getSkills = await fetch(`${baseUrl}/api/skills`);
    const skillsData = await getSkills.json();
    assert(getSkills.status === 200 && skillsData.data.length > 0, 'GET /api/skills returns skills array');

    // POST create skill
    const createSkillRes = await fetch(`${baseUrl}/api/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        name: 'Docker & DevOps',
        category: 'Expanding Stack',
        level: 70,
        icon: 'Boxes',
      }),
    });
    const createdSkill = await createSkillRes.json();
    assert(createSkillRes.status === 201 && createdSkill.data.name === 'Docker & DevOps', 'POST /api/skills creates skill with JWT');
    const skillId = createdSkill.data._id;

    // PUT update skill
    const updateSkillRes = await fetch(`${baseUrl}/api/skills/${skillId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ level: 75 }),
    });
    const updatedSkillData = await updateSkillRes.json();
    assert(updateSkillRes.status === 200 && updatedSkillData.data.level === 75, 'PUT /api/skills/:id updates skill');

    // DELETE skill
    const deleteSkillRes = await fetch(`${baseUrl}/api/skills/${skillId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(deleteSkillRes.status === 200, 'DELETE /api/skills/:id deletes skill');

    console.log('\n--- 5. EXPERIENCE CRUD API ---');
    const getExp = await fetch(`${baseUrl}/api/experience`);
    const expData = await getExp.json();
    assert(getExp.status === 200 && expData.data.length > 0, 'GET /api/experience returns experience list');

    // POST create experience
    const createExpRes = await fetch(`${baseUrl}/api/experience`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        jobTitle: 'Senior WordPress Specialist',
        company: 'Global Digital Agency',
        startDate: 'May 2026',
        endDate: 'Present',
        description: 'Leading theme engineering and custom plugin development',
        achievements: ['Delivered 20+ responsive sites'],
      }),
    });
    const createdExp = await createExpRes.json();
    assert(createExpRes.status === 201, 'POST /api/experience creates experience entry');
    const expId = createdExp.data._id;

    // PUT update experience
    const updateExpRes = await fetch(`${baseUrl}/api/experience/${expId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ jobTitle: 'Lead WordPress Developer' }),
    });
    assert(updateExpRes.status === 200, 'PUT /api/experience/:id updates experience');

    // DELETE experience
    const deleteExpRes = await fetch(`${baseUrl}/api/experience/${expId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(deleteExpRes.status === 200, 'DELETE /api/experience/:id deletes experience');

    console.log('\n--- 6. EDUCATION CRUD API ---');
    const getEdu = await fetch(`${baseUrl}/api/education`);
    const eduData = await getEdu.json();
    assert(getEdu.status === 200 && eduData.data.length > 0, 'GET /api/education returns education list');

    // POST create education
    const createEduRes = await fetch(`${baseUrl}/api/education`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        institution: 'University of Engineering and Technology',
        degree: 'Bachelor of Science in Computer Science',
        startDate: '2024',
        endDate: '2028',
        description: 'Advanced computing, algorithms, software engineering, and web development',
      }),
    });
    const createdEdu = await createEduRes.json();
    assert(createEduRes.status === 201, 'POST /api/education creates education entry');
    const eduId = createdEdu.data._id;

    // PUT update education
    const updateEduRes = await fetch(`${baseUrl}/api/education/${eduId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ degree: 'BS Computer Science (Honors)' }),
    });
    assert(updateEduRes.status === 200, 'PUT /api/education/:id updates education');

    // DELETE education
    const deleteEduRes = await fetch(`${baseUrl}/api/education/${eduId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(deleteEduRes.status === 200, 'DELETE /api/education/:id deletes education');

    console.log('\n========================================');
    console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
    console.log('========================================\n');

    await teardown();

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error('Fatal test execution error:', err);
    await teardown();
    process.exit(1);
  }
}

runTests();
