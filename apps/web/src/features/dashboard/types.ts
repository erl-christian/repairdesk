export interface DashboardStats {
  totalRequests: number;
  pendingReview: number;
  inProgress: number;
  waitingParts: number;
  readyForPickup: number;
  completed: number;
  cancelled: number;
}

export interface DashboardStatsResponse {
  success: boolean;
  data: DashboardStats;
}

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
}