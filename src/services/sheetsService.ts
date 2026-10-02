import { 
  ClientProfile, 
  Task, 
  AdCampaign, 
  AdsOverallMetrics, 
  InstagramMetric, 
  InstagramPost 
} from '../types/dashboard';

export const GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxQUoMTTiOK8kYRfbbfo1KXJTXRZNXEQMlWt6gcDlMcjZEq_rCgetK6ouCZPoyoYuMJ/exec';

export interface DashboardSyncData {
  clientProfile: ClientProfile;
  tasks: Task[];
  campaigns: AdCampaign[];
  adsOverall: AdsOverallMetrics;
  instagramMetric: InstagramMetric;
  instagramPosts: InstagramPost[];
  updatedAt?: string;
  source?: string;
}

export type SyncState = 'synced' | 'syncing' | 'error' | 'idle';

/**
 * Carrega os dados persistidos no Google Sheets via requisição GET.
 */
export async function fetchDashboardFromSheets(): Promise<Partial<DashboardSyncData> | null> {
  try {
    const response = await fetch(GOOGLE_SHEETS_ENDPOINT, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`[Google Sheets] Erro HTTP ao consultar endpoint GET: ${response.status}`);
      return null;
    }

    const text = await response.text();
    if (!text || text.trim() === '') {
      return null;
    }

    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.warn('[Google Sheets] Resposta do GET não é um JSON válido:', text.substring(0, 100));
      return null;
    }

    // Se o retorno for um array vazio [] (como na criação inicial da planilha)
    if (Array.isArray(parsed) && parsed.length === 0) {
      console.log('[Google Sheets] Planilha conectada, mas vazia ([]). Pronto para primeiro salvamento.');
      return null;
    }

    // Se vier embrulhado em { data: { ... } } ou { status: 'success', data: { ... } }
    const dataObj = parsed.data || parsed;

    if (typeof dataObj === 'object' && dataObj !== null) {
      if (Array.isArray(dataObj)) {
        return {
          tasks: dataObj as Task[]
        };
      }

      return {
        clientProfile: dataObj.clientProfile,
        tasks: Array.isArray(dataObj.tasks) ? dataObj.tasks : undefined,
        campaigns: Array.isArray(dataObj.campaigns) ? dataObj.campaigns : undefined,
        adsOverall: dataObj.adsOverall,
        instagramMetric: dataObj.instagramMetric,
        instagramPosts: Array.isArray(dataObj.instagramPosts) ? dataObj.instagramPosts : undefined,
        updatedAt: dataObj.updatedAt
      };
    }

    return null;
  } catch (error) {
    console.error('[Google Sheets] Falha ao buscar dados do Google Sheets:', error);
    return null;
  }
}

/**
 * Salva os dados completos do dashboard no Google Sheets via requisição POST.
 * Utiliza Content-Type text/plain para evitar bloqueios de CORS pré-flight (OPTIONS)
 * típicos do Google Apps Script Web App ao ser chamado de navegadores.
 */
export async function saveDashboardToSheets(
  data: DashboardSyncData
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      action: 'save',
      updatedAt: new Date().toISOString(),
      source: 'LOBBY_IMPACTDASH',
      ...data
    };

    const response = await fetch(GOOGLE_SHEETS_ENDPOINT, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return { 
        success: false, 
        error: `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    const resText = await response.text();
    try {
      const resJson = JSON.parse(resText);
      if (resJson.status === 'error' || resJson.success === false) {
        return { success: false, error: resJson.message || 'Erro reportado pelo Apps Script' };
      }
    } catch {
      // Se não for JSON mas status HTTP 200, entrega confirmada
    }

    return { success: true };
  } catch (error: any) {
    console.warn('[Google Sheets] Erro de conexão ao salvar via POST:', error);
    return { 
      success: false, 
      error: error?.message || 'Falha de rede ao conectar com Google Apps Script' 
    };
  }
}
