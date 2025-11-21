// Tipos do AxionRide

export type UserType = 'motoboy' | 'daily' | 'traveler' | 'fleet';

export type PlanType = 'motoboy' | 'traveler' | 'daily' | 'premium-monthly' | 'premium-annual' | 'fleet-monthly' | 'fleet-annual';

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  userType: UserType;
  plan: PlanType;
  createdAt: Date;
}

export interface Motorcycle {
  id: string;
  userId: string;
  brand: string;
  model: string;
  year: number;
  currentKm: number;
  dailyDistance?: number; // Para uso diário casa-trabalho
  licensePlate: string;
}

export interface MaintenanceItem {
  id: string;
  motorcycleId: string;
  type: 'oil' | 'oil-filter' | 'air-filter' | 'brake-fluid' | 'tires' | 'chain-kit';
  lastChangeKm: number;
  nextChangeKm: number;
  lastChangeDate: Date;
  status: 'ok' | 'warning' | 'urgent';
}

export interface TripRecord {
  id: string;
  motorcycleId: string;
  startKm: number;
  endKm: number;
  distance: number;
  startTime: Date;
  endTime: Date;
  type: 'work' | 'travel' | 'daily';
}

export interface FleetMotorcycle extends Motorcycle {
  rentedTo?: string; // CPF do locatário
  rentedToName?: string;
  rentalStartDate?: Date;
  status: 'available' | 'rented' | 'maintenance';
}

export interface PlanPricing {
  name: string;
  price: number;
  features: string[];
  type: PlanType;
}

export const MAINTENANCE_INTERVALS = {
  oil: 3000,
  'oil-filter': 3000,
  'air-filter': 6000,
  'brake-fluid': 12000,
  tires: 15000,
  'chain-kit': 20000,
};

export const PLAN_PRICES: Record<PlanType, number> = {
  motoboy: 30,
  traveler: 30,
  daily: 20,
  'premium-monthly': 40,
  'premium-annual': 240,
  'fleet-monthly': 50, // Base 5 motos
  'fleet-annual': 600, // Base 5 motos
};

export const FLEET_EXTRA_PRICES = {
  monthly: 10,
  annual: 160,
};
