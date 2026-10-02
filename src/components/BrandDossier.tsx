import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Ticket, 
  Link2, 
  Sparkles, 
  Wine, 
  Volume2, 
  CheckCircle2, 
  FolderGit2, 
  ExternalLink,
  Palette,
  Radio
} from 'lucide-react';

export const BrandDossier: React.FC = () => {
  const { clientProfile } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Top Banner / Exact recreation of user's image typography & brand identity */}
      <div className="bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
        {/* Glow ambient background in brand yellow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE600]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Hero Branding Display from the user's uploaded image */}
        <div className="flex flex-col items-center justify-center text-center py-6 sm:py-10 border-b border-zinc-800/80 mb-8 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-[#FFE600]/30 text-[11px] font-bold text-[#FFE600] uppercase tracking-widest mb-4">
            <Radio className="w-3.5 h-3.5 text-[#FFE600] animate-pulse" />
            <span>Identidade Visual & Conceito</span>
          </div>

          {/* EXACT TYPOGRAPHY FROM USER'S IMAGE */}
          <h1 className="font-lobby font-black text-5xl sm:text-7xl lg:text-8xl tracking-[0.16em] uppercase text-white hover:text-[#FFE600] transition-colors duration-300 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            LOBBY
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base uppercase tracking-[0.32em] text-zinc-300 font-medium mt-2 sm:mt-3">
            Hi-Fi sound <span className="text-[#FFE600] mx-1">•</span> Brasília, DF
          </p>

          <p className="max-w-xl text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed">
            Acusticamente desenhada para conectar música de alta fidelidade sonora, coquetelaria autoral e o público mais refinado de Brasília.
          </p>
        </div>

        {/* Profile details & Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-zinc-800/80">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>@{clientProfile.handle}</span>
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#FFE600] text-black text-[10px] font-bold">
                  ✓
                </span>
              </h2>
              <span className="text-xs text-zinc-400">({clientProfile.followersCount} seguidores • {clientProfile.postsCount} posts)</span>
            </div>

            <div className="space-y-1.5 text-xs text-zinc-300">
              <p className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#FFE600]" />
                <span>Acusticamente desenhada para celebrar a música e coquetelaria autoral.</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FFE600]" />
                <span>Sextas e sábados, a partir das 20h</span>
              </p>
              <p className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-[#FFE600]" />
                <span>Vendas na <strong className="text-white">@sympla</strong></span>
              </p>
              <p className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-4 h-4 text-[#FFE600]" />
                <span>{clientProfile.location}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-2.5 sm:items-end">
            <a
              href="https://instagram.com/listenlobby"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 text-xs font-semibold transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>Abrir Instagram Oficial (@listenlobby)</span>
            </a>

            <a
              href={clientProfile.ticketLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFE600] hover:bg-[#F0D500] text-black text-xs font-bold transition shadow"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Página Sympla do Cliente</span>
            </a>

            <a
              href="https://linktr.ee/listenlobby"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-950 text-zinc-400 hover:text-white text-xs transition"
            >
              <Link2 className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>linktr.ee/listenlobby</span>
            </a>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="pt-6">
          <div className="text-xs font-bold tracking-wider text-zinc-400 uppercase mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
            Destaques Oficiais do Instagram (Highlights)
          </div>

          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-2">
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-[#FFE600] flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <div className="w-full h-full rounded-full bg-[#FFE600] flex items-center justify-center text-black font-semibold">
                  <span className="font-serif italic font-bold text-sm tracking-tight text-black">
                    reservas
                  </span>
                </div>
              </div>
              <span className="text-xs font-medium text-zinc-300 group-hover:text-white">Reservas</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-[#FFE600] flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <div className="w-full h-full rounded-full bg-[#FFE600] flex items-center justify-center text-black font-semibold">
                  <span className="font-serif italic font-bold text-sm tracking-tight text-black">
                    comida
                  </span>
                </div>
              </div>
              <span className="text-xs font-medium text-zinc-300 group-hover:text-white">Comida</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-[#FFE600] flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <div className="w-full h-full rounded-full bg-[#FFE600] flex items-center justify-center text-black font-semibold">
                  <span className="font-serif italic font-bold text-sm tracking-tight text-black">
                    bebida
                  </span>
                </div>
              </div>
              <span className="text-xs font-medium text-zinc-300 group-hover:text-white">Bebida</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-zinc-800 border-2 border-dashed border-[#FFE600]/40 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-[#FFE600]">
                  <Ticket className="w-6 h-6 text-[#FFE600]" />
                </div>
              </div>
              <span className="text-xs font-medium text-zinc-400 group-hover:text-white">Sympla</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-zinc-800 border-2 border-dashed border-[#FFE600]/40 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-[#FFE600]">
                  <Volume2 className="w-6 h-6 text-[#FFE600]" />
                </div>
              </div>
              <span className="text-xs font-medium text-zinc-400 group-hover:text-white">Line-up</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 3 Pillars of Client Brand */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-zinc-900/70 border border-zinc-800 hover:border-[#FFE600]/50 rounded-xl p-5 transition group">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-[#FFE600]/30 flex items-center justify-center mb-4 group-hover:bg-[#FFE600] transition">
            <Volume2 className="w-5 h-5 text-[#FFE600] group-hover:text-black transition" />
          </div>
          <h3 className="font-bold text-white text-base mb-1.5">Conceito Hi-Fi & Acústica Sonora</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Arquitetura especialmente desenhada com difusores e isolamento de alta tecnologia. Graves controlados e pressão sonora equilibrada para permitir conversa confortável com som nítido.
          </p>
          <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Local: Ed. Amazonas, SCS</span>
            <span className="text-[#FFE600] font-semibold">Sound System Premium</span>
          </div>
        </div>

        <div className="bg-zinc-900/70 border border-zinc-800 hover:border-[#FFE600]/50 rounded-xl p-5 transition group">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-[#FFE600]/30 flex items-center justify-center mb-4 group-hover:bg-[#FFE600] transition">
            <Wine className="w-5 h-5 text-[#FFE600] group-hover:text-black transition" />
          </div>
          <h3 className="font-bold text-white text-base mb-1.5">Coquetelaria & Experiência</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Carta autoral desenvolvida para o público noturno de Brasília. Cardápio refinado com finger foods e drinks especiais servidos durante as noites de sexta e sábado a partir das 20h.
          </p>
          <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Destaques: Reservas / Mesas</span>
            <span className="text-[#FFE600] font-semibold">Mixologia Autoral</span>
          </div>
        </div>

        <div className="bg-zinc-900/70 border border-zinc-800 hover:border-[#FFE600]/50 rounded-xl p-5 transition group">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-[#FFE600]/30 flex items-center justify-center mb-4 group-hover:bg-[#FFE600] transition">
            <Ticket className="w-5 h-5 text-[#FFE600] group-hover:text-black transition" />
          </div>
          <h3 className="font-bold text-white text-base mb-1.5">Vendas Sympla & Lotes</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Funil integrado de tráfego pago via Meta Ads direcionando diretamente para ingressos no Sympla e reservas VIP de mesas no WhatsApp oficial.
          </p>
          <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Conversão: Sympla Pixel</span>
            <span className="text-[#FFE600] font-semibold">Lotes 1, 2 e Portaria</span>
          </div>
        </div>
      </div>

      {/* Brand Identity & Color Palettes Card */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#FFE600]" />
            <h2 className="text-base font-bold text-white">Manual e Tipografia LOBBY</h2>
          </div>
          <span className="text-xs text-[#FFE600] bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/30 font-semibold">
            Preto & Amarelo
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-black border border-zinc-800 rounded-lg p-3">
            <div className="w-full h-12 rounded bg-[#FFE600] mb-2 shadow-[0_0_15px_rgba(255,230,0,0.3)]" />
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Amarelo Brand</span>
              <code className="text-[#FFE600] font-mono">#FFE600</code>
            </div>
            <span className="text-[10px] text-zinc-400">Destaques, CTAs, Neon</span>
          </div>

          <div className="bg-black border border-zinc-800 rounded-lg p-3">
            <div className="w-full h-12 rounded bg-[#000000] border border-zinc-700 mb-2" />
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Preto Obsidian</span>
              <code className="text-zinc-400 font-mono">#000000</code>
            </div>
            <span className="text-[10px] text-zinc-400">Fundo e Atmosfera Club</span>
          </div>

          <div className="bg-black border border-zinc-800 rounded-lg p-3">
            <div className="w-full h-12 rounded bg-[#18181b] border border-zinc-700 mb-2" />
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Card Charcoal</span>
              <code className="text-zinc-400 font-mono">#18181B</code>
            </div>
            <span className="text-[10px] text-zinc-400">Cards e Superfícies</span>
          </div>

          <div className="bg-black border border-zinc-800 rounded-lg p-3">
            <div className="w-full h-12 rounded bg-[#EAB308] mb-2" />
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Gold Warm</span>
              <code className="text-yellow-500 font-mono">#EAB308</code>
            </div>
            <span className="text-[10px] text-zinc-400">Sombras e Detalhes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
