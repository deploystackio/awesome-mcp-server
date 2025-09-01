---
repo: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem"
category: "Filesystem"
language: "TypeScript" # i.e.: node
---

# MCP Server Configuration

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Desktop",
        "/path/to/other/allowed/dir"
      ]
    }
  }
}
```
