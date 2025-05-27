---
repo: "https://github.com/djalal/quran-mcp-server"
category: "OpenAPI"
language: "node"
start_command: "npm run build"
build_command: "npm run start"
---

# MCP Server Configuration

```json
{
  "mcpServers": {
    "quran-api": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "--init", "-e", "API_KEY=your_api_key_if_needed", "-e", "VERBOSE_MODE=true", "quran-mcp-server"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```
