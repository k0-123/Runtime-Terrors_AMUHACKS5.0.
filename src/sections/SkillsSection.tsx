import { useEffect } from 'react';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { Brain, Code, Users, Lightbulb } from 'lucide-react';
import type { Skill } from '@/types';

interface SkillsSectionProps {
  skills: Skill[];
}

const categoryIcons = {
  technical: Code,
  soft: Users,
  domain: Lightbulb,
};

const categoryColors = {
  technical: 'from-cyan-500/20 to-cyan-400/10 text-cyan-400',
  soft: 'from-violet-500/20 to-violet-400/10 text-violet-400',
  domain: 'from-emerald-500/20 to-emerald-400/10 text-emerald-400',
};

function SkillBar({ skill, index, isVisible }: { skill: Skill; index: number; isVisible: boolean }) {
  const { count, startAnimation } = useCountUp(skill.confidence, 1500);
  const Icon = categoryIcons[skill.category];

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => startAnimation(), index * 100 + 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, index, startAnimation]);

  return (
    <div
      className={`group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-white/[0.07] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryColors[skill.category]} flex items-center justify-center`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-white font-medium">{skill.name}</span>
        <span className="ml-auto text-2xl font-display font-bold text-cyan-400 tabular-nums">
          {count}%
        </span>
      </div>
      
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${categoryColors[skill.category].split(' ')[0].replace('/20', '')} to-cyan-400 transition-all duration-1000 ease-out`}
          style={{ 
            width: isVisible ? `${skill.confidence}%` : '0%',
            transitionDelay: `${index * 50 + 300}ms`
          }}
        />
      </div>
    </div>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const technicalSkills = skills.filter(s => s.category === 'technical');
  const softSkills = skills.filter(s => s.category === 'soft');
  const domainSkills = skills.filter(s => s.category === 'domain');

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 w-fit mb-6">
              <Brain className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">AI Extraction</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white uppercase mb-6">
              Extracted Skills
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We map your academic language to industry-standard skills—so recruiters see what you can do.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                <p className="text-3xl font-display font-bold text-cyan-400">{technicalSkills.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Technical</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                <p className="text-3xl font-display font-bold text-violet-400">{softSkills.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Soft Skills</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                <p className="text-3xl font-display font-bold text-emerald-400">{domainSkills.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Domain</p>
              </div>
            </div>
          </div>

          {/* Right Skills Panel */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="bg-glass rounded-3xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-semibold text-white">Skill Analysis</h3>
                <span className="text-xs text-muted-foreground">{skills.length} skills found</span>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-hide pr-2">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      index={index}
                      isVisible={isVisible}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Brain className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">Upload documents to extract skills</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}