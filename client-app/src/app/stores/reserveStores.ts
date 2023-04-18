import { makeAutoObservable } from "mobx"
import { Reservation } from "../models/reservation"
import agent from "../api/agent"
import { ReservationFormValues, ReservationFormValuesAxios } from "../models/reservationFormValues"
import { store } from "./store"
import { router } from "../router/Routes"

export default class ReserveStore{
    reservations: Reservation[] = []
    calendarReservations: any[] = []
    loadingAll: Boolean = false
    // utk hlmn create:
    selectedRoomId: string | undefined = undefined
    loadingRoomRevs: Boolean = false
    selectedReservation: Reservation | undefined = undefined
    loadingSubmit: boolean = false
    // utk delete
    loadingDelete = false

    constructor() {
        makeAutoObservable(this)
    }

    get axiosParams() {
        const params = new URLSearchParams()
        const tzoffset = (new Date()).getTimezoneOffset() * 60000;
        params.append('roomId',this.selectedRoomId!);
        params.append('selectedDate',(new Date(store.roomStore.selectedDate.getTime() - tzoffset)).toISOString());
        console.log("load reservs date " + new Date(store.roomStore.selectedDate.getTime() - tzoffset).toISOString())
        return params;
    }

    loadAllReservations = async () => {
        this.setLoadingAll(true);
        try {
            const allRes = await agent.Reservations.getAllReservations();
            var tempReserveCals = []
            this.setReservations(allRes)
            for (var res of allRes){
                tempReserveCals.push({
                    start: res.dateTime,
                    end: res.endDateTime
                  })
            }
            this.setCalendarReservations(tempReserveCals)
        } catch(error) {
            console.log(error);
        } finally {
            this.setLoadingAll(false);
        }
    }

    loadSelectedReservation = (id: string) => {
        let sreservation = this.getReservation(id)
        if(sreservation){
            this.selectedReservation = sreservation
        }
        return sreservation
    }

    loadRoomReservation = async (roomId: string) => {
        this.setLoadingRoom(true);
        this.setSelectedRoomId(roomId);
        try {
            const roomRes = await agent.Reservations.getRoomReservations(this.axiosParams);
            this.setReservations(roomRes);
        } catch(error) {
            console.log(error);
        } finally {
            this.setLoadingRoom(false);
        }
    }

    private getReservation = (id: string) => {
        // gonna return activity jika idnya ada ato undefined
        return this.reservations.find(o => o.id === id);
    }

    createOrEditReservation = async (rfv: ReservationFormValues, isCreate: Boolean) => {
        this.setLoadingSubmit(true)
        const tzoffset = (new Date()).getTimezoneOffset() * 60000;
        var startTime = new Date(
                store.roomStore.selectedDate.getFullYear(),store.roomStore.selectedDate.getMonth(),
                store.roomStore.selectedDate.getDate(), rfv.reserveTime,0,0,0)
        startTime.setTime(startTime.getTime() - tzoffset)
        var endTime = new Date(
            store.roomStore.selectedDate.getFullYear(),store.roomStore.selectedDate.getMonth(),
            store.roomStore.selectedDate.getDate(), rfv.endReserveTime,0,0,0)
        endTime.setTime(endTime.getTime() - tzoffset)

        let newRes: ReservationFormValuesAxios = {
            id: rfv.id,
            roomId: rfv.roomId,
            reserveTime: startTime,
            endReserveTime: endTime,
            purpose: rfv.purpose
        }

        try {
            if(isCreate){
                console.log("create reservation store " + JSON.stringify(newRes))
                await agent.Reservations.reserve(newRes);
            } else {
                await agent.Reservations.update(newRes)
            }
            router.navigate(`/rooms/${rfv.roomId}`)
        } catch(error) {
            console.log("error saat create res" + error);
            throw error;
        } finally {
            this.setLoadingSubmit(false)
        }
    }

    deleteReservation = async (id: string) => {
        this.setLoadingDelete(true)
        try {
            await agent.Reservations.delete(id);
            this.setReservations([...this.reservations.filter(a => a.id !== id)])
        } catch (error) {
            console.log(error)
        } finally {
            this.setLoadingDelete(false)
        }
    }

    setReservations = (state: Reservation[]) => {
        this.reservations = state
    }

    setCalendarReservations = (state: any[]) => {
        this.calendarReservations = state
    }

    setLoadingAll = (state: boolean) => {
        this.loadingAll = state
    }

    setLoadingRoom = (state: boolean) => {
        this.loadingRoomRevs = state
    }

    setLoadingDelete = (state: boolean) => {
        this.loadingDelete = state
    }

    setLoadingSubmit = (state: boolean) => {
        this.loadingSubmit = state
    }

    setSelectedRoomId = (state: string) => {
        this.selectedRoomId = state
    }

    clearSelectedRoomId = () => {
        this.selectedRoomId = undefined
    }
}