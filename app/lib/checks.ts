import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export interface Check {
  name: string
  title: string
  type: 'deterministic' | 'probabilistic'
  description: string
  active?: boolean  // Default: true if not specified
}

export function getCheckMetadata(projectSlug: string, checkFilename: string): Check | null {
  const checksDir = path.join(process.cwd(), '..', 'checks')
  const checkPath = path.join(checksDir, checkFilename)
  
  if (!fs.existsSync(checkPath)) {
    return null
  }
  
  try {
    const content = fs.readFileSync(checkPath, 'utf-8')
    const nameWithoutExt = checkFilename.replace(/\.(sh|md)$/, '')
    
    let frontmatter: any = {}
    
    if (checkFilename.endsWith('.md')) {
      // YAML frontmatter
      const match = content.match(/^---\n([\s\S]*?)\n---/)
      if (match) {
        frontmatter = yaml.load(match[1]) || {}
      }
    } else if (checkFilename.endsWith('.sh')) {
      // Commented YAML frontmatter
      const match = content.match(/^#!\/bin\/bash\n# ---\n((?:# .*\n)*?)# ---/)
      if (match) {
        const yamlContent = match[1].replace(/^# /gm, '')
        frontmatter = yaml.load(yamlContent) || {}
      }
    }
    
    return {
      name: nameWithoutExt,
      title: frontmatter.title || nameWithoutExt,
      type: frontmatter.type || 'deterministic',
      description: frontmatter.description || '',
      active: frontmatter.active !== false  // Default true unless explicitly false
    }
  } catch (err) {
    console.error(`Error reading check ${checkFilename}:`, err)
    return null
  }
}

export function getProjectChecks(projectSlug: string, checkFilenames: string[]): Check[] {
  return checkFilenames
    .map(filename => getCheckMetadata(projectSlug, filename))
    .filter((check): check is Check => check !== null)
}

export function enrichProjectChecks(projectSlug: string, checkFilenames: string[]): Check[] {
  const checksDir = path.join(process.cwd(), '..', 'checks')
  
  return checkFilenames
    .map(filename => {
      const checkPath = path.join(checksDir, filename)
      
      if (!fs.existsSync(checkPath)) {
        return null
      }
      
      try {
        const content = fs.readFileSync(checkPath, 'utf-8')
        const nameWithoutExt = filename.replace(/\.(sh|md)$/, '')
        
        let frontmatter: any = {}
        
        if (filename.endsWith('.md')) {
          // YAML frontmatter
          const match = content.match(/^---\n([\s\S]*?)\n---/)
          if (match) {
            frontmatter = yaml.load(match[1]) || {}
          }
        } else if (filename.endsWith('.sh')) {
          // Commented YAML frontmatter
          const match = content.match(/^#!\/bin\/bash\n# ---\n((?:# .*\n)*?)# ---/)
          if (match) {
            const yamlContent = match[1].replace(/^# /gm, '')
            frontmatter = yaml.load(yamlContent) || {}
          }
        }
        
        return {
          name: nameWithoutExt,
          title: frontmatter.title || nameWithoutExt,
          type: frontmatter.type || 'deterministic',
          description: frontmatter.description || ''
        } as Check
      } catch (err) {
        console.error(`Error reading check ${filename}:`, err)
        return null
      }
    })
    .filter((check): check is Check => check !== null)
}
