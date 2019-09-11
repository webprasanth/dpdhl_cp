export class AssociationsConstants {
  static API_ASSOCIATIONSLIST = 'associations/getAssociations';
  static API_GETUSERSGROUP = 'users/getUsersByUserGroupID?userGroupID=';
  static API_GETDEVICEGROUP =
    'devices/getDevicesByDeviceGroupID?deviceGroupID=';
  static API_GETASSOCIATION = 'associations/getAssociationsForAngular';
  static API_POSTASSOCIATIONENTITY = 'associations/getEntityParentsForAngular';
  static API_GETASSOCIATIONENTITY = 'entity/getEntityForEdit';

  static API_BUALLLIST = 'businessunits/getAllBusinessUnits';

  static API_GETENTITYCHILDREN = 'associations/getEntityChildrensForAngular';

  static API_GETALLASSOCIATIONBYENTITY =
    'associations/getAllAssociationsByEntityID';

  static API_GETALLUSERGROUPS =
    'users/getAllUserGroupsNotAssociatedForCurrentEntity';

  static API_ASSOCIATEUSERGROUP = 'users/associateUserGroup';

  static API_GETTOPLEVELENTITIES = 'associations/getTopLevelEntities';

  static API_ASSOCIATEDEVICEGROUP = 'devices/associateDeviceGroup';

  static API_GETDEVICEGROUPNOTASSOCIATED =
    'devices/getAllDeviceGroupsNotAssociated';

  static API_DEASSOCIATEENTITY = 'associations/deAssociateEntity';

  static API_GETNOTASSOCIATEDAPPLICATION =
    'applications/getNotAssociatedApplications';

  static API_ASSOCIATEAPPLICATION = 'applications/associateApplication';
  static API_GETALLUSERSBYGROUP = 'users/getUsersByUserGroupID?userGroupID=';
  static API_GETALLDEVICESBYGROUP =
    'devices/getDeviceMetaDataByDeviceGroupID?deviceGroupID=';

  static dataColumnOptionsUserList = [
    {
      title: 'Name',
      property: 'first_name',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Email ID',
      property: 'email_id',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Created by',
      property: 'created_by',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Last login',
      property: 'last_login',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: true
    },
    {
      title: 'Active',
      property: 'is_exists',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: true
    }
  ];
}
