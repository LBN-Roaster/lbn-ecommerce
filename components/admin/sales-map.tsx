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
      <div className="page-head">
        <div>
          <h1 className="page-title">Installations Map</h1>
          <div className="page-sub">
            Where LBN machines are roasting · {locations.length} locations ·{" "}
            {totalUnits} machines
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" onClick={resetView}>
            Reset view
          </button>
        </div>
      </div>

      <div className="map-shell">
        <div className="map-card">
          <div ref={containerRef} className="map-canvas" />
          <div className="map-overlay-stats">
            <div>
              <div className="k">Locations</div>
              <div className="v mono">{locations.length}</div>
            </div>
            <div>
              <div className="k">Machines</div>
              <div className="v mono">{totalUnits}</div>
            </div>
            <div>
              <div className="k">Revenue</div>
              <div className="v mono">{formatVNDCompact(totalRevenue)}</div>
            </div>
          </div>
        </div>

        <div className="side-panel">
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
        </div>
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
      <div className="side-panel-head">
        <h3>Locations</h3>
        <p>Click a pin or row to drill in</p>
      </div>
      <div className="loc-list">
        {locations.map((loc) => (
          <div
            key={loc.key}
            className={"loc-row" + (selected === loc.key ? " active" : "")}
            onClick={() => onSelect(loc.key)}
          >
            <div>
              <div className="loc-name">{loc.label}</div>
              <div className="loc-meta mono">
                {loc.lat.toFixed(3)}, {loc.lng.toFixed(3)}
              </div>
            </div>
            <span className="loc-count">{loc.count}</span>
            <div className="loc-rev" style={{ gridColumn: "1 / -1" }}>
              {formatVND(loc.revenue)}
            </div>
          </div>
        ))}
      </div>
      <div className="legend-foot">
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
    <div className="loc-detail">
      <button className="back-btn" onClick={onBack}>
        ← All locations
      </button>
      <h3>{loc.label}</h3>
      <div className="loc-coords mono">
        {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
      </div>

      <div className="loc-stat-row">
        <div className="loc-stat">
          <div className="k">Machines</div>
          <div className="v mono">{loc.count}</div>
        </div>
        <div className="loc-stat">
          <div className="k">Revenue</div>
          <div className="v mono">{formatVNDCompact(loc.revenue)}</div>
        </div>
      </div>

      <div className="loc-detail-section-label">Sales at this location</div>
      <div className="sales-list">
        {loc.sales.map((s) => (
          <SaleItem key={s.id} sale={s} />
        ))}
      </div>
    </div>
  );
}

function SaleItem({ sale }: { sale: Sale }) {
  return (
    <div className="sale-item">
      <div className="sale-item-head">
        <div className="sale-item-prod">{sale.productName}</div>
        <div className="sale-item-price mono">{formatVND(sale.price)}</div>
      </div>
      <div className="sale-item-meta">
        <span className="mono">{formatDate(sale.date)}</span>
        <span>·</span>
        <span>{sale.buyer.name}</span>
      </div>
      {sale.buyer.contact && (
        <div className="sale-item-meta">
          <span className="mono" style={{ color: "var(--ink-2)" }}>
            {sale.buyer.contact}
          </span>
        </div>
      )}
    </div>
  );
}
