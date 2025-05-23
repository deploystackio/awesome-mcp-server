#!/usr/bin/env node
const fs = require('fs');

// Import validators
const { validateFileStructure } = require('./validators/fileStructure');
const { validateFrontMatter } = require('./validators/frontMatter');
const { validateContentStructure } = require('./validators/contentStructure');
const { validateMcpServerConfig } = require('./validators/mcpServerConfig');
const { validateDuplicateRepo } = require('./validators/duplicateRepo');
const { validateCategory } = require('./validators/category');

/**
 * Validates a single file against all validation rules
 * @param {string} filePath - Path to the file being validated
 * @returns {Promise<Object>} Object with errors array and metadata
 */
async function validateFile(filePath) {
  const result = {
    errors: [],
    isUpdate: false
  };
  
  // Step 1: Validate file structure
  const structureError = validateFileStructure(filePath);
  if (structureError) {
    result.errors.push(structureError);
    return result; // Early return if structure is wrong
  }
  
  try {
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Step 2: Validate front matter
    const frontMatterError = await validateFrontMatter(fileContent, filePath);
    if (frontMatterError) result.errors.push(frontMatterError);
    
    // Step 3: Validate content structure
    const contentError = validateContentStructure(fileContent, filePath);
    if (contentError) result.errors.push(contentError);
    
    // Step 4: Validate MCP server configuration
    const configError = validateMcpServerConfig(fileContent, filePath);
    if (configError) result.errors.push(configError);
    
    // Step 5: Validate for duplicate repositories
    const repoResult = validateDuplicateRepo(fileContent, filePath);
    if (repoResult.error) result.errors.push(repoResult.error);
    result.isUpdate = repoResult.isUpdate;

    // Step 6: Validate Category field
    const categoryError = validateCategory(fileContent, filePath);
    if (categoryError) result.errors.push(categoryError);
    
  } catch (error) {
    result.errors.push(`Error reading or processing ${filePath}: ${error.message}`);
  }
  
  return result;
}

/**
 * Main validation function
 */
async function main() {
  // Get file paths from command line arguments
  const filePaths = process.argv.slice(2);
  
  // Track validation results
  const validationResults = {
    valid: true,
    errors: {},
    updates: [] // Track which files are updates
  };
  
  let hasServersChanges = false;
  
  // Validate each file
  for (const filePath of filePaths) {
    // Only validate files in the servers directory
    if (filePath.startsWith('servers/') && !filePath.endsWith('/')) {
      hasServersChanges = true;
      
      console.log(`Validating ${filePath}...`);
      const fileResult = await validateFile(filePath);
      
      if (fileResult.errors.length > 0) {
        validationResults.valid = false;
        validationResults.errors[filePath] = fileResult.errors;
        
        // Log errors for this file
        console.error(`\n❌ Errors in ${filePath}:`);
        fileResult.errors.forEach(error => console.error(`  - ${error}`));
      } else {
        console.log(`✅ ${filePath} is valid`);
        
        // If this is an update to an existing server, add to updates list
        if (fileResult.isUpdate) {
          console.log(`🔄 ${filePath} is an update to an existing MCP server`);
          validationResults.updates.push(filePath);
        }
      }
    }
  }
  
  // If no servers files were changed, exit with success
  if (!hasServersChanges) {
    console.log('No changes in servers directory. Skipping validation.');
    process.exit(0);
  }
  
  // Write validation results to file (for GitHub Actions to use)
  fs.writeFileSync('.github/validation-results.json', JSON.stringify(validationResults, null, 2));
  
  // Exit with appropriate status code
  if (validationResults.valid) {
    console.log('\n🎉 All validations passed!');
    process.exit(0);
  } else {
    console.error('\n❌ Validation failed. See errors above.');
    process.exit(1);
  }
}

// Run the validation
main().catch(error => {
  console.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});
