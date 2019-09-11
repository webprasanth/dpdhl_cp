export interface IBusinessUnitList {
  created_by: string;
  created_date: string;
  description: string;
  icon_name: string;
  id: Number;
  modified_by: string;
  modified_date: string;
  name: string;
  owner: string;
  usergroup_name: string;
}

export interface IBusinessUnitForm {
  id?: Number;
  name: string;
  shortName: string;
  description: string;
  owner: string;
  modifiedDate: string;
  createdDate: string;
  createdBy?: string;
  modifiedBy?: string;
  userGroup: string;
  imgData?: string;
}
