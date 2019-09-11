export class NotificationConstants {
  static API_NOTIFICATIONLIST = 'notifications/getNotifications';
  static API_ALERTS =
    'https://management.azure.com/subscriptions/ed03d0f8-d22c-4c9d-b117-266f95c38df0/providers/Microsoft.AlertsManagement/alerts?api-version=2018-05-05';
  received_on: string;
  alert_name: string;
  state: string;
  description: string;
  static dataColumnOptions = [
    {
      title: 'Severity',
      property: 'severity',
      width: 10,
      visible: true,
      isNumber: false,
      isDate: false,
      isSeverity: true
    },
    {
      title: 'Alert Name',
      property: 'name',
      width: 400,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Date',
      property: 'received_on',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: true
    },
    {
      title: 'Description',
      property: 'description',
      width: 300,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Resource Name',
      property: 'resource',
      width: 300,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Resource Type',
      property: 'resourceType',
      width: 300,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'State',
      property: 'state',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    }
  ];
}
