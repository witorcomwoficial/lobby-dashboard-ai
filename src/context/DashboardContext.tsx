import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Task, 
  AdCampaign, 
  AdsOverallMetrics, 
  InstagramMetric, 
  InstagramPost, 
  ClientProfile,
  TaskStatus
} from '../types/dashboard';
import { 
  initialClientProfile, 
  initialTasks, 
  initialCampaigns, 
  initialAdsOverall, 
  initialInstagramMetric, 
  initialInstagramPosts 
} from '../data/initialData';
import { 
  fetchDashboardFromSheets, 
  saveDashboardToSheets, 
  DashboardSyncData 
} from '../services/sheetsService';

interface DashboardContextType {
  clientProfile: ClientProfile;
  tasks: Task[];
  campaigns: AdCampaign[];
  adsOverall: AdsOverallMetrics;
  instagramMetric: InstagramMetric;
  instagramPosts: InstagramPost[];
  activeTab: 'overview' | 'tasks' | 'ads' | 'instagram' | 'brand';
  setActiveTab: (tab: 'overview' | 'tasks' | 'ads' | 'instagram' | 'brand') => void;
  viewMode: 'client' | 'agency';
  setViewMode: (mode: 'client' | 'agency') => void;
  dateRange: '7d' | '30d' | 'month' | 'quarter';
  setDateRange: (range: '7d' | '30d' | 'month' | 'quarter') => void;
  syncStatus: 'synced' | 'syncing' | 'offline';
  
  // Task actions
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleClientApproval: (id: string) => Promise<void>;
  editTask: (id: string, updated: Partial<Task>) => Promise<void>;

  // Ads actions
  addCampaign: (campaign: Omit<AdCampaign, 'id'>) => Promise<void>;
  updateCampaign: (id: string, updated: Partial<AdCampaign>) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
  updateAdsOverall: (metrics: Partial<AdsOverallMetrics>) => Promise<void>;

  // Instagram actions
  updateInstagramMetric: (metrics: Partial<InstagramMetric>) => Promise<void>;
  addInstagramPost: (post: Omit<InstagramPost, 'id'>) => void;

  // Client profile actions
  updateClientProfile: (profile: Partial<ClientProfile>) => Promise<void>;

  // Global utilities
  syncWithSheets: () => Promise<void>;
  resetToDefaults: () => Promise<void>;
  exportDataJSON: () => void;
  importDataJSON: (jsonString: string) => boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado inicial na memória (Google Sheets é a fonte primária persistente)
  const [clientProfile, setClientProfile] = useState<ClientProfile>(initialClientProfile);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(initialCampaigns);
  const [adsOverall, setAdsOverall] = useState<AdsOverallMetrics>(initialAdsOverall);
  const [instagramMetric, setInstagramMetric] = useState<InstagramMetric>(initialInstagramMetric);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>(initialInstagramPosts);

  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'ads' | 'instagram' | 'brand'>('overview');
  const [viewMode, setViewMode] = useState<'client' | 'agency'>('agency');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'month' | 'quarter'>('month');
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('syncing');

  const isInitialMount = useRef(true);
  const isUpdatingFromCloud = useRef(false);

