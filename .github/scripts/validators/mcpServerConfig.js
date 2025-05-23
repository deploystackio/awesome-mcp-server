/**
 * Validates the MCP server configuration in the markdown file
 * @param {string} fileContent - Content of the file to validate
 * @param {string} filePath - Path to the file (for error messages)
 * @returns {string|null} Error message or null if valid
 */
function validateMcpServerConfig(fileContent, filePath) {
  // Check for MCP server configuration in a code block
  const mcpConfigRegex = /```json\s+({[\s\S]+?})\s*```/s;
  const mcpConfigMatch = fileContent.match(mcpConfigRegex);
  
  if (!mcpConfigMatch) {
    return `No MCP server configuration found in a JSON code block in ${filePath}`;
  }
  
  try {
    // Parse the JSON to validate its structure
    const mcpConfig = JSON.parse(mcpConfigMatch[1].trim());
    
    // Basic validation of MCP server configuration
    if (!mcpConfig.mcpServers || typeof mcpConfig.mcpServers !== 'object') {
      return `Invalid MCP server configuration in ${filePath}. Missing "mcpServers" object.`;
    }
    
    // Check if there's at least one server defined
    const serverNames = Object.keys(mcpConfig.mcpServers);
    if (serverNames.length === 0) {
      return `MCP server configuration in ${filePath} does not define any servers.`;
    }
    
    // Validate each server configuration
    for (const serverName of serverNames) {
      const server = mcpConfig.mcpServers[serverName];
      
      // Check for required fields
      if (!server.command) {
        return `Server "${serverName}" in ${filePath} is missing required "command" field.`;
      }
      
      // args should be an array if present
      if (server.args && !Array.isArray(server.args)) {
        return `Server "${serverName}" in ${filePath} has "args" that is not an array.`;
      }
      
      // env should be an object if present
      if (server.env && typeof server.env !== 'object') {
        return `Server "${serverName}" in ${filePath} has "env" that is not an object.`;
      }
    }
    
    return null; // No errors
  } catch (error) {
    return `Error parsing MCP server configuration in ${filePath}: ${error.message}`;
  }
}

module.exports = { validateMcpServerConfig };
