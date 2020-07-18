import { Component, OnInit } from '@angular/core';
import { ICompany } from '../../../company/components/model/company.interface';
import { CompanyService } from '../../../company/sevices/company.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class InvoiceCreateComponent implements OnInit {

  public seller: ICompany;
  public buyer: ICompany;
  public invoiceProduct: { [key: string]: any };
  public invoiceProducts: { [key: string]: any }[];
  public invoice: { [key: string]: any };
  public methods: { [key: string]: any }[] = [
    { name: 'Cash', value: 'cash' },
    { name: 'Transfer', value: 'transfer' }
  ]

  public sellers: ICompany[];
  public buyers: ICompany[];

  public showSeller = false;
  public showBuyer = false;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService) {}

  ngOnInit() {
    let paramCompanyId;

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

    this.sellers = [];
    this.buyers = [];

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        paramCompanyId = parseInt(params.get('companyId'), 10);

        return this.companyService.getUserCompanies()
      }))
    .subscribe(
      (companies) => {
        for (const company of companies) {
          if (company.isOwnedByUser) {
            if (company.id === paramCompanyId) {
              this.seller = company;
            }

            this.sellers.push(company);
          } else {
            if (company.id === paramCompanyId) {
              this.buyer = company;
            }

            this.buyers.push(company);
          }
        }
      },
      (err) => {
        console.error(err);
      })

    this.invoiceProduct = {
      product: {
        name: '',
        unitPrice: 0,
        vat: 0.0
      },
      units: 0,
    }

    this.invoiceProducts = [];
    const date = new Date();

    this.invoice = {
      paymentMethod: { name: 'Transfer', value: 'transfer' },
      accountNumber: '',
      invoiceNumber: date.getTime(),
      sellDate: date,
      creationDate: date,
      payDate: date // add moment.js
    }
  }

  createInvoice() {
    this.invoice.seller = this.seller;
    this.invoice.buyer = this.buyer;
    this.invoice.invoiceProducts = this.invoiceProducts;
    this.invoice.paymentMethod = this.invoice.paymentMethod.value;

    this.invoiceService.saveInvoice(this.invoice)
    .subscribe((res) => {
      console.log(res);
    });
    console.log(this.invoice);
  }

  addProduct() {

    const productIndex = this.invoiceProducts.indexOf((invoiceProduct) => {
      return invoiceProduct.product.name === this.invoiceProduct.product.name
    });

    if (productIndex < 0) {
      this.invoiceProduct.product.vat = this.invoiceProduct.product.vat / 100;
      const product = { ... this.invoiceProduct }

      this.invoiceProducts.push(product);

      const totals = this.invoiceProducts.reduce((acc, invoiceProduct) => {
        acc.net += invoiceProduct.units * invoiceProduct.product.unitPrice;
        acc.gross += acc.net * (1 + invoiceProduct.product.vat);

        return acc;
      }, {
        net: 0,
        gross: 0
      });

      this.invoice.totalNetto = totals.net;

      this.invoice.totalBrutto = totals.gross;

      this.invoiceProduct = {
        product: {
          name: '',
          unitPrice: 0,
          vat: 0.0
        },
        units: 0,
      }
    } else {
      alert('Product name duplicated');
    }
  }

  showSellerDialog() {
    this.showSeller = true;
  }

  closeSellerDialog() {
    this.showSeller = false;
  }

  showBuyerDialog() {
    this.showBuyer = true;
  }

  closeBuyerDialog() {
    this.showBuyer = false;
  }
}
