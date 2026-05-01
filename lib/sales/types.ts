export type Sale = {
  id: string;
  date: string;
  productHandle: string;
  productName: string;
  price: number;
  buyer: { name: string; contact?: string };
  location: { label: string; lat: number; lng: number };
  notes?: string;
};

export type Totals = {
  allRevenue: number;
  allUnits: number;
  monthRevenue: number;
  monthUnits: number;
  lastMonthRevenue: number;
  lastMonthUnits: number;
};

export type MonthBucket = {
  ym: string;
  date: Date;
  revenue: number;
  units: number;
};

export type LocationEntry = {
  key: string;
  label: string;
  lat: number;
  lng: number;
  count: number;
  revenue: number;
  sales: Sale[];
};
