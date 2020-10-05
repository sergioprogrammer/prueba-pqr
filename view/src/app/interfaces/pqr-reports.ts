export interface PqrReports {
  id?:number;
  name: string;
  last_name: string;
  address: string;
  desc?: string;
  phone_num: string;
  latitude: string;
  longitude: string;
  code?: string;
  date_picked?:Date;
  solution_date?:Date;
  known_reports_id: number;
  neighborhood_id: number;
  infrastructure_id: number;
  created_at?: Date;
  updated_at?:Date;
}
