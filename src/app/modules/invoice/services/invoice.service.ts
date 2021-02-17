import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
import { StorageService } from '../../shared/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private http: HttpClient
  ) {}

  getUserInvoices() {
    const user = StorageService.getItem('User');

    return this.http.get<{ [key: string]: any }[]>(`${env.apiAddress}/invoice/byUserId/${user.id}`);
  }

  saveInvoice(invoice) {
    console.log(`${env.apiAddress}/invoice`);

    return this.http.post<{ [key: string]: any }>(`${env.apiAddress}/invoice`, invoice)
  }

  getInvoiceById(invoiceId: number) {
    return this.http.get<{ [key: string]: any }[]>(`${env.apiAddress}/invoice/detailed/${invoiceId}`);
  }

  getBySellerID(companyId: Number) {
    return this.http.get<{ [key: string]: any }[]>(`${env.apiAddress}/invoice/bySellerId/${companyId}`);
  }

  getByBuyerID(companyId: Number) {
    return this.http.get<{ [key: string]: any }[]>(`${env.apiAddress}/invoice/byBuyerId/${companyId}`);
  }
}
