import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { AdCampaign } from '../../types/dashboard';
import { X, TrendingUp } from 'lucide-react';

interface AddAdsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAdsModal: React.FC<AddAdsModalProps> = ({ isOpen, onClose }) => {
  const { addCampaign } = useDashboard();

  const [name, setName] = useState('');
  const [platform, setPlatform] = useState<AdCampaign['platform']>('Meta Ads (Instagram)');
  const [period, setPeriod] = useState('25 Set - 02 Out 2026');
  const [spent, setSpent] = useState<number>(500);
  const [budget, setBudget] = useState<number>(600);
  const [reach, setReach] = useState<number>(18500);
  const [impressions, setImpressions] = useState<number>(29000);
  const [clicks, setClicks] = useState<number>(450);
  const [conversions, setConversions] = useState<number>(48);
  const [status, setStatus] = useState<'ativa' | 'pausada' | 'finalizada'>('ativa');
  const [targetAudience, setTargetAudience] = useState('Brasília (Plano Piloto, Asa Sul, Sudoeste) | 22-38 anos | Sympla & Noite');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const safeSpent = Number(spent) || 0;
    const safeClicks = Number(clicks) || 1;
    const safeImpressions = Number(impressions) || 1;
    const safeConversions = Number(conversions) || 0;

    const cpc = safeClicks > 0 ? Number((safeSpent / safeClicks).toFixed(2)) : 0;
    const cpm = safeImpressions > 0 ? Number(((safeSpent / safeImpressions) * 1000).toFixed(2)) : 0;
    const ctr = safeImpressions > 0 ? Number(((safeClicks / safeImpressions) * 100).toFixed(2)) : 0;
    const cpa = safeConversions > 0 ? Number((safeSpent / safeConversions).toFixed(2)) : 0;
    const estimatedRev = safeConversions * 60;
    const roas = safeSpent > 0 ? Number((estimatedRev / safeSpent).toFixed(1)) : 1;

    addCampaign({
      name: name.trim(),
      platform,
      period,
      budget: Number(budget) || safeSpent,
      spent: safeSpent,
      reach: Number(reach) || 0,
      impressions: safeImpressions,
      clicks: safeClicks,
      conversions: safeConversions,
      cpc,
      cpm,
      ctr,
      cpa,
      roas,
      status,
      targetAudience,
      notes: notes.trim() || undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFE600] flex items-center justify-center text-black">
              <TrendingUp className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Subir Números de Ads da Conta LOBBY</h3>
              <p className="text-xs text-zinc-400">Registre métricas de tráfego pago, conversões no Sympla e alcance</p>
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
              Nome da Campanha / Anúncio *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: [CONVERSÃO SYMPLA] Sexta-Feira DJs Residentes"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE600]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Plataforma *
              </label>
              <select
                value={platform}
                onChange={e => setPlatform(e.target.value as AdCampaign['platform'])}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
              >
                <option value="Meta Ads (Instagram)">Meta Ads (Instagram)</option>
                <option value="Meta Retargeting">Meta Retargeting (Público Quente)</option>
                <option value="Google Ads">Google Ads (Pesquisa / YouTube)</option>
                <option value="TikTok Ads">TikTok Ads</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Status da Campanha
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as 'ativa' | 'pausada' | 'finalizada')}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
              >
                <option value="ativa">Ativa</option>
                <option value="pausada">Pausada</option>
                <option value="finalizada">Finalizada</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Valor Investido (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={spent}
                onChange={e => setSpent(parseFloat(e.target.value) || 0)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFE600]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Ingressos Sympla / Conversões *
              </label>
              <input
                type="number"
                required
                value={conversions}
                onChange={e => setConversions(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-[#FFE600] font-bold font-mono focus:outline-none focus:border-[#FFE600]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Alcance (Pessoas)
              </label>
              <input
                type="number"
                value={reach}
                onChange={e => setReach(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFE600]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Impressões
              </label>
              <input
                type="number"
                value={impressions}
                onChange={e => setImpressions(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFE600]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Cliques no Link
              </label>
              <input
                type="number"
                value={clicks}
                onChange={e => setClicks(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFE600]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Público / Segmentação
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={e => setTargetAudience(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Notas do Gestor / Criativo em teste
            </label>
            <input
              type="text"
              placeholder="Ex: Criativo com DJ tocando ao vivo teve 40% menor custo por lead"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
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
              Salvar Números de Ads
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
