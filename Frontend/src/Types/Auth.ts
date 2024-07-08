export interface RegisterUser{
    email:string,
    username:string,
    password:string,
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface User{
  _id:string;
  username:string;
  email:string;
  role:string;
  profileImage?:string;
  birthday?:string;
  gender?:string; 
  businessName?:string;
  address:string;
  phNumber:string;
}

export interface SellerUser {
  id?:string;
  businessName: string;
  address: string;
  phNumber: string;
}
export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser:(user:User)=>void;
}
