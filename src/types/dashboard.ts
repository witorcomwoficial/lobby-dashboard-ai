export type TaskStatus = 'feito' | 'em_andamento' | 'pendente' | 'em_revisao';

export type TaskCategory = 
  | 'trafego_ads' 
  | 'social_media' 
  | 'design_criacao' 
  | 'eventos_sympla' 
  | 'estrategia';

export type TaskPriority = 'baixa' | 'media' | 'alta' | 'urgente';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  completedAt?: string;
  assignee: string;
  deliverableUrl?: string;
  imageUrl?: string;
  images?: string[];
  notes?: string;
  approvedByClient?: boolean;
}

export interface AdCampaign {
  id: string;
  name: string;
  platform: 'Meta Ads (Instagram)' | 'Google Ads' | 'TikTok Ads' | 'Meta Retargeting';
  period: string;
  budget: number;
  spent: number;
  reach: number;
  impressions: number;
  clicks: number;
  conversions: number; // Ingressos Sympla / Reservas
  cpc: number;
  cpm: number;
  ctr: number;
  cpa: number; // Custo por Conversão
  roas: number;
  status: 'ativa' | 'pausada' | 'finalizada';
  targetAudience: string;
  creativeUrl?: string;
  notes?: string;
}

export interface AdsOverallMetrics {
  totalSpent: number;
  totalConversions: number;
  totalClicks: number;
  totalReach: number;
  totalImpressions: number;
  avgCpc: number;
  avgCtr: number;
  roas: number;
  symplaRevenueEstimated: number;
  periodLabel: string;
}

export interface InstagramMetric {
  followers: number;
  followersGrowth: number;
  accountsReached: number;
  reachGrowth: number;
  engagementRate: number;
  totalPosts: number;
  averageStoryViews: number;
  profileVisits: number;
  websiteClicks: number;
}

export interface InstagramPost {
  id: string;
  type: 'reel' | 'post' | 'carrossel';
  title: string;
  publishedDate: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  reach: number;
  thumbnailColor: string;
  highlightText: string;
  url?: string;
}

export interface ClientProfile {
  handle: string;
  name: string;
  tagline: string;
  subtitle: string;
  verified: boolean;
  postsCount: number;
  followersCount: string;
  bioLines: string[];
  location: string;
  businessHours: string;
  ticketingPartner: string;
  ticketLink: string;
  linktree: string;
  highlights: {
    id: string;
    title: string;
    icon: string;
    description: string;
  }[];
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
    dark: string;
  };
  keyNotes: string[];
}