  // REGRA 2 & 5: Quando o dashboard for aberto ou atualizado, consultar endpoint via GET
  const syncWithSheets = useCallback(async () => {
    try {
      setSyncStatus('syncing');
      const remoteData = await fetchDashboardFromSheets();

      if (remoteData) {
        isUpdatingFromCloud.current = true;

        // 1. Merge robusto de clientProfile com estado padrão
        if (remoteData.clientProfile) {
          setClientProfile(prev => ({
            ...initialClientProfile,
            ...prev,
            ...remoteData.clientProfile,
            brandColors: {
              ...initialClientProfile.brandColors,
              ...(prev?.brandColors || {}),
              ...(remoteData.clientProfile?.brandColors || {})
            },
            bioLines: Array.isArray(remoteData.clientProfile?.bioLines) && remoteData.clientProfile.bioLines.length > 0
              ? remoteData.clientProfile.bioLines
              : (prev?.bioLines ?? initialClientProfile.bioLines),
            highlights: Array.isArray(remoteData.clientProfile?.highlights) && remoteData.clientProfile.highlights.length > 0
              ? remoteData.clientProfile.highlights
              : (prev?.highlights ?? initialClientProfile.highlights),
            keyNotes: Array.isArray(remoteData.clientProfile?.keyNotes) && remoteData.clientProfile.keyNotes.length > 0
              ? remoteData.clientProfile.keyNotes
              : (prev?.keyNotes ?? initialClientProfile.keyNotes)
          }));
        }

        // 2. Merge robusto de adsOverall garantindo todos os números definidos
        if (remoteData.adsOverall) {
          setAdsOverall(prev => ({
            ...initialAdsOverall,
            ...prev,
            ...remoteData.adsOverall,
            totalSpent: Number(remoteData.adsOverall?.totalSpent ?? prev?.totalSpent ?? initialAdsOverall.totalSpent),
            totalConversions: Number(remoteData.adsOverall?.totalConversions ?? prev?.totalConversions ?? initialAdsOverall.totalConversions),
            totalClicks: Number(remoteData.adsOverall?.totalClicks ?? prev?.totalClicks ?? initialAdsOverall.totalClicks),
            totalReach: Number(remoteData.adsOverall?.totalReach ?? prev?.totalReach ?? initialAdsOverall.totalReach),
            totalImpressions: Number(remoteData.adsOverall?.totalImpressions ?? prev?.totalImpressions ?? initialAdsOverall.totalImpressions),
            avgCpc: Number(remoteData.adsOverall?.avgCpc ?? prev?.avgCpc ?? initialAdsOverall.avgCpc),
            avgCtr: Number(remoteData.adsOverall?.avgCtr ?? prev?.avgCtr ?? initialAdsOverall.avgCtr),
            roas: Number(remoteData.adsOverall?.roas ?? prev?.roas ?? initialAdsOverall.roas),
            symplaRevenueEstimated: Number(remoteData.adsOverall?.symplaRevenueEstimated ?? prev?.symplaRevenueEstimated ?? initialAdsOverall.symplaRevenueEstimated)
          }));
        }

        // 3. Merge robusto de instagramMetric garantindo averageStoryViews e demais métricas definidas
        if (remoteData.instagramMetric) {
          setInstagramMetric(prev => ({
            ...initialInstagramMetric,
            ...prev,
            ...remoteData.instagramMetric,
            followers: Number(remoteData.instagramMetric?.followers ?? prev?.followers ?? initialInstagramMetric.followers),
            followersGrowth: Number(remoteData.instagramMetric?.followersGrowth ?? prev?.followersGrowth ?? initialInstagramMetric.followersGrowth),
            accountsReached: Number(remoteData.instagramMetric?.accountsReached ?? prev?.accountsReached ?? initialInstagramMetric.accountsReached),
            reachGrowth: Number(remoteData.instagramMetric?.reachGrowth ?? prev?.reachGrowth ?? initialInstagramMetric.reachGrowth),
            engagementRate: Number(remoteData.instagramMetric?.engagementRate ?? prev?.engagementRate ?? initialInstagramMetric.engagementRate),
            totalPosts: Number(remoteData.instagramMetric?.totalPosts ?? prev?.totalPosts ?? initialInstagramMetric.totalPosts),
            averageStoryViews: Number(remoteData.instagramMetric?.averageStoryViews ?? prev?.averageStoryViews ?? initialInstagramMetric.averageStoryViews),
            profileVisits: Number(remoteData.instagramMetric?.profileVisits ?? prev?.profileVisits ?? initialInstagramMetric.profileVisits),
            websiteClicks: Number(remoteData.instagramMetric?.websiteClicks ?? prev?.websiteClicks ?? initialInstagramMetric.websiteClicks)
          }));
        }

        // 4. Merge robusto de tasks com propriedades seguras
        if (Array.isArray(remoteData.tasks) && remoteData.tasks.length > 0) {
          setTasks(remoteData.tasks.map(t => ({
            id: t.id || `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            title: t.title || '',
            description: t.description || '',
            category: t.category || 'trafego_ads',
            status: t.status || 'pendente',
            priority: t.priority || 'media',
            dueDate: t.dueDate || '',
            assignee: t.assignee || 'Equipe',
            completedAt: t.completedAt,
            deliverableUrl: t.deliverableUrl,
            imageUrl: t.imageUrl,
            images: t.images,
            notes: t.notes,
            approvedByClient: Boolean(t.approvedByClient)
          })));
        }

        // 5. Merge robusto de campaigns com valores numéricos seguros
        if (Array.isArray(remoteData.campaigns) && remoteData.campaigns.length > 0) {
          setCampaigns(remoteData.campaigns.map(c => ({
            id: c.id || `camp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            name: c.name || '',
            platform: c.platform || 'Meta Ads (Instagram)',
            period: c.period || 'Mês Atual',
            budget: Number(c.budget ?? 0),
            spent: Number(c.spent ?? 0),
            reach: Number(c.reach ?? 0),
            impressions: Number(c.impressions ?? 0),
            clicks: Number(c.clicks ?? 0),
            conversions: Number(c.conversions ?? 0),
            cpc: Number(c.cpc ?? 0),
            cpm: Number(c.cpm ?? 0),
            ctr: Number(c.ctr ?? 0),
            cpa: Number(c.cpa ?? 0),
            roas: Number(c.roas ?? 1),
            status: c.status || 'ativa',
            targetAudience: c.targetAudience || 'Brasília, DF',
            creativeUrl: c.creativeUrl,
            notes: c.notes
          })));
        }

        // 6. Merge seguro de instagramPosts
        if (Array.isArray(remoteData.instagramPosts) && remoteData.instagramPosts.length > 0) {
          setInstagramPosts(remoteData.instagramPosts);
        }
        
        setSyncStatus('synced');
        setTimeout(() => {
          isUpdatingFromCloud.current = false;
        }, 300);
      } else {
        // Planilha vazia no primeiro carregamento: persistir estado inicial
        setSyncStatus('synced');
      }
    } catch (err) {
      console.warn('[Google Sheets] Erro ao carregar dados salvos:', err);
      setSyncStatus('offline');
    }
  }, []);

