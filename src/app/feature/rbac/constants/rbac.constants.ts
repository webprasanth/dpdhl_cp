export class RbacConstants {
  static API_RBACONFIGCLIST = 'roleBasedActivities/getRoles ';
  static API_USERGROUP =
    'roleBasedActivities/getUserGroupsWhichMappedAndNotAssociated ';
  static API_SAVECONFIG = 'roleBasedActivities/saveRolePrivilegesMapping';
  static API_RBACBYID =
    'roleBasedActivities/getRolePrivilegesMappingByRoleID?roleID=';
  static API_USERGROUPLIST = 'users/getUserGroups';
  static API_USERGROUPEDITNOTASSOCIATED =
    'roleBasedActivities/getUserGroupsWhichMappedAndNotAssociatedByUserGroupIDs';

  static API_APPLIST = 'applications/getAllApplications';
  static API_ROLES = 'roleBasedActivities/getRoles?category=';
  static API_ROLESID = 'roleBasedActivities/getRolesByAppID?appID=';
  static API_RESPONSIBILITY = 'roleBasedActivities/getActivities?activityType=';
  static API_RESPONSIBILITYID =
    'roleBasedActivities/getActivitiesByAppID?appID=';
  static API_ADDRESPONSIBILITY = 'roleBasedActivities/addActivities';
  static APP_CREATEROLES = 'roleBasedActivities/addRoles';
  static API_ADDSUBFUNCTION = 'roleBasedActivities/addSubActivities ';

  static API_UPDATEFAVORITE = 'dashboard/updateFavoriteApp';
  static API_RBACLIST = 'roleBasedActivities/getActivityRBAC';

  static API_TOPENTITIES =
    'roleBasedActivities/getTopLevelEntitiesAssociatedWithUserGroup';
  static API_ASSOCIATEDUSER =
    'roleBasedActivities/getAssociatedUserGroupByEntityID?entityID=';
  static API_ROLEMAP =
    'roleBasedActivities/getRoleMappingByUserGroupID?userGroupID=';
  static API_SAVEROLE = 'roleBasedActivities/saveRoleMappingToUserGroup';
  static API_CONFIGUREDROLES = 'roleBasedActivities/getConfiguredRoles';
  static API_PLATFROMBYID = 'roleBasedActivities/getRBACByRBACID';
  static API_DELETERBAC = 'roleBasedActivities/deleteRole?roleID=';

  static App_Message = 'Role Configured Successfully';
  static App_Updated_Message = 'APP Role updated Successfully';
  static App_Deleted_Message = 'APP Role Deleted Successfully';
  static APP_ROLE_MAPPED = 'App Role Mapped Successfully';

  static dataColumnOptions = [
    {
      title: 'Row Selection',
      property: 'select',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Role',
      property: 'role_name',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'User Group',
      property: 'user_group_name',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Read/View',
      property: 'read_access',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false,
      isRbac: true
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
  static rbacObj = [
    {
      role: 'dashboard',
      rights: [
        {
          user_count: false,
          device_count: false,
          user_distribution_Graph: false,
          device_status_Graph: false,
          device_distribution_Graph: false,
          application_owners_list: false,
          all_applications_list: false
        }
      ]
    },
    {
      role: 'business_Unit',
      rights: [
        {
          business_unit_list_view: false,
          onboard_business_unit: false,
          edit: false,
          delete: false,
          export: false
        }
      ]
    },
    {
      role: 'application',
      rights: [
        {
          application_list_view: false,
          onboard_application: false,
          edit: false,
          delete: false,
          export: false
        }
      ]
    },
    {
      role: 'device',
      rights: [
        {
          device_list_view: false,
          onboard_device: false,
          edit: false,
          delete: false,
          export: false
        }
      ]
    },
    {
      role: 'user',
      rights: [
        {
          user_list_view: false,
          onboard_user: false,
          edit: false,
          delete: false,
          export: false
        }
      ]
    },
    {
      role: 'entities',
      rights: [
        {
          entities_list_view: false,
          edit: false,
          delete: false,
          export: false
        }
      ]
    },
    {
      role: 'deviceConfig',
      rights: [
        {
          deviceConfig_list_view: false,
          edit: false,
          delete: false,
          export: false
        }
      ]
    }
  ];
}
