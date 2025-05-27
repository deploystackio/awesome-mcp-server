---
repo: "https://github.com/mikechao/metmuseum-mcp"
category: "Museum"
language: "node" # i.e.: node
start_command: "npm run start" # i.e.: npm run start
build_command: "npm run build" # i.e.: npm run build
---

# MCP Server Configuration

```json
{
"mcpServers": {
  "mcp-servers": {
    "met-museum": {
      "command": "npx",
      "args": [
        "-y",
        "metmuseum-mcp"
      ]
    }
  }
}
}
```
