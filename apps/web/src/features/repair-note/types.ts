export interface RepairNote {
  id: string;
  repairRequestId: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface RepairNotesResponse {
  success: boolean;
  data: RepairNote[];
}

export interface CreateRepairNoteResponse {
  success: boolean;
  data: RepairNote;
}

export interface CreateRepairNotePayload {
  note: string;
}