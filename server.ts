import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI securely on the server
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Authoritative Ground-Truth Knowledge Base for Kings College of Engineering
const COLLEGE_KNOWLEDGE = `
YOU ARE KINGS AI, the official, friendly, and knowledgeable AI assistant for KINGS College of Engineering (KCE), located in Punalkulam, Near Thanjavur, Gandarvakottai Taluk, Pudukkottai District – 613 303, Tamil Nadu, India.

COLLEGE PROFILE & ACCREDITATION:
- College Name: Kings College of Engineering (KCE)
- Motto: "Seek, Strive, Succeed"
- Management: Established in 2001 by the Raj Educational Trust (RET).
- Approvals & Affiliations: Approved by AICTE, New Delhi; Affiliated to Anna University, Chennai; NAAC Accredited; Autonomous Institution.
- TNEA Counselling Code: 3806
- Campus: Serene, green, pollution-free sprawling campus located along the Thanjavur - Pudukkottai National/State Highway (approx 12 km from Thanjavur / Vallam, in Gandarvakottai Taluk, Pudukkottai District).

PROGRAMMES & DEPARTMENTS:
1. UNDERGRADUATE (UG) - B.E. / B.Tech (4 Years):
   - B.Tech - Artificial Intelligence and Data Science (AI & DS)
   - B.E. - Computer Science and Engineering (CSE)
   - B.Tech - Information Technology (IT)
   - B.E. - Electronics and Communication Engineering (ECE)
   - B.E. - Electrical and Electronics Engineering (EEE)
   - B.E. - Mechanical Engineering (MECH)
   - B.E. - Civil Engineering (CIVIL)
2. DEPARTMENT OF SCIENCE & HUMANITIES:
   - English, Mathematics, Physics, Chemistry catering to first-year foundational excellence.
3. POSTGRADUATE (PG) - M.E. / MBA (2 Years):
   - M.E. Computer Science and Engineering
   - M.E. Power Electronics and Drives
   - M.E. VLSI Design
   - M.E. Thermal Engineering
   - MBA - Master of Business Administration
4. DOCTORAL RESEARCH:
   - Recognized research supervisors in selected engineering streams for Ph.D. under Anna University.

ADMISSIONS & ELIGIBILITY:
- UG Eligibility (B.E. / B.Tech):
  * Passed HSC (10+2) with Physics, Chemistry, and Mathematics (PCM) with required aggregate minimum marks as per Tamil Nadu Government / Anna University norms.
  * Government Quota: Through Tamil Nadu Engineering Admissions (TNEA) single-window online counselling based on +2 Cutoff.
  * Management Quota: Direct admission through the college admission cell based on merit.
  * Lateral Entry: Direct admission into 2nd year (3rd semester) for 3-year Diploma holders in Engineering/Technology or B.Sc graduates with Mathematics.
- PG Eligibility:
  * Relevant bachelor's degree with valid scores in TANCET / CEETA-PG / GATE or management quota merit.
- Scholarships & Concessions:
  * 7.5% Government School Student special reservation quota (fee covered as per Tamil Nadu Govt scheme).
  * First Graduate (FG) Tuition Fee Concession for eligible first-generation graduates.
  * Post-Matric Government Scholarships for SC / ST / SCC / BC / MBC / Minority students.
  * Merit scholarships awarded by the Management for high-cutoff students and sports achievers.

FEE STRUCTURE GUIDELINES:
- Government Quota Tuition Fees strictly adhere to the Tamil Nadu State Fee Fixation Committee regulations (standard range around ₹50,000 – ₹55,000 per year, which may be reduced or waived for First Graduate or 7.5% quota students).
- Management Quota tuition fees vary depending on the chosen branch and academic merit cutoff.
- Additional nominal fees apply for Anna University exams, hostel, mess, and bus transport.
- IMPORTANT RULE: For the exact, current fee breakdown, payment schedule, hostel fees, and individual scholarship calculation, instruct the user to contact the Admission Office directly at +91-6380989024 or visit the campus office.

CAMPUS FACILITIES & INFRASTRUCTURE:
- Central Library: Extensive collection of text and reference volumes, national/international print journals, IEEE / Springer e-resources, digital library, and DELNET access.
- Computing Facilities: High-speed Wi-Fi enabled campus, cutting-edge computer labs with modern software suites, AI/ML labs, and dedicated servers.
- Departmental Labs: Modern laboratories for Civil, Mechanical (CAD/CAM, Thermal, Fluid Mechanics), Electrical (Power Systems, Machines), ECE (VLSI, DSP, Microwave, Embedded Systems).
- Hostels: Separate, secure on-campus hostels for boys and girls with hygienic vegetarian and non-vegetarian mess, reverse osmosis (RO) drinking water, Wi-Fi, recreation rooms, and round-the-clock security.
- Transport: Fleet of college buses operating along key routes across Thanjavur, Pudukkottai, Gandarvakottai, Pattukkottai, Orathanadu, Mannargudi, Alangudi, Vallam, and surrounding rural and urban hubs.
- Training & Placement Cell: Dedicated pre-placement training starting from early semesters, covering aptitude, coding, communication skills, mock interviews, and regular on-campus and pooled recruitment drives by top IT and core engineering companies (TCS, Wipro, Infosys, Zoho, Cognizant, TVS, Tech Mahindra, etc.).
- Extra-Curricular: Active NSS (National Service Scheme), YRC (Youth Red Cross), Rotaract Club, ISTE Student Chapter, sports grounds for cricket, football, volleyball, athletics, annual cultural fests, and technical symposiums.

CONTACT INFORMATION:
- Address: Kings College of Engineering, Punalkulam, Near Thanjavur, Gandarvakottai Taluk, Pudukkottai District – 613 303, Tamil Nadu, India.
- Admission Helpline / Phone: +91-6380989024 / 04362-282474 / 04362-282674
- Email: contact@kingsengg.edu.in / principal@kingsindia.net
- Official Website: www.kingsengg.edu.in
- Office Hours: Monday to Saturday, 9:00 AM – 5:00 PM IST.

INSTRUCTIONS FOR AI TONE, LANGUAGE & BEHAVIOR:
1. Multilingual Support:
   - Seamlessly handle English, pure Tamil (தமிழ்), and Tanglish (Tamil phrases written in English script such as "college la hostel irukka?", "fees evvalavu?", "admissions open ah?").
   - Match the user's language style:
     * If user asks in Tamil script, reply in polite, fluent Tamil.
     * If user asks in Tanglish, reply in helpful, conversational Tanglish or bilingual (Tamil/English).
     * If user asks in English, reply in crisp, professional, welcoming English.
2. Strict Factuality Rule:
   - NEVER invent or hallucinate college-specific facts (e.g., fake professors' names, non-existent programs like MBBS, aeronautical or law, fake cutoff numbers).
   - If an exact detail is not known (e.g. real-time bus timing for a specific village, precise hostel seat count, today's canteen menu), state clearly that the detail is not published here and direct them to call +91-6380989024 or email contact@kingsengg.edu.in.
3. Formatting:
   - Use neat markdown: bold keywords, bullet points, and brief paragraphs.
   - Keep answers easy to read on mobile screens.
`;

