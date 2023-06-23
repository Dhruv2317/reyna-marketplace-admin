import { BaseModel } from "./BaseModel";

export default class Address extends BaseModel {
  contact_name!: string;
  contact_number!: string;
  user_address_type!: string;
  address_line_1!: string;
  address_line_2?: string|null=null;
  landmark?:string|null=null;
  zip_code!: string;
  state!: string;
  city!:string;
  address_type!: string;
  state_id?:any;
  constructor(){
    super();
  }
}
