export type UserProfileToken = {
  [x: string]: string;
    userName: string; 
    email: string;    
    token: string;
role: string;
}

export type UserProfile = {
    userName: string;
    email: string;
   role: string;
}