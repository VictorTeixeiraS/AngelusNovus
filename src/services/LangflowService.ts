// langflowService.ts

// ===== Tipos =====
export interface LangflowRequest {
  input_value: string;
  output_type: string; // "chat" na maioria dos casos
  input_type: string;  // "chat" na maioria dos casos
}

/**
 * O Langflow varia o shape do output entre versões/flows.
 * Tipamos de forma abrangente para não quebrar.
 */
export interface LangflowResponse {
  session_id?: string;
  outputs?: Array<{
    inputs?: unknown;
    // IMPORTANTE: aqui é um ARRAY de saídas de componentes
    outputs?: Array<{
      component_display_name?: string; // p.ex. "Chat Output"
      component_id?: string;

      // Forma 1 (mais antiga/estável):
      outputs?: {
        message?: { message?: string; type?: string };
      };

      // Forma 2 (ex.: seu JSON de exemplo com `results.message.data.text`)
      results?: {
        message?: {
          text_key?: string;
          data?: { text?: string };
        };
        artifacts?: {
          message?: string;
        };
      };

      // Forma 3 (alguns fluxos):
      messages?: Array<{ message?: string; type?: string }>;
    }>;
  }>;
}

/**
 * Extrai texto do Langflow Response cobrindo múltiplas variações.
 * Dá preferência ao componente "Chat Output" quando disponível.
 */
export function extractLangflowText(data: LangflowResponse): string | null {
  if (!data?.outputs?.length) return null;

  for (const outer of data.outputs) {
    const innerList = outer?.outputs ?? [];
    for (const inner of innerList) {
      const isChatOutput = (inner.component_display_name ?? "")
        .toLowerCase()
        .includes("chat");

      // 1) outputs.message.message
      const msg1 = inner?.outputs?.message?.message;
      if (msg1 && (isChatOutput || msg1)) return msg1;

      // 2) results.message.data.text
      const msg2 = inner?.results?.message?.data?.text;
      if (msg2 && (isChatOutput || msg2)) return msg2;

      // 2b) results.artifacts.message
      const msg2b = inner?.results?.artifacts?.message;
      if (msg2b && (isChatOutput || msg2b)) return msg2b;

      // 3) messages[0].message
      const msg3 = inner?.messages?.[0]?.message;
      if (msg3 && (isChatOutput || msg3)) return msg3;
    }
  }
  return null;
}

// ===== Serviço =====
class LangflowService {
  private baseUrl: string | null = null;
  private apiKey: string | null = null;
  private flowId: string | null = null;

  constructor() {
    // Carrega do .env (Vite)
    this.baseUrl = import.meta.env.VITE_LANGFLOW_BASE_URL || null;
    this.apiKey = import.meta.env.VITE_LANGFLOW_API_KEY || null;
    this.flowId  = import.meta.env.VITE_LANGFLOW_FLOW_ID  || null;
  }

  setConfig(baseUrl: string, apiKey: string, flowId: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.flowId = flowId;
  }

  private getFlowRunUrl(): string {
    if (!this.baseUrl || !this.flowId) {
      throw new Error("Langflow não configurado (URL/FlowID ausentes).");
    }
    // Endpoint de execução padrão
    return `${this.baseUrl.replace(/\/+$/, "")}/api/v1/run/${this.flowId}`;
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.baseUrl || !this.apiKey || !this.flowId) {
      throw new Error("Langflow não configurado. Configure a URL base, chave da API e Flow ID.");
    }

    const payload: LangflowRequest = {
      input_value: message,
      output_type: "chat",
      input_type: "chat",
    };

    try {
      const response = await fetch(this.getFlowRunUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Erro na API Langflow: ${response.status} - ${errorData.detail || "Erro desconhecido"}`);
      }

      const data: LangflowResponse = await response.json();
      const text = extractLangflowText(data);
      return text ?? "Desculpe, não consegui processar sua mensagem.";
    } catch (error) {
      console.error("Erro ao enviar mensagem para Langflow:", error);
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    if (!this.baseUrl || !this.apiKey || !this.flowId) {
      return false;
    }

    try {
      const testPayload: LangflowRequest = {
        input_value: "test",
        output_type: "chat",
        input_type: "chat",
      };

      const response = await fetch(this.getFlowRunUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
          "Accept": "application/json",
        },
        body: JSON.stringify(testPayload),
      });

      return response.ok;
    } catch (error) {
      console.error("Erro ao testar conexão com Langflow:", error);
      return false;
    }
  }

  isConfigured(): boolean {
    return this.baseUrl !== null && this.apiKey !== null && this.flowId !== null;
  }

  getConfig() {
    return {
      baseUrl: this.baseUrl,
      hasApiKey: this.apiKey !== null,
      hasFlowId: this.flowId !== null,
    };
  }
}

export const langflowService = new LangflowService();
export default LangflowService;