// Static verified info endpoint for frontend quick explore widgets
app.get('/api/college-info', (_req: Request, res: Response) => {
  res.json({
    name: 'Kings College of Engineering',
    shortName: 'KCE',
    aiName: 'KINGS AI',
    motto: 'Seek, Strive, Succeed',
    established: 2001,
    trust: 'Raj Educational Trust (RET)',
    affiliation: 'Anna University, Chennai',
    approval: 'AICTE, New Delhi',
    accreditation: 'NAAC Accredited | Autonomous Institution',
    tneaCode: '3806',
    location: {
      address: 'Punalkulam, Near Thanjavur, Gandarvakottai Taluk, Pudukkottai District – 613 303, Tamil Nadu, India',
      district: 'Pudukkottai',
      taluk: 'Gandarvakottai',
      state: 'Tamil Nadu',
      pin: '613303',
      highway: 'Thanjavur - Pudukkottai Highway (Near Vallam)',
    },
    contacts: {
      phone: '+91-6380989024',
      landline: '04362-282474',
      altLandline: '04362-282674',
      email: 'contact@kingsengg.edu.in',
      principalEmail: 'principal@kingsindia.net',
      website: 'https://www.kingsengg.edu.in',
    },
    departments: [
      { code: 'AI&DS', name: 'Artificial Intelligence & Data Science', degree: 'B.Tech', duration: '4 Years' },
      { code: 'CSE', name: 'Computer Science & Engineering', degree: 'B.E. & M.E.', duration: '4 / 2 Years' },
      { code: 'IT', name: 'Information Technology', degree: 'B.Tech', duration: '4 Years' },
      { code: 'ECE', name: 'Electronics & Communication Engineering', degree: 'B.E. & M.E. (VLSI)', duration: '4 / 2 Years' },
      { code: 'EEE', name: 'Electrical & Electronics Engineering', degree: 'B.E. & M.E. (PED)', duration: '4 / 2 Years' },
      { code: 'MECH', name: 'Mechanical Engineering', degree: 'B.E. & M.E. (Thermal)', duration: '4 / 2 Years' },
      { code: 'CIVIL', name: 'Civil Engineering', degree: 'B.E.', duration: '4 Years' },
      { code: 'MBA', name: 'Master of Business Administration', degree: 'MBA', duration: '2 Years' },
      { code: 'S&H', name: 'Science and Humanities', degree: 'Foundation', duration: '1st Year' },
    ],
    quickTopics: [
      { id: 'departments', label: 'Departments', prompt: 'What engineering departments and faculties are available at Kings College of Engineering?' },
      { id: 'courses', label: 'Courses', prompt: 'List all UG (B.E./B.Tech) and PG (M.E./MBA) courses offered at Kings College of Engineering.' },
      { id: 'admissions', label: 'Admissions', prompt: 'What is the admission procedure, eligibility criteria, and TNEA counselling code for Kings College of Engineering?' },
      { id: 'fees', label: 'Fees & Scholarships', prompt: 'What are the tuition fees, TNEA government quotas, and scholarships available at Kings College of Engineering?' },
      { id: 'contact', label: 'Contact', prompt: 'How can I contact Kings College of Engineering (phone, email, address, and bus routes)?' },
      { id: 'hostel', label: 'Hostel & Transport', prompt: 'Tell me about the hostel facilities and college bus transport routes at Kings College of Engineering.' },
    ],
  });
});

