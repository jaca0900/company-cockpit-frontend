import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
import { ICompany } from '../components/model/company.interface'
import { StorageService } from '../../shared/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) {}

  getUserCompanies() {
    const user = StorageService.getItem('User');

    return this.http.get<ICompany[]>(`${env.apiAddress}/company/byUserId/${user.id}`);
  }

  saveUserContractor(company: ICompany) {
    const user = StorageService.getItem('User');

    console.log('save to ', env.apiAddress);

    return this.http.post<[[any], any]>(`${env.apiAddress}/company/user/${user.id}`, company)
  }

  getCompanyById(companyId: string) {
    return this.http.get<ICompany>(`${env.apiAddress}/company/byId/${companyId}`);
  }

  updateContractor(company: ICompany) {
    return this.http.put(`${env.apiAddress}/company/${company.id}`, company)
  }

  removeCompany(companyId: number) {
    return this.http.delete(`${env.apiAddress}/company/${companyId}`);
  }
}
