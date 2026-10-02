import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  CheckCheck, 
  ExternalLink, 
  Smartphone, 
  Eye, 
  MessageCircle,
  Database,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const { clientProfile, tasks, adsOverall } = useDashboard();
  const [copiedClientLink, setCopiedClientLink] = useState(false);
  const [copiedAgencyLink, setCopiedAgencyLink] = useState(false);

  if (!isOpen) return null;

  // The base shared URL for this AI Studio project
  const baseUrl = window.location.origin;
  const clientLink = `${baseUrl}?mode=client`;
  const agencyLink = `${baseUrl}?mode=agency`;

  const handleCopyClient = () => {
    navigator.clipboard.writeText(clientLink);
    setCopiedClientLink(true);
    setTimeout(() => setCopiedClientLink(false), 2500);
  };

  const handleCopyAgency = () => {
    navigator.clipboard.writeText(agencyLink);
    setCopiedAgencyLink(true);
    setTimeout(() => setCopiedAgencyLink(false), 2500);
  };

  const completedCount = tasks.filter(t => t.status === 'feito').length;

  const whatsappMessage = encodeURIComponent(
    `Olá! Segue o link atualizado do painel de resultados e entregas da ${clientProfile.name} (@${clientProfile.handle}):\n\n` +
    `🔗 ${clientLink}\n\n` +
    `• ${completedCount} entregas concluídas\n` +
    `• Métricas de tráfego pago & Sympla\n` +
    `• Dados de audiência do Instagram`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFE600] flex items-center justify-center text-black shadow-lg yellow-glow-sm">
              <Share2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Disponibilizar Link para o Cliente</h3>
              <p className="text-xs text-zinc-400">Envie o link para o cliente acompanhar entregas e resultados</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Main Client Link Card (Highlighted) */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-2 border-[#FFE600]/60 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600] animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-[#FFE600]">
                  Link Recomendado para o Cliente (Modo Apresentação)
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold border border-zinc-700">
                Acesso Seguro
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Este link abre o painel no <strong>Modo Cliente</strong> (interface executiva, limpa, com os gráficos, o que foi feito, o que está pendente e sem botões de edição acidentais).
            </p>

            {/* Link Box */}
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-lg p-2">
              <input
                type="text"
                readOnly
                value={clientLink}
                className="bg-transparent border-none text-xs text-zinc-200 font-mono flex-1 focus:outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopyClient}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow ${
                  copiedClientLink 
                    ? 'bg-emerald-500 text-black' 
                    : 'bg-[#FFE600] hover:bg-[#F0D500] text-black'
                }`}
              >
                {copiedClientLink ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedClientLink ? 'Copiado!' : 'Copiar Link'}</span>
              </button>
            </div>

            {/* Quick Actions for Client Link */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={`https://wa.me/?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition cursor-pointer shadow"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enviar pelo WhatsApp</span>
              </a>

              <a
                href={clientLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Testar como Cliente</span>
              </a>
            </div>
          </div>

          {/* Info on how it works */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2.5 text-xs">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#FFE600]" />
              <span>Como seu cliente visualiza:</span>
            </h4>
            <ul className="space-y-1.5 text-zinc-400 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-[#FFE600] font-bold">1.</span>
                <span>Ele clica no link pelo celular ou computador e o dashboard abre instantaneamente.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFE600] font-bold">2.</span>
                <span>Ele pode navegar nas abas: <strong>Visão Geral</strong>, <strong>Tasks Feitas / Pendentes</strong>, <strong>Números de Ads</strong>, <strong>Instagram</strong> e <strong>Identidade</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFE600] font-bold">3.</span>
                <span>Ele pode clicar nos links das entregas (Drive, Sympla) e ampliar as fotos em tela cheia.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFE600] font-bold">4.</span>
                <span>Ele tem o botão de <strong>Aprovar Entrega</strong> para validar o trabalho entregue.</span>
              </li>
            </ul>
          </div>

          {/* Cloud Sync & Persistence Section */}
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-zinc-300 font-bold">
              <Database className="w-4 h-4 text-[#FFE600]" />
              <span>Sincronização em Nuvem (Multi-Dispositivo)</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Atualmente os dados digitados ficam salvos com segurança no navegador. Se você deseja que qualquer alteração que você fizer no seu computador apareça <strong>automaticamente e em tempo real</strong> no celular ou computador do cliente via nuvem, podemos ativar o <strong>banco de dados em nuvem (Firebase Firestore)</strong>.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/40 flex items-center justify-between">
          <span className="text-[11px] text-zinc-500 font-medium">
            LOBBY • Painel Executivo do Cliente
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
