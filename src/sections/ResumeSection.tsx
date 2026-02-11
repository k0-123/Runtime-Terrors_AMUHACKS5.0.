import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { FileText, Download, Eye, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Resume } from '@/types';

interface ResumeSectionProps {
  resumes: Resume[];
  skills: string[];
  onGenerate: () => void;
  isLoading: boolean;
}

function ResumePreview({ resume }: { resume: Resume }) {
  return (
    <div className="bg-white rounded-xl p-6 text-gray-900 shadow-2xl transform scale-[0.85] origin-top">
      {/* Header */}
      <div className="border-b-2 border-gray-200 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{resume.name}</h2>
        <p className="text-lg text-gray-600">{resume.title}</p>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Summary</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Results-driven professional with expertise in data analysis and software development. 
          Proven track record of delivering impactful projects and collaborating with cross-functional teams.
        </p>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {(() => {
            const skillsSection = resume.sections.find(s => s.type === 'skills');
            const skills = skillsSection?.content;
            if (Array.isArray(skills)) {
              return skills.map((skill: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                  {skill}
                </span>
              ));
            }
            return null;
          })()}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Experience</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-baseline">
              <h4 className="font-semibold text-sm">Data Analyst Intern</h4>
              <span className="text-xs text-gray-500">2023 - Present</span>
            </div>
            <p className="text-xs text-gray-600">TechCorp Inc.</p>
            <ul className="mt-1 space-y-1">
              <li className="text-xs text-gray-700">• Analyzed large datasets to identify trends and patterns</li>
              <li className="text-xs text-gray-700">• Built automated reporting dashboards using Python and SQL</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Education</h3>
        <div>
          <div className="flex justify-between items-baseline">
            <h4 className="font-semibold text-sm">B.S. Computer Science</h4>
            <span className="text-xs text-gray-500">2020 - 2024</span>
          </div>
          <p className="text-xs text-gray-600">Stanford University</p>
        </div>
      </div>
    </div>
  );
}

export function ResumeSection({ resumes, skills, onGenerate, isLoading }: ResumeSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const latestResume = resumes[resumes.length - 1];

  return (
    <section ref={ref} className="min-h-screen w-full flex items-center justify-center relative py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-glow-cyan opacity-15" />
      
      <div 
        className={`relative w-[90vw] max-w-6xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Text */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 w-fit mb-6">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">Resume Builder</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white uppercase mb-6">
              Build An ATS-Ready Resume
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Clean structure, strong bullets, and the right keywords—so you make it past the filters.
            </p>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {[
                'ATS-optimized formatting',
                'Keyword optimization',
                'Professional templates',
                'One-click PDF export',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onGenerate}
                disabled={isLoading || skills.length === 0}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-background font-semibold"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Generate Resume
                  </span>
                )}
              </Button>
              
              {latestResume && (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/10 text-white hover:bg-white/5"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              )}
            </div>

            {skills.length === 0 && (
              <p className="text-xs text-muted-foreground mt-4">
                Upload documents first to generate a resume with your skills
              </p>
            )}
          </div>

          {/* Right Resume Preview */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="bg-glass rounded-3xl p-4 border border-white/5">
              {latestResume ? (
                <>
                  <div className="flex items-center justify-between mb-4 px-4">
                    <div>
                      <h3 className="text-lg font-display font-semibold text-white">{latestResume.name}</h3>
                      <p className="text-sm text-muted-foreground">{latestResume.title}</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                  <div className="overflow-hidden rounded-xl">
                    <ResumePreview resume={latestResume} />
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">No resume generated yet</p>
                  <p className="text-sm text-muted-foreground/60">Click "Generate Resume" to create your first ATS-optimized resume</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}