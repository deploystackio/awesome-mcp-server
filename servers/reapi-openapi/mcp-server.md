---
repo: "https://github.com/ReAPI-com/mcp-openapi"
category: "API"
language: "TypeScript" # i.e.: node
logo: "https://avatars.githubusercontent.com/u/155924573?s=200&v=4" # optional
---

# MCP Server Configuration

```json
{
  "mcpServers": {
    "@reapi/mcp-openapi": {
      "command": "npx",
      "args": ["-y", "@reapi/mcp-openapi@latest", "--dir", "./specs"],
      "env": {}
    }
  }
}
```
