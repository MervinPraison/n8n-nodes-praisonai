# Run Workflow

Execute the entire PraisonAI workflow with all agents sequentially.

## Overview

The Run Workflow operation executes all agents in your agents.yaml file in sequence, passing context between them automatically.

## Configuration

| Field | Required | Description |
|-------|----------|-------------|
| **Query** | ✅ | The initial query or task for the workflow |

## Example

### agents.yaml

```yaml
name: Content Pipeline

agents:
  researcher:
    name: Researcher
    role: Research Specialist
    goal: Research topics thoroughly
    instructions: You are a research expert.
    llm: gpt-4o-mini
  
  writer:
    name: Writer
    role: Content Writer
    goal: Write engaging content
    instructions: You create compelling content.
    llm: gpt-4o-mini
  
  editor:
    name: Editor
    role: Content Editor
    goal: Polish and improve content
    instructions: You refine and perfect content.
    llm: gpt-4o-mini
```

### n8n Configuration

1. Add **PraisonAI** node
2. Select operation: **Run Workflow**
3. Query: `Write a blog post about AI in healthcare`

### Execution Flow

```
┌─────────────┐
│   Query     │  "Write a blog post about AI in healthcare"
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Researcher  │  Researches AI healthcare topics
└──────┬──────┘
       │ (passes research to next agent)
       ▼
┌─────────────┐
│   Writer    │  Writes blog post using research
└──────┬──────┘
       │ (passes draft to next agent)
       ▼
┌─────────────┐
│   Editor    │  Polishes and finalizes post
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Result    │  Final edited blog post
└─────────────┘
```

### Output

```json
{
  "result": "# AI in Healthcare: Transforming Patient Care\n\n...",
  "workflow": "Content Pipeline",
  "agents_executed": ["researcher", "writer", "editor"],
  "execution_time": 15.2
}
```

## Use Cases

- **Content Pipelines**: Research → Write → Edit
- **Data Processing**: Collect → Analyze → Report
- **Decision Making**: Research → Evaluate → Recommend
- **Customer Service**: Understand → Respond → Follow-up
