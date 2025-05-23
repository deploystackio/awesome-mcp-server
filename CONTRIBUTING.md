# Contributing to awesome-mcp-server

Thank you for your interest in contributing to awesome-mcp-server! This project aims to create a curated collection of Model Context Protocol (MCP) servers that can be automatically integrated with DeployStack. By contributing, you're helping developers discover and deploy MCP servers more easily.

## How to Contribute

Contributing an MCP server is straightforward:

1. Fork this repository
2. Create a new directory under the `servers/` directory with your MCP server name (use kebab-case, e.g., `my-awesome-mcp`)
3. Create a `mcp-server.md` file in that directory using our template format
4. Submit a pull request

## MCP Server Format

Each `mcp-server.md` file should follow this structure:

```markdown
---
repo: "https://github.com/username/repository-name"
category: "Database"
logo: "https://example.com/path/to/logo.png"
---

# MCP Server Configuration

```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "npx",
      "args": ["-y", "my-mcp-server@latest"],
      "env": {
        "API_KEY": "YOUR_API_KEY_HERE",
        "CONFIG_PATH": "~/.config/my-mcp-server"
      }
    }
  }
}
```

## Required Information

- **MCP Server Configuration**: The configuration must include the command, arguments, and environment variables needed to run the server.
- **category**: The category under which your MCP server falls (e.g., Database, File System, Productivity, etc.). This field is mandatory, cannot be empty, and must be at least 2 characters long.
- **GitHub Repository URL**: A valid GitHub repository URL where the MCP server code is hosted.

## Optional Information

- **Logo URL**: A URL to your project's logo (must be publicly accessible)

## Validation Requirements

Before submitting your pull request, make sure:

1. Your MCP server configuration is valid and can be executed
2. The MCP server package referenced in your configuration is publicly available
3. Any environment variables are properly documented
4. The configuration follows best practices for MCP servers

## What Happens After Your PR is Merged

Once your pull request is merged:

1. Our automated system will validate your MCP server configuration
2. Your MCP server will be added to the DeployStack catalog ([deploystack.io/mcp](https://deploystack.io/mcp)) and a README in this repository
3. Users will be able to deploy your MCP server with a single click and change the configuration as needed

## Additional Tips

- Include all required environment variables, but use placeholder values like `YOUR_API_KEY_HERE`
- Provide a clear, concise description that explains what your MCP server does
- Test your MCP server configuration locally before submitting
- If your server requires specific setup or configuration, include that information in your submission

## Need Help?

If you have questions or need assistance, please:

1. Open an issue in this repository
2. Describe what you're trying to accomplish
3. Provide as much relevant information as possible
4. You can also visit our [Discord community](https://discord.gg/42Ce3S7b3b) for real-time help
5. You can also reach out to us on [Twitter / X](https://x.com/DeployStack) for quick questions

We'll do our best to help you contribute successfully!

Thank you for helping build the awesome-mcp-server collection!