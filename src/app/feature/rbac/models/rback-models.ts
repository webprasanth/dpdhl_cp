export interface IRbacForm {
    roles: string;
    responsibilities: string;
    subFunctionalities: string;
    appname: string;
}
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