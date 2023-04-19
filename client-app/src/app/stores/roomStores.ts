import { makeAutoObservable, reaction } from "mobx";
import { Room } from "../models/room";
import agent from "../api/agent";

export default class RoomStore {
    rooms: Room[] = []
    selectedDate: Date = new Date(new Date().setHours(0,0,0,0)); 
    loading: boolean = false
    hasSelectedDate: boolean = false

    constructor() {
        makeAutoObservable(this)
        reaction(
            () => this.selectedDate,
            () => {
                this.loadRooms()
            }
        )
    }

    get axiosParams() {
        const params = new URLSearchParams()
        const tzoffset = (new Date()).getTimezoneOffset() * 60000;
        params.append('selectedDate',(new Date(this.selectedDate.getTime() - tzoffset)).toISOString());
        console.log("loadroom date " + (new Date(this.selectedDate.getTime() - tzoffset)).toISOString())
        return params;
    }

    loadRooms = async () => {
        this.setLoading(true);
        try {
            const result = await agent.Rooms.getRooms(this.axiosParams);
            this.setRooms(result)
        } catch(error) {
            console.log(error);
        } finally {
            this.setLoading(false);
        }
    }

    setLoading = (state: boolean) => {
        this.loading = state
    }

    setRooms = (state: Room[]) => {
        this.rooms = state
    }

    setDate = (state: Date) => {
        this.selectedDate = state
    }
    
    setHasSelectedDate = (state: boolean) => {
        this.hasSelectedDate = state
    }

}