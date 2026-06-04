"use client";

import "leaflet/dist/leaflet.css";
import type * as Leaflet from "leaflet";
import {
  formatDate,
  formatVND,
  formatVNDCompact,
  type LocationEntry,
  type Sale,
} from "lib/sales";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  locations: LocationEntry[];
};

export function SalesMap({ locations }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const markersRef = useRef<Record<string, Leaflet.Marker>>({});
  const boundsRef = useRef<Leaflet.LatLngBounds | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const totalUnits = locations.reduce((s, l) => s + l.count, 0);
  const totalRevenue = locations.reduce((s, l) => s + l.revenue, 0);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;
    let createdMap: Leaflet.Map | null = null;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      createdMap = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
      });
      mapRef.current = createdMap;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "© OpenStreetMap · © CARTO",
          subdomains: "abcd",
          maxZoom: 19,
        },
      ).addTo(createdMap);

      if (locations.length > 0) {
        const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]));
        boundsRef.current = bounds;
        createdMap.fitBounds(bounds, { padding: [60, 60] });
      } else {
        createdMap.setView([16, 107], 5);
      }

      locations.forEach((loc) => {
        const icon = L.divIcon({
          className: "lbn-pin",
          html: `<div class="lbn-pin-inner">${loc.count}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(
          createdMap!,
        );
        marker.on("click", () => setSelected(loc.key));
        markersRef.current[loc.key] = marker;
      });
    })();

    return () => {
      cancelled = true;
      if (createdMap) {
        createdMap.remove();
        mapRef.current = null;
        markersRef.current = {};
      }
    };
  }, [locations]);

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([key, marker]) => {
      const el = marker.getElement()?.querySelector(".lbn-pin-inner");
      if (el) el.classList.toggle("active", key === selected);
    });
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const map = mapRef.current;
    const loc = locations.find((l) => l.key === selected);
    if (map && loc) {
      map.flyTo([loc.lat, loc.lng], Math.max(map.getZoom(), 6), {
        duration: 0.6,
      });
    }
  }, [selected, locations]);

  const resetView = () => {
    setSelected(null);
    const map = mapRef.current;
    if (map && boundsRef.current) {
      map.fitBounds(boundsRef.current, { padding: [60, 60] });
    }
  };

  const selectedLoc = locations.find((l) => l.key === selected);

  return (
    <>
      <div className="mb-5 flex items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Installations Map
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Where LBN machines are roasting · {locations.length} locations ·{" "}
            {totalUnits} machines
          </p>
        </div>
        <Button variant="ghost" onClick={resetView}>
          Reset view
        </Button>
      </div>

      <div className="grid min-h-[600px] grid-cols-[1fr_360px] gap-3.5" style={{ height: "calc(100vh - 56px - 56px - 36px)" }}>
        <Card className="relative overflow-hidden">
          <div ref={containerRef} className="absolute inset-0" />
          <div className="absolute right-3.5 top-3.5 z-[500] flex gap-5 rounded-lg border border-border bg-white/95 px-3.5 py-2.5 text-xs shadow-md backdrop-blur-sm">
            <div>
              <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">
                Locations
              </div>
              <div className="mt-0.5 font-mono text-sm font-semibold">
                {locations.length}
              </div>
            </div>
            <div>
              <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">
                Machines
              </div>
              <div className="mt-0.5 font-mono text-sm font-semibold">
                {totalUnits}
              </div>
            </div>
            <div>
              <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">
                Revenue
              </div>
              <div className="mt-0.5 font-mono text-sm font-medium">
                {formatVNDCompact(totalRevenue)}
              </div>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col overflow-hidden">
          {selectedLoc ? (
            <LocationDetail
              loc={selectedLoc}
              onBack={() => setSelected(null)}
            />
          ) : (
            <LocationList
              locations={locations}
              selected={selected}
              onSelect={setSelected}
            />
          )}
        </Card>
      </div>
    </>
  );
}

function LocationList({
  locations,
  selected,
  onSelect,
}: {
  locations: LocationEntry[];
  selected: string | null;
  onSelect: (key: string) => void;
}) {
  return (
    <>
      <div className="border-b border-border px-4 py-4">
        <h3 className="text-sm font-semibold">Locations</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Click a pin or row to drill in
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {locations.map((loc) => (
          <div
            key={loc.key}
            className={cn(
              "grid cursor-pointer grid-cols-[1fr_auto] items-center gap-x-2.5 gap-y-1 border-b border-border px-4 py-3 transition-colors hover:bg-muted",
              selected === loc.key && "bg-secondary",
            )}
            onClick={() => onSelect(loc.key)}
          >
            <div>
              <div className="text-[13.5px] font-medium">{loc.label}</div>
              <div className="font-mono text-[11.5px] text-muted-foreground">
                {loc.lat.toFixed(3)}, {loc.lng.toFixed(3)}
              </div>
            </div>
            <span className="inline-grid min-w-[22px] place-items-center rounded-full bg-foreground px-[7px] py-0 font-mono text-[11px] font-semibold text-background">
              {loc.count}
            </span>
            <div className="col-span-full font-mono text-[12.5px] text-muted-foreground">
              {formatVND(loc.revenue)}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-4 py-2.5 text-[11.5px] text-muted-foreground">
        Pins aggregate sales by lat/lng · Number shows machines installed
      </div>
    </>
  );
}

function LocationDetail({
  loc,
  onBack,
}: {
  loc: LocationEntry;
  onBack: () => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <button
        className="mb-3.5 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        onClick={onBack}
      >
        ← All locations
      </button>
      <h3 className="text-base font-semibold tracking-tight">{loc.label}</h3>
      <div className="mt-1 font-mono text-[11px] text-muted-foreground">
        {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-md border border-border bg-muted p-2.5">
          <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">
            Machines
          </div>
          <div className="mt-1 font-mono text-base font-semibold">
            {loc.count}
          </div>
        </div>
        <div className="rounded-md border border-border bg-muted p-2.5">
          <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">
            Revenue
          </div>
          <div className="mt-1 font-mono text-base font-semibold">
            {formatVNDCompact(loc.revenue)}
          </div>
        </div>
      </div>

      <div className="mb-2 mt-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Sales at this location
      </div>
      <div className="flex flex-col gap-2.5">
        {loc.sales.map((s) => (
          <SaleItem key={s.id} sale={s} />
        ))}
      </div>
    </div>
  );
}

function SaleItem({ sale }: { sale: Sale }) {
  return (
    <div className="grid gap-1.5 rounded-md border border-border p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium">{sale.productName}</div>
        <div className="font-mono text-sm font-medium">
          {formatVND(sale.price)}
        </div>
      </div>
      <div className="flex flex-wrap gap-2.5 text-[11.5px] text-muted-foreground">
        <span className="font-mono">{formatDate(sale.date)}</span>
        <span>·</span>
        <span>{sale.buyer.name}</span>
      </div>
      {sale.buyer.contact && (
        <div className="font-mono text-[11.5px] text-muted-foreground">
          {sale.buyer.contact}
        </div>
      )}
    </div>
  );
}
