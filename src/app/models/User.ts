import { BaseModel } from "./BaseModel";
import Address from "./Address";

export class User extends BaseModel {
  id!:any;
  first_name!:string;
  last_name!:string;
  email!:string;
  role!:string;
  cell_phone_number!:number;
  privacy_policy_terms?:number|null;
  profile_picture?:string|null;
  license_image?:string|null;
  email_verified?:boolean|number;
  verify_token?:string|null;
  is_active?:boolean|number;
  account_service_enabled?:boolean|number|null;
  gender?:string;
  date_of_birth?:any;
  age?:number;
  reset_token?:string|null;
  reset_token_expires?:any;
  stripe_user_id?:string|null;
  default_address?:Address;
  addresses:Address[]=[]

  
  constructor(){
    super();
  }

}
