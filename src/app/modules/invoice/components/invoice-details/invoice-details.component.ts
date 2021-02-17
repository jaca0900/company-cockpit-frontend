import { Component, OnInit } from '@angular/core';
import { ICompany } from '../../../company/components/model/company.interface';
import { CompanyService } from '../../../company/sevices/company.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { InvoiceService } from '../../services/invoice.service';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {PdfConverterService} from '../../services/pdf-converter.service';
import * as moment from 'moment';
import {NotificationService} from '@shared/services/notification.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {

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
          NotificationService.showNotification('danger', 'Error', 'Error getting invoice data.');
          console.error(err);
        });
  }

  public generatePdf() {
    const pdf = PdfConverterService.invoiceToPDF(this.invoice);
    console.log(pdf);
    pdf.download(`invoice-${moment(this.invoice.sellDate).format('MM/DD/YYYY')}`);
  }
}
