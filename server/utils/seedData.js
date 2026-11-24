import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Admin from '../models/Admin.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Message from '../models/Message.js';
import Training from '../models/Training.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from server folder
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const initialAdmin = {
  name: process.env.ADMIN_NAME || 'Wasi Ullah',
  email: (process.env.ADMIN_EMAIL || 'wasiwebsolution@gmail.com').toLowerCase(),
  password: process.env.ADMIN_PASSWORD || 'AdminSecurePass123!',
  professionalTitle: 'WordPress Developer | Web Designer | Full Stack Developer in Progress',
  location: 'Peshawar, Pakistan',
  shortIntro:
    "Hi, I'm Wasi Ullah, a passionate web developer and Computer Science student. I specialize in WordPress website design and development. I am continuously improving my development skills and exploring modern web technologies. Currently, I am learning React.js to build dynamic, interactive, and modern web applications.",
  currentLearningTech: 'React.js',
  futureGoals: [
    'Advanced React.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Full-Stack Development',
  ],
};

const initialSkills = [
  // 1. Current Skills
  { name: 'WordPress', category: 'Current Skills', level: 95, icon: 'Globe' },
  { name: 'Website Design', category: 'Current Skills', level: 90, icon: 'Layout' },
  { name: 'Website Development', category: 'Current Skills', level: 92, icon: 'Code2' },
  { name: 'Website Maintenance', category: 'Current Skills', level: 90, icon: 'ShieldCheck' },
  { name: 'Elementor', category: 'Current Skills', level: 95, icon: 'Layers' },
  { name: 'Basic SEO', category: 'Current Skills', level: 85, icon: 'TrendingUp' },
  { name: 'Microsoft Office', category: 'Current Skills', level: 92, icon: 'FileText' },

  // 2. Learning
  { name: 'HTML5', category: 'Learning', level: 88, icon: 'Code2' },
  { name: 'CSS3', category: 'Learning', level: 85, icon: 'Palette' },
  { name: 'JavaScript', category: 'Learning', level: 78, icon: 'Cpu' },
  { name: 'React.js', category: 'Learning', level: 72, icon: 'Boxes' },
  { name: 'Responsive Web Design', category: 'Learning', level: 90, icon: 'Layout' },

  // 3. Future Learning Goals
  { name: 'Advanced React.js', category: 'Future Learning Goals', level: 0, icon: 'Boxes' },
  { name: 'Node.js', category: 'Future Learning Goals', level: 0, icon: 'Cpu' },
  { name: 'Express.js', category: 'Future Learning Goals', level: 0, icon: 'Layers' },
  { name: 'MongoDB', category: 'Future Learning Goals', level: 0, icon: 'Globe' },
  { name: 'Full-Stack Development', category: 'Future Learning Goals', level: 0, icon: 'Sparkles' },
];

const initialExperience = [
  {
    jobTitle: 'WordPress Developer',
    company: 'Self-Employed / Local Clients',
    startDate: 'April 2025',
    endDate: 'Present',
    description:
      'Delivering custom WordPress solutions, eCommerce web stores, and responsive brand websites for local businesses and independent entrepreneurs.',
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
    description:
      'Collaborated with senior engineers and UI designers to construct, debug, and maintain client WordPress websites in a fast-paced agency environment.',
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
    institution: 'NCS University System',
    degree: 'Computer Science',
    startDate: '',
    endDate: 'Currently Studying',
    status: 'Currently Studying',
    location: 'Peshawar, Pakistan',
    description:
      'Currently studying Computer Science at NCS University System, Peshawar, Pakistan.',
  },
  {
    institution: 'Excel Learners Academy',
    degree: 'Diploma in Information Technology (DIT)',
    startDate: '',
    endDate: 'Completed',
    status: 'Completed',
    location: 'Peshawar, Pakistan',
    description:
      'Comprehensive curriculum focusing on IT fundamentals, web design concepts, database management, computer networking, and office automation tools.',
  },
  {
    institution: 'Government Degree College Hayatabad, Peshawar',
    degree: 'Intermediate',
    startDate: '',
    endDate: 'Completed',
    status: 'Completed',
    location: 'Peshawar, Pakistan',
    description:
      'Higher secondary education with a strong foundation in analytical thinking, problem-solving, and computer sciences.',
  },
  {
    institution: 'Iqbal Public School',
    degree: 'Matriculation',
    startDate: '',
    endDate: 'Completed',
    status: 'Completed',
    location: 'Peshawar, Pakistan',
    description:
      'Foundational education with emphasis on Science, Mathematics, and Computer Applications with high academic discipline.',
  },
];

