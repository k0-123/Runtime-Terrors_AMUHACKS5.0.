import { useEffect } from 'react';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { BarChart3, TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import type { Skill, JobMatch } from '@/types';

interface InsightsSectionProps {
  skills: Skill[];
  jobMatch: JobMatch | null;
  resumesCount: number;
}

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
  trend: 'up' | 'down' | 'neutral';
  change?: number;
  delay: number;
  isVisible: boolean;
}

function MetricCard({ label, value, suffix = '', trend, change, delay, isVisible }: MetricCardProps) {
  const { count, startAnimation } = useCountUp(value, 2000);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => startAnimation(), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay, startAnimation]);

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
  };

  const trendColors = {
    up: 'text-emerald-400',
    down: 'text-rose-400',
    neutral: 'text-muted-foreground',
  };

  const TrendIcon = trendIcons[trend];

  return (
    <div
      className={`p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className={`flex items-center gap-1 ${trendColors[trend]}`}>
          <TrendIcon className="w-4 h-4" />
          {change !== undefined && (
            <span className="text-xs font-medium">{change > 0 ? '+' : ''}{change}%</span>
          )}
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-display font-bold text-white tabular-nums">
          {count}
        </span>
        <span className="text-xl text-muted-foreground">{suffix}</span>
      </div>
    </div>
  );
}

export function InsightsSection({ skills, jobMatch, resumesCount }: InsightsSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const avgMatchScore = jobMatch?.score || 0;
  const technicalSkillsCount = skills.filter(s => s.category === 'technical').length;

  return (
    <section ref={ref} className="min-h-screen w-full flex items-center justify-center relative py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-glow-violet opacity-25" />
      
      <div 
        className={`relative w-[90vw] max-w-6xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Text */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 w-fit mb-6">
              <BarChart3 className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">Analytics</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white uppercase mb-6">
              Insights That Move You Forward
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Track match strength, skill growth, and next steps—all in one place.
            </p>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all group">
                <span className="text-sm text-white">Review your skill gaps</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all group">
                <span className="text-sm text-white">Explore recommended roles</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all group">
                <span className="text-sm text-white">Update your resume</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
              </button>
            </div>
          </div>

          {/* Right Stats Panel */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="bg-glass rounded-3xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-semibold text-white">Your Progress</h3>
                <span className="text-xs text-muted-foreground">Last 30 days</span>
              </div>

              <div className="space-y-4">
                <MetricCard
                  label="Avg. Job Match"
                  value={avgMatchScore}
                  suffix="%"
                  trend="up"
                  change={12}
                  delay={0}
                  isVisible={isVisible}
                />
                <MetricCard
                  label="Skills Mapped"
                  value={skills.length}
                  trend="up"
                  change={skills.length > 0 ? 25 : 0}
                  delay={100}
                  isVisible={isVisible}
                />
                <MetricCard
                  label="Technical Skills"
                  value={technicalSkillsCount}
                  trend={technicalSkillsCount > 3 ? 'up' : 'neutral'}
                  delay={200}
                  isVisible={isVisible}
                />
                <MetricCard
                  label="Resumes Generated"
                  value={resumesCount}
                  trend={resumesCount > 0 ? 'up' : 'neutral'}
                  delay={300}
                  isVisible={isVisible}
                />
              </div>

              {/* Mini Chart */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-sm text-muted-foreground mb-4">Match Score Trend</p>
                <div className="h-24 flex items-end gap-2">
                  {[40, 55, 45, 60, 70, 65, 80, 75, 85, 87].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-cyan-500/50 to-cyan-400/80 rounded-t-sm transition-all duration-500"
                      style={{
                        height: isVisible ? `${height}%` : '0%',
                        transitionDelay: `${i * 50 + 500}ms`,
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Week 1</span>
                  <span>Week 5</span>
                  <span>Week 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}