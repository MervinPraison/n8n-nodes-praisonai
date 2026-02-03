# Example Workflows

Ready-to-use n8n workflow templates for PraisonAI integration.

## Available Templates

### 1. AI Research Workflow

Simple webhook-triggered research agent.

**File**: `examples/ai-research-workflow.json`

**Use case**: API endpoint for AI-powered research

```
┌─────────────┐
│   Webhook   │  POST /research
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  PraisonAI  │  Run Researcher Agent
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Respond   │  Return research results
└─────────────┘
```

### 2. Multi-Agent Content Pipeline

Chain multiple agents: Researcher → Writer → Editor

**File**: `examples/multi-agent-content-pipeline.json`

**Use case**: Automated content creation pipeline

```
┌─────────────┐
│   Trigger   │  Webhook or Schedule
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Researcher  │  Gather information
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Writer    │  Create draft
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Editor    │  Polish content
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Save     │  Store in CMS/Database
└─────────────┘
```

### 3. Slack AI Assistant

Slack bot powered by PraisonAI agents.

**File**: `examples/slack-ai-assistant.json`

**Use case**: AI assistant in Slack channels

```
┌─────────────┐
│Slack Trigger│  @mention or keyword
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  PraisonAI  │  Process query
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Slack Reply  │  Send response
└─────────────┘
```

## Importing Workflows

1. Copy the JSON from the example file
2. In n8n, press `Ctrl+V` on the canvas
3. Configure PraisonAI credentials
4. Customize as needed

## Customization Tips

- **Change Models**: Update `llm` in agents.yaml
- **Add Agents**: Define new agents in agents.yaml
- **Modify Prompts**: Adjust agent instructions
- **Chain Operations**: Connect multiple PraisonAI nodes
