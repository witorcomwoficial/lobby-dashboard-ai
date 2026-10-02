import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { X, Download, RotateCcw, Check, Copy, Printer } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { 
    exportDataJSON, 
    importDataJSON, 
    resetToDefaults 
  } = useDashboard();

  const [importText, setImportText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const ok = importDataJSON(importText);
    if (ok) {
      setImportStatus('success');
      setTimeout(() => {
        setImportStatus(null);
        onClose();
      }, 1200);
    } else {
      setImportStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFE600] flex items-center justify-center text-black">
              <Download className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Exportar & Compartilhar com o Cliente</h3>
              <p className="text-xs text-zinc-400">Opções de entrega de relatório e salvamento de dados</p>
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
          
          {/* Share with Client Link */}
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Link Direto para o Cliente</span>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#FFE600] text-black text-xs font-bold rounded-lg hover:bg-yellow-400 transition cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copiado!' : 'Copiar Link'}</span>
              </button>
            </div>
            <p className="text-xs text-zinc-400">
              Dica: Você pode ativar a <strong>"Visão Cliente"</strong> no topo para que seu cliente visualize o painel limpo, sem botões de configuração técnica.
            </p>
          </div>

          {/* Print to PDF */}
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Salvar Relatório como PDF</span>
              <span className="text-xs text-zinc-400">Gera um PDF elegante preto e amarelo pronto para envio</span>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg border border-zinc-700 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>Imprimir / PDF</span>
            </button>
          </div>

          {/* Backup JSON */}
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Backup dos Dados (JSON)</span>
              <button
                onClick={exportDataJSON}
                className="flex items-center gap-1 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-[#FFE600] text-xs font-bold rounded-lg border border-zinc-700 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Arquivo JSON</span>
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                Restaurar / Colar Backup JSON:
              </label>
              <textarea
                rows={2}
                placeholder="Cole o código JSON do backup aqui..."
                value={importText}
                onChange={e => setImportText(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-zinc-300 focus:outline-none focus:border-[#FFE600]"
              />
              {importStatus === 'success' && (
                <p className="text-xs text-emerald-400 mt-1 font-semibold">✓ Dados restaurados com sucesso!</p>
              )}
              {importStatus === 'error' && (
                <p className="text-xs text-rose-400 mt-1 font-semibold">✗ Formato JSON inválido.</p>
              )}

              {importText.trim() && (
                <button
                  onClick={handleImport}
                  className="mt-2 px-3 py-1 bg-[#FFE600] text-black text-xs font-bold rounded-lg cursor-pointer"
                >
                  Confirmar Importação
                </button>
              )}
            </div>
          </div>

          {/* Reset to defaults */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-zinc-500">Restaurar dados originais da LOBBY?</span>
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-rose-400 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrões</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
