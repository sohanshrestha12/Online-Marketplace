export interface SellerUser {
  id: string;
  businessName: string;
  address: string;
  phNumber: string;
}
export interface UserProfile {
  username: string;
  gender: string;
  birthday: string;
  email: string;
  businessName?: string;
  address?: string;
  phNumber?: string;
}

export interface ChangePassword{
  confirmPassword:string,
  newPassword:string,
  currentPassword:string,
}
