export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'extreme' | 'warning';
  timestamp: Date;
  department: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'document' | 'notice' | 'update';
  department: string;
}

export interface Expert {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  skills: string[];
  projects: string[];
  avatar: string;
  phone: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: Date;
  status: 'processing' | 'converted' | 'failed';
  fromFormat?: string;
  toFormat?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'pdf' | 'word' | 'scan' | 'excel';
  department: string;
  lastModified: Date;
  relevanceScore: number;
}

export interface CollaborativeDoc {
  id: string;
  title: string;
  content: string;
  collaborators: string[];
  lastModified: Date;
  version: number;
  status: 'draft' | 'review' | 'published';
}

export interface DailyStats {
  uploads: number;
  conversions: number;
  searches: number;
  activeUsers: number;
}