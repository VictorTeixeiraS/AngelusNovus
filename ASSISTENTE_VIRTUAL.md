# Assistente Virtual com Langflow

Este projeto inclui um assistente virtual animado que aparece no canto da tela e permite interação via chat com integração ao Langflow.

## Funcionalidades

- **Personagem Animado**: Personagem pixel art que habita o canto inferior direito da tela
- **Animações GSAP**: Animações suaves de entrada, flutuação e interação
- **Chat Interativo**: Interface de chat que se abre ao clicar no personagem
- **Integração Langflow**: Conecta com seu flow personalizado do Langflow
- **Configuração Segura**: URL e chave da API armazenadas localmente
- **Status de Conexão**: Indicador visual do status da conexão com Langflow

## Como Configurar

### 1. Configurar Langflow

1. Instale e configure o Langflow em sua máquina ou servidor
2. Inicie o Langflow (geralmente em `http://localhost:7860`)
3. Crie ou importe seu flow personalizado
4. Obtenha a chave da API do Langflow

### 2. Configurar no Projeto

#### Opção 1: Variáveis de Ambiente (Recomendado)

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_LANGFLOW_BASE_URL=http://localhost:7860
VITE_LANGFLOW_API_KEY=sua-chave-da-api-aqui
VITE_LANGFLOW_FLOW_ID=seu-flow-id-aqui
```

#### Opção 2: Teste de Conexão

1. Clique no personagem para abrir o chat
2. Use o botão de teste de conexão (ícone WiFi) para verificar se está funcionando
3. O status da conexão será exibido no header do chat

## Como Usar

1. O personagem aparece automaticamente no canto inferior direito
2. Clique no personagem para abrir o chat
3. Configure o Langflow se ainda não foi feito
4. Digite sua mensagem e pressione Enter ou clique no botão de enviar
5. O assistente responderá usando seu flow personalizado do Langflow
6. Monitore o status da conexão através dos indicadores visuais no header

## Animações

- **Entrada**: O personagem aparece com animação de escala e movimento
- **Flutuação**: Movimento suave para cima e para baixo
- **Clique**: Animação de escala ao clicar
- **Aproximação**: O personagem se aproxima ao abrir o chat
- **Chat**: Animação de deslizamento da direita para a esquerda

## Estrutura dos Arquivos

```
src/
├── components/
│   ├── Character.tsx          # Componente do personagem pixel art
│   ├── Chat.tsx              # Interface do chat
│   └── VirtualAssistant.tsx  # Componente principal que combina personagem e chat
├── services/
│   ├── LangflowService.ts    # Serviço de integração com Langflow
│   └── GPTService.ts         # Serviço de integração com OpenAI (legado)
└── App.tsx                   # Integração no app principal
```

## Personalização

### Cores do Personagem

As cores podem ser alteradas no arquivo `Character.tsx`:

- **Fundo**: `#2C2C2C` (cinza escuro)
- **Pele**: `#E0B48C` (bege claro)
- **Roupa**: `#6B3E26` (marrom escuro)
- **Chapéu**: `#E8D19C` (amarelo claro)

### Animações

As animações podem ser personalizadas no arquivo `Character.tsx` e `Chat.tsx` usando GSAP.

## Segurança

- A URL e chave da API são armazenadas apenas localmente no navegador
- Não são enviadas para servidores externos além do seu Langflow
- Use apenas em ambientes seguros e confiáveis
- Certifique-se de que seu Langflow está configurado com segurança adequada

## Dependências

- `gsap`: Para animações
- `@tanstack/react-query`: Para gerenciamento de estado
- `lucide-react`: Para ícones
- `@radix-ui/*`: Para componentes de UI
