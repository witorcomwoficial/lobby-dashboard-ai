import { ClientProfile, AdCampaign, AdsOverallMetrics, InstagramMetric, InstagramPost, Task } from '../types/dashboard';

export const initialClientProfile: ClientProfile = {
  handle: 'listenlobby',
  name: 'LOBBY',
  tagline: 'Acusticamente desenhada para conectar pessoas e música.',
  subtitle: 'Hi-Fi sound • Brasília, DF',
  verified: true,
  postsCount: 353,
  followersCount: '30,2 mil',
  bioLines: [
    'Acusticamente desenhada para celebrar a música e coquetelaria autoral.',
    'Sextas e sábados, a partir das 20h.',
    'Vendas oficiais na @sympla.',
    'SCS Quadra 5 Ed. Amazonas, Brasília - DF',
    'linktr.ee/listenlobby'
  ],
  location: 'SCS Quadra 5 Ed. Amazonas, Brasília - DF',
  businessHours: 'Sextas e Sábados das 20h às 04h',
  ticketingPartner: 'Sympla Eventos',
  ticketLink: 'https://sympla.com.br/lobby',
  linktree: 'https://linktr.ee/listenlobby',
  highlights: [
    {
      id: 'hl-1',
      title: 'reservas',
      icon: 'sparkles',
      description: 'Mesas, camarotes e aniversários via WhatsApp oficial.'
    },
    {
      id: 'hl-2',
      title: 'comida',
      icon: 'utensils',
      description: 'Gastronomia contemporânea e finger foods autorais.'
    },
    {
      id: 'hl-3',
      title: 'bebida',
      icon: 'wine',
      description: 'Carta de drinks autorais assinada por mixologistas premiados.'
    }
  ],
  brandColors: {
    primary: '#FFE600', // Electric Brand Yellow
    secondary: '#E5CE00',
    accent: '#FFF066',
    dark: '#080809'
  },
  keyNotes: [
    'Conceito Hi-Fi sound com acústica tratada e isolamento de alta precisão.',
    'Público-alvo primordial: 22 a 40 anos, público classe A/B de Brasília, entusiastas de boa acústica, house/techno melódico, brasilidades e coquetelaria.',
    'Meta principal: Acelerar vendas de 1º e 2º lote no Sympla com antecedência (até quinta-feira) e esgotar reservas de lounges.'
  ]
};

