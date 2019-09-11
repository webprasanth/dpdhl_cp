export class AppConstants {
  static API_GETTOKEN =
    'https://dhlcp-b2b-externaluserappservice.azurewebsites.net/api/getToken';
  static API_GETTOKENRESOURCE = 'azure/fetchAccessToken';
  static API_GETTOKENBU = '/azure/fetchAccesstokenFromGraph';
  static API_MENU = 'dashboard/getMenu';
  static API_APPOWNER = 'dashboard/getAppOwners';
  static API_ALLAPPLICATIONLISTBYEMAIL =
    'dashboard/getUserDetailsByEmail?email=';
  static API_NOTIFICATIONLIST = 'notifications/getNotifications';
  static API_ALERTS =
    'https://management.azure.com/subscriptions/ed03d0f8-d22c-4c9d-b117-266f95c38df0/providers/Microsoft.AlertsManagement/alerts?api-version=2018-05-05';
  static NOTIFICATION_DATA = [
    {
      icon: 'fa-exclamation-triangle',
      title: 'Nurman Tri Gumler',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incidie magna al'
    },
    {
      icon: 'fa-exclamation-triangle',
      title: 'Nurman Tri Gumler',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incidie magna al'
    },
    {
      icon: 'fa-exclamation-triangle',
      title: 'Nurman Tri Gumler',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incidie magna al'
    }
  ];
}
