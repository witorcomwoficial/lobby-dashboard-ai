import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { LobbyLogo } from './Logo';
import { 
  Plus, 
  UploadCloud, 
  Printer, 
  Eye, 
  SlidersHorizontal, 
  ExternalLink,
  Download,
  Share2
} from 'lucide-react';

interface HeaderProps {
  onOpenTaskModal: () => void;
  onOpenAdsModal: () => void;
  onOpenExportModal: () => void;
  onOpenShareModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTaskModal,
  onOpenAdsModal,
  onOpenExportModal,
  onOpenShareModal
}) => {
  const { 
    clientProfile, 
    viewMode, 
    setViewMode, 
    dateRange, 
    setDateRange,
    tasks,
    syncStatus
  } = useDashboard();

  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const completedTasks = safeTasks.filter(t => t?.status === 'feito').length;
  const progressPercent = safeTasks.length > 0 ? Math.round((completedTasks / safeTasks.length) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070708]/95 backdrop-blur-md border-b border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3.5 gap-4">
          
          {/* Logo with exact Hi-Fi sound • Brasília, DF font */}
          <div className="flex items-center gap-4">
            <LobbyLogo size="sm" showSubtitle={true} />

            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-zinc-800">
              <a 
                href={`https://instagram.com/${clientProfile.handle}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#FFE600]/40 text-xs text-zinc-300 hover:text-white transition"
              >
                <span className="text-[#FFE600] font-bold">@</span>
                <span>{clientProfile.handle}</span>
                <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-[#FFE600]" />
              </a>

              <span 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-950/30 border border-yellow-500/30 text-[11px] font-semibold text-[#FFE600]"
                title="Dados salvos em nuvem e sincronizados em tempo real com o cliente"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${syncStatus === 'synced' ? 'bg-[#FFE600] animate-pulse' : 'bg-amber-400'}`} />
                <span>{syncStatus === 'synced' ? 'Nuvem Conectada' : 'Sincronizando...'}</span>
              </span>
            </div>
          </div>

          {/* Quick Metrics & Actions Bar */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">

            {/* Quick Completion Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs">
              <span className="text-zinc-400">Entregas do Projeto:</span>
              <span className="font-bold text-[#FFE600]">{completedTasks}/{tasks.length}</span>
              <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FFE600] rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[11px] font-semibold text-zinc-300">{progressPercent}%</span>
            </div>

            {/* Date Range Selector */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setDateRange('month')}
                className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                  dateRange === 'month' 
                    ? 'bg-[#FFE600] text-black font-bold' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Mês Atual
              </button>
              <button
                onClick={() => setDateRange('30d')}
                className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                  dateRange === '30d' 
                    ? 'bg-[#FFE600] text-black font-bold' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                30 Dias
              </button>
            </div>

            {/* View Mode Toggle: Client vs Agency */}
            <div className="flex items-center bg-zinc-900/90 border border-zinc-800 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('client')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium transition cursor-pointer ${
                  viewMode === 'client'
                    ? 'bg-[#FFE600] text-black font-bold shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Modo Cliente: interface limpa focada em visualização e aprovação"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Visão Cliente</span>
              </button>
              <button
                onClick={() => setViewMode('agency')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium transition cursor-pointer ${
                  viewMode === 'agency'
                    ? 'bg-[#FFE600] text-black font-bold shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Modo Agência: permite adicionar tasks, subir métricas de ads e editar tudo"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Gestão</span>
              </button>
            </div>

            {/* Share with Client Link Button */}
            {onOpenShareModal && (
              <button
                type="button"
                onClick={onOpenShareModal}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-[#FFE600] border border-[#FFE600]/60 font-bold text-xs rounded-lg transition duration-200 cursor-pointer yellow-glow-sm shadow"
                title="Copiar link para enviar ao cliente ou WhatsApp"
              >
                <Share2 className="w-3.5 h-3.5 text-[#FFE600]" />
                <span className="hidden sm:inline">Link do Cliente</span>
              </button>
            )}

            {/* Primary Action Buttons - Always available */}
            <button
              onClick={onOpenTaskModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFE600] hover:bg-[#F0D500] text-black font-bold text-xs rounded-lg transition duration-200 yellow-glow-sm cursor-pointer shadow"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Nova Task</span>
            </button>

            <button
              onClick={onOpenAdsModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-[#FFE600] border border-[#FFE600]/40 font-semibold text-xs rounded-lg transition duration-200 cursor-pointer"
              title="Subir números de campanhas de tráfego pago"
            >
              <UploadCloud className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>Subir Ads</span>
            </button>

            {/* Export / Print */}
            <button
              onClick={handlePrint}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 rounded-lg transition cursor-pointer"
              title="Imprimir / Salvar como PDF para o cliente"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenExportModal}
              className="p-1.5 text-zinc-400 hover:text-[#FFE600] hover:bg-zinc-800 border border-zinc-800 rounded-lg transition cursor-pointer"
              title="Backup e Dados JSON"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
