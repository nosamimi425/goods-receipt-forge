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

export interface Person {
  name: string;
  jobTitle?: string;
  idNumber?: string;
}

export interface EquipmentItem {
  id: string;
  description: string;
  quantity: number;
  unit?: string;
  reference?: string;
  serialNumber?: string;
  notes?: string;
}

export interface ReceiptData {
  company: CompanyInfo;
  document: DocumentInfo;
  recipient: Person;
  issuer: Person;
  equipment: EquipmentItem[];
  confirmationText: string;
  notes?: string;
  recipientSignature?: string;
  issuerSignature?: string;
  stamp?: string;
}