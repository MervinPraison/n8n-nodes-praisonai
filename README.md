# n8n-nodes-praisonai

This is an n8n community node for [PraisonAI](https://docs.praison.ai). It lets you run AI agents with PraisonAI directly from your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[PraisonAI](https://docs.praison.ai) is an AI agents framework that simplifies building and running multi-agent systems.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Quick Install

1. Go to **Settings** > **Community Nodes**
2. Click **Install a community node**
3. Enter `n8n-nodes-praisonai`
4. Click **Install**

## Prerequisites

Before using this node, you need to:

1. **Install PraisonAI**:
   ```bash
   pip install praisonai praisonaiagents
   ```

2. **Create an agents.yaml file**:
   ```yaml
   name: My Workflow
   
   agents:
     researcher:
       name: Researcher
       role: Research Specialist
       goal: Research topics thoroughly
       instructions: You are a research expert.
       llm: gpt-4o-mini
   ```

3. **Start the PraisonAI server**:
   ```bash
   praisonai serve agents.yaml --port 8005
   ```

## Operations

### Run Agent
Execute a specific agent with a query.

### Run Workflow
Execute the entire workflow with all agents sequentially.

### List Agents
Get a list of all available agents from the PraisonAI server.

## Credentials

This node requires PraisonAI API credentials:

| Field | Description |
|-------|-------------|
| **API URL** | URL of your PraisonAI server (default: `http://localhost:8005`) |
| **OpenAI API Key** | Your OpenAI API key (optional if set on server) |

## Usage

### Basic Example

1. Add a **PraisonAI** node to your workflow
2. Configure credentials with your API URL
3. Select operation: **Run Agent** or **Run Workflow**
4. Enter your query
5. Execute the workflow

### Chaining Agents

Connect multiple PraisonAI nodes to create complex workflows:

```
[Trigger] → [PraisonAI: Researcher] → [PraisonAI: Writer] → [PraisonAI: Editor]
```

## Resources

* [PraisonAI Documentation](https://docs.praison.ai)
* [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
* [GitHub Repository](https://github.com/MervinPraison/n8n-nodes-praisonai)

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Lint
npm run lint
```

## License

[MIT](LICENSE)
