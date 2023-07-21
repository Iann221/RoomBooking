import { makeAutoObservable, reaction } from "mobx"
import { Reservation } from "../models/reservation"
import agent from "../api/agent"
import { ReservationFormValues, ReservationFormValuesAxios } from "../models/reservationFormValues"
import { store } from "./store"
import { router } from "../router/Routes"
import emailjs from '@emailjs/browser';

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
    // untuk pdf
    startFilter: Date | null = null
    endFilter: Date | null = null
    filteredReservations: Reservation[] = []
    // untuk send email
    emailTo: string = ""
    roomMap = new Map([
        ["569e3c9a-a0fc-476f-9556-4148d34ce915","Aula"	],
        ["5c10bcd2-ed55-41fa-a321-008094134f5a","Gereja St. Theodorus"	],
        ["6833f790-1dfe-4297-91b8-44c2f2c0023a","Ruang Rapat 1"	],
        ["958204df-458c-4cce-af02-e2dcbe912221","Ruang Rapat 2"	],
        ["2964b688-8534-413a-9cff-649bcd87438b","Aula"	],
        ["e056954a-d102-4959-9289-c6667ff0325e","Gereja St. Theodorus"	],
        ["11678bd4-9250-46cb-8a54-579fbaf6d1f2","Ruang Rapat 1"	],
        ["485fdf40-b6d8-4023-9224-217a5b62f4a9","Ruang Rapat 2"	],
    ])

    constructor() {
        makeAutoObservable(this)
        reaction(
            () => [this.startFilter,this.endFilter],
            () => {
                this.setFilteredReservations()
            }
        )
    }

    get axiosParams() {
        const params = new URLSearchParams()
        const tzoffset = (new Date()).getTimezoneOffset() * 60000;
        params.append('roomId',this.selectedRoomId!);
        params.append('selectedDate',(new Date(store.roomStore.selectedDate.getTime() - tzoffset)).toISOString());
        // params.append('selectedDate',(new Date(store.roomStore.selectedDate.getTime())).toISOString());
        console.log("load reservs date " + new Date(store.roomStore.selectedDate.getTime() - tzoffset).toISOString())
        return params;
    }

    sendEmail = (subject: string, body: string) => {
        emailjs.send("service_ak6rsik","template_1h5lnzg",{
            subject: subject,
            message: body,
            }, "7AXN-y1K3I1UEtGO4")
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
             }, function(error) {
                console.log('FAILED...', error);
             });
    }

    setFilteredReservations = () =>{
        if(this.startFilter != null && this.endFilter != null){
            var temptReserve = this.reservations
            const tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var startTime = new Date(
                    this.startFilter.getFullYear(),this.startFilter.getMonth(),
                    this.startFilter.getDate(), 0,0,0,0)
            startTime.setTime(startTime.getTime() - tzoffset)
            var endTime = new Date( 
                this.endFilter.getFullYear(),this.endFilter.getMonth(),
                this.endFilter.getDate(), 23,59,59,0)
            endTime.setTime(endTime.getTime() - tzoffset)   
            this.filteredReservations = temptReserve.filter(r => new Date(r.dateTime).getTime() >= startTime.getTime() && new Date(r.endDateTime).getTime() <= endTime.getTime())
            // this.filteredReservations = this.reservations
            console.log(startTime,endTime,new Date(this.reservations[0].dateTime).getTime(),this.filteredReservations.length);
        }
    }

    loadAllReservations = async () => {
        this.setLoadingAll(true);
        try {
            const allRes = await agent.Reservations.getAllReservations();
            var tempReserveCals = []
            var tempAllReserveations = []
            for (var res of allRes){
                tempReserveCals.push({
                    start: new Date(res.dateTime).toISOString().replace('Z',''),
                    end: new Date(res.endDateTime).toISOString().replace('Z','')
                  })
                  res.dateTime = new Date(new Date(res.dateTime).toISOString().replace('Z',''))
                  res.endDateTime = new Date(new Date(res.endDateTime).toISOString().replace('Z',''))
                  tempAllReserveations.push(res)
            }
            this.setReservations(tempAllReserveations)
            this.setCalendarReservations(tempReserveCals)

            if(store.userStore.role === "admin"){
                store.userStore.getAllUsers();
            }
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
                await agent.Reservations.reserve(newRes);
                this.sendEmail("Pembuatan reservasi",`${store.userStore.username} telah membuat reservasi baru: 
                ${store.roomStore.selectedDate.getFullYear()}/${store.roomStore.selectedDate.getMonth()+1}/${store.roomStore.selectedDate.getDate()}, 
                ${this.roomMap.get(rfv.roomId ?? "")}`)
            } else {
                await agent.Reservations.update(newRes)
                this.sendEmail("Pengubahan reservasi",`${store.userStore.username} telah mengubah reservasi
                ${store.roomStore.selectedDate.getFullYear()}/${store.roomStore.selectedDate.getMonth()+1}/${store.roomStore.selectedDate.getDate()}, 
                ${this.roomMap.get(rfv.roomId ?? "")}`)
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
            // if(store.userStore.role === "admin"){
            //     store.userStore.sendEmail(store.userStore.email ?? "",this.emailTo,"Penghapusan reservasi",`Admin telah menghapus reservasi Anda`)
            // } else {
            this.sendEmail("Penghapusan reservasi",`${store.userStore.username} telah menghapus reservasi`)
            // } 
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

    setStartFilter = (state: Date | null) => {
        this.startFilter = state
    }

    setEndFilter = (state: Date | null) => {
        this.endFilter = state
    }

    setEmailTo = (state: string) => {
        this.emailTo = state;
    }
}