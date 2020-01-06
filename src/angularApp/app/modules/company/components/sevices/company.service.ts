import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../../environments/environment';
import { ICompany } from '../model/company.interface'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) {}

  getUserCompanies(id: Number) {
    return this.http.get<ICompany>(`${env.apiAddress}/company/byUserId/${id}`);
  }
}