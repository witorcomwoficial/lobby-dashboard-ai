import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { 
  LayoutDashboard, 
  CheckSquare, 
  TrendingUp, 
  Instagram, 
  Building2
} from 'lucide-react';

interface TabItem {
  id: 'overview' | 'tasks' | 'ads' | 'instagram' | 'brand';
  label: string;
  icon: React.ElementType;
  badge?: string | null;
  badgeColor?: string;
}

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, tasks, campaigns } = useDashboard();

  const pendingCount = tasks.filter(t => t.status === 'pendente' || t.status === 'em_andamento').length;
  const activeAdsCount = campaigns.filter(c => c.status === 'ativa').length;

  const tabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Visão Geral & Resultados',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'tasks',
      label: 'Tasks & Entregas',
      icon: CheckSquare,
      badge: pendingCount > 0 ? `${pendingCount} ativas` : null,
      badgeColor: 'bg-[#FFE600] text-black font-bold'
    },
    {
      id: 'ads',
      label: 'Tráfego Pago (Ads)',
      icon: TrendingUp,
      badge: `${activeAdsCount} campanhas`,
      badgeColor: 'bg-zinc-800 text-yellow-400 border border-yellow-500/30'
    },
    {
      id: 'instagram',
      label: 'Instagram (@listenlobby)',
      icon: Instagram,
      badge: '30.2k',
      badgeColor: 'bg-zinc-800 text-zinc-300'
    },
    {
      id: 'brand',
      label: 'Dossiê LOBBY Hi-Fi',
      icon: Building2,
      badge: 'Marca',
      badgeColor: 'bg-zinc-800 text-[#FFE600]'
    }
  ];

  return (
    <nav className="border-b border-zinc-800/80 bg-zinc-950/70 sticky top-[69px] z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#FFE600] text-black shadow-md yellow-glow-sm font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 text-[10px] px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-black text-[#FFE600] font-bold'
                        : tab.badgeColor || 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
