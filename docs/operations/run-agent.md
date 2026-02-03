# Run Agent

Execute a specific PraisonAI agent with a query.

## Overview

The Run Agent operation allows you to execute a single agent from your agents.yaml configuration with a specific query.

## Configuration

| Field | Required | Description |
|-------|----------|-------------|
| **Agent Name** | ✅ | Name of the agent to run (e.g., "researcher") |
| **Query** | ✅ | The query or task for the agent |

## Example

### agents.yaml

```yaml
name: Research Workflow

agents:
  researcher:
    name: Researcher
    role: Research Specialist
    goal: Research topics thoroughly
    instructions: You are a research expert.
    llm: gpt-4o-mini
```

### n8n Configuration

1. Add **PraisonAI** node
2. Select operation: **Run Agent**
3. Agent Name: `researcher`
4. Query: `Research the latest AI developments in 2025`

### Output

```json
{
  "result": "The latest AI developments in 2025 include...",
  "agent": "researcher",
  "execution_time": 3.5
}
```

## Use Cases

- **Research Tasks**: Have an AI researcher gather information
- **Content Generation**: Generate specific types of content
- **Data Analysis**: Analyze data with a specialized agent
- **Question Answering**: Get expert answers from domain-specific agents

## Tips

1. **Be Specific**: Clear queries get better results
2. **Match Agent Role**: Use agents for their designed purpose
3. **Chain Agents**: Connect multiple Run Agent nodes for complex workflows
