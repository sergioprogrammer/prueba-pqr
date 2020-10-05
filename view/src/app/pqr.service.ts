import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Infrastructures } from './interfaces/infrastructures';
import { Neighborhoods } from './interfaces/neighborhoods';
import { KnownReports } from './interfaces/known-reports';
import { PqrReports } from "./interfaces/pqr-reports";
import { PqrReport } from "./interfaces/pqr-report";
import { NeighborhoodReport } from "./interfaces/neighborhood-report";
import { MonthlyReports } from './interfaces/monthly-reports';
import { CurrentMonthIssues } from "./interfaces/current-month-issues";

@Injectable({
  providedIn: 'root',
})
export class PqrService {
  //apiUrl: string = 'http://127.0.0.1:8000/';
  apiUrl: string = 'https://gtikusfc.lucusvirtual.es/';

  constructor(private http: HttpClient) {}
  /**
   * Lista de infraestructuras
   */
  getInfrastructures() {
    return this.http.get<Infrastructures[]>(`${this.apiUrl}infrastrcucture`);
  }

  getNeighborhoods(){
    return this.http.get<Neighborhoods[]>(`${this.apiUrl}neighborhood`);
  }

  getKnownReports(){
    return this.http.get<KnownReports[]>(`${this.apiUrl}known-reports`);
  }

  getPqrReports(){
    return this.http.get<PqrReports[]>(`${this.apiUrl}pqr-reports`);
  }

  createPqr(data){
    let headers = new HttpHeaders;
    return this.http.post<PqrReports[]>(`${this.apiUrl}pqr-reports`, data, {headers});
  }

  getPqrReport(id){
    return this.http.get<PqrReport>(`${this.apiUrl}getAReport/${id}`);
  }

  getNeighborhoodReports(){
    return this.http.get<NeighborhoodReport[]>(`${this.apiUrl}reportsNH`);
  }

  getMontlyReports(){
    return this.http.get<MonthlyReports[]>(`${this.apiUrl}reportsByMonth`);
  }

  getAllIssuesThisMonth(){
    return this.http.get<CurrentMonthIssues[]>(`${this.apiUrl}knownIssuesThisMonth`);
  }

  getAReportByAddress(address){
    return this.http.get<PqrReport>(`${this.apiUrl}getAReportByAddress/${address}`);
  }

  updatePqr(data, id){
    let headers = new HttpHeaders;
    return this.http.put<PqrReport>(`${this.apiUrl}pqr-reports/${id}`, data, {headers});
  }
}
