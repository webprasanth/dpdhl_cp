export class ConfigurationConstants {
  static API_GETDEVICESPEC = 'devices/getDeviceSpec';
  static API_GETDEVICESPECBYID = 'devices/getDeviceSpecByID?id=';
  static API_CREATEDEVICESPEC = 'devices/createDeviceSpec';
  static API_UPDATEDEVICESPEC = 'devices/updateDeviceSpec';

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
      title: 'Service Provider',
      property: 'service_provider',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'API URL',
      property: 'api_url',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Protocol',
      property: 'protocol',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'IOT Ready',
      property: 'is_iot_ready',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Power Enabled',
      property: 'is_power_enabled',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Battery Enabled',
      property: 'is_battery_enabled',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Creator By',
      property: 'created_by',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Creation Date',
      property: 'created_date',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: true
    },
    {
      title: 'App Group Name',
      property: 'group_name',
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
}
