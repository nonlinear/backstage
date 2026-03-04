/**
 * Format epic/project name: remove dashes, capitalize words
 * Example: "backstage-gui" → "Backstage Gui"
 */
export function formatName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
