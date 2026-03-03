import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  name: string
  description: string
  tier: number
  type: string
  branch: string
  checks: string[]
  epicCount: number
  activeCount: number
  backlogCount: number
  publishedCount: number
}

export function ProjectCard({ 
  name, 
  description, 
  tier, 
  type, 
  branch, 
  checks,
  epicCount,
  activeCount,
  backlogCount,
  publishedCount
}: ProjectCardProps) {
  return (
    <Card className="min-w-[300px] max-w-[300px] flex-shrink-0">
      <CardHeader>
        <h1 className="text-2xl font-bold mb-2">
          {name}
        </h1>
        
        {/* Description paragraph below title */}
        {description && (
          <p className="text-sm text-muted-foreground mb-3">
            {description}
          </p>
        )}
        
        {/* Metadata fields (YAML order) */}
        <div className="space-y-1 text-sm">
          <p>Tier: {tier}</p>
          <p>Type: {type}</p>
          <p>Branch: {branch}</p>
          <p>{epicCount} epics: {activeCount} active, {publishedCount} published, {backlogCount} backlog</p>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Checks badges (spacing before) */}
        {checks.length > 0 && (
          <div style={{ marginTop: 'var(--spacing-unit)' }}>
            <div className="flex flex-wrap gap-1">
              {checks.map((check) => (
                <Badge key={check} variant="outline" className="font-mono font-normal">
                  {check}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
