import { Timestamp } from "firebase/firestore";

export interface BookingItemType {
  bookingDate: number;
  name: string;
  address: string;
  place: string;
  date: string;
  createdAt: number;
  updatedAt: number;
  id: string;
  phone: string;
}
