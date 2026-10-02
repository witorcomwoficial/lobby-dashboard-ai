import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { 
  DollarSign, 
  Users, 
  Ticket, 
  Target, 
  Plus, 
  Trash2, 
  Edit3,
  BarChart3,
  ArrowUpRight
} from 'lucide-react';

interface AdsDashboardProps {
  onOpenAddAdsModal: () => void;
  onOpenQuickEditModal: () => void;
}

export const AdsDashboard: React.FC<AdsDashboardProps> = ({ 
  onOpenAddAdsModal, 
  onOpenQuickEditModal 
}) => {
  const { 
    campaigns, 
    adsOverall, 
    viewMode, 
    deleteCampaign,
    updateCampaign 
  } = useDashboard();

  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredCampaigns = campaigns.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (platformFilter !== 'all' && !c.platform.toLowerCase().includes(platformFilter.toLowerCase())) return false;
    return true;
  });

  const totalSpentFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(adsOverall.totalSpent);
  const totalRevenueFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(adsOverall.symplaRevenueEstimated);
  const avgCpa = adsOverall.totalConversions > 0 ? (adsOverall.totalSpent / adsOverall.totalConversions) : 0;
  const avgCpaFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(avgCpa);

  const weeklyData = [
    { week: 'Semana 1', spent: 650, conversions: 58, clicks: 680, reach: 24000 },
    { week: 'Semana 2', spent: 820, conversions: 84, clicks: 890, reach: 31000 },
    { week: 'Semana 3', spent: 940, conversions: 105, clicks: 980, reach: 35000 },
    { week: 'Semana 4 (Atual)', spent: 1021.5, conversions: 126, clicks: 1090, reach: 38170 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner with Quick Actions to Upload Ads Numbers */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-black border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFE600] text-black font-extrabold text-[11px] tracking-wider uppercase">
                Meta Ads & Tráfego Pago
              </span>
              <span className="text-xs text-zinc-400">Conta: LOBBY Brasília</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-lobby tracking-wide">
              Performance de Campanhas & Vendas Sympla
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Resultados consolidados dos anúncios para venda de ingressos e captação de reservas para sexta e sábado.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {viewMode === 'agency' && (
              <>
                <button
                  onClick={onOpenAddAdsModal}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#FFE600] hover:bg-[#F0D500] text-black font-extrabold text-xs rounded-xl shadow-lg yellow-glow-sm transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Subir Nova Campanha</span>
                </button>

                <button
                  onClick={onOpenQuickEditModal}
                  className="flex items-center gap-2 px-3.5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-semibold rounded-xl transition cursor-pointer"
                  title="Atualizar números consolidados do mês"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#FFE600]" />
                  <span>Ajustar Totais do Mês</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards Grid - Black & Yellow */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Investido */}
        <div className="bg-zinc-900/80 border border-zinc-800 hover:border-[#FFE600]/40 rounded-xl p-4 transition group">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold text-zinc-300">Total Investido</span>
            <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-[#FFE600]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-lobby tracking-wide">
            {totalSpentFormatted}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-zinc-400">
            <span className="text-emerald-400 font-bold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> 100%
            </span>
            <span>alocado no DF</span>
          </div>
        </div>

        {/* Retorno Estimado Sympla / ROAS */}
        <div className="bg-zinc-900/80 border border-zinc-800 hover:border-[#FFE600]/40 rounded-xl p-4 transition group yellow-glow-border">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold text-zinc-300">Retorno Estimado</span>
            <span className="px-2 py-0.5 rounded bg-[#FFE600] text-black font-extrabold text-[10px]">
              ROAS {adsOverall.roas}x
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#FFE600] font-lobby tracking-wide">
            {totalRevenueFormatted}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#FFE600]/80">
            <Ticket className="w-3.5 h-3.5" />
            <span>Vendas Sympla & Mesas</span>
          </div>
        </div>

        {/* Conversões de Ingressos & Reservas */}
        <div className="bg-zinc-900/80 border border-zinc-800 hover:border-[#FFE600]/40 rounded-xl p-4 transition group">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold text-zinc-300">Ingressos & Reservas</span>
            <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-amber-400">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-lobby tracking-wide">
            {adsOverall.totalConversions}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-zinc-400">
            <span>CPA Médio:</span>
            <span className="font-bold text-[#FFE600]">{avgCpaFormatted}</span>
          </div>
        </div>

        {/* Alcance no DF & Cliques */}
        <div className="bg-zinc-900/80 border border-zinc-800 hover:border-[#FFE600]/40 rounded-xl p-4 transition group">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold text-zinc-300">Alcance & Cliques</span>
            <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-[#FFE600]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-lobby tracking-wide">
            {(adsOverall.totalReach / 1000).toFixed(1)}k
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-zinc-400">
            <span>{adsOverall.totalClicks} cliques</span>
            <span className="text-[#FFE600] font-semibold">CPC R$ {adsOverall.avgCpc.toFixed(2)}</span>
          </div>
        </div>

      </div>

      {/* Visual Chart: Weekly Ads Progression */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#FFE600]" />
            <h3 className="font-bold text-white text-base">Evolução Semanal de Investimento vs Conversões Sympla</h3>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#FFE600]" />
              <span className="text-zinc-300 font-medium">Investimento (R$)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-white" />
              <span className="text-zinc-300 font-medium">Ingressos Vendidos</span>
            </div>
          </div>
        </div>

        {/* Responsive Graphic Bars */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 pt-4 pb-2 items-end h-56 border-b border-zinc-800">
          {weeklyData.map((item, index) => {
            const heightPercent = Math.round((item.spent / 1200) * 100);
            const conversionHeight = Math.round((item.conversions / 150) * 100);

            return (
              <div key={index} className="flex flex-col items-center h-full justify-end group">
                <div className="w-full max-w-[64px] flex items-end justify-center gap-1.5 h-44 relative">
                  
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-[#FFE600] rounded px-2 py-1 text-[10px] text-white whitespace-nowrap z-20 pointer-events-none">
                    R$ {item.spent.toFixed(2)} • {item.conversions} ingressos
                  </div>

                  <div 
                    className="w-1/2 bg-[#FFE600] rounded-t-md hover:bg-[#F0D500] transition-all duration-500 shadow-[0_0_12px_rgba(255,230,0,0.25)]"
                    style={{ height: `${heightPercent}%` }}
                  />

                  <div 
                    className="w-1/2 bg-zinc-400 group-hover:bg-white rounded-t-md transition-all duration-500"
                    style={{ height: `${conversionHeight}%` }}
                  />
                </div>

                <div className="text-center mt-3">
                  <span className="block text-xs font-semibold text-zinc-200">{item.week}</span>
                  <span className="text-[11px] text-[#FFE600] font-bold">{item.conversions} vendas</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-400 mt-3 pt-1">
          <span>🎯 Foco das campanhas: Sextas e Sábados no LOBBY (SCS Brasília)</span>
          <span className="text-[#FFE600] font-semibold">Meta de ocupação semanal: 92% atingida</span>
        </div>
      </div>

      {/* Campaign List Table / Cards */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#FFE600]" />
            <h3 className="font-bold text-white text-sm">Campanhas na Conta LOBBY ({campaigns.length})</h3>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-[#FFE600]"
            >
              <option value="all">Todos os Status</option>
              <option value="ativa">Ativas</option>
              <option value="pausada">Pausadas</option>
              <option value="finalizada">Finalizadas</option>
            </select>

            <select
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-[#FFE600]"
            >
              <option value="all">Todas Plataformas</option>
              <option value="meta">Meta Ads (Instagram)</option>
              <option value="retargeting">Retargeting</option>
              <option value="google">Google Ads</option>
            </select>
          </div>
        </div>

        {/* Campaign Cards List */}
        <div className="divide-y divide-zinc-800">
          {filteredCampaigns.map(camp => {
            const isAtiva = camp.status === 'ativa';
            return (
              <div key={camp.id} className="p-4 sm:p-5 hover:bg-zinc-850/50 transition">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left: Campaign Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        isAtiva 
                          ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/50' 
                          : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      }`}>
                        {camp.status}
                      </span>

                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-medium border border-zinc-700">
                        {camp.platform}
                      </span>

                      <span className="text-xs text-zinc-400">
                        Período: {camp.period}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-base">
                      {camp.name}
                    </h4>

                    <p className="text-xs text-zinc-400">
                      <strong>Segmentação:</strong> {camp.targetAudience}
                    </p>

                    {camp.notes && (
                      <p className="text-xs text-[#FFE600]/90 italic">
                        "{camp.notes}"
                      </p>
                    )}
                  </div>

                  {/* Right: Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-right bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/80">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Gasto</span>
                      <span className="font-bold text-white text-sm">
                        R$ {camp.spent.toFixed(2)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Conversões</span>
                      <span className="font-bold text-[#FFE600] text-sm">
                        {camp.conversions} vendas
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-semibold text-zinc-400 block">CPA</span>
                      <span className="font-bold text-white text-sm">
                        R$ {camp.cpa.toFixed(2)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-semibold text-zinc-400 block">ROAS</span>
                      <span className="font-extrabold text-[#FFE600] text-sm">
                        {camp.roas}x
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  {viewMode === 'agency' && (
                    <div className="flex items-center gap-2 self-end lg:self-center">
                      <button
                        onClick={() => updateCampaign(camp.id, { status: camp.status === 'ativa' ? 'pausada' : 'ativa' })}
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium border border-zinc-700 transition cursor-pointer"
                      >
                        {camp.status === 'ativa' ? 'Pausar' : 'Ativar'}
                      </button>

                      <button
                        onClick={() => deleteCampaign(camp.id)}
                        className="p-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-rose-400 border border-zinc-700 transition cursor-pointer"
                        title="Excluir campanha"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
