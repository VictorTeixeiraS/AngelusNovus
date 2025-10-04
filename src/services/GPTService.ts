interface GPTMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GPTResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

class GPTService {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor() {
    // A chave da API deve ser configurada via variável de ambiente
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(message: string, conversationHistory: GPTMessage[] = []): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Chave da API do OpenAI não configurada. Por favor, configure a variável VITE_OPENAI_API_KEY.');
    }

    const messages: GPTMessage[] = [
      {
        role: 'system',
        content: 'Você é um assistente virtual amigável e prestativo. Responda de forma concisa e útil. Seja sempre educado e profissional.'
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message
      }
    ];

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro na API: ${errorData.error?.message || 'Erro desconhecido'}`);
      }

      const data: GPTResponse = await response.json();
      return data.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.';
    } catch (error) {
      console.error('Erro ao enviar mensagem para GPT:', error);
      throw error;
    }
  }

  isConfigured(): boolean {
    return this.apiKey !== null;
  }
}

export const gptService = new GPTService();
