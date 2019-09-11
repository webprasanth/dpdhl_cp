export class EntityConstants {
  static API_GETENTITY = 'entity/getEntity';
  static API_GETCHILDENTITY = 'entity/getEntityMetadataByEntityID?entityID=';
  static API_CREATEENTITY = 'entity/createEntity';
  static API_ENTITYBYID = 'entity/getEntityForEdit?entityID=';
  static API_UPDATEENTITY = 'entity/updateEntity';
  static API_GETROOTENTITY = 'associations/getEntityParentsForAngular';
  static API_DELETEENTITY = 'entity/deleteEntity';

  static API_GETENTITYMETABYID = 'entity/getEntityMetadataByEntityID?entityID=';

  static CONST_CREATEENTITYSUCCESS = 'Entity Created Successfully';

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
      title: 'Entity Name',
      property: 'entity_name',
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
      title: 'Created By',
      property: 'created_by',
      width: 80,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Created Date',
      property: 'created_date',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: true
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
      title: 'Action',
      property: 'action',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    }
  ];
}
