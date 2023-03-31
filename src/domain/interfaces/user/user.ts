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
