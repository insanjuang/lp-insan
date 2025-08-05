export interface FontteMessageRequest {
  target: string | string[];
  message: string;
  countryCode?: string;
  file?: string;
  delay?: number;
  schedule?: string;
}

export interface FontteMessageResponse {
  status: boolean;
  message: string;
  id?: string;
  detail?: any;
}

export interface FontteApiError {
  status: boolean;
  message: string;
  reason?: string;
}

export interface FontteDeviceStatus {
  device: string;
  status: string;
  expired: string;
  package: string;
}