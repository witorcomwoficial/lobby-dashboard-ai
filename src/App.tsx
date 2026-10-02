import React, { useState, useEffect } from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { OverviewTab } from './components/OverviewTab';
import { TasksManager } from './components/TasksManager';
import { AdsDashboard } from './components/AdsDashboard';
import { InstagramAnalytics } from './components/InstagramAnalytics';
import { BrandDossier } from './components/BrandDossier';
import { AddTaskModal } from './components/Modals/AddTaskModal';
import { EditTaskModal } from './components/Modals/EditTaskModal';
import { AddAdsModal } from './components/Modals/AddAdsModal';
import { QuickEditAdsOverallModal } from './components/Modals/QuickEditAdsOverallModal';
import { ExportModal } from './components/Modals/ExportModal';
import { ShareModal } from './components/Modals/ShareModal';
import { LobbyLogo } from './components/Logo';
import { Sparkles, Ticket, Instagram } from 'lucide-react';
import { Task } from './types/dashboard';

function DashboardContent() {
  const { activeTab, viewMode, setViewMode } = useDashboard();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAdsModalOpen, setIsAdsModalOpen] = useState(false);
  const [isQuickEditOpen, setIsQuickEditOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Automatically detect client link parameter (?mode=client)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    if (mode === 'client') {
      setViewMode('client');
    } else if (mode === 'agency') {
      setViewMode('agency');
    }
  }, [setViewMode]);

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      
      {/* Top Banner Alert in Client Mode */}
      {viewMode === 'client' && (
        <div className="bg-[#FFE600] text-black px-4 py-1.5 text-center text-xs font-bold flex items-center justify-center gap-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 fill-black" />
          <span>Você está no Modo Apresentação do Cliente (Visualização Limpa de Resultados)</span>
          <button 
            onClick={() => setViewMode('agency')}
            className="underline ml-2 hover:opacity-80 cursor-pointer font-extrabold"
          >
            Voltar ao Modo Gestão
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenTaskModal={() => setIsTaskModalOpen(true)}
        onOpenAdsModal={() => setIsAdsModalOpen(true)}
        onOpenExportModal={() => setIsExportOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <OverviewTab
            onOpenTaskModal={() => setIsTaskModalOpen(true)}
            onOpenAdsModal={() => setIsAdsModalOpen(true)}
            onEditTask={handleEditTask}
          />
        )}

        {activeTab === 'tasks' && (
          <TasksManager
            onOpenAddTaskModal={() => setIsTaskModalOpen(true)}
            onEditTask={handleEditTask}
          />
        )}

        {activeTab === 'ads' && (
          <AdsDashboard
            onOpenAddAdsModal={() => setIsAdsModalOpen(true)}
            onOpenQuickEditModal={() => setIsQuickEditOpen(true)}
          />
        )}

        {activeTab === 'instagram' && (
          <InstagramAnalytics />
        )}

        {activeTab === 'brand' && (
          <BrandDossier />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-900 bg-black/90 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LobbyLogo size="sm" showSubtitle={false} />
            <div className="text-xs text-zinc-400">
              <p className="font-semibold text-zinc-300 font-lobby tracking-wider">LOBBY • Hi-Fi Sound & Ads Hub</p>
              <p className="text-[11px] text-zinc-400">SCS Quadra 5 Ed. Amazonas, Brasília - DF</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <a 
              href="https://sympla.com.br/lobby" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-[#FFE600] transition"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Sympla Oficial</span>
            </a>

            <a 
              href="https://instagram.com/listenlobby" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-[#FFE600] transition"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@listenlobby</span>
            </a>

            <span className="text-zinc-600">|</span>

            <span className="text-[#FFE600] font-bold">
              Amarelo & Preto • Identidade LOBBY
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AddTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        task={taskToEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setTaskToEdit(null);
        }}
      />

      <AddAdsModal
        isOpen={isAdsModalOpen}
        onClose={() => setIsAdsModalOpen(false)}
      />

      <QuickEditAdsOverallModal
        isOpen={isQuickEditOpen}
        onClose={() => setIsQuickEditOpen(false)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
