export interface ApiResponse {
  help: string;
  success: boolean;
  result: Result;
}

export interface Result {
  include_total: boolean;
  limit: number;
  records_format: string;
  resource_id: string;
  total_estimation_threshold: null;
  records: ResponseRecord[];
  fields: Field[];
  _links: Links;
  total: number;
  total_was_estimated: boolean;
}

export interface ResponseRecord {
  _id: number;
  Id: number;
  Name: string;
  ShortDescription: string;
  FullDescription: string;
  VendorId: number;
  Vendor_Name: string;
  Product_Url: string;
  Address: string;
  City: string;
  Directions: string;
  Email: string;
  Notes_for_opening_hours: string;
  Office_Type: string;
  Opening_Hours: string;
  Phone: string;
  Region: string;
  URL: string;
  X: number;
  Y: number;
}

export interface Field {
  id: string;
  type: string;
}

export interface Links {
  start: string;
  next: string;
}
