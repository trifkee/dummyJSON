import { TUser } from "../../../ui/Pages/EditProfile";

export interface User{
   id: number,
   username:string, 
   image:string,
   firstName: string, 
   lastName: string,
   email: string,
}

export interface UserLoginRequest {
   username:string,
   password: string,
}

export interface UpdateUser {
   key?:string,
   url:string,
   body: TUser | null
}