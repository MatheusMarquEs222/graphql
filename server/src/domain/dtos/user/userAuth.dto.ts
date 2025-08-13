import { USER_ROLE } from "../../services";

export interface IRegisterUserDTO { 
    name: string; 
    email: string; 
    password: string; 
    role?: USER_ROLE; 
}

export interface ILoginDTO { 
    email: string; 
    password: string; 
}

export interface IUpdateUserDTO { 
    name?: string; 
    role?: USER_ROLE; 
    password?: string; 
}