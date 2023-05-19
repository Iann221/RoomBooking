import moment from "moment";
import { Reservation } from "./reservation";

export class ReservationFormValuesAxios {
    id?: string = undefined
    roomId?: string = undefined;
    reserveTime: Date | null = null;
    endReserveTime: Date | null = null;
    purpose: string = '';

    constructor(reservation?: ReservationFormValues) {
        if(reservation){
            this.id = reservation.id;
            this.roomId = reservation.roomId;
            this.reserveTime =  new Date(new Date().setHours(reservation.reserveTime!,0,0,0));
            this.endReserveTime = moment().local().startOf('day').add(reservation.endReserveTime,'hours').toDate();
            this.purpose = reservation.purpose;
        }
    }
}

export class ReservationFormValues {
    id?: string = undefined
    roomId?: string = undefined;
    reserveTime?: number = undefined;
    endReserveTime?: number = undefined;
    purpose: string = '';

    constructor(reservation?: Reservation) {
        if(reservation){
            this.id = reservation.id;
            this.roomId = reservation.roomId;
            this.reserveTime = new Date(new Date(reservation.dateTime).getTime() + (new Date()).getTimezoneOffset()*60000).getHours();
            this.endReserveTime = new Date(new Date(reservation.endDateTime).getTime() + (new Date()).getTimezoneOffset()*60000).getHours();
            this.purpose = reservation.purpose;
        }
    }
}

