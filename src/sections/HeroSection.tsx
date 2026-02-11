import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    const card = cardRef.current;
    const headline = headlineRef.current;
    const image = imageRef.current;

    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 100);
    }

    if (headline) {
      headline.style.opacity = '0';
      headline.style.transform = 'translateY(24px)';
      setTimeout(() => {
        headline.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        headline.style.opacity = '1';
        headline.style.transform = 'translateY(0)';
      }, 300);
    }

    if (image) {
      image.style.clipPath = 'inset(0 100% 0 0)';
      setTimeout(() => {
        image.style.transition = 'clip-path 1s cubic-bezier(0.16, 1, 0.3, 1)';
        image.style.clipPath = 'inset(0 0 0 0)';
      }, 500);
    }
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-glow-cyan opacity-40" />
      <div className="absolute inset-0 bg-glow-violet opacity-20" />
      
      {/* Dot Grid */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(46, 217, 255, 0.6) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Hero Card */}
      <div
        ref={cardRef}
        className="relative w-[90vw] max-w-6xl min-h-[70vh] bg-glass rounded-3xl overflow-hidden shadow-2xl mx-4"
      >
        <div className="grid lg:grid-cols-2 gap-8 h-full">
          {/* Left Content */}
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 w-fit mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">AI-Powered</span>
            </div>

            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white uppercase leading-[0.95] mb-6"
            >
              Turn Coursework Into{' '}
              <span className="text-gradient-cyan">Career Wins</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-md leading-relaxed">
              Upload your academic work. We extract skills, match real jobs, and build an ATS-ready resume—in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-background font-semibold px-8"
              >
                Start Building Your Resume
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Free for students. No credit card.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div
              ref={imageRef}
              className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-cyan-500/20"
            >
              <img
                src="/hero_student.jpg"
                alt="Student working"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}