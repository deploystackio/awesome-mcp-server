---
repo: "https://github.com/OctagonAI/octagon-mcp-server"
category: "analyze"
logo: 
---

# MCP Server Configuration

```json
{
  "mcpServers": {
    "octagon-mcp-server": {
      "command": "npx",
      "args": ["-y", "octagon-mcp@latest"],
      "env": {
        "OCTAGON_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```
