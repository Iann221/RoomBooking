export interface User {
    token: string;
    username: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    username?: string;
}