import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Task } from '../types/dashboard';
import { 
  CheckCircle2, 
  Clock, 
  Ticket, 
  ChevronRight,
  FileCheck,
  Radio,
  Volume2,
  Edit3,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';

interface OverviewTabProps {
  onOpenTaskModal: () => void;
  onOpenAdsModal: () => void;
  onEditTask?: (task: Task) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onOpenTaskModal, onEditTask }) => {
  const { 
    clientProfile, 
    tasks, 
    adsOverall, 
    instagramMetric, 
    setActiveTab,
    viewMode
  } = useDashboard();

  const completedTasks = tasks.filter(t => t.status === 'feito');
  const inProgressTasks = tasks.filter(t => t.status === 'em_andamento');
  const pendingTasks = tasks.filter(t => t.status === 'pendente');
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  const totalSpentFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(adsOverall.totalSpent);
  const totalRevenueFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(adsOverall.symplaRevenueEstimated);

  return (
    <div className="space-y-6">
      
      {/* Hero Welcome & Brand Status featuring exact user image typography */}
      <div className="relative rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-zinc-800 p-6 sm:p-10 overflow-hidden shadow-2xl">
        {/* Glow ambient background in brand yellow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE600]/12 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FFE600] text-black font-extrabold text-[11px] tracking-wider uppercase">
                Relatório Executivo do Projeto
              </span>
              <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs border border-zinc-700">
                Cliente: @{clientProfile.handle}
              </span>
            </div>

            {/* Typography matching user's image */}
            <div className="space-y-1">
              <h1 className="font-lobby font-black text-4xl sm:text-6xl uppercase tracking-[0.16em] text-white">
                LOBBY
              </h1>
              <p className="font-sans uppercase text-xs sm:text-sm tracking-[0.28em] text-[#FFE600] font-medium">
                Hi-Fi sound <span className="text-zinc-500 mx-1">•</span> Brasília, DF
              </p>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Painel consolidado para acompanhar tudo que já foi <strong>feito</strong> e o que <strong>precisamos fazer</strong>, métricas de <strong>Meta Ads e Sympla</strong> e o crescimento do perfil no Instagram.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Volume2 className="w-4 h-4 text-[#FFE600]" />
                SCS Quadra 5 Ed. Amazonas • Sex e Sáb 20h
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Ticket className="w-4 h-4 text-[#FFE600]" />
                Vendas Oficiais Sympla
              </span>
            </div>
          </div>

          {/* Quick Stat Pill */}
          <div className="bg-zinc-950/80 border border-zinc-800 p-5 rounded-xl flex flex-col gap-3 min-w-[220px]">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Status do Projeto</span>
              <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-pulse" />
            </div>
            <div>
              <span className="text-3xl font-black text-[#FFE600] font-lobby tracking-wider">{completionRate}%</span>
              <span className="text-xs text-zinc-400 block mt-0.5">{completedTasks.length} de {tasks.length} entregas concluídas</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#FFE600] rounded-full" style={{ width: `${completionRate}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Executive High-Impact KPI Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Block 1: Progresso das Tasks do Projeto */}
        <div 
          onClick={() => setActiveTab('tasks')}
          className="bg-zinc-900/80 border border-zinc-800 hover:border-[#FFE600]/50 rounded-xl p-5 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Entregas do Projeto</span>
            <FileCheck className="w-4 h-4 text-[#FFE600]" />
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-black text-[#FFE600] font-lobby tracking-wide">{completionRate}%</span>
            <span className="text-xs text-zinc-400 font-medium">concluído</span>
          </div>

          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-[#FFE600] rounded-full transition-all duration-500" style={{ width: `${completionRate}%` }} />
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span><strong>{completedTasks.length}</strong> entregues</span>
            <span className="text-amber-400"><strong>{inProgressTasks.length}</strong> em andamento</span>
            <span><strong>{pendingTasks.length}</strong> pendentes</span>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-[#FFE600] font-bold group-hover:translate-x-1 transition-transform">
            <span>Acompanhar todas as tasks</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Block 2: Performance de Ads & Retorno */}
        <div 
          onClick={() => setActiveTab('ads')}
          className="bg-zinc-900/80 border border-zinc-800 hover:border-[#FFE600]/50 rounded-xl p-5 transition cursor-pointer group yellow-glow-border"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Meta Ads & Sympla</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#FFE600] text-black">
              ROAS {adsOverall.roas}x
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-white font-lobby tracking-wide">{totalRevenueFormatted}</span>
          </div>
          <p className="text-xs text-[#FFE600] font-medium mb-3">
            Receita estimada em ingressos Sympla & reservas
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
            <div>
              <span className="text-zinc-500 block text-[10px]">Investimento:</span>
              <span className="font-bold text-white">{totalSpentFormatted}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px]">Ingressos/Reservas:</span>
              <span className="font-bold text-[#FFE600]">{adsOverall.totalConversions} vendas</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-[#FFE600] font-bold group-hover:translate-x-1 transition-transform">
            <span>Ver campanhas de Ads</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Block 3: Instagram Growth */}
        <div 
          onClick={() => setActiveTab('instagram')}
          className="bg-zinc-900/80 border border-zinc-800 hover:border-[#FFE600]/50 rounded-xl p-5 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Tração Instagram</span>
            <span className="text-xs font-bold text-emerald-400">+{instagramMetric.reachGrowth}% alcance</span>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-white font-lobby tracking-wide">{clientProfile.followersCount}</span>
            <span className="text-xs text-zinc-400 font-medium">seguidores</span>
          </div>
          <p className="text-xs text-zinc-400 mb-3">
            {clientProfile.postsCount} posts publicados • @{clientProfile.handle}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
            <div>
              <span className="text-zinc-500 block text-[10px]">Alcance no DF:</span>
              <span className="font-bold text-white">{(instagramMetric.accountsReached / 1000).toFixed(1)}k contas</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px]">Média Stories:</span>
              <span className="font-bold text-[#FFE600]">{instagramMetric.averageStoryViews.toLocaleString('pt-BR')} views</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-[#FFE600] font-bold group-hover:translate-x-1 transition-transform">
            <span>Ver inteligência de conteúdo</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* Two-Column Detail: Recent Completed Tasks vs Immediate Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: O que foi FEITO (Entregas Concluídas) */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#FFE600]" />
              <h3 className="font-bold text-white text-base">O que já foi feito ({completedTasks.length})</h3>
            </div>
            <button
              onClick={() => setActiveTab('tasks')}
              className="text-xs text-[#FFE600] hover:underline font-semibold cursor-pointer"
            >
              Ver todas
            </button>
          </div>

          <div className="space-y-2.5">
            {completedTasks.slice(0, 4).map(task => (
              <div 
                key={task.id} 
                onClick={() => onEditTask?.(task)}
                className="group p-3 rounded-lg bg-zinc-950/70 hover:bg-zinc-900 border border-zinc-800/80 hover:border-[#FFE600]/40 flex items-start gap-3 transition cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#FFE600] text-black flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white group-hover:text-[#FFE600] transition truncate">{task.title}</h4>
                    <span className="opacity-0 group-hover:opacity-100 transition text-[10px] text-[#FFE600] flex items-center gap-1 font-bold">
                      <Edit3 className="w-3 h-3" />
                      <span>Editar</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{task.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[10px] text-zinc-400">
                    <span>Resp: {task.assignee}</span>
                    <span>Concluído: {task.completedAt}</span>
                    {task.deliverableUrl && (
                      <span className="text-[#FFE600] font-medium flex items-center gap-0.5">
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span>Link</span>
                      </span>
                    )}
                    {task.imageUrl && (
                      <span className="text-amber-300 font-medium flex items-center gap-0.5">
                        <ImageIcon className="w-2.5 h-2.5" />
                        <span>Foto</span>
                      </span>
                    )}
                    {task.approvedByClient && (
                      <span className="text-[#FFE600] font-bold">★ Aprovado</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: O que precisamos fazer (Próximas Prioridades) */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">O que estamos fazendo & Próximos passos</h3>
            </div>
            <button
              onClick={onOpenTaskModal}
              className="text-xs text-[#FFE600] hover:underline font-bold cursor-pointer flex items-center gap-1"
            >
              <span>+ Nova task</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {[...inProgressTasks, ...pendingTasks].slice(0, 4).map(task => (
              <div 
                key={task.id} 
                onClick={() => onEditTask?.(task)}
                className={`group p-3 rounded-lg border flex items-start gap-3 transition cursor-pointer ${
                  task.status === 'em_andamento'
                    ? 'bg-zinc-950/90 border-[#FFE600]/40 hover:bg-zinc-900 hover:border-[#FFE600]'
                    : 'bg-zinc-950/70 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  task.status === 'em_andamento'
                    ? 'border-2 border-amber-400 text-amber-400'
                    : 'border-2 border-zinc-600'
                }`}>
                  {task.status === 'em_andamento' && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white group-hover:text-[#FFE600] transition truncate">{task.title}</h4>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                        task.status === 'em_andamento' ? 'bg-amber-400/20 text-amber-400' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {task.status === 'em_andamento' ? 'Em Andamento' : 'Pendente'}
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 transition text-[10px] text-[#FFE600] flex items-center gap-1 font-bold">
                        <Edit3 className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{task.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[10px] text-zinc-400">
                    <span>Prazo: {task.dueDate}</span>
                    <span>Prioridade: <strong className="text-white">{task.priority.toUpperCase()}</strong></span>
                    {task.deliverableUrl && (
                      <span className="text-[#FFE600] font-medium flex items-center gap-0.5">
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span>Link</span>
                      </span>
                    )}
                    {task.imageUrl && (
                      <span className="text-amber-300 font-medium flex items-center gap-0.5">
                        <ImageIcon className="w-2.5 h-2.5" />
                        <span>Foto</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