const initialTrainings = [
  {
    institute: 'Saylani IT Mass Training Program (Saylani IT)',
    course: 'Modern Web Development',
    status: 'Currently Learning',
    currentFocus: 'React.js',
    startDate: '2024',
    endDate: 'Present',
    description:
      'Professional training program in modern web development covering frontend foundations, advanced JavaScript, and interactive single-page application development with React.js.',
    highlights: [
      'Modern Web Standards (HTML5 & CSS3)',
      'JavaScript (ES6+) Logic & DOM Manipulation',
      'React.js Component Architecture & Hooks',
      'Interactive Single-Page Applications (SPAs)',
    ],
  },
];

const initialProjects = [
  {
    title: 'LuxeStay Boutique Villas',
    shortDescription: 'Luxury Hospitality & Direct Booking Web Portal with room showcases and booking calendar.',
    fullDescription:
      'A high-end, responsive WordPress website crafted for a luxury resort. Features custom room showcases, dynamic availability calendars, online inquiry forms, and high-speed image loading.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    technologies: ['WordPress', 'Elementor Pro', 'Custom CSS', 'Responsive Design', 'SEO Schema'],
    category: 'WordPress',
    liveUrl: 'https://example.com/luxestay-demo',
    githubUrl: 'https://github.com/wasiullahP92',
    featured: true,
  },
  {
    title: 'ApexWear Urban Apparel',
    shortDescription: 'High-Converting WooCommerce Fashion Store with multi-currency and ajax cart drawer.',
    fullDescription:
      'Full-featured e-commerce fashion storefront built on WooCommerce. Includes variation swatches, dynamic cart drawer, multi-currency support, order tracking, and mobile-optimized checkout.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    technologies: ['WooCommerce', 'WordPress', 'Stripe Gateway', 'Variation Swatches', 'Speed Cache'],
    category: 'E-Commerce',
    liveUrl: 'https://example.com/apexwear-demo',
    githubUrl: 'https://github.com/wasiullahP92',
    featured: true,
  },
  {
    title: 'NovaCraft Digital Agency',
    shortDescription: 'Modern Dark-Themed Creative Portfolio Site with neon purple accents.',
    fullDescription:
      'An electric, modern portfolio site for a creative digital agency. Showcases case studies with dynamic filterable grids, sleek micro-interactions, client testimonials, and a custom quote calculator.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    technologies: ['WordPress', 'Elementor', 'Custom JS Animations', 'CSS Grid', 'RankMath SEO'],
    category: 'Web Design',
    liveUrl: 'https://example.com/novacraft-demo',
    githubUrl: 'https://github.com/wasiullahP92',
    featured: true,
  },
  {
    title: 'ApexCare Dental & Medical',
    shortDescription: 'Healthcare Provider & Online Appointment Booking System.',
    fullDescription:
      'Clean, trustworthy healthcare website designed for a multi-specialty clinic. Features doctor directory, service breakdown, patient testimonials, and step-by-step appointment scheduling.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    technologies: ['WordPress', 'Booking Engine', 'Elementor', 'Contact Form 7', 'Local SEO'],
    category: 'WordPress',
    liveUrl: 'https://example.com/apexcare-demo',
    githubUrl: 'https://github.com/wasiullahP92',
    featured: false,
  },
  {
    title: 'UrbanBite Gourmet Bistro',
    shortDescription: 'Interactive Culinary Menu & Table Reservation with dietary tags.',
    fullDescription:
      'A rich, atmospheric culinary website with interactive digital menus, daily chef specials, OpenTable reservation integration, and virtual photo tour for a premier downtown eatery.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    technologies: ['WordPress', 'Responsive Menu', 'Table Reservation', 'Custom Typography', 'Performance'],
    category: 'Web Design',
    liveUrl: 'https://example.com/urbanbite-demo',
    githubUrl: 'https://github.com/wasiullahP92',
    featured: false,
  },
  {
    title: 'TechPulse Insights & Blog',
    shortDescription: 'High-Traffic Content Publishing & Tech Journal with syntax highlighting.',
    fullDescription:
      'Custom WordPress publication theme built for tech news, tutorials, and gear reviews. Features reading-time indicators, syntax code highlighting, dynamic related articles, and newsletter capture.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    technologies: ['WordPress', 'Custom Post Types', 'Newsletter API', 'RankMath SEO', 'CDN Caching'],
    category: 'WordPress',
    liveUrl: 'https://example.com/techpulse-demo',
    githubUrl: 'https://github.com/wasiullahP92',
    featured: false,
  },
];

