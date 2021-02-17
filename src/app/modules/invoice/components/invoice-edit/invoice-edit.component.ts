import { Component, OnInit } from '@angular/core';
import { ICompany } from '../../../company/components/model/company.interface';
import { CompanyService } from '../../../company/sevices/company.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { InvoiceService } from '../../services/invoice.service';
import {NotificationService} from '@shared/services/notification.service';
// import { of } from 'rxjs';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit {

  public seller: ICompany;
  public buyer: ICompany;
  public invoiceProduct: { [key: string]: any };
  public invoiceProducts: { [key: string]: any }[];
  public invoice: { [key: string]: any };
  public methods: { [key: string]: any }[] = [
    { name: 'Cash', value: 'cash' },
    { name: 'Transfer', value: 'transfer' }
  ];

  collapsableData = {
    headerCollapse: true,
    contentsCollapse: true,
    foooterCollapse: true
  }

  public sellers: ICompany[];
  public buyers: ICompany[];

  public showSeller = false;
  public showBuyer = false;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.invoiceProduct = {
      product: {
        name: '',
        unit: 0,
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

    this.sellers = [this.seller];
    this.buyers = [this.buyer];
    this.companyService.getUserCompanies()
    .subscribe(
      (companies) => {
        for (const company of companies) {
          if (company.isOwnedByUser) {
            this.sellers.push(company);
          } else {
            this.buyers.push(company);
          }
        }
      },
      (err) => {
        NotificationService.showNotification('danger', 'Error', 'Error getting data.');
      });

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const invoiceId = parseInt(params.get('invoiceId'), 10);

        return this.invoiceService.getInvoiceById(invoiceId)
      }))
      .subscribe(
        (invoice) => {
          this.invoice = invoice[0];
          this.invoice.paymentMethod = this.methods.find((method) => method.value === this.invoice.paymentMethod);
          this.invoice.payDate = new Date(this.invoice.payDate);
          this.invoice.sellDate = new Date(this.invoice.sellDate);
          this.invoice.creationDate = new Date(this.invoice.creationDate);
          this.invoiceProducts = this.invoice.invoiceProducts.map(({ product, ...ip }) => ({
            ... ip,
            product: {
              ...product,
              unitPrice: product.unit_price
            }
          }));

          this.seller = {
            ... this.invoice.seller,
            companyName: this.invoice.seller.company_name
          };

          this.buyer = {
            ... this.invoice.buyer,
            companyName: this.invoice.buyer.company_name
          };
        },
        (err) => {
          console.error(err);
          NotificationService.showNotification('danger', 'Error', 'Error getting data.');
        });
  }

  saveInvoice() {
    this.invoice.seller = this.seller;
    this.invoice.buyer = this.buyer;
    this.invoice.invoiceProducts = this.invoiceProducts;
    this.invoice.paymentMethod = this.invoice.paymentMethod.value;

    this.invoiceService.saveInvoice(this.invoice)
    .subscribe((res) => {
      NotificationService.showNotification('success', 'Success', 'Successfuly saved invoice.');
      console.log(res);
    },
    (error) => {
      NotificationService.showNotification('danger', 'Error', 'Error saving invoice please try again later.');
      console.error(error);
    });
  }

  setCompany({type, company}: {
    type: string,
    company: ICompany
  }) {

    this[type] = company;
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
        acc.net += invoiceProduct.units * invoiceProduct.product.unit;
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
          unit: 0,
          vat: 0.0
        },
        units: 0,
      }
    } else {
      alert('Product name duplicated');
    }
  }
}
