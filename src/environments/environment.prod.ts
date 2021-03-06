export const environment = {
  production: true,
  appInsights: {
    instrumentationKey: '44763b7f-b0f1-4cf4-8f1a-28454f8f0ca3'
  }
};
export const AD_CONFIG = {
  tenant: 'dpdhl.onmicrosoft.com',
  clientId: 'de21588f-0dc0-4133-8530-22443ca5eadd', // application ID
  // redirectUri: 'http://localhost:5000',
  redirectUri: 'https://dhliotplatform-uat.azurewebsites.net',
  postLogoutRedirectUri: 'https://dhliotplatform-uat.azurewebsites.net'
};
export const API = {
  mapUserRoles:
    'https://dpdhl-commonplatform-fa-prod.azurewebsites.net/api/MapUserRoles',
  getAssignableRoles:
    'https://dpdhl-commonplatform-fa-prod.azurewebsites.net/api/GetGroupsUnderAdmin',
  validateUser:
    'https://dpdhl-commonplatform-fa-prod.azurewebsites.net/api/ValidateUser',
  getRoles:
    'https://dpdhl-commonplatform-fa-prod.azurewebsites.net/api/GetUserGroups',
  apiUrl: 'https://cpapiapp-uat.azurewebsites.net/api/beta/',
  UC1: {
    url: 'http://localhost:3000/#/login',
    title: 'CSI Track and Trace',
    description:
      'The application allows you to track and trace various shipments that have sensors associated with them.'
  },
  UC3: {
    url: 'http://localhost:4200/#/login',
    title: 'GBS Smart Energy Reporting',
    description:
      'This application used for storing, analyzing and providing analytics of the energy consumption data at DHL UK site.'
  },
  UC4: {
    url: 'http://localhost:8080/#/login',
    title: 'PnP Customer Satisfaction',
    description:
      // tslint:disable-next-line:max-line-length
      'This application gives the overview of the Customer feedback ratings for different stores and feedback device types with traffic and weather information.'
  }
};
