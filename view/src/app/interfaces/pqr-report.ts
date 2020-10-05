export interface PqrReport {
  id?:number;
  address:string;
  created_at:string;
  desc?:string;
  inf_name:string;
  issue:string;
  last_name:string;
  name:string;
  ne_name:string;
  phone_num:string;
  code?:string;
  latitude: string;
  longitude: string;
  date_picked?:Date;
  solution_date?:Date;
  neighborhood_id?:number;
  known_reports_id?:number;
  infrastructure_id?:number;
}