export const initialTasks: Task[] = [
  // COISAS FEITAS
  {
    id: 'task-1',
    title: 'Instalação e Validação da API de Conversões Meta no Sympla',
    description: 'Configuração do Pixel Meta e API de Conversões para rastreamento de compras de ingressos e início de checkout com deduping.',
    category: 'trafego_ads',
    status: 'feito',
    priority: 'urgente',
    dueDate: '2026-09-12',
    completedAt: '2026-09-11',
    assignee: 'Equipe de Tráfego',
    deliverableUrl: 'https://business.facebook.com/events_manager',
    notes: 'Evento Purchase disparando perfeitamente com 9.4/10 de qualidade de correspondência de evento.',
    approvedByClient: true
  },
  {
    id: 'task-2',
    title: 'Lançamento da Campanha de Tráfego: Fim de Semana Acoustic Beats',
    description: 'Segmentação regional para Plano Piloto, Asa Sul, Asa Norte e Lago Sul (raio 15km) promovendo a line-up de sexta e sábado.',
    category: 'trafego_ads',
    status: 'feito',
    priority: 'alta',
    dueDate: '2026-09-18',
    completedAt: '2026-09-17',
    assignee: 'Gestor de Ads',
    deliverableUrl: 'https://adsmanager.facebook.com',
    notes: 'Campanha gerou 342 cliques para o Sympla com CPC de R$ 0,58.',
    approvedByClient: true
  },
  {
    id: 'task-3',
    title: 'Novo Padrão Visual dos Destaques do Instagram (Amarelo & Preto)',
    description: 'Criação e padronização dos ícones caligráficos dos destaques (Reservas, Comida, Bebida) com a identidade LOBBY.',
    category: 'design_criacao',
    status: 'feito',
    priority: 'alta',
    dueDate: '2026-09-15',
    completedAt: '2026-09-14',
    assignee: 'Designer Gráfico',
    deliverableUrl: 'https://instagram.com/listenlobby',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
    notes: 'Capas implementadas e validadas diretamente no perfil @listenlobby.',
    approvedByClient: true
  },
  {
    id: 'task-4',
    title: 'Edição de 4 Vídeos Reels com Áudio em Alta para DJs Convidados',
    description: 'Edição dinâmica de vídeos verticais (9:16) no formato club dark + amarelo para divulgação do line-up de setembro.',
    category: 'social_media',
    status: 'feito',
    priority: 'media',
    dueDate: '2026-09-22',
    completedAt: '2026-09-21',
    assignee: 'Editor de Vídeo',
    deliverableUrl: 'https://instagram.com/listenlobby',
    notes: 'Os reels alcançaram mais de 42.000 visualizações orgânicas somadas.',
    approvedByClient: true
  },
  {
    id: 'task-5',
    title: 'Estratégia de Retargeting para Visitantes do Linktree & Sympla',
    description: 'Criação de público personalizado de quem visitou linktr.ee/listenlobby e página do Sympla nos últimos 30 dias para oferta de virada de lote.',
    category: 'trafego_ads',
    status: 'feito',
    priority: 'alta',
    dueDate: '2026-09-24',
    completedAt: '2026-09-23',
    assignee: 'Gestor de Ads',
    notes: 'ROAS registrado de 4.8x nas compras de ingressos de última hora.',
    approvedByClient: true
  },

  // COISAS EM ANDAMENTO
  {
    id: 'task-6',
    title: 'Campanha de Virada de Lote: Noite de Sexta-Feira Especial',
    description: 'Anúncios nos Stories e Feed com contagem regressiva para encerramento do Lote Promocional no Sympla.',
    category: 'trafego_ads',
    status: 'em_andamento',
    priority: 'urgente',
    dueDate: '2026-10-02',
    assignee: 'Gestor de Ads',
    notes: 'Criativos em teste A/B entre vídeo de pista e card gráfico com line-up.',
    approvedByClient: true
  },
  {
    id: 'task-7',
    title: 'Cobertura em Tempo Real para Stories de Sexta & Sábado',
    description: 'Planejamento e alinhamento com filmmaker local para captação de drinks, atmosfera acústica e pista cheia.',
    category: 'social_media',
    status: 'em_andamento',
    priority: 'alta',
    dueDate: '2026-10-03',
    assignee: 'Social Media & Filmmaker',
    notes: 'Briefing enviado para o videomaker da noite.',
    approvedByClient: false
  },
  {
    id: 'task-8',
    title: 'Cardápio Digital Interativo de Drinks & Finger Foods',
    description: 'Design de landing page rápida e QR code para as mesas com fotos profissionais dos drinks autorais da casa.',
    category: 'design_criacao',
    status: 'em_andamento',
    priority: 'media',
    dueDate: '2026-10-06',
    assignee: 'UI Designer',
    deliverableUrl: 'https://linktr.ee/listenlobby',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop',
    notes: 'Aguardando aprovação final das fotos dos novos coquetéis.',
    approvedByClient: false
  },

  // COISAS PENDENTES / A FAZER
  {
    id: 'task-9',
    title: 'Campanha de Tráfego no Google Ads (Busca: Bares e Baladas em Brasília)',
    description: 'Ativação de rede de pesquisa para capturar buscas por "balada brasília", "lounge scs", "bares com dj brasília".',
    category: 'trafego_ads',
    status: 'pendente',
    priority: 'alta',
    dueDate: '2026-10-10',
    assignee: 'Gestor de Tráfego',
    notes: 'Palavras-chave já mineradas com volume mensal de 14.500 pesquisas.',
    approvedByClient: false
  },
  {
    id: 'task-10',
    title: 'Estratégia de Parceria com Micro-Influenciadores de Brasília',
    description: 'Mapeamento de 8 criadores de conteúdo com sinergia com música eletrônica, moda e gastronomia em Brasília para guestlist.',
    category: 'social_media',
    status: 'pendente',
    priority: 'media',
    dueDate: '2026-10-12',
    assignee: 'Relações Públicas',
    notes: 'Lista preliminar com engajamentos superiores a 5% em validação.',
    approvedByClient: false
  },
  {
    id: 'task-11',
    title: 'Fluxo Automático de Confirmação de Reservas no WhatsApp',
    description: 'Configuração de chatbot amigável para direcionar clientes de reserva de mesa com mapa do salão e termos de consumo.',
    category: 'estrategia',
    status: 'pendente',
    priority: 'alta',
    dueDate: '2026-10-15',
    assignee: 'Tech & Automação',
    notes: 'Integração com linktr.ee/listenlobby e WhatsApp Business API.',
    approvedByClient: false
  },
  {
    id: 'task-12',
    title: 'Produção do Teaser Oficial da Temporada de Primavera/Verão',
    description: 'Vídeo institucional com foco no design acústico exclusivo do espaço arquitetônico no SCS.',
    category: 'design_criacao',
    status: 'pendente',
    priority: 'media',
    dueDate: '2026-10-20',
    assignee: 'Produtora de Vídeo',
    notes: 'Gravação agendada para quarta-feira pré-abertura.',
    approvedByClient: false
  }
];

