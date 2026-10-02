import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Task, TaskStatus, TaskCategory, TaskPriority } from '../types/dashboard';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  Plus, 
  Search, 
  TrendingUp, 
  Share2, 
  Palette, 
  Ticket, 
  Lightbulb, 
  Calendar, 
  User, 
  Check, 
  Trash2, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Edit3,
  Image as ImageIcon,
  Link2,
  Copy,
  CheckCheck,
  ZoomIn,
  X
} from 'lucide-react';

interface TasksManagerProps {
  onOpenAddTaskModal: () => void;
  onEditTask?: (task: Task) => void;
}

export const TasksManager: React.FC<TasksManagerProps> = ({ onOpenAddTaskModal, onEditTask }) => {
  const { 
    tasks, 
    addTask,
    updateTaskStatus, 
    deleteTask, 
    toggleClientApproval, 
    viewMode 
  } = useDashboard();

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  // Lightbox for image preview
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);

  // Quick inline add state
  const [quickTitle, setQuickTitle] = useState('');
  const [quickCategory, setQuickCategory] = useState<TaskCategory>('trafego_ads');
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLinkId(id);
    showToast('✓ Link copiado para a área de transferência!');
    setTimeout(() => setCopiedLinkId(null), 2000);
  };

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    addTask({
      title: quickTitle.trim(),
      description: 'Adicionada rapidamente pelo painel de tarefas.',
      category: quickCategory,
      status: 'pendente',
      priority: 'alta',
      assignee: 'Equipe LOBBY',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      approvedByClient: false
    });

    setQuickTitle('');
    showToast('✓ Nova task adicionada com sucesso!');
  };

  const confirmDelete = (task: Task) => {
    deleteTask(task.id);
    setTaskToDelete(null);
    showToast(`✓ Task "${task.title.slice(0, 30)}..." apagada com sucesso!`);
  };

  const handleDeleteCompleted = () => {
    if (window.confirm(`Tem certeza que deseja apagar as ${completedTasks.length} tasks concluídas?`)) {
      completedTasks.forEach(t => deleteTask(t.id));
      showToast('✓ Todas as tasks concluídas foram apagadas!');
    }
  };

  // Counters
  const completedTasks = tasks.filter(t => t.status === 'feito');
  const inProgressTasks = tasks.filter(t => t.status === 'em_andamento');
  const pendingTasks = tasks.filter(t => t.status === 'pendente');
  const clientApprovedCount = tasks.filter(t => t.approvedByClient).length;

  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  // Filtered tasks
  const filteredTasks = tasks.filter(task => {
    if (selectedStatus === 'feito' && task.status !== 'feito') return false;
    if (selectedStatus === 'em_andamento' && task.status !== 'em_andamento') return false;
    if (selectedStatus === 'pendente' && task.status !== 'pendente') return false;

    if (selectedCategory !== 'all' && task.category !== selectedCategory) return false;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(query);
      const matchDesc = task.description.toLowerCase().includes(query);
      const matchAssignee = task.assignee.toLowerCase().includes(query);
      if (!matchTitle && !matchDesc && !matchAssignee) return false;
    }

    return true;
  });

  const getCategoryDetails = (cat: TaskCategory) => {
    switch (cat) {
      case 'trafego_ads':
        return { label: 'Tráfego & Ads', icon: TrendingUp, color: 'text-[#FFE600] border-yellow-500/30 bg-yellow-500/10' };
      case 'social_media':
        return { label: 'Social Media', icon: Share2, color: 'text-zinc-200 border-zinc-700 bg-zinc-800' };
      case 'design_criacao':
        return { label: 'Design & Visual', icon: Palette, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
      case 'eventos_sympla':
        return { label: 'Eventos & Sympla', icon: Ticket, color: 'text-yellow-300 border-yellow-300/30 bg-yellow-950/20' };
      case 'estrategia':
        return { label: 'Estratégia & Tech', icon: Lightbulb, color: 'text-zinc-100 border-zinc-600 bg-zinc-800' };
    }
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'urgente':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFE600] text-black tracking-wide">URGENTE</span>;
      case 'alta':
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-yellow-500/20 text-[#FFE600] border border-yellow-500/40">ALTA</span>;
      case 'media':
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">MÉDIA</span>;
      case 'baixa':
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-900 text-zinc-500 border border-zinc-800">BAIXA</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Feito / Concluído */}
        <div 
          onClick={() => setSelectedStatus(selectedStatus === 'feito' ? 'all' : 'feito')}
          className={`cursor-pointer bg-zinc-900/80 border rounded-xl p-4 transition-all duration-200 ${
            selectedStatus === 'feito' ? 'border-[#FFE600] yellow-glow-sm bg-zinc-900' : 'border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold text-zinc-300">O que já foi feito</span>
            <CheckCircle2 className="w-4 h-4 text-[#FFE600]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#FFE600] font-lobby tracking-wider">{completedTasks.length}</span>
            <span className="text-xs text-zinc-400 font-medium">tasks entregues</span>
          </div>
          <div className="w-full h-1 bg-zinc-800 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-[#FFE600] rounded-full" style={{ width: `${completionRate}%` }} />
          </div>
        </div>

        {/* Card 2: Em Andamento */}
        <div 
          onClick={() => setSelectedStatus(selectedStatus === 'em_andamento' ? 'all' : 'em_andamento')}
          className={`cursor-pointer bg-zinc-900/80 border rounded-xl p-4 transition-all duration-200 ${
            selectedStatus === 'em_andamento' ? 'border-[#FFE600] yellow-glow-sm bg-zinc-900' : 'border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold text-zinc-300">Em andamento</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-lobby tracking-wider">{inProgressTasks.length}</span>
            <span className="text-xs text-zinc-400 font-medium">sendo executadas</span>
          </div>
          <span className="text-[11px] text-zinc-400 mt-2 block">Prioridades da semana</span>
        </div>

        {/* Card 3: Pendente / A Fazer */}
        <div 
          onClick={() => setSelectedStatus(selectedStatus === 'pendente' ? 'all' : 'pendente')}
          className={`cursor-pointer bg-zinc-900/80 border rounded-xl p-4 transition-all duration-200 ${
            selectedStatus === 'pendente' ? 'border-[#FFE600] yellow-glow-sm bg-zinc-900' : 'border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold text-zinc-300">O que precisamos fazer</span>
            <AlertCircle className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-zinc-200 font-lobby tracking-wider">{pendingTasks.length}</span>
            <span className="text-xs text-zinc-400 font-medium">pendentes / backlog</span>
          </div>
          <span className="text-[11px] text-zinc-400 mt-2 block">Próximos passos</span>
        </div>

        {/* Card 4: Taxa de Conclusão & Aprovação */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold text-zinc-300">Progresso Geral</span>
            <FileCheck className="w-4 h-4 text-[#FFE600]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white font-lobby tracking-wider">{completionRate}%</span>
            <span className="text-xs text-[#FFE600] font-semibold">{clientApprovedCount} aprovadas</span>
          </div>
          <span className="text-[11px] text-zinc-400 mt-2 block">Total: {tasks.length} entregas mapeadas</span>
        </div>

      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FFE600] text-black font-bold text-xs px-4 py-3 rounded-xl shadow-2xl yellow-glow flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {taskToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Apagar Task?</h3>
                <p className="text-xs text-zinc-400">Esta ação removerá a tarefa do painel da LOBBY.</p>
              </div>
            </div>

            <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 text-xs text-zinc-200 font-medium">
              "{taskToDelete.title}"
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setTaskToDelete(null)}
                className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => confirmDelete(taskToDelete)}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer shadow"
              >
                Sim, Apagar Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Add Bar: Inline creation for instant task addition */}
      <form onSubmit={handleQuickAdd} className="bg-zinc-900/90 border border-zinc-800 hover:border-[#FFE600]/40 rounded-xl p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 transition shadow-lg">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Digite o título da nova task da LOBBY e tecle Enter..."
            value={quickTitle}
            onChange={e => setQuickTitle(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE600] transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={quickCategory}
            onChange={e => setQuickCategory(e.target.value as TaskCategory)}
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-[#FFE600] cursor-pointer"
          >
            <option value="trafego_ads">Tráfego & Ads</option>
            <option value="social_media">Social Media</option>
            <option value="design_criacao">Design & Visual</option>
            <option value="eventos_sympla">Sympla & Eventos</option>
            <option value="estrategia">Estratégia & Tech</option>
          </select>

          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#FFE600] hover:bg-[#F0D500] text-black font-extrabold text-xs rounded-lg transition duration-200 yellow-glow-sm cursor-pointer whitespace-nowrap shadow"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Adicionar Task</span>
          </button>

          <button
            type="button"
            onClick={onOpenAddTaskModal}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold rounded-lg border border-zinc-700 transition cursor-pointer whitespace-nowrap"
            title="Abrir formulário com responsável, prioridade e anexos"
          >
            <span>+ Detalhada</span>
          </button>
        </div>
      </form>

      {/* Control Bar: Filters, Search, Add Task */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Status Quick Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedStatus === 'all'
                  ? 'bg-zinc-100 text-black font-bold'
                  : 'bg-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              Todas ({tasks.length})
            </button>
            <button
              onClick={() => setSelectedStatus('feito')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedStatus === 'feito'
                  ? 'bg-[#FFE600] text-black font-bold yellow-glow-sm'
                  : 'bg-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>Feitas ({completedTasks.length})</span>
            </button>
            <button
              onClick={() => setSelectedStatus('em_andamento')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedStatus === 'em_andamento'
                  ? 'bg-amber-400 text-black font-bold'
                  : 'bg-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Em Andamento ({inProgressTasks.length})</span>
            </button>
            <button
              onClick={() => setSelectedStatus('pendente')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedStatus === 'pendente'
                  ? 'bg-zinc-700 text-white font-bold'
                  : 'bg-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              <Circle className="w-3.5 h-3.5 text-zinc-400" />
              <span>Pendentes ({pendingTasks.length})</span>
            </button>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar task ou responsável..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#FFE600]/60 transition"
              />
            </div>

            {completedTasks.length > 0 && (
              <button
                type="button"
                onClick={handleDeleteCompleted}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-rose-950/40 text-zinc-400 hover:text-rose-300 border border-zinc-700 hover:border-rose-500/30 text-xs font-medium transition cursor-pointer whitespace-nowrap"
                title="Apagar todas as tarefas já concluídas"
              >
                Limpar Concluídas
              </button>
            )}

            <button
              onClick={onOpenAddTaskModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FFE600] hover:bg-[#F0D500] text-black font-bold text-xs transition duration-200 yellow-glow-sm cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Nova Task</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mr-1">
            Categorias:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#FFE600]/20 text-[#FFE600] border border-[#FFE600]/40 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setSelectedCategory('trafego_ads')}
            className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
              selectedCategory === 'trafego_ads'
                ? 'bg-[#FFE600]/20 text-[#FFE600] border border-[#FFE600]/40 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Tráfego & Ads
          </button>
          <button
            onClick={() => setSelectedCategory('social_media')}
            className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
              selectedCategory === 'social_media'
                ? 'bg-[#FFE600]/20 text-[#FFE600] border border-[#FFE600]/40 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Social Media
          </button>
          <button
            onClick={() => setSelectedCategory('design_criacao')}
            className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
              selectedCategory === 'design_criacao'
                ? 'bg-[#FFE600]/20 text-[#FFE600] border border-[#FFE600]/40 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Design & Criativos
          </button>
          <button
            onClick={() => setSelectedCategory('eventos_sympla')}
            className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
              selectedCategory === 'eventos_sympla'
                ? 'bg-[#FFE600]/20 text-[#FFE600] border border-[#FFE600]/40 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sympla & Eventos
          </button>
          <button
            onClick={() => setSelectedCategory('estrategia')}
            className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
              selectedCategory === 'estrategia'
                ? 'bg-[#FFE600]/20 text-[#FFE600] border border-[#FFE600]/40 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Estratégia & Tech
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-zinc-900/40 border border-dashed border-zinc-800 rounded-xl p-12 text-center">
            <CheckCircle2 className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="font-bold text-white text-base">Nenhuma task encontrada</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
              Nenhuma entrega corresponde aos filtros atuais. Tente ajustar os filtros ou adicione uma nova entrega.
            </p>
            <button
              onClick={onOpenAddTaskModal}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFE600] hover:bg-[#F0D500] text-black font-bold text-xs cursor-pointer shadow yellow-glow-sm"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Adicionar Nova Task</span>
            </button>
          </div>
        ) : (
          filteredTasks.map(task => {
            const cat = getCategoryDetails(task.category);
            const CatIcon = cat.icon;
            const isCompleted = task.status === 'feito';
            const isExpanded = expandedTaskId === task.id;

            return (
              <div
                key={task.id}
                className={`group border rounded-xl p-4 transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-zinc-950/60 border-zinc-800/60 opacity-90' 
                    : task.status === 'em_andamento'
                    ? 'bg-zinc-900/80 border-[#FFE600]/40 yellow-glow-sm'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Status Toggle Button */}
                  <button
                    onClick={() => updateTaskStatus(task.id, isCompleted ? 'pendente' : 'feito')}
                    className="mt-0.5 transition-transform active:scale-90 cursor-pointer"
                    title={isCompleted ? 'Marcar como Pendente' : 'Marcar como Feito'}
                  >
                    {isCompleted ? (
                      <div className="w-6 h-6 rounded-full bg-[#FFE600] flex items-center justify-center text-black shadow">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : task.status === 'em_andamento' ? (
                      <div className="w-6 h-6 rounded-full border-2 border-amber-400 bg-amber-400/20 flex items-center justify-center">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-zinc-600 hover:border-[#FFE600] flex items-center justify-center transition" />
                    )}
                  </button>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${cat.color}`}>
                        <CatIcon className="w-3 h-3" />
                        <span>{cat.label}</span>
                      </span>

                      {getPriorityBadge(task.priority)}

                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                        isCompleted 
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' 
                          : task.status === 'em_andamento'
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                          : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      }`}>
                        {task.status === 'feito' ? 'Entregue / Feito' : task.status === 'em_andamento' ? 'Em Andamento' : 'Pendente'}
                      </span>

                      {task.approvedByClient && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#FFE600] bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/30">
                          <FileCheck className="w-3 h-3 text-[#FFE600]" />
                          <span>Aprovado pelo Cliente</span>
                        </span>
                      )}
                    </div>

                    <h4 
                      onClick={() => onEditTask?.(task)}
                      className={`text-sm sm:text-base font-bold text-white transition cursor-pointer hover:text-[#FFE600] ${
                        isCompleted ? 'line-through text-zinc-400' : 'text-zinc-100'
                      }`}
                      title="Clique para editar esta entrega"
                    >
                      {task.title}
                    </h4>

                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {task.description}
                    </p>

                    {/* Attached Image Preview if present */}
                    {task.imageUrl && (
                      <div className="mt-3 relative rounded-xl overflow-hidden border border-zinc-800 bg-black group/img max-w-md">
                        <img 
                          src={task.imageUrl} 
                          alt={task.title} 
                          className="w-full h-44 object-cover object-center cursor-pointer transition-transform duration-300 group-hover/img:scale-105"
                          onClick={() => setPreviewImage({ url: task.imageUrl!, title: task.title })}
                        />
                        <div 
                          onClick={() => setPreviewImage({ url: task.imageUrl!, title: task.title })}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span className="px-3 py-1.5 rounded-lg bg-[#FFE600] text-black text-xs font-black flex items-center gap-1.5 shadow-lg yellow-glow-sm">
                            <ZoomIn className="w-3.5 h-3.5" />
                            <span>Ampliar Imagem</span>
                          </span>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-zinc-300 font-medium flex items-center gap-1">
                          <ImageIcon className="w-3 h-3 text-[#FFE600]" />
                          <span>Imagem anexada</span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 pt-2 text-xs text-zinc-400 border-t border-zinc-800/60">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="text-zinc-300 font-medium">{task.assignee}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Prazo: {task.dueDate}</span>
                      </div>

                      {task.completedAt && (
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Concluído: {task.completedAt}</span>
                        </div>
                      )}

                      {/* Prominent Deliverable Link */}
                      {task.deliverableUrl && (
                        <div className="flex items-center gap-1.5">
                          <a
                            href={task.deliverableUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFE600] hover:bg-[#F0D500] text-black font-extrabold text-xs transition duration-150 yellow-glow-sm shadow"
                          >
                            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Acessar Link</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => copyLink(task.deliverableUrl!, task.id)}
                            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
                            title="Copiar link"
                          >
                            {copiedLinkId === task.id ? (
                              <CheckCheck className="w-3.5 h-3.5 text-[#FFE600]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}

                      {task.notes && (
                        <button
                          onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                          className="flex items-center gap-1 text-zinc-400 hover:text-white transition ml-auto cursor-pointer"
                        >
                          <span>{isExpanded ? 'Ocultar notas' : 'Ver observações'}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      )}
                    </div>

                    {isExpanded && task.notes && (
                      <div className="mt-3 p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-xs text-zinc-300">
                        <strong className="text-[#FFE600] block mb-1">Observações da Entrega:</strong>
                        {task.notes}
                      </div>
                    )}
                  </div>

                  {/* Actions: Edit, Client Approval & Delete */}
                  <div className="flex items-center gap-2 self-start shrink-0">
                    
                    {/* EDIT TASK BUTTON */}
                    <button
                      type="button"
                      onClick={() => onEditTask?.(task)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-[#FFE600] border border-zinc-700 hover:border-yellow-400/50 text-xs font-bold transition cursor-pointer shadow-sm"
                      title="Editar dados, link ou fotos desta task"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => toggleClientApproval(task.id)}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        task.approvedByClient
                          ? 'bg-[#FFE600] text-black border-[#FFE600] font-bold'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-[#FFE600] hover:border-yellow-400/40'
                      }`}
                      title={task.approvedByClient ? 'Remover aprovação do cliente' : 'Cliente: Clique para aprovar esta entrega'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    {/* Always visible Delete Button */}
                    <button
                      onClick={() => setTaskToDelete(task)}
                      className="group/del flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-rose-950/50 text-zinc-400 hover:text-rose-400 border border-zinc-700/80 hover:border-rose-500/50 transition cursor-pointer"
                      title="Apagar esta task"
                    >
                      <Trash2 className="w-4 h-4 group-hover/del:text-rose-400" />
                      <span className="hidden sm:inline text-[11px] font-medium group-hover/del:text-rose-300">Apagar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Lightbox Modal for Full Size Image Viewing */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#FFE600]" />
                <h3 className="font-bold text-white text-sm truncate max-w-md">{previewImage.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewImage.url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir Original</span>
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-3 bg-black flex items-center justify-center overflow-auto max-h-[75vh]">
              <img 
                src={previewImage.url} 
                alt={previewImage.title} 
                className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
