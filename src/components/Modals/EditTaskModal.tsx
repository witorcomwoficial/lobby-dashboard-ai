import React, { useState, useEffect, useRef } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Task, TaskCategory, TaskPriority, TaskStatus } from '../../types/dashboard';
import { 
  X, 
  Edit3, 
  Link2, 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  ExternalLink,
  Calendar,
  User,
  AlertCircle
} from 'lucide-react';

interface EditTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, task, onClose }) => {
  const { editTask, deleteTask } = useDashboard();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('trafego_ads');
  const [status, setStatus] = useState<TaskStatus>('pendente');
  const [priority, setPriority] = useState<TaskPriority>('alta');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [deliverableUrl, setDeliverableUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setCategory(task.category || 'trafego_ads');
      setStatus(task.status || 'pendente');
      setPriority(task.priority || 'alta');
      setAssignee(task.assignee || '');
      setDueDate(task.dueDate || '');
      setDeliverableUrl(task.deliverableUrl || '');
      setImageUrl(task.imageUrl || '');
      setNotes(task.notes || '');
      setImageError(false);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem é muito grande. Escolha uma imagem de até 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja apagar a task "${task.title}"?`)) {
      deleteTask(task.id);
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    editTask(task.id, {
      title: title.trim(),
      description: description.trim(),
      category,
      status,
      priority,
      assignee: assignee.trim() || 'Equipe LOBBY',
      dueDate: dueDate || task.dueDate,
      deliverableUrl: deliverableUrl.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      notes: notes.trim() || undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFE600] flex items-center justify-center text-black shadow-md">
              <Edit3 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Editar Task / Entrega</h3>
              <p className="text-xs text-zinc-400">Atualize dados, links de entregáveis e anexe imagens</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Título da Task *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex: Campanha de Lote 2 no Sympla"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600] transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Descrição detalhada
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descreva o que foi ou será feito para a LOBBY..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600] transition"
            />
          </div>

          {/* Status, Category & Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Status *
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as TaskStatus)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FFE600] cursor-pointer"
              >
                <option value="pendente">📌 Pendente</option>
                <option value="em_andamento">⏳ Em Andamento</option>
                <option value="feito">✅ Feito (Concluído)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Categoria *
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as TaskCategory)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FFE600] cursor-pointer"
              >
                <option value="trafego_ads">Tráfego & Meta Ads</option>
                <option value="social_media">Social Media</option>
                <option value="design_criacao">Design & Criativos</option>
                <option value="eventos_sympla">Eventos & Sympla</option>
                <option value="estrategia">Estratégia & Tech</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Prioridade
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as TaskPriority)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FFE600] cursor-pointer"
              >
                <option value="urgente">Urgente</option>
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
              </select>
            </div>
          </div>

          {/* Assignee & Due Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Responsável
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={assignee}
                  onChange={e => setAssignee(e.target.value)}
                  placeholder="Ex: Gestor de Tráfego / Designer"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Prazo de Entrega
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
                />
              </div>
            </div>
          </div>

          {/* Deliverable Link (Link da Task) */}
          <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Link2 className="w-4 h-4 text-[#FFE600]" />
                <span>Link da Entrega / Referência (Drive, Sympla, Anúncio, Canva)</span>
              </label>
              {deliverableUrl && (
                <a
                  href={deliverableUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#FFE600] hover:underline flex items-center gap-1 font-semibold"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Testar Link</span>
                </a>
              )}
            </div>

            <input
              type="url"
              value={deliverableUrl}
              onChange={e => setDeliverableUrl(e.target.value)}
              placeholder="https://drive.google.com/... ou https://instagram.com/..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#FFE600]"
            />
            <p className="text-[11px] text-zinc-400">
              Cole qualquer link relevante (apresentação, link do Google Drive, post no Instagram, página do Sympla, etc.).
            </p>
          </div>

          {/* Image Attachment (Acrescentar Imagens) */}
          <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-bold text-white">
                <ImageIcon className="w-4 h-4 text-[#FFE600]" />
                <span>Anexo de Imagem (Criativo, Comprovante, Print ou Foto)</span>
              </label>
              {imageUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remover imagem</span>
                </button>
              )}
            </div>

            {/* Image Preview if exists */}
            {imageUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-zinc-700 bg-black max-h-56 flex items-center justify-center group">
                <img
                  src={imageUrl}
                  alt="Anexo da task"
                  onError={() => setImageError(true)}
                  className="w-full h-auto max-h-56 object-contain"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <a
                    href={imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-zinc-800 text-white hover:text-[#FFE600] text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Visualizar Tamanho Real</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-2 rounded-lg bg-rose-900/80 text-white hover:bg-rose-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remover</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Upload File button */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-zinc-700 hover:border-[#FFE600] rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition bg-zinc-950/60 group"
                >
                  <Upload className="w-6 h-6 text-zinc-400 group-hover:text-[#FFE600] transition mb-1.5" />
                  <span className="text-xs font-bold text-zinc-200 group-hover:text-white">
                    Fazer Upload de Imagem
                  </span>
                  <span className="text-[10px] text-zinc-500 mt-0.5">
                    PNG, JPG, WEBP até 5MB
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Or Paste URL */}
                <div className="flex flex-col justify-center gap-1.5 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
                  <label className="text-[11px] font-semibold text-zinc-400">
                    Ou cole o link direto da imagem:
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={e => {
                      setImageUrl(e.target.value);
                      setImageError(false);
                    }}
                    placeholder="https://.../imagem.jpg"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE600]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Observações / Resultados da Entrega
            </label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Ex: Campanha gerou 340 cliques e 48 conversões no Sympla..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE600]"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleDelete}
              className="px-3.5 py-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 text-xs font-semibold border border-rose-800/40 transition cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Apagar Task</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-[#FFE600] hover:bg-[#F0D500] text-black font-extrabold text-xs shadow-lg yellow-glow-sm transition cursor-pointer"
              >
                Salvar Alterações
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
