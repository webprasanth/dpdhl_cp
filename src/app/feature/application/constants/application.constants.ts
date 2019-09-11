export class ApplicationConstants {
  static API_APPLIST = 'applications/getAllApplications';
  static API_APPBYID = 'applications/getApplicationById?id=';
  static API_APPCREATE = 'applications/createApplication';
  static API_APPUPDATE = 'applications/updateApplication';
  static API_APPDELETE = 'applications/deleteApplication?id=';
  static API_APPMAGE = 'blobStorage/readFileFromBlobStorage';
  static API_BULIST = 'businessunits/getAllbusinessunits';
  static API_APPUPLOAD = 'applications/createBulkApplications';

  static API_SEARCHBUUSER = 'https://graph.microsoft.com/beta/users';
  static API_ALLAPPLICATIONLISTBYEMAIL =
    'dashboard/getUserDetailsByEmail?email=';
  static API_UPDATEFAVORITE = 'dashboard/updateFavoriteApp';
  static App_Message = 'Application Created Successfully';
  static App_Updated_Message = 'Application Updated Successfully';
  static App_Deleted_Message = 'Application Deleted Successfully';
  static App_Bulkupload_Message = 'Applications Uploaded successfully';

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
      title: 'App Name',
      property: 'name',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Associated To',
      property: 'parent_name',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'App Owner',
      property: 'owner',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Creator Name',
      property: 'created_by',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Creation Date',
      property: 'onboarded_date',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: true
    },
    {
      title: 'Application Vertical',
      property: 'application_verticle',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Status',
      property: 'status',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Owner(s)',
      property: 'owners',
      width: 70,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Apps Owned',
      property: 'appsOwned',
      width: 70,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Last Login',
      property: 'lastLogin',
      width: 70,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Action',
      property: 'action',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    }
  ];
  static dataColumnOptionsBulkUpload = [
    {
      title: 'Row Selection',
      property: 'select',
      width: 70,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'App Name',
      property: 'appName',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Description',
      property: 'appDescription',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'App Owner',
      property: 'appOwner',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'App Owner Name',
      property: 'appOwnerName',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Group Name',
      property: 'appGroupName',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Created By',
      property: 'appCreatedBy',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Resource Group Name',
      property: 'resourceGroupName',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'URL',
      property: 'appurl',
      width: 70,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Status',
      property: 'appStatus',
      width: 70,
      visible: true,
      isNumber: false,
      isDate: false
    }
  ];
}
