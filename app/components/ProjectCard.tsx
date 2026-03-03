import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  type?: string
  name: string
  description?: string
  tier?: number
  branch?: string
  checks?: string[]
  epicCount?: number
}

export function ProjectCard({ type = "undefined", name, description, tier = 1, branch = "main", checks = [], epicCount = 0 }: ProjectCardProps) {
  return (
    <Card className="min-w-[300px] max-w-[300px] flex-shrink-0">
      <CardHeader>
        {/* Title - H1 with epic count */}
        <h1 className="text-2xl font-bold mb-3">
          {name}<sup className="text-muted-foreground text-sm ml-1">{epicCount}</sup>
        </h1>
        
        {/* Description - paragraph below title (like goal in epic card) */}
        {description && (
          <p className="text-sm text-muted-foreground mb-3">
            {description}
          </p>
        )}
        
        {/* Metadata list - YAML order: tier, type (NO description here) */}
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>Tier: {tier}</p>
          <p>Type: <span className="capitalize">{type}</span></p>
          
          {/* Calculated fields */}
          <p>Branch: <span className="font-mono">{branch}</span></p>
          
          {/* Checks as badges */}
          <div>
            <p className="mb-1">{checks.length} checks:</p>
            {checks.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {checks.map((check, idx) => {
                  // Remove file extension
                  const nameWithoutExt = check.replace(/\.(md|sh|txt|json|yaml|yml)$/, '')
                  return (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="text-xs font-mono font-normal"
                    >
                      {nameWithoutExt}
                    </Badge>
                  )
                })}
              </div>
            ) : (
              <p className="ml-4 italic">No checks</p>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
