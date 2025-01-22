export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Table {
  id: string;
  tableNumber: number;
  capacity: number;
  isAvailable: boolean;
}

export interface Reservation {
  id: string;
  userId: string;
  tableId: string;
  date: string;
  time: string;
  partySize: number;
  status: 'confirmed' | 'cancelled' | 'pending';
}