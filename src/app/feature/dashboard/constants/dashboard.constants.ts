export class DashboardConstants {
  static API_ALLAPPLICATIONLIST = 'users/getUserByID?id=';
  static API_QUICKLINKS = 'dashboard/getCounts?email=';
  static API_QUICKLINKSNEW = 'dashboard/getCountsNew';
  static API_ALLAPPLICATIONLISTBYEMAIL =
    'dashboard/getUserDetailsByEmail?email=';
  static API_UPDATEFAVORITE = 'dashboard/updateFavoriteApp';
  static API_APPOWNER = 'dashboard/getAppOwners';
  static API_APPLASTLOGIN = 'Users/updateUserLastLogin';
  static API_USERGRAPH_DATA = 'dashboard/getAppUsersCountforGraphNew';
  static API_DEVICEGRAPH_DATA = 'dashboard/getAppDevicesCountforGraphNew';

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
      title: 'BU Name',
      property: 'buname',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'App Owner',
      property: 'owner',
      width: 100,
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
      title: 'App Group Name',
      property: 'group_name',
      width: 400,
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
      property: 'appdata',
      width: 300,
      visible: true,
      isNumber: false,
      isDate: false,
      isAppsOwned:true
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
  static nvd3TestData1 = [
    {
      values: [{ x: 0, y: 0 }, { x: 1, y: 0 }],
      // key: 'Active Device'
    },
    {
      values: [{ x: 0, y: 0 }, { x: 1, y: 0 }],
      // key: 'Inactive Device'
    }
  ];
}
