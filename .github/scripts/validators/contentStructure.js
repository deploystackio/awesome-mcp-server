// validators/contentStructure.js
/**
 * Validates the structure of the markdown content
 * @param {string} fileContent - Content of the file to validate
 * @param {string} filePath - Path to the file (for error messages)
 * @returns {string|null} Error message or null if valid
 */
function validateContentStructure(fileContent, filePath) {
  // Check if file is empty
  if (!fileContent.trim()) {
    return `File ${filePath} is empty`;
  }
  
  // Remove front matter for content checks
  const contentWithoutFrontMatter = fileContent.replace(/^---\n[\s\S]*?\n---/, '').trim();
  
  // Check for MCP server name (H1 heading)
  const h1Match = contentWithoutFrontMatter.match(/^#\s+(.+)$/m);
  if (!h1Match) {
    return `Missing MCP server name (H1 heading) in ${filePath}`;
  }
  
  // Check for MCP Server Configuration section - It can be either "# MCP Server Configuration" or "## MCP Server Configuration"
  if (!contentWithoutFrontMatter.includes('# MCP Server Configuration') && 
      !contentWithoutFrontMatter.includes('## MCP Server Configuration')) {
    return `Missing "MCP Server Configuration" section in ${filePath}`;
  }
  
  // Description is optional based on the CONTRIBUTING.md guidelines
  
  return null; // No errors
}

module.exports = { validateContentStructure };
