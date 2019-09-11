export class BusinessUnitConstants {
  static API_BULIST = 'businessunits/getAllbusinessunits';
  static API_BUBYID = 'businessunits/getBusinessUnitByID?id=';
  static API_BUCREATE = 'businessunits/createBusinessUnit';
  static API_BUUPDATE = 'businessunits/updateBusinessUnit';
  static API_BUDELETE = 'businessunits/deleteBusinessUnit?id=';
  static API_BUIMAGE = 'blobStorage/readFileFromBlobStorage';
  static API_BUALLLIST = 'businessunits/getAllBusinessUnits';

  static API_SEARCHBUUSER = 'https://graph.microsoft.com/beta/users';
  static API_GETBUGROUPS = 'https://graph.microsoft.com/beta/groups';

  static BU_Message = 'BU Created Successfully';
  static BU_Updated_Message = 'BU Updated Successfully';
  static BU_Deleted_Message = 'Business Unit Deleted Successfully';
  static dataColumnOptions = [
    {
      title: 'Row Selection',
      property: 'select',
      width: 70,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Name',
      property: 'name',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Description',
      property: 'description',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Owner',
      property: 'owner',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Created Date',
      property: 'created_date',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: true
    },
    {
      title: 'Created By',
      property: 'created_by',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    // {
    //   title: 'User Group Name',
    //   property: 'usergroup_name',
    //   width: 200,
    //   visible: true,
    //   isNumber: false,
    //   isDate: false
    // },
    {
      title: 'Action',
      property: 'action',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    }
  ];

  static CONST_CREATESUCCESSMSG = 'Business Unit Created Successfully';
}
