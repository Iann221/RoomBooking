export interface User {
    id: string;
    token: string;
    username: string;
    role: string;
    email: string;
}

export interface UserFormValues {
    email?: string;
    password?: string;
    username?: string;
    phonenumber?: string;
    bidang?: string;
    role?: string;
}