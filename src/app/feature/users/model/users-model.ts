export interface IUsersList {
  first_name: string;
  email_id: string;
  mobile_number: string;
  designation: string;
  business_unit: string;
  application_name: string;
  application_id: number;
  business_unit_id: number;
  city: string
  country: string
  created_by: string
  created_date: number
  date_of_birth: number
}
export interface IUserForm {
  id: number;
  firstname: string;
  mobile_number: number;
  email: string;
  country: string;
  state: string;
  city: string;
  gender: string;
  pincode: string;
  street: string;
  entities: string;
  imgData: string;
  buID: string;
  appID: string;

}
