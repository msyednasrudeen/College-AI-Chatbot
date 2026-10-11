import React, { useState } from 'react';
import {
  X,
  BookOpen,
  GraduationCap,
  FileText,
  Banknote,
  MapPin,
  Phone,
  Mail,
  Bus,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { DEPARTMENTS, COLLEGE_DETAILS, FREQUENT_QUESTIONS } from '../data/collegeData';

interface CollegeInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (promptText: string) => void;
}

export const CollegeInfoModal: React.FC<CollegeInfoModalProps> = ({
  isOpen,
  onClose,
  onSelectPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'departments' | 'admissions' | 'fees' | 'facilities' | 'contact' | 'faqs'>('departments');

  if (!isOpen) return null;

  const handlePromptClick = (prompt: string) => {
    onSelectPrompt(prompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-blue-950/80 via-slate-900 to-amber-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Kings College of Engineering</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Autonomous
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Punalkulam, Pudukkottai • TNEA Code: <span className="text-amber-400 font-mono font-semibold">{COLLEGE_DETAILS.tneaCode}</span> • Official Directory
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="border-b border-slate-800 bg-slate-950/60 px-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'departments', label: 'Departments & Courses', icon: GraduationCap },
            { id: 'admissions', label: 'Admissions & TNEA', icon: FileText },
            { id: 'fees', label: 'Fees & Scholarships', icon: Banknote },
            { id: 'facilities', label: 'Campus & Hostels', icon: Bus },
            { id: 'contact', label: 'Contact & Map', icon: MapPin },
            { id: 'faqs', label: 'Quick FAQs', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3 py-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap ${
                  isActive
                    ? 'border-amber-400 text-amber-300 font-semibold bg-amber-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
          {/* TAB: DEPARTMENTS */}
          {activeTab === 'departments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Engineering Departments & Programmes</h3>
                  <p className="text-xs text-slate-400">Anna University affiliated 4-Year B.E./B.Tech & 2-Year M.E./MBA Degrees</p>
                </div>
                <button
                  onClick={() => handlePromptClick('Give me a detailed overview of all engineering departments at Kings College of Engineering')}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 underline font-medium"
                >
                  <Sparkles className="w-3 h-3" />
                  Ask AI about Departments
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DEPARTMENTS.map((dept) => (
                  <div
                    key={dept.code}
                    className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/40 transition flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                          {dept.code}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {dept.degree} • {dept.duration}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-amber-200 transition">
                        {dept.name}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {dept.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-1 flex-wrap">
                        {dept.highlights.map((h, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                            {h}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => handlePromptClick(`Tell me about admission, syllabus, and placements for the ${dept.name} department at Kings College.`)}
                        className="text-xs text-amber-400 hover:text-amber-300 underline shrink-0 ml-2"
                      >
                        Ask AI
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ADMISSIONS */}
          {activeTab === 'admissions' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/70 to-slate-800 border border-blue-800/60">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>TNEA Single-Window Counselling Code: 3806</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Admissions to B.E. / B.Tech courses are conducted through Tamil Nadu Engineering Admissions (TNEA) single-window counselling administered by the Directorate of Technical Education (DoTE), Chennai, as well as Direct Management Quota admissions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
                  <h4 className="text-sm font-semibold text-white mb-2">UG Eligibility (B.E. / B.Tech)</h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc ml-4">
                    <li>Passed Higher Secondary (10+2) with Mathematics, Physics, and Chemistry.</li>
                    <li>Eligible cutoff as stipulated by Anna University & TN Government.</li>
                    <li>
                      <strong>Lateral Entry (Direct 2nd Year):</strong> Candidates possessing a 3-year Diploma in Engineering or B.Sc with Mathematics.
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
                  <h4 className="text-sm font-semibold text-white mb-2">Government Special Quotas</h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc ml-4">
                    <li>
                      <strong>7.5% Govt School Quota:</strong> Special reservation for students who studied in Tamil Nadu Government schools from 6th to 12th standard.
                    </li>
                    <li>
                      <strong>Sports Quota & Differently-Abled:</strong> Special reservation seats through TNEA.
                    </li>
                    <li>
                      <strong>PG Admissions:</strong> Valid TANCET / CEETA-PG / GATE scores.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between">
                <div className="text-xs text-amber-200">
                  Want personalized admission guidance based on your +2 cutoff marks?
                </div>
                <button
                  onClick={() => handlePromptClick('I want to know admission cutoff and seat allotment details for Kings College of Engineering TNEA code 3806')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition"
                >
                  Ask AI Cutoff
                </button>
              </div>
            </div>
          )}

          {/* TAB: FEES & SCHOLARSHIPS */}
          {activeTab === 'fees' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <h4 className="text-sm font-semibold text-white">Fee Structure Overview</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tuition fees for Government Quota (TNEA) students strictly follow the Tamil Nadu State Fee Fixation Committee norms (approx. ₹50,000 – ₹55,000 per academic year for non-accredited/accredited courses). Management Quota fees vary according to branch and merit cutoff.
                </p>
                <p className="text-xs text-amber-300">
                  Note: Fees for Anna University exams, hostel accommodation, mess, and bus transport are separate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700">
                  <h5 className="text-xs font-bold text-amber-400 mb-1">First Graduate (FG)</h5>
                  <p className="text-xs text-slate-300">
                    Tuition fee waiver supported by the Tamil Nadu Government for eligible first-generation college graduates in a family.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700">
                  <h5 className="text-xs font-bold text-amber-400 mb-1">7.5% Govt School Scheme</h5>
                  <p className="text-xs text-slate-300">
                    Full fee support (tuition, hostel, and mess) provided by the Tamil Nadu State Government for eligible admitted students.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700">
                  <h5 className="text-xs font-bold text-amber-400 mb-1">Community Scholarships</h5>
                  <p className="text-xs text-slate-300">
                    Post-Matric scholarship assistance for eligible SC, ST, SCC, BC, MBC, and minority students.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Direct Verification:</div>
                  <div className="text-xs text-slate-400">
                    For exact fee breakdown and management merit concessions, call +91-6380989024.
                  </div>
                </div>
                <button
                  onClick={() => handlePromptClick('Explain the fee structure and scholarship details for Kings College of Engineering.')}
                  className="text-xs text-amber-400 hover:text-amber-300 underline font-medium"
                >
                  Ask AI About Fees
                </button>
              </div>
            </div>
          )}

          {/* TAB: CAMPUS & FACILITIES */}
          {activeTab === 'facilities' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                    Central Library & Digital Lab
                  </h4>
                  <p className="text-xs text-slate-300">
                    Vast collection of reference volumes, technical textbooks, IEEE and Springer digital journals, DELNET inter-library facility, and high-speed research browsing terminals.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                    Hostels for Boys & Girls
                  </h4>
                  <p className="text-xs text-slate-300">
                    Separate, secure residential hostels inside the campus with hygienic mess (Veg & Non-Veg), reverse-osmosis (RO) drinking water, Wi-Fi connectivity, and round-the-clock wardens.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                    Extensive Bus Fleet
                  </h4>
                  <p className="text-xs text-slate-300">
                    Dedicated college buses operating across Thanjavur, Pudukkottai, Gandarvakottai, Pattukkottai, Orathanadu, Mannargudi, Alangudi, Vallam, and surrounding areas.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                    Training & Placement Cell (T&P)
                  </h4>
                  <p className="text-xs text-slate-300">
                    Continuous soft skills, programming bootcamp, mock interview training, and on-campus recruitment with reputed IT and core multinational companies.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CONTACT & MAP */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${COLLEGE_DETAILS.contacts.rawPhone}`}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-amber-500/50 transition flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Admission Hotline</div>
                    <div className="text-sm font-semibold text-white font-mono">{COLLEGE_DETAILS.contacts.admissionPhone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${COLLEGE_DETAILS.contacts.email}`}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-amber-500/50 transition flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Email Address</div>
                    <div className="text-sm font-semibold text-white">{COLLEGE_DETAILS.contacts.email}</div>
                  </div>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Campus Postal Address</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {COLLEGE_DETAILS.location.address}
                    </p>
                    <p className="text-xs text-amber-400/90 mt-1">
                      {COLLEGE_DETAILS.location.routeDescription}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                  <span>Landline: 04362-282474 / 282674</span>
                  <a
                    href={COLLEGE_DETAILS.contacts.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-amber-400 hover:underline"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-3">
              {FREQUENT_QUESTIONS.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-semibold text-amber-200">{item.q}</h4>
                    <button
                      onClick={() => handlePromptClick(item.q)}
                      className="text-[11px] text-amber-400 hover:text-amber-300 underline shrink-0"
                    >
                      Ask AI
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between text-xs text-slate-400">
          <span>Kings College of Engineering • Punalkulam, Pudukkottai</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
