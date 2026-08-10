export type ServiceMethod =
  | "TECHNICIAN_VISITS_CUSTOMER"
  | "CUSTOMER_VISITS_TECHNICIAN";

export interface CreateRepairRequestData {
  customerName: string;
  phoneNumber: string;
  email?: string;
  deviceType: string;
  deviceBrand?: string;
  deviceModel?: string;
  problemDescription: string;
  serviceMethod: ServiceMethod;
  municipality: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface CreateRepairRequestResponse {
  success: boolean;
  data: {
    id: string;
    publicTicketNumber: string;
  };
}