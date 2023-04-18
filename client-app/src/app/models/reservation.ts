export interface Reservation {
    id: string;
    roomId: string;
    dateTime: Date;
    endDateTime: Date;
    username: string;
    purpose: string;
}