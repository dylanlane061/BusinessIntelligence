export type Location = {
  address: string;
  city: string;
  country: string;
};

export type RevenueRecord = {
  seq: number;
  date: string;
  value: number;
};

export type Company = {
  id: number;
  name: string;
  location: Location;
  revenue: RevenueRecord[];
};

export type NavParamMap = {Home: undefined; Profile: Company};
