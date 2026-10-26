"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  DEFAULTS,
  resetSettings,
  updateSettings,
  useEffectsSettings,
  type EffectsSettings,
} from "@/lib/effects-settings";

//& nav dropdown drives lib/effects-settings.ts. every control writes straight to store, so live effects update as you drag. BG controls follow current route

/* ---------- primitives ---------- */

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors ${
        checked ? "border-hover-bright bg-hover-bright/30" : "border-hairline-strong bg-bg-raised"
      }`}
    >
      <span
        className={`absolute top-0.5 size-3.5 rounded-full transition-[left,background-color] ${
          checked ? "left-4.5 bg-hover-bright" : "left-0.5 bg-fg-faint"
        }`}
      />
    </button>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex items-center justify-between gap-3 text-xs text-fg-muted">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Color({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <span className="relative inline-flex items-center gap-2">
      <span className="tabular text-[0.7rem] text-fg-faint">{value}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="size-6 cursor-pointer appearance-none rounded-md border border-hairline bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-0"
      />
    </span>
  );
}

function Range({
  value,
  min,
  max,
  step = 1,
  onChange,
  format = (v: number) => String(v),
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="tabular w-10 text-right text-[0.7rem] text-fg-faint">{format(value)}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-24 cursor-pointer accent-hover-bright"
      />
    </span>
  );
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
}) {
  return (
    <span role="radiogroup" className="inline-flex rounded-md border border-hairline p-0.5 text-[0.7rem]">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={o === value}
          onClick={() => onChange(o)}
          className={`rounded px-2 py-0.5 capitalize transition-colors ${
            o === value ? "bg-fg text-bg" : "text-fg-muted hover:text-fg"
          }`}
        >
          {o}
        </button>
      ))}
    </span>
  );
}

function Group({
  title,
  enabled,
  onToggle,
  children,
}: {
  title: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <fieldset className="space-y-2.5 border-t border-hairline pt-3 first:border-t-0 first:pt-0">
      <div className="flex items-center justify-between">
        <legend className="font-display text-sm font-medium text-fg">{title}</legend>
        <Switch checked={enabled} onChange={onToggle} label={`${title} on or off`} />
      </div>
      <div className={`space-y-2 ${enabled ? "" : "pointer-events-none opacity-40"}`} aria-disabled={!enabled}>
        {children}
      </div>
    </fieldset>
  );
}

/* ---------- menu ---------- */

type Patch = (s: EffectsSettings) => EffectsSettings;
const set =
  <K extends keyof EffectsSettings>(group: K, part: Partial<EffectsSettings[K]>): Patch =>
  (s) => ({ ...s, [group]: { ...s[group], ...part } });

export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const settings = useEffectsSettings();
  const pathname = usePathname();
  const onProjects = pathname.startsWith("/projects");

  //~ close on outside click / escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const { cursor, spark, background, borders } = settings;
  const isDefault = JSON.stringify(settings) === JSON.stringify(DEFAULTS);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Effect settings"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="nav-box size-8 sm:size-8.5"
      >
        <SlidersHorizontal size={15} strokeWidth={1.75} aria-hidden="true" />
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Effect settings"
          className="absolute right-0 top-full z-50 mt-2 max-h-[calc(100dvh-5.5rem)] w-[min(20rem,calc(100vw-2.5rem))] space-y-3 overflow-y-auto overscroll-contain rounded-lg border border-hairline bg-bg/90 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          <Group
            title="Cursor glow"
            enabled={cursor.enabled}
            onToggle={(v) => updateSettings(set("cursor", { enabled: v }))}
          >
            <Row label="Colour">
              <Color value={cursor.color} onChange={(v) => updateSettings(set("cursor", { color: v }))} />
            </Row>
            <Row label="Intensity">
              <Range
                value={cursor.intensity}
                min={0.3}
                max={3}
                step={0.1}
                onChange={(v) => updateSettings(set("cursor", { intensity: v }))}
                format={(v) => v.toFixed(1)}
              />
            </Row>
            <Row label="Thickness">
              <Range
                value={cursor.trailWidth}
                min={1}
                max={8}
                step={0.5}
                onChange={(v) => updateSettings(set("cursor", { trailWidth: v }))}
                format={(v) => `${v}`}
              />
            </Row>
            <Row label="Linger">
              <Range
                value={cursor.linger}
                min={0.2}
                max={4}
                step={0.1}
                onChange={(v) => updateSettings(set("cursor", { linger: v }))}
                format={(v) => `${v.toFixed(1)}s`}
              />
            </Row>
            <Row label="Glow">
              <Range
                value={cursor.glow}
                min={0}
                max={3}
                step={0.1}
                onChange={(v) => updateSettings(set("cursor", { glow: v }))}
                format={(v) => v.toFixed(1)}
              />
            </Row>
            <Row label="Hotspot">
              <Range
                value={cursor.hotspot}
                min={0}
                max={2}
                step={0.1}
                onChange={(v) => updateSettings(set("cursor", { hotspot: v }))}
                format={(v) => v.toFixed(1)}
              />
            </Row>
            <Row label="Follow speed">
              <Range
                value={cursor.followSpeed}
                min={0.1}
                max={1}
                step={0.05}
                onChange={(v) => updateSettings(set("cursor", { followSpeed: v }))}
                format={(v) => v.toFixed(2)}
              />
            </Row>
            <Row label="Grain">
              <Range
                value={cursor.grain}
                min={0}
                max={1}
                step={0.05}
                onChange={(v) => updateSettings(set("cursor", { grain: v }))}
                format={(v) => v.toFixed(2)}
              />
            </Row>
            <Row label="Click burst">
              <Switch
                checked={cursor.clickBurst}
                onChange={(v) => updateSettings(set("cursor", { clickBurst: v }))}
                label="Click burst on or off"
              />
            </Row>
            <Row label="Quality">
              <Segmented
                value={cursor.quality}
                options={["low", "medium", "high"] as const}
                onChange={(v) => updateSettings(set("cursor", { quality: v }))}
              />
            </Row>
          </Group>

          <Group
            title="Click spark"
            enabled={spark.enabled}
            onToggle={(v) => updateSettings(set("spark", { enabled: v }))}
          >
            <Row label="Colour">
              <Color value={spark.color} onChange={(v) => updateSettings(set("spark", { color: v }))} />
            </Row>
            <Row label="Sparks">
              <Range value={spark.count} min={4} max={16} onChange={(v) => updateSettings(set("spark", { count: v }))} />
            </Row>
            <Row label="Length">
              <Range
                value={spark.size}
                min={4}
                max={24}
                onChange={(v) => updateSettings(set("spark", { size: v }))}
                format={(v) => `${v}px`}
              />
            </Row>
            <Row label="Spread">
              <Range
                value={spark.radius}
                min={8}
                max={40}
                onChange={(v) => updateSettings(set("spark", { radius: v }))}
                format={(v) => `${v}px`}
              />
            </Row>
            <Row label="Duration">
              <Range
                value={spark.duration}
                min={200}
                max={1000}
                step={50}
                onChange={(v) => updateSettings(set("spark", { duration: v }))}
                format={(v) => `${v}ms`}
              />
            </Row>
          </Group>

          <Group
            title={onProjects ? "Background (liquid)" : "Background (shards)"}
            enabled={background.enabled}
            onToggle={(v) => updateSettings(set("background", { enabled: v }))}
          >
            {onProjects ? (
              <>
                {background.projects.colors.map((c, i) => (
                  <Row key={i} label={`Colour ${i + 1}`}>
                    <Color
                      value={c}
                      onChange={(v) =>
                        updateSettings((s) => {
                          const colors = [...s.background.projects.colors] as [string, string, string];
                          colors[i] = v;
                          return set("background", { projects: { ...s.background.projects, colors } })(s);
                        })
                      }
                    />
                  </Row>
                ))}
                <Row label="Push force">
                  <Range
                    value={background.projects.mouseForce}
                    min={5}
                    max={100}
                    onChange={(v) =>
                      updateSettings((s) =>
                        set("background", { projects: { ...s.background.projects, mouseForce: v } })(s),
                      )
                    }
                  />
                </Row>
                <Row label="Brush size">
                  <Range
                    value={background.projects.cursorSize}
                    min={40}
                    max={300}
                    step={10}
                    onChange={(v) =>
                      updateSettings((s) =>
                        set("background", { projects: { ...s.background.projects, cursorSize: v } })(s),
                      )
                    }
                  />
                </Row>
              </>
            ) : (
              <>
                <Row label="Shard colour">
                  <Color
                    value={background.home.shardColor}
                    onChange={(v) =>
                      updateSettings((s) => set("background", { home: { ...s.background.home, shardColor: v } })(s))
                    }
                  />
                </Row>
                <Row label="Accent">
                  <Color
                    value={background.home.accentColor}
                    onChange={(v) =>
                      updateSettings((s) => set("background", { home: { ...s.background.home, accentColor: v } })(s))
                    }
                  />
                </Row>
                <Row label="Glow">
                  <Range
                    value={background.home.glow}
                    min={0}
                    max={2}
                    step={0.1}
                    onChange={(v) => updateSettings((s) => set("background", { home: { ...s.background.home, glow: v } })(s))}
                    format={(v) => v.toFixed(1)}
                  />
                </Row>
                <Row label="Bloom">
                  <Range
                    value={background.home.bloom}
                    min={0}
                    max={1}
                    step={0.05}
                    onChange={(v) => updateSettings((s) => set("background", { home: { ...s.background.home, bloom: v } })(s))}
                    format={(v) => v.toFixed(2)}
                  />
                </Row>
                <Row label="Speed">
                  <Range
                    value={background.home.speed}
                    min={0.2}
                    max={2.5}
                    step={0.1}
                    onChange={(v) => updateSettings((s) => set("background", { home: { ...s.background.home, speed: v } })(s))}
                    format={(v) => `${v.toFixed(1)}x`}
                  />
                </Row>
              </>
            )}
          </Group>

          <Group
            title="Project borders"
            enabled={borders.enabled}
            onToggle={(v) => updateSettings(set("borders", { enabled: v }))}
          >
            <Row label="Colour">
              <Color value={borders.color} onChange={(v) => updateSettings(set("borders", { color: v }))} />
            </Row>
            <Row label="Intensity">
              <Range
                value={borders.intensity}
                min={0.2}
                max={1.5}
                step={0.1}
                onChange={(v) => updateSettings(set("borders", { intensity: v }))}
                format={(v) => v.toFixed(1)}
              />
            </Row>
            <Row label="Speed">
              <Range
                value={borders.speed}
                min={0.2}
                max={3}
                step={0.1}
                onChange={(v) => updateSettings(set("borders", { speed: v }))}
                format={(v) => `${v.toFixed(1)}x`}
              />
            </Row>
            <Row label="Thickness">
              <Range
                value={borders.thickness}
                min={0.5}
                max={4}
                step={0.25}
                onChange={(v) => updateSettings(set("borders", { thickness: v }))}
                format={(v) => `${v}px`}
              />
            </Row>
          </Group>

          <div className="flex items-center justify-between border-t border-hairline pt-3 text-xs">
            <span className="text-fg-faint">Saved in this browser</span>
            <button
              type="button"
              onClick={resetSettings}
              disabled={isDefault}
              className="link inline-flex items-center gap-1.5 text-fg-muted disabled:cursor-default disabled:opacity-40"
            >
              <RotateCcw size={13} strokeWidth={1.75} aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
