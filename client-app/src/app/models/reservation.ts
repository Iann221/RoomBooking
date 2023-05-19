export interface Reservation {
    id: string;
    roomId: string;
    roomName: string;
    dateTime: Date;
    endDateTime: Date;
    username: string;
    email: string;
    purpose: string;
    phoneNumber: string;
}