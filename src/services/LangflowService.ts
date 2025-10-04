interface LangflowMessage {
  message: string;
  session_id?: string;
  input_value?: string;
  output_type?: string;
  tweaks?: Record<string, any>;
}

interface LangflowResponse {
  data: {
    outputs: {
      [key: string]: {
        results: {
          message: {
            content: string;
            type: string;
          };
        }[];
      };
    };
  };
  session_id: string;
}

class LangflowService {
  private baseUrl: string | null = null;
  private apiKey: string | null = null;
  private sessionId: string | null = null;

  constructor() {
    // Configurações padrão - podem ser sobrescritas
    this.baseUrl = import.meta.env.VITE_LANGFLOW_BASE_URL || null;
    this.apiKey = import.meta.env.VITE_LANGFLOW_API_KEY || null;
  }

  setConfig(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async sendMessage(message: string, sessionId?: string): Promise<string> {
    if (!this.baseUrl || !this.apiKey) {
      throw new Error('Langflow não configurado. Configure a URL base e a chave da API.');
    }

    const payload: LangflowMessage = {
      message: message,
      session_id: sessionId || this.sessionId || undefined,
      input_value: message,
      output_type: 'chat',
      tweaks: {}
    };

    try {
      const response = await fetch(`${this.baseUrl}/api/v1/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Erro na API Langflow: ${response.status} - ${errorData.detail || 'Erro desconhecido'}`);
      }

      const data: LangflowResponse = await response.json();
      
      // Salvar session_id para manter contexto
      if (data.session_id) {
        this.sessionId = data.session_id;
      }

      // Extrair resposta do output
      const outputs = data.data?.outputs;
      if (outputs) {
        // Procurar por qualquer output que contenha uma mensagem
        for (const outputKey in outputs) {
          const output = outputs[outputKey];
          if (output.results && output.results.length > 0) {
            const result = output.results[0];
            if (result.message && result.message.content) {
              return result.message.content;
            }
          }
        }
      }

      return 'Desculpe, não consegui processar sua mensagem.';
    } catch (error) {
      console.error('Erro ao enviar mensagem para Langflow:', error);
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    if (!this.baseUrl || !this.apiKey) {
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/v1/health`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json'
        }
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao testar conexão com Langflow:', error);
      return false;
    }
  }

  isConfigured(): boolean {
    return this.baseUrl !== null && this.apiKey !== null;
  }

  getConfig() {
    return {
      baseUrl: this.baseUrl,
      hasApiKey: this.apiKey !== null
    };
  }

  clearSession() {
    this.sessionId = null;
  }
}

export const langflowService = new LangflowService();
