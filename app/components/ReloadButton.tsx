"use client"

import { Button } from "@/components/ui/button"
import { RotateCw } from "lucide-react"

export function ReloadButton() {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleReload}
      className="fixed bottom-[15px] right-[15px] z-50"
      aria-label="Reload page"
    >
      <RotateCw className="h-4 w-4" />
    </Button>
  )
}
