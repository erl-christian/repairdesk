export interface RepairRequest {
  id: string;
  publicTicketNumber: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  problemDescription: string;
  serviceMethod: string;
  municipality: string;
  preferredDate: string | null;
  preferredTime: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface RepairRequestsResponse {
  success: boolean;
  repairRequests: RepairRequest[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface GetRepairRequestsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}