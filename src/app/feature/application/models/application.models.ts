export interface IApplicationList {
  bu_id: Number;
  buname: String;
  created_by: String;
  description: String;
  group_name: String;
  icon_name: String;
  id: Number;
  is_exists: Boolean;
  modified_by: String;
  modified_date: String;
  name: String;
  onboarded_date: String;
  owner: String;
  resource_group_id: String | Number;
  resource_group_name: String;
  status: String;
}

export interface IApplicationForm {
  id: number;
  buID: Number;
  appName: String;
  appOwner: String;
  appStatus: string;
  appGroupName: string;
  appCreatedBy: string;
  appDescription: string;
  filePath?: String;
  resourceGroupName?: String;
  imgData: string;
  appOwnerName: string;
  parentID?: Number;
  parentName?: string;
  parentType?: string;
  url?: string;

  // bu_id: Number;
  // buname: String;
  // description: String;
  // owner: String;
  // createdBy?: String;
  // group_name?: String;
  // onboarded_date: String;
  // icon_name?: String;
}
