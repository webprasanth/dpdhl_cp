export class ApplicationLogConstants {
  static API_LOGLIST =
    'https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/events/$all?timespan=P1D';

  static dataColumnOptions = [
    {
      title: 'Id',
      property: 'id',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Type',
      property: 'type',
      width: 200,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Count',
      property: 'count',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Logged Date',
      property: 'timestamp',
      width: 100,
      visible: true,
      isNumber: false,
      isDate: true
    }
  ];
}
