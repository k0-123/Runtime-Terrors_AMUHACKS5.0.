import { useState, useEffect } from 'react';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { Target, Check, X, ArrowRight, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { JobMatch } from '@/types';

interface MatchSectionProps {
  jobMatch: JobMatch | null;
  onAnalyze: (jobDescription: string) => void;
  isLoading: boolean;
}

function CircularScore({ score, isVisible }: { score: number; isVisible: boolean }) {
  const { count, startAnimation } = useCountUp(score, 2000);
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (count / 100) * circumference;

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => startAnimation(), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, startAnimation]);

  const getScoreColor = (s: number) => {
    if (s >= 80) return '#27C59A';
    if (s >= 60) return '#F2C94C';
    return '#FF5A7E';
  };

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="12"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={getScoreColor(score)}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={isVisible ? strokeDashoffset : circumference}
          style={{ transition: 'stroke-dashoffset 2s ease-out' }}
          className="animate-pulse-slow"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-display font-bold text-white tabular-nums">
          {count}%
        </span>
        <span className="text-sm text-muted-foreground mt-1">
          {score >= 80 ? 'Strong Match' : score >= 60 ? 'Good Match' : 'Needs Work'}
        </span>
      </div>
    </div>
  );
}

export function MatchSection({ jobMatch, onAnalyze, isLoading }: MatchSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [jobDescription, setJobDescription] = useState('');

  const handleAnalyze = () => {
    if (jobDescription.trim()) {
      onAnalyze(jobDescription);
    }
  };

  return (
    <section ref={ref} className="min-h-screen w-full flex items-center justify-center relative py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-glow-violet opacity-20" />
      
      <div 
        className={`relative w-[90vw] max-w-6xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Text */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit mb-6">
              <Target className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Job Matching</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white uppercase mb-6">
              Match With Real Roles
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Compare your profile to any job description. Spot gaps. Close them fast.
            </p>

            {/* Job Description Input */}
            {!jobMatch && (
              <div className="space-y-4">
                <Textarea
                  placeholder="Paste a job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px] bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 resize-none"
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={isLoading || !jobDescription.trim()}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-background font-semibold"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Analyzing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Analyze Match
                    </span>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Right Match Card */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {jobMatch ? (
              <div className="bg-glass rounded-3xl p-8 border border-white/5">
                {/* Score */}
                <CircularScore score={jobMatch.score} isVisible={isVisible} />

                {/* Matched Skills */}
                <div className="mt-8">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Matched Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {jobMatch.matchedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
                      >
                        <Check className="w-3 h-3" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                {jobMatch.missingSkills.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-muted-foreground mb-3">Skills to Develop</p>
                    <div className="flex flex-wrap gap-2">
                      {jobMatch.missingSkills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
                        >
                          <X className="w-3 h-3" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {jobMatch.recommendations.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-muted-foreground mb-3">Recommendations</p>
                    <ul className="space-y-2">
                      {jobMatch.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs text-cyan-400">{i + 1}</span>
                          </span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Try Another */}
                <button
                  onClick={() => {}}
                  className="mt-6 text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  Upload a different JD
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="bg-glass rounded-3xl p-12 border border-white/5 text-center">
                <Target className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">Paste a job description to see your match score</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}