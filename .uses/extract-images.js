const fs = require('fs');
const path = require('path');

// Configuration
const PROJECT_DIR = process.argv[2] || '.';
const OUTPUT_FILE = 'project-files.json';

// File extensions to catalog
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico'];
const CODE_EXTENSIONS = ['.html', '.htm', '.css', '.js', '.jsx', '.tsx', '.ts'];

const projectFiles = {
  images: [],
  html: [],
  css: [],
  javascript: [],
  other: []
};

// Recursively read directory
function readDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and hidden directories
      if (file !== 'node_modules' && !file.startsWith('.')) {
        readDirectory(filePath);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      const relativePath = path.relative(PROJECT_DIR, filePath).replace(/\\/g, '/');
      const absolutePath = path.resolve(filePath);
      
      const fileInfo = {
        path: relativePath
      };
      
      // Categorize by type
      if (IMAGE_EXTENSIONS.includes(ext)) {
        projectFiles.images.push(fileInfo);
      } else if (ext === '.html' || ext === '.htm') {
        projectFiles.html.push(fileInfo);
      } else if (ext === '.css') {
        projectFiles.css.push(fileInfo);
      } else if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
        projectFiles.javascript.push(fileInfo);
      } else if (CODE_EXTENSIONS.includes(ext)) {
        projectFiles.other.push(fileInfo);
      }
    }
  });
}



// Main execution
console.log(`Scanning project directory: ${PROJECT_DIR}`);
console.log('Cataloging all files...\n');

try {
  readDirectory(PROJECT_DIR);
  
  // Create summary
  const summary = {
    totalImages: projectFiles.images.length,
    totalHTML: projectFiles.html.length,
    totalCSS: projectFiles.css.length,
    totalJavaScript: projectFiles.javascript.length,
    scannedAt: new Date().toISOString(),
    projectDirectory: path.resolve(PROJECT_DIR)
  };
  
  // Prepare final output
  const output = {
    summary: summary,
    files: projectFiles
  };
  
  // Write to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  
  console.log('✓ Files found:');
  console.log(`  Images: ${projectFiles.images.length}`);
  console.log(`  HTML: ${projectFiles.html.length}`);
  console.log(`  CSS: ${projectFiles.css.length}`);
  console.log(`  JavaScript: ${projectFiles.javascript.length}`);
  console.log(`\n✓ Saved to ${OUTPUT_FILE}\n`);
  
  // Display image summary by type
  if (projectFiles.images.length > 0) {
    const imagesByType = {};
    projectFiles.images.forEach(img => {
      imagesByType[img.type] = (imagesByType[img.type] || 0) + 1;
    });
    
    console.log('Images by type:');
    Object.entries(imagesByType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
  }
  
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}