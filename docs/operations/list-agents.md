# List Agents

Get a list of all available agents from the PraisonAI server.

## Overview

The List Agents operation retrieves information about all agents defined in your agents.yaml configuration.

## Configuration

No configuration required - just select the operation.

## Output

```json
{
  "agents": [
    {
      "name": "researcher",
      "role": "Research Specialist",
      "goal": "Research topics thoroughly"
    },
    {
      "name": "writer",
      "role": "Content Writer",
      "goal": "Write engaging content"
    },
    {
      "name": "editor",
      "role": "Content Editor",
      "goal": "Polish and improve content"
    }
  ]
}
```

## Use Cases

- **Dynamic Workflows**: Build workflows based on available agents
- **Validation**: Verify agents before execution
- **UI Building**: Populate dropdowns with agent options
- **Documentation**: Auto-generate agent listings

## Example n8n Workflow

```
┌─────────────┐
│   Trigger   │  Webhook or schedule
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ List Agents │  Get all available agents
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Filter    │  Select appropriate agent
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Run Agent  │  Execute with query
└─────────────┘
```
