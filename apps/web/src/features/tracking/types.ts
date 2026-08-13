export interface RepairTrackingNote {
  id: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface RepairTrackingTimeline {
  id: string;
  status: string;
  note: string | null;
  createdAt: string;
}

export interface RepairTrackingData {
  ticketNumber: string;
  customerName: string;

  deviceType: string;
  deviceBrand: string | null;
  deviceModel: string | null;

  problemDescription: string;

  serviceMethod: string;
  municipality: string;

  preferredDate: string | null;
  preferredTime: string | null;

  status: string;

  createdAt: string;
  updatedAt: string;

  notes: RepairTrackingNote[];
  timeline: RepairTrackingTimeline[];
}

export interface TrackRepairResponse {
  success: boolean;
  data: RepairTrackingData;
}