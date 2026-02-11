 import { useAppStore } from './hooks/useAppStore';
import { AuthScreen } from './components/AuthScreen';
import { Navigation, TopBar } from './components/Navigation';
import { HeroSection } from './sections/HeroSection';
import { UploadSection } from './sections/UploadSection';
import { SkillsSection } from './sections/SkillsSection';
import { MatchSection } from './sections/MatchSection';
import { ResumeSection } from './sections/ResumeSection';
import { InsightsSection } from './sections/InsightsSection';
import { CTASection } from './sections/CTASection';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';


function App() {
  const {
    user,
    currentView,
    documents,
    extractedSkills,
    jobMatch,
    resumes,
    isLoading,
    login,
    signup,
    logout,
    setCurrentView,
    uploadDocument,
    analyzeJobMatch,
    generateResume,
  } = useAppStore();

  const handleUpload = (file: File) => {
    uploadDocument(file);
    toast.success(`Uploaded ${file.name}`, {
      description: 'Processing your document...',
    });
  };

  const handleAnalyze = (jobDescription: string) => {
    analyzeJobMatch(jobDescription);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Analyzing job match...',
        success: 'Analysis complete!',
        error: 'Analysis failed',
      }
    );
  };

  const handleGenerateResume = () => {
    if (extractedSkills.length === 0) {
      toast.error('No skills found', {
        description: 'Please upload documents first to extract your skills.',
      });
      return;
    }
    generateResume();
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Generating your resume...',
        success: 'Resume generated successfully!',
        error: 'Generation failed',
      }
    );
  };

  
  if (!user) {
    return (
      <div className="min-h-screen bg-background noise-overlay">
        <AuthScreen onLogin={login} onSignup={signup} isLoading={isLoading} />
        <Toaster position="top-center" theme="dark" />
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-background noise-overlay">
     
      <Navigation currentView={currentView} onViewChange={setCurrentView} onLogout={logout} />
      <TopBar userName={user.name} />

     
      <main className="ml-16 lg:ml-60 pt-16">
    
        {currentView === 'dashboard' && (
          <HeroSection onGetStarted={() => setCurrentView('upload')} />
        )}

       
        {currentView === 'upload' && (
          <UploadSection documents={documents} onUpload={handleUpload} />
        )}
 
        {currentView === 'skills' && (
          <SkillsSection skills={extractedSkills} />
        )}

     
        {currentView === 'match' && (
          <MatchSection 
            jobMatch={jobMatch} 
            onAnalyze={handleAnalyze} 
            isLoading={isLoading} 
          />
        )}

      
        {currentView === 'resume' && (
          <ResumeSection 
            resumes={resumes}
            skills={extractedSkills.map(s => s.name)}
            onGenerate={handleGenerateResume}
            isLoading={isLoading}
          />
        )}

    
        {currentView === 'insights' && (
          <InsightsSection 
            skills={extractedSkills}
            jobMatch={jobMatch}
            resumesCount={resumes.length}
          />
        )}

        
        {currentView === 'dashboard' && (
          <CTASection onGetStarted={() => setCurrentView('upload')} />
        )}
      </main>

      <Toaster position="top-center" theme="dark" />
    </div>
  );
}

export default App;