import React, { useState, useRef } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { TaskCategory, TaskPriority, TaskStatus } from '../../types/dashboard';
import { X, CheckSquare, Link2, Image as ImageIcon, Upload, Trash2 } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const { addTask } = useDashboard();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('trafego_ads');
  const [status, setStatus] = useState<TaskStatus>('pendente');
  const [priority, setPriority] = useState<TaskPriority>('alta');
  const [assignee, setAssignee] = useState('Gestor de Tráfego');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [deliverableUrl, setDeliverableUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim() || 'Sem descrição adicional.',
      category,
      status,
      priority,
      assignee: assignee.trim() || 'Equipe',
      dueDate,
      deliverableUrl: deliverableUrl.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      notes: notes.trim() || undefined,
      approvedByClient: false
    });

    // Reset and close
    setTitle('');
    setDescription('');
    setDeliverableUrl('');
    setImageUrl('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFE600] flex items-center justify-center text-black">
              <CheckSquare className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Subir Nova Task / Entrega</h3>
              <p className="text-xs text-zinc-400">Cadastre tarefas para acompanhar o que foi feito ou o que está pendente</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Título da Task *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Campanha de Lote 2 no Sympla / Vídeo Reels DJ"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE600]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Descrição detalhada
            </label>
            <textarea
              rows={2}
              placeholder="O que será executado e qual o objetivo para a LOBBY..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE600]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Status Inicial *
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as TaskStatus)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
              >
                <option value="pendente">📌 Pendente (A Fazer)</option>
                <option value="em_andamento">⏳ Em Andamento</option>
                <option value="feito">✅ Feito (Já Entregue)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Categoria *
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as TaskCategory)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
              >
                <option value="trafego_ads">Tráfego & Meta Ads</option>
                <option value="social_media">Social Media & Conteúdo</option>
                <option value="design_criacao">Design & Criativos</option>
                <option value="eventos_sympla">Eventos & Sympla</option>
                <option value="estrategia">Estratégia & Tech</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Prioridade
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as TaskPriority)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
              >
                <option value="urgente">Urgente</option>
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Responsável
              </label>
              <input
                type="text"
                placeholder="Ex: Gestor de Tráfego"
                value={assignee}
                onChange={e => setAssignee(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Data Limite (Prazo)
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
              />
            </div>
          </div>

          {/* Link da Entrega */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 mb-1.5">
              <Link2 className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>Link da Entrega / Drive / Sympla (Opcional)</span>
            </label>
            <input
              type="url"
              placeholder="https://drive.google.com/... ou link do anúncio"
              value={deliverableUrl}
              onChange={e => setDeliverableUrl(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE600]"
            />
          </div>

          {/* Anexo de Imagem */}
          <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
                <ImageIcon className="w-3.5 h-3.5 text-[#FFE600]" />
                <span>Anexar Imagem / Criativo (Opcional)</span>
              </label>
              {imageUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remover</span>
                </button>
              )}
            </div>

            {imageUrl ? (
              <div className="relative rounded-lg overflow-hidden border border-zinc-700 bg-black max-h-36 flex items-center justify-center">
                <img src={imageUrl} alt="Prévia" className="max-h-36 w-auto object-contain" />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 rounded-lg border border-zinc-700 cursor-pointer transition whitespace-nowrap"
                >
                  <Upload className="w-3.5 h-3.5 text-[#FFE600]" />
                  <span>Subir do Computador</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="hidden"
                />
                <input
                  type="url"
                  placeholder="Ou cole a URL da imagem..."
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE600]"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Notas ou Resultados
            </label>
            <input
              type="text"
              placeholder="Ex: Gerou 180 cliques com CPC de R$ 0,72"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE600]"
            />
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#FFE600] hover:bg-[#F0D500] text-black font-bold text-xs shadow-lg yellow-glow-sm transition cursor-pointer"
            >
              Cadastrar Entrega
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
