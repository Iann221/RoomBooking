import { Reservation } from "./reservation";

export interface Room {
    id: string;
    title: string;
    description: string;
    reservations: Reservation[];
}