export const seedDatabase = async () => {
  try {
    // 1. Ensure Admin exists
    const adminExists = await Admin.findOne({ email: initialAdmin.email });
    if (!adminExists) {
      await Admin.create(initialAdmin);
      console.log(`[Seed] Initial admin created: ${initialAdmin.email}`);
    } else {
      // Update admin metadata
      adminExists.professionalTitle = initialAdmin.professionalTitle;
      adminExists.location = initialAdmin.location;
      adminExists.shortIntro = initialAdmin.shortIntro;
      adminExists.currentLearningTech = initialAdmin.currentLearningTech;
      adminExists.futureGoals = initialAdmin.futureGoals;
      await adminExists.save();
    }

    // 2. Ensure Skills exist and sync categories
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0 || skillCount < 10) {
      await Skill.deleteMany({});
      await Skill.insertMany(initialSkills);
      console.log(`[Seed] Inserted ${initialSkills.length} categorized skills`);
    }

    // 3. Ensure Experience exists
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.insertMany(initialExperience);
      console.log(`[Seed] Inserted ${initialExperience.length} initial experiences`);
    }

    // 4. Ensure Education exists and sync latest education
    const eduCount = await Education.countDocuments();
    const ncsExists = await Education.findOne({ institution: /NCS University/i });
    if (eduCount === 0 || !ncsExists) {
      await Education.deleteMany({});
      await Education.insertMany(initialEducation);
      console.log(`[Seed] Inserted ${initialEducation.length} education records including NCS University`);
    }

    // 5. Ensure Training exists
    const trainingCount = await Training.countDocuments();
    if (trainingCount === 0) {
      await Training.insertMany(initialTrainings);
      console.log(`[Seed] Inserted ${initialTrainings.length} initial training records`);
    }

    // 6. Ensure Projects exist
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(initialProjects);
      console.log(`[Seed] Inserted ${initialProjects.length} initial projects`);
    }

    // 7. Ensure Messages exist
    const msgCount = await Message.countDocuments();
    if (msgCount === 0) {
      const initialMessages = [
        {
          name: 'Sarah Jenkins',
          email: 'sarah.j@techvision.io',
          subject: 'WordPress E-Commerce Redesign Project',
          message:
            'Hello Wasi! We love your portfolio projects. We have a WooCommerce store with 150+ products that needs a complete UI revamp, responsive tuning, and speed optimization. What is your current availability for a discovery call?',
          isRead: false,
        },
        {
          name: 'Ahmed Malik',
          email: 'ahmed.m@apexgroup.pk',
          subject: 'Corporate Website & Maintenance Contract',
          message:
            'Hi Wasi Ullah, we are looking for a reliable WordPress developer to build our consulting corporate site and maintain our existing client web properties. Please share your project rate card.',
          isRead: true,
        },
      ];
      await Message.insertMany(initialMessages);
      console.log(`[Seed] Inserted ${initialMessages.length} initial messages`);
    }

    console.log('[Seed] Database initialization complete!');
  } catch (err) {
    console.error('[Seed Error]:', err.message);
  }
};

// If run directly from CLI
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
          Training.deleteMany(),
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
