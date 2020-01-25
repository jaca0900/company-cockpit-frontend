import { Component, OnInit } from '@angular/core';
import { ICompany } from 'src/angularApp/app/modules/company/components/model/company.interface';
import { CompanyService } from '../../../company/sevices/company.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { InvoiceService } from '../../services/invoice.service';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
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

  public sellers: ICompany[];
  public buyers: ICompany[];

  public showSeller: boolean = false;
  public showBuyer: boolean = false;

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
        const invoiceId = parseInt(params.get('invoiceId'));

        return this.invoiceService.getInvoiceById(invoiceId)
      }))
      .subscribe(
        (invoice) => {
          this.invoice = invoice[0];
          this.invoice.payDate = new Date(this.invoice.payDate);
          this.invoice.sellDate = new Date(this.invoice.sellDate);
          this.invoice.creationDate = new Date(this.invoice.creationDate);
          this.invoiceProducts = this.invoice.invoiceProducts;
          this.seller = this.invoice.seller;
          this.buyer = this.invoice.buyer;
          console.log(this.invoice);
        },
        (err) => {
          console.log('Hmmmm', err);
        });
  }

  public generatePdf() {
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    const pdf = pdfMake.createPdf(documentDefinition);
    console.log(pdf);
    pdf.download();
  }
}
