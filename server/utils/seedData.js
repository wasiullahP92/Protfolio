import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Admin from '../models/Admin.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from server folder
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const initialAdmin = {
  name: process.env.ADMIN_NAME || 'Wasi Ullah',
  email: (process.env.ADMIN_EMAIL || 'wasiwebsolution@gmail.com').toLowerCase(),
  password: process.env.ADMIN_PASSWORD || 'AdminSecurePass123!',
};

const initialSkills = [
  { name: 'WordPress Development', category: 'Core Competency', level: 95, icon: 'Globe' },
  { name: 'Website Design', category: 'Core Competency', level: 90, icon: 'Layout' },
  { name: 'Website Maintenance', category: 'Core Competency', level: 90, icon: 'ShieldCheck' },
  { name: 'Content Management', category: 'Core Competency', level: 92, icon: 'Layers' },
  { name: 'Basic SEO & Performance', category: 'Core Competency', level: 85, icon: 'TrendingUp' },
  { name: 'Microsoft Office Suite', category: 'Core Competency', level: 92, icon: 'FileText' },
  { name: 'HTML5 Semantic Markup', category: 'Expanding Stack', level: 88, icon: 'Code2' },
  { name: 'Modern CSS3 & Tailwind CSS', category: 'Expanding Stack', level: 85, icon: 'Palette' },
  { name: 'JavaScript (ES6+)', category: 'Expanding Stack', level: 75, icon: 'Cpu' },
  { name: 'React.js & Frontend', category: 'Expanding Stack', level: 68, icon: 'Boxes' },
];

const initialExperience = [
  {
    jobTitle: 'WordPress Developer',
    company: 'Self-Employed / Local Clients',
    startDate: 'April 2025',
    endDate: 'Present',
    description: 'Delivering custom WordPress solutions, eCommerce web stores, and responsive brand websites for local businesses and independent entrepreneurs.',
    achievements: [
      'Built and launched tailor-made responsive WordPress websites tailored to specific niche goals.',
      'Configured WooCommerce payment gateways, product catalogs, and conversion-optimized checkout flows.',
      'Provided ongoing website maintenance, routine backups, security scans, and SEO optimization.',
      'Maintained 100% on-time project delivery with continuous client communication.',
    ],
  },
  {
    jobTitle: 'WordPress Intern',
    company: 'P92 IT Solution',
    startDate: 'October 2024',
    endDate: 'April 2025',
    description: 'Collaborated with senior engineers and UI designers to construct, debug, and maintain client WordPress websites in a fast-paced agency environment.',
    achievements: [
      'Assisted in developing and styling website pages using Elementor, Divi, and custom CSS styling.',
      'Tested cross-browser responsiveness on mobile, tablet, and desktop viewports, fixing UI anomalies.',
      'Performed speed audits, image optimization, and plugin conflict troubleshooting.',
      'Gained comprehensive knowledge of professional client workflows, staging environments, and deployments.',
    ],
  },
];

const initialEducation = [
  {
    institution: 'Excel Learners Academy',
    degree: 'Diploma in Information Technology (DIT)',
    startDate: '2023',
    endDate: '2024',
    description: 'Comprehensive curriculum focusing on IT fundamentals, web design concepts, database management, computer networking, and office automation tools.',
  },
  {
    institution: 'Government Degree College Hayatabad',
    degree: 'Intermediate',
    startDate: '2021',
    endDate: '2023',
    description: 'Strong academic foundation in analytical thinking, problem-solving, and computer sciences preparing for advanced technical studies.',
  },
  {
    institution: 'Iqbal Public School',
    degree: 'Matriculation',
    startDate: '2019',
    endDate: '2021',
    description: 'Foundational education with emphasis on Science, Mathematics, and Computer Applications with high academic discipline.',
  },
];

const initialProjects = [
  {
    title: 'LuxeStay Boutique Villas',
    shortDescription: 'Luxury Hospitality & Direct Booking Web Portal with room showcases and booking calendar.',
    fullDescription: 'A high-end, responsive WordPress website crafted for a luxury resort. Features custom room showcases, dynamic availability calendars, online inquiry forms, and high-speed image loading.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    technologies: ['WordPress', 'Elementor Pro', 'Custom CSS', 'Responsive Design', 'SEO Schema'],
    category: 'WordPress',
    liveUrl: 'https://example.com/luxestay-demo',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    title: 'ApexWear Urban Apparel',
    shortDescription: 'High-Converting WooCommerce Fashion Store with variations, AJAX cart drawer, and checkout flow.',
    fullDescription: 'Full-featured e-commerce fashion storefront built on WooCommerce. Includes variation swatches, dynamic cart drawer, multi-currency support, order tracking, and mobile-optimized checkout.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    technologies: ['WooCommerce', 'WordPress', 'Stripe Gateway', 'Variation Swatches', 'Speed Cache'],
    category: 'E-Commerce',
    liveUrl: 'https://example.com/apexwear-demo',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    title: 'NovaCraft Digital Agency',
    shortDescription: 'Modern dark-themed portfolio site for a creative digital studio with micro-interactions.',
    fullDescription: 'An electric, modern portfolio site for a creative digital agency. Showcases case studies with dynamic filterable grids, sleek micro-interactions, client testimonials, and a custom quote calculator.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    technologies: ['WordPress', 'Elementor', 'Custom JS Animations', 'CSS Grid', 'RankMath SEO'],
    category: 'Web Design',
    liveUrl: 'https://example.com/novacraft-demo',
    githubUrl: 'https://github.com',
    featured: true,
  },
];

export const seedDatabase = async () => {
  try {
    console.log('[Seed] Checking and seeding initial portfolio database...');

    // 1. Ensure Admin exists
    const adminExists = await Admin.findOne({ email: initialAdmin.email });
    if (!adminExists) {
      await Admin.create(initialAdmin);
      console.log(`[Seed] Initial Admin created successfully (${initialAdmin.email})`);
    } else {
      console.log(`[Seed] Admin already exists (${adminExists.email})`);
    }

    // 2. Ensure Skills exist
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany(initialSkills);
      console.log(`[Seed] Inserted ${initialSkills.length} initial skills`);
    }

    // 3. Ensure Experience exists
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.insertMany(initialExperience);
      console.log(`[Seed] Inserted ${initialExperience.length} initial experiences`);
    }

    // 4. Ensure Education exists
    const eduCount = await Education.countDocuments();
    if (eduCount === 0) {
      await Education.insertMany(initialEducation);
      console.log(`[Seed] Inserted ${initialEducation.length} initial educations`);
    }

    // 5. Ensure Projects exist
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(initialProjects);
      console.log(`[Seed] Inserted ${initialProjects.length} initial projects`);
    }

    console.log('[Seed] Database initialization complete!');
  } catch (err) {
    console.error('[Seed Error]:', err.message);
  }
};

// If run directly from CLI (e.g. `node utils/seedData.js`)
if (process.argv[1] && process.argv[1].endsWith('seedData.js')) {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_wasi';
  mongoose
    .connect(uri)
    .then(async () => {
      console.log(`Connected to MongoDB for seeding: ${uri}`);
      if (process.argv[2] === '--destroy') {
        await Promise.all([
          Admin.deleteMany(),
          Project.deleteMany(),
          Skill.deleteMany(),
          Experience.deleteMany(),
          Education.deleteMany(),
        ]);
        console.log('[Seed] All database records deleted.');
      } else {
        await seedDatabase();
      }
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding connection failed:', err.message);
      process.exit(1);
    });
}