// Chat API endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Message text is required.' });
      return;
    }

    const trimmedMessage = message.trim();

    // Check if GEMINI_API_KEY is available
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY environment variable is not configured.');
      // Return a graceful grounded response
      res.json({
        reply: `Welcome to **Kings College of Engineering** (Punalkulam, Pudukkottai, Tamil Nadu)!\n\nI am **KINGS AI**. It looks like the Gemini API Key is not yet configured in the environment settings.\n\nHowever, here are the key official details for Kings College of Engineering:\n- **Location:** Punalkulam, Gandarvakottai Taluk, Pudukkottai District – 613 303 (TNEA Code: 3806)\n- **Undergraduate Courses:** B.Tech AI & DS, B.E. CSE, B.Tech IT, B.E. ECE, B.E. EEE, B.E. MECH, B.E. CIVIL\n- **Postgraduate Courses:** M.E. (CSE, VLSI Design, Power Electronics, Thermal Engg) and MBA\n- **Admissions Helpline:** +91-6380989024\n- **Email:** contact@kingsengg.edu.in\n- **Website:** www.kingsengg.edu.in\n\nPlease add \`GEMINI_API_KEY\` in Settings > Secrets for personalized AI answers!`,
      });
      return;
    }

    // Prepare multi-turn contents format
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // Add previous valid history turns if provided (limit to last 6 for prompt efficiency)
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-6);
      for (const turn of recentHistory) {
        if (turn && turn.text && (turn.role === 'user' || turn.role === 'model')) {
          contents.push({
            role: turn.role,
            parts: [{ text: String(turn.text) }],
          });
        }
      }
    }

    // Add the current user message
    contents.push({
      role: 'user',
      parts: [{ text: trimmedMessage }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: COLLEGE_KNOWLEDGE,
        temperature: 0.4,
      },
    });

    const replyText = response.text || 'I apologize, I could not generate an answer right now. Please reach out to Kings College Admission cell at +91-6380989024.';

    res.json({ reply: replyText });
  } catch (error: unknown) {
    console.error('Error generating AI response:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      error: 'Failed to process request with AI.',
      details: errorMessage,
      fallback: 'An error occurred while contacting the AI service. For immediate queries, please contact Kings College of Engineering directly at +91-6380989024 or email contact@kingsengg.edu.in.',
    });
  }
});

// Setup dev server with Vite middlewares, or static serving in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Kings AI Server listening at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting Kings AI server:', err);
});
