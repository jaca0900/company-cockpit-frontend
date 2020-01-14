import { Component, OnInit } from '@angular/core';
import { ICompany } from 'src/angularApp/app/modules/company/components/model/company.interface';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class InvoiceCreateComponent implements OnInit {

  public seller: ICompany;
  public buyer: ICompany;
  public product: { [key: string]: any };
  public products: { [key: string]: any }[];

  constructor() {
  }

  ngOnInit() {
    this.seller = {
      id: null,
      nip: '',
      address: '',
      companyName: '',
      isOwnedByUser: false
    };

    this.buyer = {
      id: null,
      nip: '',
      address: '',
      companyName: '',
      isOwnedByUser: false
    };

    this.product = {
      name: '',
      unitPrice: 0,
      units: 0,
      vat: 0.0
    }
    this.products = [];
  }

  createInvoice() {
    console.log('CRATE Invoice');
  }

  addProduct() {
    const productIndex = this.products.indexOf((product) => {
      return product.name === this.product.name
    });

    if (productIndex < 0) {
      this.product.vat = this.product.vat / 100;
      const product = { ... this.product }

      this.products.push(product);

      this.product = {
        name: '',
        unitPrice: 0,
        units: 0,
        vat: 0.0
      };
    } else {
      alert('Product name duplicated');
    }
  }
}