export const initialCampaigns: AdCampaign[] = [
  {
    id: 'camp-1',
    name: '[CONVERSÃO SYMPLA] Sexta-Feira Lobby Experience - Lote 1 e 2',
    platform: 'Meta Ads (Instagram)',
    period: '20 Set - 28 Set 2026',
    budget: 1800,
    spent: 1540.50,
    reach: 48920,
    impressions: 76400,
    clicks: 1420,
    conversions: 184,
    cpc: 1.08,
    cpm: 20.16,
    ctr: 1.86,
    cpa: 8.37,
    roas: 6.8,
    status: 'ativa',
    targetAudience: 'Brasília + 20km | 22-38 anos | Interesses: Música Eletrônica, Coquetelaria, Nightlife, Sympla',
    creativeUrl: 'https://instagram.com/p/reel-draft-1',
    notes: 'Criativo em vídeo Reels com DJ set teve a melhor conversão de vendas diretas.'
  },
  {
    id: 'camp-2',
    name: '[LEADS WHATSAPP] Reserva de Mesas & Camarotes Exclusivos',
    platform: 'Meta Ads (Instagram)',
    period: '15 Set - 29 Set 2026',
    budget: 900,
    spent: 780.00,
    reach: 24150,
    impressions: 38200,
    clicks: 610,
    conversions: 52,
    cpc: 1.28,
    cpm: 20.42,
    ctr: 1.60,
    cpa: 15.00,
    roas: 11.2,
    status: 'ativa',
    targetAudience: 'Brasília (Lago Sul, Asa Sul, Sudoeste) | 25-45 anos | Alto Poder Aquisitivo',
    notes: 'Anúncio em formato Carrossel mostrando a acústica e conforto dos sofás do lounge.'
  },
  {
    id: 'camp-3',
    name: '[RETARGETING] Visitantes do Perfil @listenlobby & Linktree',
    platform: 'Meta Retargeting',
    period: '01 Set - 25 Set 2026',
    budget: 650,
    spent: 615.20,
    reach: 18700,
    impressions: 42100,
    clicks: 890,
    conversions: 96,
    cpc: 0.69,
    cpm: 14.61,
    ctr: 2.11,
    cpa: 6.41,
    roas: 8.4,
    status: 'ativa',
    targetAudience: 'Engajamento no Instagram nos últimos 60 dias + Acessos ao Linktree',
    notes: 'Público quente com altíssima taxa de conversão em compras de ingressos no Sympla.'
  },
  {
    id: 'camp-4',
    name: '[ALCANCE LOCAL] Sexta Acústica no SCS Brasília',
    platform: 'Meta Ads (Instagram)',
    period: '08 Set - 14 Set 2026',
    budget: 500,
    spent: 495.80,
    reach: 36400,
    impressions: 51200,
    clicks: 720,
    conversions: 41,
    cpc: 0.68,
    cpm: 9.68,
    ctr: 1.41,
    cpa: 12.09,
    roas: 4.5,
    status: 'finalizada',
    targetAudience: 'Asa Sul, Asa Norte, Setor Comercial Sul raio 5km | Sexta à tarde e noite',
    notes: 'Gerou grande conhecimento da nova casa no centro de Brasília.'
  }
];

export const initialAdsOverall: AdsOverallMetrics = {
  totalSpent: 3431.50,
  totalConversions: 373,
  totalClicks: 3640,
  totalReach: 128170,
  totalImpressions: 207900,
  avgCpc: 0.94,
  avgCtr: 1.75,
  roas: 7.2,
  symplaRevenueEstimated: 24700.00,
  periodLabel: 'Mês de Setembro 2026'
};

export const initialInstagramMetric: InstagramMetric = {
  followers: 30200,
  followersGrowth: 1420,
  accountsReached: 184500,
  reachGrowth: 28.4,
  engagementRate: 4.8,
  totalPosts: 353,
  averageStoryViews: 3850,
  profileVisits: 14200,
  websiteClicks: 4120
};

export const initialInstagramPosts: InstagramPost[] = [
  {
    id: 'ig-1',
    type: 'reel',
    title: 'Acústica de precisão & graves aveludados na noite de sábado',
    publishedDate: '27 Set 2026',
    likes: 2140,
    comments: 118,
    shares: 480,
    saves: 312,
    reach: 38900,
    thumbnailColor: '#FFE600',
    highlightText: 'REEL EM ALTA (38.9k alcance)',
    url: 'https://instagram.com/listenlobby'
  },
  {
    id: 'ig-2',
    type: 'post',
    title: 'Carta de Coquetelaria Autoral: Nova safra de drinks autorais',
    publishedDate: '24 Set 2026',
    likes: 1480,
    comments: 64,
    shares: 195,
    saves: 420,
    reach: 22400,
    thumbnailColor: '#1a1a1a',
    highlightText: 'ALTO SALVAMENTO (420 saves)',
    url: 'https://instagram.com/listenlobby'
  },
  {
    id: 'ig-3',
    type: 'reel',
    title: 'Line-up da semana revelado: Sextas e sábados a partir das 20h',
    publishedDate: '22 Set 2026',
    likes: 1890,
    comments: 92,
    shares: 330,
    saves: 240,
    reach: 31200,
    thumbnailColor: '#F59E0B',
    highlightText: 'CONVERSÃO DE INGRESSOS',
    url: 'https://instagram.com/listenlobby'
  },
  {
    id: 'ig-4',
    type: 'carrossel',
    title: 'A atmosfera de quem vive a LOBBY: Galeria da última sexta',
    publishedDate: '19 Set 2026',
    likes: 2650,
    comments: 145,
    shares: 510,
    saves: 180,
    reach: 41200,
    thumbnailColor: '#121214',
    highlightText: 'TOP ENGAJAMENTO (2.6k likes)',
    url: 'https://instagram.com/listenlobby'
  }
];
