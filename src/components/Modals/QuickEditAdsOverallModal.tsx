import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { X, Edit3 } from 'lucide-react';

interface QuickEditAdsOverallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickEditAdsOverallModal: React.FC<QuickEditAdsOverallModalProps> = ({ isOpen, onClose }) => {
  const { adsOverall, updateAdsOverall } = useDashboard();

  const [totalSpent, setTotalSpent] = useState(adsOverall.totalSpent);
  const [totalConversions, setTotalConversions] = useState(adsOverall.totalConversions);
  const [totalClicks, setTotalClicks] = useState(adsOverall.totalClicks);
  const [totalReach, setTotalReach] = useState(adsOverall.totalReach);
  const [symplaRevenueEstimated, setSymplaRevenueEstimated] = useState(adsOverall.symplaRevenueEstimated);
  const [roas, setRoas] = useState(adsOverall.roas);
  const [periodLabel, setPeriodLabel] = useState(adsOverall.periodLabel);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const safeSpent = Number(totalSpent) || 0;
    const safeClicks = Number(totalClicks) || 1;
    const avgCpc = safeClicks > 0 ? Number((safeSpent / safeClicks).toFixed(2)) : 0;

    updateAdsOverall({
      totalSpent: safeSpent,
      totalConversions: Number(totalConversions) || 0,
      totalClicks: safeClicks,
      totalReach: Number(totalReach) || 0,
      symplaRevenueEstimated: Number(symplaRevenueEstimated) || 0,
      roas: Number(roas) || 0,
      avgCpc,
      periodLabel: periodLabel.trim() || 'Mês Atual'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFE600] flex items-center justify-center text-black">
              <Edit3 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Ajustar Totais de Ads do Período</h3>
              <p className="text-xs text-zinc-400">Edição rápida dos números consolidados para apresentação ao cliente</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Rótulo do Período
            </label>
            <input
              type="text"
              value={periodLabel}
              onChange={e => setPeriodLabel(e.target.value)}
              placeholder="Ex: Mês de Setembro 2026"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Total Investido (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={totalSpent}
                onChange={e => setTotalSpent(parseFloat(e.target.value) || 0)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFE600]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Receita Estimada Sympla (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={symplaRevenueEstimated}
                onChange={e => setSymplaRevenueEstimated(parseFloat(e.target.value) || 0)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-[#FFE600] font-bold font-mono focus:outline-none focus:border-[#FFE600]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Ingressos Sympla + Reservas
              </label>
              <input
                type="number"
                value={totalConversions}
                onChange={e => setTotalConversions(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFE600]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                ROAS (Multiplicador de Retorno)
              </label>
              <input
                type="number"
                step="0.1"
                value={roas}
                onChange={e => setRoas(parseFloat(e.target.value) || 0)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-[#FFE600] font-bold font-mono focus:outline-none focus:border-[#FFE600]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Alcance Geral no DF
              </label>
              <input
                type="number"
                value={totalReach}
                onChange={e => setTotalReach(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFE600]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Total de Cliques nos Links
              </label>
              <input
                type="number"
                value={totalClicks}
                onChange={e => setTotalClicks(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFE600]"
              />
            </div>
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
              Salvar Ajustes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
