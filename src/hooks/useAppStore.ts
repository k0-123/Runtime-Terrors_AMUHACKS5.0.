import { useState, useCallback } from 'react';
import type { User, Skill, JobMatch, Resume, UploadedDocument, ViewState } from '../types';

export function useAppStore() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('auth');
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [extractedSkills, setExtractedSkills] = useState<Skill[]>([]);
  const [jobMatch, setJobMatch] = useState<JobMatch | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback((email: string, _password: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: '1',
        email,
        name: email.split('@')[0],
      });
      setCurrentView('dashboard');
      setIsLoading(false);
    }, 1000);
  }, []);

  const signup = useCallback((email: string, _password: string, name: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: '1',
        email,
        name,
      });
      setCurrentView('dashboard');
      setIsLoading(false);
    }, 1000);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentView('auth');
    setDocuments([]);
    setExtractedSkills([]);
    setJobMatch(null);
    setResumes([]);
  }, []);

  const uploadDocument = useCallback((file: File) => {
    const newDoc: UploadedDocument = {
      id: Date.now().toString(),
      name: file.name,
      type: file.name.includes('transcript') ? 'transcript' : 
            file.name.includes('cert') ? 'certificate' : 'project',
      size: file.size,
      uploadedAt: new Date(),
      status: 'processing',
    };
    setDocuments(prev => [...prev, newDoc]);
    
    // Simulate processing
    setTimeout(() => {
      setDocuments(prev => 
        prev.map(d => d.id === newDoc.id ? { ...d, status: 'completed' } : d)
      );
      
      // Add some extracted skills
      const newSkills: Skill[] = [
        { name: 'Data Analysis', confidence: 94, category: 'technical' },
        { name: 'Python', confidence: 91, category: 'technical' },
        { name: 'Project Management', confidence: 88, category: 'soft' },
        { name: 'Technical Writing', confidence: 85, category: 'soft' },
        { name: 'User Research', confidence: 82, category: 'domain' },
        { name: 'SQL', confidence: 79, category: 'technical' },
      ];
      setExtractedSkills(prev => [...prev, ...newSkills]);
    }, 2000);
  }, []);

  const analyzeJobMatch = useCallback((_jobDescription: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setJobMatch({
        score: 87,
        matchedSkills: ['Python', 'Data Analysis', 'SQL', 'Project Management'],
        missingSkills: ['Kubernetes', 'Go', 'Terraform'],
        recommendations: [
          'Add cloud platform experience',
          'Highlight leadership in projects',
          'Include metrics in bullet points',
        ],
      });
      setIsLoading(false);
    }, 1500);
  }, []);

  const generateResume = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const newResume: Resume = {
        id: Date.now().toString(),
        name: 'Alex Chen',
        title: 'Data Analyst',
        sections: [
          { type: 'summary', content: 'Results-driven data analyst with 3+ years of experience...' },
          { type: 'skills', content: ['Python', 'SQL', 'Data Analysis', 'Tableau', 'Machine Learning'] },
          { type: 'experience', content: 'Senior Data Analyst at Tech Corp (2021-Present)' },
          { type: 'education', content: 'BS in Computer Science, Stanford University' },
        ],
        createdAt: new Date(),
      };
      setResumes(prev => [...prev, newResume]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return {
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
  };
}