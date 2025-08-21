"use client"

import { useEffect, useMemo, useState } from "react"
import { useCustomization, type ThemePreset } from "@/components/providers/customization-provider"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Palette, Settings2 } from "lucide-react"

// Live Customization Panel with Google Material Design colors
export function CustomizerPanel() {
  const { customization, setCustomization } = useCustomization()
  const [open, setOpen] = useState(false)

  // Allow other components (e.g., FloatingCTA) to open the panel without prop drilling
  useEffect(() => {
    const onOpen = () => setOpen(true)
    if (typeof window !== "undefined") {
      window.addEventListener("open-customizer", onOpen as EventListener)
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("open-customizer", onOpen as EventListener)
      }
    }
  }, [])

  // Google's official brand colors and big tech standards
  const presets: { id: ThemePreset; label: string; primary: string }[] = useMemo(
    () => [
      { id: "light", label: "Google Light", primary: "#1a73e8" }, // Google Blue
      { id: "dark", label: "Google Dark", primary: "#8ab4f8" }, // Google Blue Light
      { id: "minimalist", label: "Apple Style", primary: "#007aff" }, // Apple Blue
      { id: "futuristic", label: "Microsoft", primary: "#0078d4" }, // Microsoft Blue
      { id: "creative", label: "Warm", primary: "#ea4335" }, // Google Red
    ],
    [],
  )

  return (
    <>
      {/* Desktop floating trigger */}
      <div className="fixed right-6 top-6 z-50 hidden md:block">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent"
              style={{
                backgroundColor: "var(--card)",
                border: "none",
                boxShadow: "var(--shadow-3)",
              }}
              aria-label="Open Customizer"
            >
              <Settings2 className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetBody presets={presets} customization={customization} setCustomization={setCustomization} />
        </Sheet>
      </div>

      {/* Invisible Sheet host for mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetBody presets={presets} customization={customization} setCustomization={setCustomization} />
      </Sheet>
    </>
  )
}

function SheetBody({
  presets,
  customization,
  setCustomization,
}: {
  presets: { id: ThemePreset; label: string; primary: string }[]
  customization: ReturnType<typeof useCustomization>["customization"]
  setCustomization: ReturnType<typeof useCustomization>["setCustomization"]
}) {
  return (
    <SheetContent
      className="sm:max-w-md overflow-y-auto"
      style={{
        backgroundColor: "var(--card)",
        border: "none",
        boxShadow: "var(--shadow-5)",
      }}
    >
      <SheetHeader>
        <SheetTitle style={{ color: "var(--fg)" }}>Live Customization</SheetTitle>
      </SheetHeader>

      <div className="mt-6 space-y-6">
        <div className="space-y-3">
          <Label style={{ color: "var(--fg)" }}>Theme Preset</Label>
          <div className="grid grid-cols-1 gap-3">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => setCustomization({ theme: p.id, primary: p.primary })}
                className={`group relative rounded-2xl p-4 text-left transition-all duration-200 ${
                  customization.theme === p.id ? "ring-2 ring-primary/30" : ""
                }`}
                style={{
                  backgroundColor: customization.theme === p.id ? "var(--surface-variant)" : "var(--surface)",
                  border: "none",
                  boxShadow: customization.theme === p.id ? "var(--shadow-2)" : "var(--shadow-1)",
                }}
                aria-pressed={customization.theme === p.id}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-4 w-4 rounded-full"
                    style={{ backgroundColor: p.primary }}
                    aria-hidden="true"
                  />
                  <span className="font-medium" style={{ color: "var(--fg)" }}>
                    {p.label}
                  </span>
                </div>
                <div className="mt-2 text-xs" style={{ color: "var(--fg-secondary)" }}>
                  Big tech design standards
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="primary" style={{ color: "var(--fg)" }}>
            Primary Color
          </Label>
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4" style={{ color: "var(--fg-secondary)" }} />
            <Input
              id="primary"
              type="color"
              value={customization.primary}
              onChange={(e) => setCustomization({ primary: e.target.value })}
              className="h-10 w-16 p-1 rounded-lg"
              style={{
                border: "none",
                backgroundColor: "var(--surface)",
                boxShadow: "var(--shadow-1)",
              }}
              aria-label="Pick primary color"
            />
            <Input
              aria-label="Primary color hex"
              value={customization.primary}
              onChange={(e) => setCustomization({ primary: e.target.value })}
              style={{
                border: "none",
                backgroundColor: "var(--surface)",
                boxShadow: "var(--shadow-1)",
                color: "var(--fg)",
              }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label style={{ color: "var(--fg)" }}>Font Family</Label>
          <Select value={customization.font} onValueChange={(v) => setCustomization({ font: v as any })}>
            <SelectTrigger
              style={{
                border: "none",
                backgroundColor: "var(--surface)",
                boxShadow: "var(--shadow-1)",
                color: "var(--fg)",
              }}
            >
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter (Google's choice)</SelectItem>
              <SelectItem value="grotesk">Space Grotesk (Modern)</SelectItem>
              <SelectItem value="serif">Source Serif 4 (Editorial)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="fontScale" style={{ color: "var(--fg)" }}>
            Font Size
          </Label>
          <Slider
            id="fontScale"
            value={[customization.fontScale]}
            onValueChange={(v) => setCustomization({ fontScale: v[0] })}
            min={0.85}
            max={1.25}
            step={0.01}
          />
          <div className="text-xs" style={{ color: "var(--fg-secondary)" }}>
            Scale: {customization.fontScale.toFixed(2)}x
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label style={{ color: "var(--fg)" }}>Layout</Label>
            <Select value={customization.layout} onValueChange={(v) => setCustomization({ layout: v as any })}>
              <SelectTrigger
                style={{
                  border: "none",
                  backgroundColor: "var(--surface)",
                  boxShadow: "var(--shadow-1)",
                  color: "var(--fg)",
                }}
              >
                <SelectValue placeholder="Layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="stacked">Stacked</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label style={{ color: "var(--fg)" }}>Image Size</Label>
            <Select value={customization.imageSize} onValueChange={(v) => setCustomization({ imageSize: v as any })}>
              <SelectTrigger
                style={{
                  border: "none",
                  backgroundColor: "var(--surface)",
                  boxShadow: "var(--shadow-1)",
                  color: "var(--fg)",
                }}
              >
                <SelectValue placeholder="Image Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label style={{ color: "var(--fg)" }}>Section Spacing</Label>
          <Select value={customization.spacing} onValueChange={(v) => setCustomization({ spacing: v as any })}>
            <SelectTrigger
              style={{
                border: "none",
                backgroundColor: "var(--surface)",
                boxShadow: "var(--shadow-1)",
                color: "var(--fg)",
              }}
            >
              <SelectValue placeholder="Spacing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="comfortable">Comfortable</SelectItem>
              <SelectItem value="spacious">Spacious</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-2">
          <Button
            variant="outline"
            style={{
              border: "none",
              backgroundColor: "var(--surface)",
              boxShadow: "var(--shadow-1)",
              color: "var(--fg)",
            }}
            onClick={() =>
              setCustomization({
                theme: "light",
                font: "inter",
                fontScale: 1,
                primary: "#1a73e8",
                layout: "grid",
                imageSize: "md",
                spacing: "comfortable",
              })
            }
          >
            Reset to Google defaults
          </Button>
        </div>
      </div>
    </SheetContent>
  )
}
