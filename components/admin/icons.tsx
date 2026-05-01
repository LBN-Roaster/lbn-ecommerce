import { ReactNode } from "react";

export function NavIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="icn"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export const OverviewIcon = (
  <NavIcon>
    <rect x="2" y="2" width="5" height="5" rx="1" />
    <rect x="9" y="2" width="5" height="5" rx="1" />
    <rect x="2" y="9" width="5" height="5" rx="1" />
    <rect x="9" y="9" width="5" height="5" rx="1" />
  </NavIcon>
);

export const MapIcon = (
  <NavIcon>
    <polygon points="2,3 6,2 10,3 14,2 14,13 10,14 6,13 2,14" />
    <line x1="6" y1="2" x2="6" y2="13" />
    <line x1="10" y1="3" x2="10" y2="14" />
  </NavIcon>
);

export const SalesIcon = (
  <NavIcon>
    <path d="M2 13 L6 8 L9 11 L14 4" />
    <polyline points="10,4 14,4 14,8" />
  </NavIcon>
);

export const CogIcon = (
  <NavIcon>
    <circle cx="8" cy="8" r="2.2" />
    <path d="M8 1.5v2 M8 12.5v2 M14.5 8h-2 M3.5 8h-2 M12.6 3.4l-1.4 1.4 M4.8 11.2l-1.4 1.4 M12.6 12.6l-1.4-1.4 M4.8 4.8l-1.4-1.4" />
  </NavIcon>
);

export const DownloadIcon = (
  <NavIcon>
    <path d="M8 2v8 M4 7l4 4 4-4 M2 13h12" />
  </NavIcon>
);
