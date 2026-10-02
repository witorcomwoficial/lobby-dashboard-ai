import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { 
  Instagram, 
  Users, 
  Eye, 
  TrendingUp, 
  Calendar, 
  Play, 
  ArrowUpRight,
  ExternalLink,
  Clock
} from 'lucide-react';

export const InstagramAnalytics: React.FC = () => {
  const { instagramMetric, instagramPosts, clientProfile } = useDashboard();

  return (
    <div className="space-y-6">
      
      {/* Top Profile Summary Card */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full p-[2px] bg-[#FFE600] yellow-glow-sm">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <span className="font-lobby font-black text-sm text-[#FFE600] tracking-wider">LOBBY</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">@{clientProfile.handle}</h2>
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#FFE600] text-black text-[10px] font-bold">
                  ✓
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Auditoria de Crescimento Orgânico & Presença Digital em Brasília
              </p>
            </div>
          </div>

          <a
            href="https://instagram.com/listenlobby"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition self-start md:self-auto"
          >
            <Instagram className="w-4 h-4 text-[#FFE600]" />
            <span>Ver Perfil ao Vivo</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>

        {/* 4 Primary Instagram Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          
          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Seguidores Atuais</span>
              <Users className="w-4 h-4 text-[#FFE600]" />
            </div>
            <div className="text-2xl font-black text-white font-lobby tracking-wide">
              {clientProfile?.followersCount ?? (Number(instagramMetric?.followers ?? 0)).toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{(Number(instagramMetric?.followersGrowth ?? 0)).toLocaleString('pt-BR')} novos seguidores</span>
            </div>
          </div>

          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Contas Alcançadas</span>
              <Eye className="w-4 h-4 text-[#FFE600]" />
            </div>
            <div className="text-2xl font-black text-[#FFE600] font-lobby tracking-wide">
              {(Number(instagramMetric?.accountsReached ?? 0) / 1000).toFixed(1)}k
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{Number(instagramMetric?.reachGrowth ?? 0)}% vs mês anterior</span>
            </div>
          </div>

          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Engajamento Médio</span>
              <TrendingUp className="w-4 h-4 text-[#FFE600]" />
            </div>
            <div className="text-2xl font-black text-white font-lobby tracking-wide">
              {Number(instagramMetric?.engagementRate ?? 0)}%
            </div>
            <div className="mt-1 text-xs text-zinc-400">
              Média do nicho: 2.1% (Excelente)
            </div>
          </div>

          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Média Stories/Noite</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400 font-lobby tracking-wide">
              {(Number(instagramMetric?.averageStoryViews ?? 0)).toLocaleString('pt-BR')}
            </div>
            <div className="mt-1 text-xs text-zinc-400">
              Pico às sextas & sábados
            </div>
          </div>

        </div>
      </div>

      {/* Top Performing Content & Reels */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-[#FFE600]" />
            <h3 className="font-bold text-white text-base">Top Conteúdos & Reels com Maior Conversão</h3>
          </div>
          <span className="text-xs text-zinc-400">Dados consolidados do feed @listenlobby</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(instagramPosts ?? []).map(post => (
            <div 
              key={post.id}
              className="bg-zinc-900/80 border border-zinc-800 hover:border-[#FFE600]/40 rounded-xl overflow-hidden transition group flex flex-col"
            >
              <div className="h-32 bg-gradient-to-tr from-black via-zinc-900 to-zinc-800 p-4 relative flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/80 text-[#FFE600] border border-[#FFE600]/40">
                    {post.type.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-zinc-400">{post.publishedDate}</span>
                </div>

                <div className="text-xs font-bold text-[#FFE600] drop-shadow">
                  {post.highlightText}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <h4 className="text-xs font-semibold text-zinc-200 line-clamp-2 leading-relaxed">
                  {post.title}
                </h4>

                <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-4 gap-1 text-center text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Likes</span>
                    <span className="font-bold text-white text-xs">{post.likes}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Coment.</span>
                    <span className="font-bold text-white text-xs">{post.comments}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Shares</span>
                    <span className="font-bold text-[#FFE600] text-xs">{post.shares}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Saves</span>
                    <span className="font-bold text-amber-400 text-xs">{post.saves}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Calendar / Planejamento Semanal da LOBBY */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#FFE600]" />
          <h3 className="font-bold text-white text-base">Cronograma Semanal de Conteúdo & Cobertura</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          
          <div className="bg-zinc-950 p-3.5 rounded-lg border border-zinc-800">
            <span className="text-[11px] font-bold text-[#FFE600] uppercase block mb-1">Quarta-Feira</span>
            <h5 className="font-bold text-white text-xs mb-1">Teaser & Atmosfera</h5>
            <p className="text-[11px] text-zinc-400">Post de aquecimento com foco nos drinks autorais e conceito acústico.</p>
          </div>

          <div className="bg-zinc-950 p-3.5 rounded-lg border border-zinc-800">
            <span className="text-[11px] font-bold text-[#FFE600] uppercase block mb-1">Quinta-Feira</span>
            <h5 className="font-bold text-white text-xs mb-1">Divulgação de Line-up</h5>
            <p className="text-[11px] text-zinc-400">Reels oficial dos DJs de sexta e sábado + chamada de Lote Sympla.</p>
          </div>

          <div className="bg-zinc-950 p-3.5 rounded-lg border border-[#FFE600]/40 yellow-glow-sm">
            <span className="text-[11px] font-bold text-[#FFE600] uppercase block mb-1">Sexta-Feira</span>
            <h5 className="font-bold text-white text-xs mb-1">Noite 1: Abertura 20h</h5>
            <p className="text-[11px] text-zinc-400">Stories em tempo real, pista cheia, coquetelaria e aviso de últimos ingressos.</p>
          </div>

          <div className="bg-zinc-950 p-3.5 rounded-lg border border-[#FFE600]/40 yellow-glow-sm">
            <span className="text-[11px] font-bold text-[#FFE600] uppercase block mb-1">Sábado</span>
            <h5 className="font-bold text-white text-xs mb-1">Noite 2: Clímax Som</h5>
            <p className="text-[11px] text-zinc-400">Cobertura de videomaker, camarotes VIP, interação com o público.</p>
          </div>

          <div className="bg-zinc-950 p-3.5 rounded-lg border border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-400 uppercase block mb-1">Segunda-Feira</span>
            <h5 className="font-bold text-white text-xs mb-1">Recap & Galeria</h5>
            <p className="text-[11px] text-zinc-400">Carrossel de fotos das noites e agradecimento ao público de Brasília.</p>
          </div>

        </div>
      </div>

    </div>
  );
};
