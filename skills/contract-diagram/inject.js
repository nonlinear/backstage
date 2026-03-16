#!/usr/bin/env node
// Contract Injector - Add CSS + titles based on contract type

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Phase detection logic
function detectPhase(filePath) {
  const dir = path.dirname(filePath);
  
  // Check git branch (epic/vX.Y.Z = in progress)
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: dir, encoding: 'utf8' }).trim();
    if (branch.match(/^epic\//)) {
      return 'approved'; // In progress
    }
  } catch (e) {
    // Not a git repo or error, continue
  }
  
  // Check ROADMAP.md (listed = design phase)
  const roadmapPath = path.join(dir, 'ROADMAP.md');
  if (fs.existsSync(roadmapPath)) {
    const roadmap = fs.readFileSync(roadmapPath, 'utf8');
    const basename = path.basename(filePath, '.md');
    if (roadmap.includes(basename)) {
      return 'default'; // Design phase
    }
  }
  
  // Check CHANGELOG.md (listed = developed)
  const changelogPath = path.join(dir, 'CHANGELOG.md');
  if (fs.existsSync(changelogPath)) {
    const changelog = fs.readFileSync(changelogPath, 'utf8');
    const basename = path.basename(filePath, '.md');
    if (changelog.includes(basename)) {
      return 'developed'; // Completed
    }
  }
  
  return 'default'; // Unknown phase
}

// Badge styles
const BADGES = {
  default: '![default](https://img.shields.io/badge/default-lightgray)',
  approved: '![approved](https://img.shields.io/badge/approved-yellow)',
  developed: '![developed](https://img.shields.io/badge/developed-lightgreen)',
  blocker: '![blocker](https://img.shields.io/badge/blocker-red)',
  notes: '![notes](https://img.shields.io/badge/notes-blue)',
};

// Mermaid CSS injection
const MERMAID_CSS = `%%{init: {'theme':'base','themeVariables':{"primaryColor":"#4A90E2","primaryTextColor":"#fff","primaryBorderColor":"#2E5C8A","lineColor":"#666","secondaryColor":"#50E3C2","tertiaryColor":"#FFD700","edgeLabelBackground":"#666"},'flowchart':{"nodeSpacing":50,"rankSpacing":50,"padding":15,"curve":"basis"}}}%%`;

function injectContract(mdPath) {
  if (!fs.existsSync(mdPath)) {
    console.error(`File not found: ${mdPath}`);
    process.exit(1);
  }
  
  const content = fs.readFileSync(mdPath, 'utf8');
  
  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.error('No frontmatter found');
    process.exit(1);
  }
  
  const frontmatter = frontmatterMatch[1];
  const nameMatch = frontmatter.match(/name:\s*"?([^"\n]+)"?/);
  const contractTypeMatch = frontmatter.match(/contract_type:\s*"?([^"\n]+)"?/);
  
  const name = nameMatch ? nameMatch[1].trim() : 'Untitled';
  const contractType = contractTypeMatch ? contractTypeMatch[1].trim() : 'contract';
  
  // Detect phase
  const phase = detectPhase(mdPath);
  const badge = BADGES[phase];
  
  // Build title based on contract type
  const title = `## ${name} ${contractType} ${badge}`;
  
  // Find mermaid block (if exists)
  const mermaidMatch = content.match(/```mermaid\n([\s\S]*?)\n```/);
  let newContent = content;
  
  if (mermaidMatch) {
    let mermaidCode = mermaidMatch[1];
    
    // Check if already has CSS
    if (!mermaidCode.startsWith('%%{init:')) {
      mermaidCode = MERMAID_CSS + '\n' + mermaidCode;
    }
    
    // Update mermaid CSS
    newContent = newContent.replace(/```mermaid\n[\s\S]*?\n```/, '```mermaid\n' + mermaidCode + '\n```');
  }
  
  // Check if already has title heading
  const beforeFirstSection = newContent.substring(0, newContent.indexOf('##'));
  const titleRegex = new RegExp(`## ${name} \\w+ !\\[\\w+\\]`);
  
  if (!titleRegex.test(newContent)) {
    // Add title after frontmatter
    const afterFrontmatter = newContent.indexOf('---', 3) + 3;
    newContent = newContent.substring(0, afterFrontmatter) + '\n\n' + title + '\n' + newContent.substring(afterFrontmatter);
  } else {
    // Update existing title
    newContent = newContent.replace(
      new RegExp(`## ${name} \\w+ !\\[\\w+\\]\\(https://img\\.shields\\.io/badge/\\w+-\\w+\\)`),
      title
    );
  }
  
  // Write back
  fs.writeFileSync(mdPath, newContent, 'utf8');
  console.log(`✅ Injected: "${name}" (type: ${contractType}, phase: ${phase})`);
  console.log(`   Updated: ${mdPath}`);
}

// CLI
const mdPath = process.argv[2];
if (!mdPath) {
  console.error('Usage: inject.js <path-to-contract.md>');
  process.exit(1);
}

injectContract(path.resolve(mdPath));
