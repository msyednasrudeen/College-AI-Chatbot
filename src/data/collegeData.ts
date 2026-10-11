export interface DepartmentInfo {
  code: string;
  name: string;
  degree: string;
  level: 'UG' | 'PG' | 'Foundation';
  duration: string;
  description: string;
  highlights: string[];
}

export interface QuickPrompt {
  id: string;
  label: string;
  labelTa?: string;
  iconName: string;
  prompt: string;
  category: 'core' | 'tamil' | 'facilities';
}

export const COLLEGE_DETAILS = {
  name: 'Kings College of Engineering',
  shortName: 'KCE',
  aiName: 'KINGS AI',
  tagline: 'Seek, Strive, Succeed',
  established: '2001',
  founder: 'Raj Educational Trust (RET)',
  tneaCode: '3806',
  approvals: 'Approved by AICTE, New Delhi',
  affiliation: 'Affiliated to Anna University, Chennai',
  accreditation: 'NAAC Accredited | Autonomous Institution',
  location: {
    address: 'Punalkulam, Near Thanjavur, Gandarvakottai Taluk, Pudukkottai District – 613 303, Tamil Nadu, India',
    routeDescription: 'Located on Thanjavur - Pudukkottai Highway (12 km from Thanjavur / Vallam)',
    pincode: '613303',
  },
  contacts: {
    admissionPhone: '+91 63809 89024',
    rawPhone: '+916380989024',
    officePhones: ['04362-282474', '04362-282674'],
    email: 'contact@kingsengg.edu.in',
    principalEmail: 'principal@kingsindia.net',
    website: 'https://www.kingsengg.edu.in',
    workingHours: 'Monday - Saturday: 9:00 AM - 5:00 PM',
  },
};

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    code: 'AI&DS',
    name: 'Artificial Intelligence & Data Science',
    degree: 'B.Tech',
    level: 'UG',
    duration: '4 Years',
    description: 'Cutting-edge curriculum covering Machine Learning, Deep Learning, Big Data Analytics, Neural Networks, and Cloud AI implementations.',
    highlights: ['High Industry Demand', 'Dedicated GPU & AI Labs', 'Industry Certifications'],
  },
  {
    code: 'CSE',
    name: 'Computer Science & Engineering',
    degree: 'B.E. & M.E.',
    level: 'UG',
    duration: '4 Years (UG) / 2 Years (PG)',
    description: 'Rigorous foundation in Algorithms, Full-Stack Development, Cyber Security, Cloud Computing, and Software Architecture.',
    highlights: ['High Campus Placement', 'Active Coding Clubs', 'Hackathons & Symposiums'],
  },
  {
    code: 'IT',
    name: 'Information Technology',
    degree: 'B.Tech',
    level: 'UG',
    duration: '4 Years',
    description: 'Focus on Enterprise Software, Web & Mobile Applications, Database Administration, and Network Systems.',
    highlights: ['Product Company Prep', 'DevOps & Cloud Labs', 'Live Projects'],
  },
  {
    code: 'ECE',
    name: 'Electronics & Communication Engineering',
    degree: 'B.E. & M.E. (VLSI)',
    level: 'UG',
    duration: '4 Years (UG) / 2 Years (PG)',
    description: 'Comprehensive study of Embedded Systems, VLSI Design, IoT, Digital Signal Processing, and Wireless Communications.',
    highlights: ['Robotics & IoT Club', 'Cadence / VLSI Tools', 'Core & IT Placement Eligibility'],
  },
  {
    code: 'EEE',
    name: 'Electrical & Electronics Engineering',
    degree: 'B.E. & M.E. (PED)',
    level: 'UG',
    duration: '4 Years (UG) / 2 Years (PG)',
    description: 'Hands-on learning in Renewable Energy, Smart Grids, Electric Vehicle (EV) tech, Power Electronics, and Industrial Automation.',
    highlights: ['Govt Sector & Core Placement', 'Modern Machines Lab', 'EV Technology Projects'],
  },
  {
    code: 'MECH',
    name: 'Mechanical Engineering',
    degree: 'B.E. & M.E. (Thermal)',
    level: 'UG',
    duration: '4 Years (UG) / 2 Years (PG)',
    description: 'Foundations of Design, Thermal Engineering, CAD/CAM, Manufacturing Automation, and Automotive Systems.',
    highlights: ['CNC & CAD Workshops', 'SAE Collegiate Chapter', 'Core Manufacturing Drives'],
  },
  {
    code: 'CIVIL',
    name: 'Civil Engineering',
    degree: 'B.E.',
    level: 'UG',
    duration: '4 Years',
    description: 'Structural Analysis, Surveying, Environmental Engineering, Geo-technical studies, and Sustainable Infrastructure.',
    highlights: ['Total Station Lab', 'Site Visits & Internships', 'Consultancy Opportunities'],
  },
  {
    code: 'MBA',
    name: 'Master of Business Administration',
    degree: 'MBA',
    level: 'PG',
    duration: '2 Years',
    description: 'Postgraduate management training in Finance, Marketing, Human Resources, Systems, and Operations with practical case studies.',
    highlights: ['Corporate Seminars', 'Leadership Camps', 'Dual Specialization Options'],
  },
];

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'departments',
    label: 'Departments',
    labelTa: 'துறைகள்',
    iconName: 'Building2',
    prompt: 'What engineering departments and faculties are available at Kings College of Engineering, Punalkulam?',
    category: 'core',
  },
  {
    id: 'courses',
    label: 'Courses',
    labelTa: 'படிப்புகள்',
    iconName: 'GraduationCap',
    prompt: 'Please list all UG (B.E./B.Tech) and PG (M.E./MBA) courses offered at Kings College of Engineering.',
    category: 'core',
  },
  {
    id: 'admissions',
    label: 'Admissions',
    labelTa: 'சேர்க்கை',
    iconName: 'FileText',
    prompt: 'What is the admission procedure, eligibility criteria, and TNEA counselling code (3806) for Kings College of Engineering?',
    category: 'core',
  },
  {
    id: 'fees',
    label: 'Fees & Scholarships',
    labelTa: 'கட்டணம் & உதவித்தொகை',
    iconName: 'Banknote',
    prompt: 'What is the fee structure for Government/Management quota and what scholarships (First Graduate, 7.5% Govt School, Post-Matric) are available?',
    category: 'core',
  },
  {
    id: 'contact',
    label: 'Contact Details',
    labelTa: 'தொடர்புக்கு',
    iconName: 'PhoneCall',
    prompt: 'How can I contact Kings College of Engineering (admission phone, email, address, and bus transport)?',
    category: 'core',
  },
  {
    id: 'hostel-bus',
    label: 'Hostel & Bus Routes',
    labelTa: 'விடுதி & பேருந்து',
    iconName: 'Bus',
    prompt: 'What are the hostel facilities and college bus routes covering Thanjavur, Pudukkottai, and nearby areas?',
    category: 'facilities',
  },
  {
    id: 'tamil-admissions',
    label: 'தமிழ் உதவி (Admission)',
    labelTa: 'தமிழ் கேள்வி',
    iconName: 'Languages',
    prompt: 'கிங்ஸ் இன்ஜினியரிங் கல்லூரியில் அட்மிஷன் எப்படி வாங்குவது? TNEA கவுன்சிலிங் கோட் மற்றும் தகுதி விவரங்களை தமிழில் சொல்லுங்கள்.',
    category: 'tamil',
  },
];

export const FREQUENT_QUESTIONS = [
  {
    q: 'What is the TNEA Counselling Code for Kings College of Engineering?',
    a: 'The official TNEA single-window counselling code for Kings College of Engineering is **3806**.',
  },
  {
    q: 'Is Kings College of Engineering an Autonomous institution?',
    a: 'Yes, Kings College of Engineering is an **Autonomous Institution**, accredited by NAAC, approved by AICTE, and affiliated with Anna University, Chennai.',
  },
  {
    q: 'Does the college provide bus facilities?',
    a: 'Yes, the college operates an extensive fleet of buses connecting Thanjavur, Pudukkottai, Gandarvakottai, Pattukkottai, Orathanadu, Mannargudi, Vallam, and surrounding locations.',
  },
  {
    q: 'Are government scholarships accepted?',
    a: 'Yes. Eligible students can avail Tamil Nadu 7.5% Government school reservation fee support, First Graduate (FG) tuition fee waiver, and Post-Matric scholarships for SC/ST/SCC/BC/MBC communities.',
  },
];
