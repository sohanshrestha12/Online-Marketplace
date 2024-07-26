export interface ProfileTypes {
  email: string;
  username: string;
  birthday: string;
  gender: string;
  businessName?: string;
  address?: string;
  phNumber?: string;
}

export interface Profile {
  _id: string;
  username: string;
  email: string;
  role: string;
  profileImage:string;
  isVerified: boolean;
}


export interface ChangeUserPassword{
  currentPassword:string,
  newPassword:string,
  confirmPassword:string,
}