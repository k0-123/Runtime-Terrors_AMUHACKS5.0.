export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Skill {
  name: string;
  confidence: number;
  category: 'technical' | 'soft' | 'domain';
}

export interface ExtractedSkill extends Skill {
  context?: string;
}

export interface JobMatch {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
}

export interface ResumeSection {
  type: 'summary' | 'skills' | 'experience' | 'education' | 'certifications';
  content: string | string[];
}

export interface Resume {
  id: string;
  name: string;
  title: string;
  sections: ResumeSection[];
  createdAt: Date;
}

export interface UploadedDocument {
  id: string;
  name: string;
  type: 'transcript' | 'project' | 'certificate';
  size: number;
  uploadedAt: Date;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

export interface DashboardMetric {
  label: string;
  value: number;
  suffix?: string;
  change?: number;
  trend: 'up' | 'down' | 'neutral';
}

export type NavItem = {
  id: string;
  label: string;
  icon: string;
};

export type ViewState = 
  | 'auth'
  | 'dashboard'
  | 'upload'
  | 'skills'
  | 'match'
  | 'resume'
  | 'insights';