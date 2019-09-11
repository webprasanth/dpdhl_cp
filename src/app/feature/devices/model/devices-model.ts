export class IDeviceList {
  device_health: string;
  device_name: string;
  device_owner: string;
  device_spec_id: 1;
  dhl_device_id: string;
  id: number;
  iot_ready: boolean;
  is_exists: boolean;
  mac_address: string;
  onboarded_by: string;
  onboarded_date: string;
  power_type: string;
  protocol: string;
  serial_number: string;
  uuid: string;
}
export class IDeviceForm {
  id?: Number;
  dhlDeviceID?: Number;
  uuID: string;
  serialNumber: number;
  macAddress: string;
  deviceName: string;
  status: string;
  protocol: string;
  deviceHealth: string;
  onboardedBy: string;
  deviceOwner: string;
  powerType: string;
  appIDs: string;
  iotReady: boolean;
  deviceSpecID: number;

}