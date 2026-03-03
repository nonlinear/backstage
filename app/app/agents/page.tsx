"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const sections = [
  { value: "projects", label: "Projects" },
  { value: "checks", label: "Checks" },
  { value: "agents", label: "Agents" },
]

export default function AgentsPage() {
  const router = useRouter()
  const [section, setSection] = useState("agents")
  
  const handleSectionChange = (item: any) => {
    if (!item) return
    setSection(item.value)
    if (item.value === "projects") router.push("/projects/all")
    if (item.value === "checks") router.push("/checks")
  }
  
  return (
    <div className="min-h-screen p-8">
      <div className="flex items-center gap-6">
        <h4 className="text-xl font-semibold">Backstage</h4>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Combobox
                items={sections}
                itemToStringValue={(item) => item.label}
                value={sections.find(s => s.value === section)}
                onValueChange={handleSectionChange}
              >
                <ComboboxInput placeholder="Select section" className="w-[140px]" />
                <ComboboxContent>
                  <ComboboxEmpty>No section found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item.value} value={item}>
                        {item.label}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Agents</h2>
        <p className="text-gray-600 mt-2">Agents content goes here</p>
      </div>
    </div>
  );
}
