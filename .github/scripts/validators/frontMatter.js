const yaml = require('js-yaml');
const axios = require('axios');

/**
 * Validates the front matter of a markdown file
 * @param {string} fileContent - Content of the file to validate
 * @param {string} filePath - Path to the file (for error messages)
 * @returns {Promise<string|null>} Error message or null if valid
 */
async function validateFrontMatter(fileContent, filePath) {
  // Extract front matter
  const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
  const frontMatterMatch = fileContent.match(frontMatterRegex);
  
  if (!frontMatterMatch) {
    return `No front matter found in ${filePath}`;
  }
  
  try {
    // Parse front matter as YAML
    const frontMatter = yaml.load(frontMatterMatch[1]);
    
    // Check required fields
    const requiredFields = [
      'repo',
      'category', 
      'language',
      // 'start_command',
      // 'build_command'
    ];
    
    for (const field of requiredFields) {
      if (!frontMatter[field]) {
        return `Missing required field '${field}' in ${filePath}`;
      }
      
      // Check if field is not just whitespace
      if (typeof frontMatter[field] === 'string' && frontMatter[field].trim() === '') {
        return `Required field '${field}' cannot be empty in ${filePath}`;
      }
    }
    
    // Validate repository URL format
    const repoUrlRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+/;
    if (!repoUrlRegex.test(frontMatter.repo)) {
      return `Invalid repository URL format in ${filePath}. Should be in format https://github.com/username/repo-name or https://github.com/username/repo-name/path/to/subdirectory`;
    }
    
    // Validate category length (from existing category validator logic)
    if (typeof frontMatter.category === 'string' && frontMatter.category.trim().length < 2) {
      return `Field 'category' must be at least 2 characters long in ${filePath}. Found: "${frontMatter.category.trim()}"`;
    }
    
    // Check if GitHub repository exists
    try {
      const repoUrl = frontMatter.repo;
      
      // Extract the base repository URL for API validation
      const baseRepoMatch = repoUrl.match(/^https:\/\/github\.com\/([^\/]+\/[^\/]+)/);
      if (!baseRepoMatch) {
        return `Could not parse repository URL in ${filePath}`;
      }
      
      const baseRepo = baseRepoMatch[1]; // e.g., "modelcontextprotocol/servers"
      const apiUrl = `https://api.github.com/repos/${baseRepo}`;
      
      const response = await axios.get(apiUrl);
      
      if (response.status !== 200) {
        return `GitHub repository ${baseRepo} does not exist or is not accessible`;
      }
      
      // If the URL contains a path (subdirectory), optionally validate that the path exists
      const pathMatch = repoUrl.match(/^https:\/\/github\.com\/[^\/]+\/[^\/]+\/(.+)$/);
      if (pathMatch) {
        const subPath = pathMatch[1];
        console.log(`Note: Repository URL contains subdirectory path: ${subPath}`);
        
        // Optional: You could add additional validation here to check if the subdirectory exists
        // This would require making additional API calls to check the repository contents
        // For now, we'll just log it as informational
      }
      
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return `GitHub repository does not exist or is not accessible: ${error.message}`;
      }
      return `Error checking GitHub repository: ${error.message}`;
    }
    
    // Optional: Check if logo URL is valid if present
    if (frontMatter.logo) {
      const logoUrlRegex = /^https?:\/\/.+\..+$/;
      if (!logoUrlRegex.test(frontMatter.logo)) {
        return `Invalid logo URL format in ${filePath}`;
      }
    }
    
    return null; // No errors
  } catch (error) {
    return `Error parsing front matter in ${filePath}: ${error.message}`;
  }
}

module.exports = { validateFrontMatter };