  // Leitura GET automática na abertura do painel
  useEffect(() => {
    syncWithSheets();
  }, [syncWithSheets]);

  // REGRA 1 & 6: Quando preencher, editar ou salvar, enviar via POST para Google Sheets (debounced)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (isUpdatingFromCloud.current) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSyncStatus('syncing');
        const syncPayload: DashboardSyncData = {
          clientProfile,
          tasks,
          campaigns,
          adsOverall,
          instagramMetric,
          instagramPosts,
          updatedAt: new Date().toISOString()
        };

        const result = await saveDashboardToSheets(syncPayload);
        if (result.success) {
          setSyncStatus('synced');
        } else {
          setSyncStatus('offline');
        }
      } catch (err) {
        console.warn('[Google Sheets] Erro ao gravar dados via POST:', err);
        setSyncStatus('offline');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [clientProfile, tasks, campaigns, adsOverall, instagramMetric, instagramPosts]);

  // Actions de Tarefas
  const addTask = async (newTask: Omit<Task, 'id'>) => {
    const id = `task-${Date.now()}`;
    const task: Task = {
      ...newTask,
      id
    };
    setTasks(prev => [task, ...prev]);
  };

  const updateTaskStatus = async (id: string, status: TaskStatus) => {
    const isNowCompleted = status === 'feito';
    const completedAt = isNowCompleted ? new Date().toISOString().split('T')[0] : undefined;

    if (isNowCompleted) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#FFE600', '#FACC15', '#ffffff', '#EAB308']
        });
      } catch {
        // fallback
      }
    }

    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, status, completedAt } : t))
    );
  };

  const editTask = async (id: string, updated: Partial<Task>) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTask = async (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleClientApproval = async (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, approvedByClient: !t.approvedByClient } : t))
    );
  };

  // Actions de Campanhas de Ads
  const addCampaign = async (newCamp: Omit<AdCampaign, 'id'>) => {
    const id = `camp-${Date.now()}`;
    const campaign: AdCampaign = {
      ...newCamp,
      id
    };
    setCampaigns(prev => [campaign, ...prev]);

    setAdsOverall(prev => ({
      ...prev,
      totalSpent: prev.totalSpent + campaign.spent,
      totalConversions: prev.totalConversions + campaign.conversions,
      totalClicks: prev.totalClicks + campaign.clicks,
      totalReach: prev.totalReach + campaign.reach,
      totalImpressions: prev.totalImpressions + campaign.impressions,
      symplaRevenueEstimated: prev.symplaRevenueEstimated + (campaign.conversions * 65)
    }));
  };

  const updateCampaign = async (id: string, updated: Partial<AdCampaign>) => {
    setCampaigns(prev => prev.map(c => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteCampaign = async (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const updateAdsOverall = async (metrics: Partial<AdsOverallMetrics>) => {
    setAdsOverall(prev => ({ ...prev, ...metrics }));
  };

  // Actions do Instagram
  const updateInstagramMetric = async (metrics: Partial<InstagramMetric>) => {
    setInstagramMetric(prev => ({ ...prev, ...metrics }));
  };

  const addInstagramPost = (post: Omit<InstagramPost, 'id'>) => {
    const newPost: InstagramPost = {
      ...post,
      id: `ig-${Date.now()}`
    };
    setInstagramPosts(prev => [newPost, ...prev]);
  };

  // Actions do Perfil do Cliente
  const updateClientProfile = async (profile: Partial<ClientProfile>) => {
    setClientProfile(prev => ({ ...prev, ...profile }));
  };

  // Restaurar dados originais e persistir no Google Sheets
  const resetToDefaults = async () => {
    if (window.confirm('Tem certeza que deseja restaurar os dados originais da LOBBY?')) {
      setClientProfile(initialClientProfile);
      setTasks(initialTasks);
      setCampaigns(initialCampaigns);
      setAdsOverall(initialAdsOverall);
      setInstagramMetric(initialInstagramMetric);
      setInstagramPosts(initialInstagramPosts);

      await saveDashboardToSheets({
        clientProfile: initialClientProfile,
        tasks: initialTasks,
        campaigns: initialCampaigns,
        adsOverall: initialAdsOverall,
        instagramMetric: initialInstagramMetric,
        instagramPosts: initialInstagramPosts,
        updatedAt: new Date().toISOString()
      });
      setSyncStatus('synced');
    }
  };

  // Exportar backup local JSON
  const exportDataJSON = () => {
    const data = {
      clientProfile,
      tasks,
      campaigns,
      adsOverall,
      instagramMetric,
      instagramPosts,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lobby_dashboard_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Importar backup local JSON
  const importDataJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.clientProfile) {
        setClientProfile(prev => ({
          ...initialClientProfile,
          ...prev,
          ...data.clientProfile,
          brandColors: {
            ...initialClientProfile.brandColors,
            ...(prev?.brandColors || {}),
            ...(data.clientProfile?.brandColors || {})
          }
        }));
      }
      if (Array.isArray(data.tasks)) setTasks(data.tasks);
      if (Array.isArray(data.campaigns)) setCampaigns(data.campaigns);
      if (data.adsOverall) {
        setAdsOverall(prev => ({
          ...initialAdsOverall,
          ...prev,
          ...data.adsOverall,
          totalSpent: Number(data.adsOverall?.totalSpent ?? prev?.totalSpent ?? 0),
          totalConversions: Number(data.adsOverall?.totalConversions ?? prev?.totalConversions ?? 0)
        }));
      }
      if (data.instagramMetric) {
        setInstagramMetric(prev => ({
          ...initialInstagramMetric,
          ...prev,
          ...data.instagramMetric,
          averageStoryViews: Number(data.instagramMetric?.averageStoryViews ?? prev?.averageStoryViews ?? initialInstagramMetric.averageStoryViews),
          accountsReached: Number(data.instagramMetric?.accountsReached ?? prev?.accountsReached ?? initialInstagramMetric.accountsReached)
        }));
      }
      if (Array.isArray(data.instagramPosts)) setInstagramPosts(data.instagramPosts);
      return true;
    } catch (e) {
      console.error('Erro ao importar JSON:', e);
      return false;
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        clientProfile,
        tasks,
        campaigns,
        adsOverall,
        instagramMetric,
        instagramPosts,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        dateRange,
        setDateRange,
        syncStatus,
        syncWithSheets,
        addTask,
        updateTaskStatus,
        deleteTask,
        toggleClientApproval,
        editTask,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        updateAdsOverall,
        updateInstagramMetric,
        addInstagramPost,
        updateClientProfile,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
