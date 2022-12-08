export enum User2FA{
  sms_otp = 1,
  email_otp = 2,
  google_authenticator = 3
}
export interface User
{
  uid:string;
  firstname: string;
  lastname: string;
  email:string;
  password:string;

}

export interface LoginHistory
{
  agent?: string
  created_at?: Date
  ip?: string
  os:string
}

export interface AdditionalInfo
{
  zip_code: string,
  phone_number: string,
  email: string,
  address: string,
  user_name?: string,
  birth_date?:any
}
export interface UserInfo{
  email?: string
  national_id?: string
  is_verify?:boolean,
  phone_number?: string//
  user_name?: string
  avatar_id?: string
  mobile_number?: string,//old field name=phone_number
  full_name?:string,//old field name=user_name
  zip_code?:string,
  birth_date?:Date,
  address?:string,
  fav_markets?:string[],
  kyc_level?:number,
  referral_code?:string,
  email_verify?:boolean
}

