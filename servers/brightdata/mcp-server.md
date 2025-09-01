---
repo: "https://github.com/brightdata/brightdata-mcp"
category: "Web Scraping"
language: "TypeScript" # i.e.: node
---

# MCP Server Configuration

```json
{
  "mcpServers": {
    "Bright Data": {
      "command": "npx",
      "args": ["@brightdata/mcp"],
      "env": {
        "API_TOKEN": "<insert-your-api-token-here>"
      }
    }
  }
}
```
