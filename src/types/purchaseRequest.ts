export interface CompanyInfo {
  name: string;
  registrationNumber?: string;
  address1: string;
  address2?: string;
  phone?: string;
  email?: string;
  logo?: string;
}

export interface DocumentInfo {
  place: string;
  date: string;
  number: string;
}

export interface Requester {
  name: string;
  department: string;
}

export interface RequestedItem {
  id: string;
  itemName: string;
  technicalSpecs: string;
  quantity: number;
  unit?: string;
  observation?: string;
}

export interface PurchaseRequestData {
  company: CompanyInfo;
  document: DocumentInfo;
  requester: Requester;
  requestedItems: RequestedItem[];
  notes?: string;
  requesterSignature?: string;
  departmentHeadSignature?: string;
  purchasingManagerSignature?: string;
}