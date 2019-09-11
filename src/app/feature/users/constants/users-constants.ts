export class UserConstant {
  static API_USERLIST = 'users/getAllUsers';
  static API_USERUSERBYID = 'users/getUserByID?id=';
  static API_USERDELETE = 'users/deleteUser?id=';
  static API_USERUPDATE = 'users/updateUser';
  static API_BULIST = 'businessunits/getAllbusinessunits';
  static API_GETIMMEDIATECHILD = 'associations/getEntityChildrens';
  // static API_CREATENEWUSERGROUP = 'users/createUsersWithUserGroups';
  static API_CREATENEWUSERGROUP = 'users/createUsersWithUserGroupsForAngular';
  static API_USERUPLOAD = 'users/createBulkUsersWithUserGroup';
  static API_CHECKUSERGROUP =
    'Users/getUserGroupByUserGroupName?userGroupName=';
  static API_APPLIST = 'applications/getAllApplications';

  static API_USERGROUPLIST = 'users/getUserGroups';

  static API_GETUSERSGROUPBYID = 'users/getUsersByUserGroupID?userGroupID=';
  static API_DELETEUSERSGROUPBYID = 'users/deleteUserGroup?id=';

  static API_SEARCHBUUSER = 'https://graph.microsoft.com/beta/users';
  static User_Message = 'User Created Successfully';
  static User_Updated_Message = 'User Updated Successfully';
  static User_Deleted_Message = 'User Deleted Successfully';
  static User_Bulkupload_Message = 'User Uploaded Successfully';
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
      title: 'User Name',
      property: 'first_name',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'User Email',
      property: 'email_id',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'User Group',
      property: 'user_group_name',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'BU Name',
      property: 'business_unit',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'App Name',
      property: 'application_name',
      width: 100,
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
  static dataColumnOptionsUserGroup = [
    {
      title: 'Row Selection',
      property: 'select',
      width: 70,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'User Group Name',
      property: 'user_group_name',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Role Name',
      property: 'role_name',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Associated To',
      property: 'parent_name',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Active',
      property: 'is_exists',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Created By',
      property: 'created_by',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Created On',
      property: 'created_date',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: true
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

  static dataColumnOptionsUserGroupView = [
    {
      title: 'Row Selection',
      property: 'select',
      width: 70,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'User Name',
      property: 'first_name',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Email ID',
      property: 'email_id',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Associated To',
      property: 'parent_name',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Active',
      property: 'is_exists',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Created By',
      property: 'created_by',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Created On',
      property: 'created_date',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: true
    }
  ];
}
