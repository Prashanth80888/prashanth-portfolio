import { Download, Mail, Phone, MapPin, Globe, GraduationCap, Award, CheckCircle } from "lucide-react";

export default function InteractiveResume() {
  const handleDownload = async () => {
  try {
    await fetch("/api/resume/download", {
      method: "POST",
    });

    const link = document.createElement("a");
    link.href = "/resume/resume-v1.pdf";
    link.download = "Prashanth_Gouda_Resume.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error("Resume download failed:", error);
  }
};

  return (
    <div className="bg-surface border border-white/10 rounded-2xl p-6 md:p-12 shadow-2xl relative overflow-hidden noise-overlay font-sans" id="interactive-resume-view">
      
      {/* Dynamic Gold Glow Background blur */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />

      {/* CV Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 border-b border-white/15 pb-8 relative z-10">
        <div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-text-primary">PRASHANTH GOUDA</h2>
          <p className="text-accent-gold font-mono text-sm uppercase tracking-widest mt-1.5 font-medium">Software Engineer & AI Product Builder</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs text-text-muted font-mono">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent-gold" /> Siddapur, Karnataka, India
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-accent-gold" /> goudaprashantcsd@gmail.com
            </span>
          </div>
        </div>

        {/* Print / Download Button */}
        <button
          onClick={handleDownload}
          className="flex items-center gap-2.5 px-5 py-2.5 bg-accent-gold hover:bg-gold-soft text-bg-dark font-semibold font-sans text-xs rounded-xl shadow-lg hover:shadow-accent-gold/25 transition-all cursor-pointer select-none shrink-0"
          id="print-resume-btn"
        >
          <Download className="w-4 h-4" />
          <span>Save Resume / Print CV</span>
        </button>
      </div>

      {/* CV Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mt-10 relative z-10 text-sm">
        
        {/* Left Column (Main Focus: Education, Profile, Core Competencies) */}
        <div className="space-y-8 lg:col-span-1">
          {/* Executive Profile Statement */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-text-muted uppercase border-b border-white/5 pb-2.5 mb-3 font-semibold">Executive Profile</h3>
            <p className="text-text-secondary leading-relaxed text-xs">
              Curious and persistent software systems architect specializing in intelligent automation, responsive frontend craftsmanship, and robust backend engineering. Passionate about designing robust systems that bridge cutting-edge deep learning with elegant user interfaces.
            </p>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-text-muted uppercase border-b border-white/5 pb-2.5 mb-4 font-semibold">Education</h3>
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-accent-gold mb-1">
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span className="font-display font-semibold text-text-primary text-xs">Bachelor of Engineering</span>
                </div>
                <p className="text-text-muted text-[11px] font-mono leading-relaxed">Computer Science & Design</p>
                <p className="text-text-secondary text-[11px] font-sans mt-1 leading-relaxed">Alva's Institute of Engineering and Technology</p>
                <div className="flex items-center justify-between mt-2.5 text-[10px] font-mono text-text-muted">
                  <span>CGPA: 8.80 / 10</span>
                  <span className="text-accent-gold font-bold">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Proficiencies */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-text-muted uppercase border-b border-white/5 pb-2.5 mb-3 font-semibold">Core Expertise</h3>
            <div className="flex flex-wrap gap-1.5">
              {["Full-Stack React", "Next.js 15", "Google Gemini AI SDK", "Python Scripting", "REST System Design", "Edge Face Recognition", "Relational Databases", "Local Buffer Design"].map((skill, sIdx) => (
                <span key={sIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-text-secondary">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Columns (Projects, Achievements, Certifications) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Key Systems Engineered */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-text-muted uppercase border-b border-white/5 pb-2.5 mb-4 font-semibold">Key Systems Engineered</h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-display font-semibold text-text-primary text-sm">AutoBiz AI: Invoice Intelligence Platform</h4>
                  <span className="font-mono text-[10px] text-accent-gold">React / Express / Gemini</span>
                </div>
                <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                  Developed an intelligent ingestion system using Google Gemini AI structured JSON prompting to parse multi-template vendor invoices automatically. Integrated GST verifications, automated fraud auditing algorithms, and dashboard analysis models.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-display font-semibold text-text-primary text-sm">VisionBus: AI Smart Transit Safe Guards</h4>
                  <span className="font-mono text-[10px] text-electric-cyan">Python / OpenCV / Node</span>
                </div>
                <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                  Built a dual-tier vehicle computer-vision attendance module utilizing face vectors and GPS maps tracking. Designed local buffering queues to support cellular disruptions on edge networks.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-display font-semibold text-text-primary text-sm">NOCTUA: Night Lab Authorizations</h4>
                  <span className="font-mono text-[10px] text-royal-blue">React / Express / Postgres</span>
                </div>
                <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                  Engineered role-based student access registers with PostgreSQL transaction locks to monitor live laboratory capacities, booking pipelines, and security checkouts.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Honors & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h3 className="text-xs font-mono tracking-widest text-text-muted uppercase border-b border-white/5 pb-2.5 mb-3 font-semibold">Certifications</h3>
              <ul className="space-y-2 text-xs text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                  <span>NPTEL: Data Structures & Algorithms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                  <span>NPTEL: Introduction to Graphic Design</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                  <span>Infosys Springboard Accredited</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                  <span>HackerRank: Certified SQL Expert</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono tracking-widest text-text-muted uppercase border-b border-white/5 pb-2.5 mb-3 font-semibold">Honors & Activities</h3>
              <ul className="space-y-2 text-xs text-text-secondary">
                <li className="flex items-start gap-2">
                  <Award className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                  <span>National Level Hackathon Pitch Participant</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                  <span>Winner: WebWizard Hackathon Title</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                  <span>Selected Finalist: Tackathon 2K25</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                  <span>Competitive Mastery: CodeChef & LeetCode</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
