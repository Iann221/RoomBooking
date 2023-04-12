import { makeAutoObservable, reaction } from "mobx";
import { Room } from "../models/room";
import agent from "../api/agent";

export default class RoomStore {
    rooms: Room[] = []
    selectedDate: Date = new Date("2023-04-19"); 
    loading: boolean = false

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
        params.append('selectedDate',this.selectedDate.toISOString());
        return params;
    }

    loadRooms = async () => {
        console.log("load rooms")
        this.setLoading(true);
        try {
            const result = await agent.Rooms.getRooms(this.axiosParams);
            this.setRooms(result)
            this.setLoading(false);
        } catch(error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setLoading = (state: boolean) => {
        this.loading = state
    }

    setRooms = (state: Room[]) => {
        this.rooms = state
    }
}