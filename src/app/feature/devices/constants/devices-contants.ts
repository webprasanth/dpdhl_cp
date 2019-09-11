export class DeviceConstant {
  static API_DEVICELIST = 'devices/getAllDevices';
  static API_CREATEDEVICE = 'devices/createDeviceInfo';
  static API_UPDATEDEVICE = 'devices/updateDeviceInfo';
  // static API_DEVICEBYID = 'devices/getDeviceByID?id=';
  static API_DEVICEBYID =
    'devices/getDeviceMetaDataByDeviceGroupID?deviceGroupID=';
  static API_DEVICEDELETE = 'devices/deleteDevice?id=';
  static API_DEVICEGROUPDELETE = 'devices/deleteDeviceGroup?id=';
  static API_DEVICEUPLOAD = 'devices/createBulkDevices';
  static API_ONBOARDDEVICE = 'devices/createDevicesWithDeviceGroupsForAngular';
  static API_GETDEVICESBYTYPE = 'devices/getDeviceTypes';
  static API_GETDEVICEGROUP = 'devices/getDeviceGroups';

  static Device_Message = 'Device Created Successfully';
  static Device_Updated_Message = 'Device Updated Successfully';
  static Device_Deleted_Message = 'Device Deleted Successfully';

  static API_GETENTITY = 'entity/getEntity?email=';
  static API_GETCHILDENTITY = 'entity/getEntityMetadataByEntityID?entityID=';
  static API_CREATEDEVICEGROUP =
    'devices/createDevicesWithDeviceGroupsForAngular';

  static API_GETSERVICEPROVIDER = 'devices/getDeviceSpec';

  static CONST_CREATEDEVICESUCCESS = 'Device Group Created Successfully';

  static CONST_GETDEVICESBYDEVICETYPE = 'devices/getDevicesByDeviceTypeID';
  static CONST_GETDEVICESBYGROUPID = 'devices/getDevicesByDeviceGroupID';

  static API_CHECKDEVICEEXIST = 'devices/checkDevicesAlreadyExistInDeviceGroup';
  static API_DEVICEONASSET = 'devices/getDevicesFromOnAsset';
  static API_DEVICENFC = 'devices/getDevicesFromNFC';
  static API_DEVICEROAMBEE = 'devices/getDevicesFromRoambee';

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
      title: 'Device Type',
      property: 'device_type_name',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Status',
      property: 'is_exists',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Added By',
      property: 'modified_by',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Added Date',
      property: 'modified_date',
      width: 100,
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

  static dataColumnOptionsGroup = [
    {
      title: 'Row Selection',
      property: 'select',
      width: 70,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Device Type',
      property: 'device_type_name',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Device Group',
      property: 'device_group_name',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Service Provider',
      property: 'service_provider',
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
      title: 'Status',
      property: 'is_exists',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Added By',
      property: 'created_by',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Added Date',
      property: 'created_date',
      width: 100,
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
}
