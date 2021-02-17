import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class PdfConverterService {
  static hundreds: string[] = ['', ' sto', ' dwieście', ' trzysta', ' czterysta', ' pięćset', ' sześćset', ' siedemset', ' osiemset', ' dziewięćset'];
  static tens: string[] = ['', ' dziesięć', ' dwadzieścia', ' trzydzieści', ' czterdzieści', ' pięćdziesiąt', ' sześćdziesiąt', ' siedemdziesiąt', ' osiemdziesiąt', ' dziewięćdziesiąt'];
  static teens: string[] = ['', ' jedenaście', ' dwanaście', ' trzynaście', ' czternaście', ' piętnaście', ' szesnaście', ' siedemnaście', ' osiemnaście', ' dziewietnaście'];
  static singles: string[] = ['', ' jeden', ' dwa', ' trzy', ' cztery', ' pięć', ' sześć', ' siedem', ' osiem', ' dziewięć'];
  static groups = [
    ['' , '' , ''],
    [' tysiąc' , ' tysiące' , ' tysięcy'],
    [' milion' , ' miliony' , ' milionów'],
    [' miliard', ' miliardy', ' miliardów'],
    [' bilion' , ' biliony' , ' bilionów'],
    [' biliard', ' biliardy', ' biliardów'],
    [' trylion', ' tryliony', ' trylionów']
  ];

  public static invoiceToPDF(invoice) {
    const invoiceContents = invoice.invoiceProducts.map((invoiceProduct) => {
      return [
        `${invoiceProduct.product.name}`,
        `${invoiceProduct.product.unit_price}`,
        `${invoiceProduct.units}`,
        `${invoiceProduct.product.vat * 100}`,
        `${invoiceProduct.units * invoiceProduct.product.unit_price}`,
        `${invoiceProduct.units * invoiceProduct.product.unit_price * (1 + invoiceProduct.product.vat )}`
      ]
    });

    const contentsFooter = [{ text: 'Razem', colSpan: 4}, '', '', '', invoice.totalNetto, invoice.totalBrutto ];

    const documentDefinition = {
      content: [
        {
          text: 'Faktura vat',
          style: 'header'
        },
        {
          columns: [
            {
              text: [
                {
                  text: 'Numer faktury:',
                  bold: true
                },
                {
                  text: `${invoice.invoiceNumber}`
                }
              ]
            },
            {
              text: [
                {
                  text: 'Data wystawienia:',
                  bold: true
                },
                {
                  text: `${moment(invoice.creationDate).format('MM/DD/YYYY')}`
                }
              ]
            },
            {
              text: [
                {
                  text: 'Data sprzedarzy:',
                  bold: true
                },
                {
                  text: `${moment(invoice.sellDate).format('MM/DD/YYYY')}`
                }
              ]
            }
          ]
        },
        {
          columns: [
            {
              text: [
                {
                  text: 'Sprzedawca:\n',
                  bold: true,
                },
                {
                  text: 'Nazwa:',
                  bold: true
                },
                {
                  text: `${invoice.seller.company_name}\n`
                },
                {
                  text: 'Nip:',
                  bold: true
                },
                {
                  text: `${invoice.seller.nip}\n`
                },
                {
                  text: 'Address:',
                  bold: true
                },
                {
                  text: `${invoice.seller.address}`
                }
              ],
              margin: [0, 100, 0, 0],
            },
            {
              text: [
                {
                  text: 'Nabywca\n',
                  bold: true,
                },
                {
                  text: 'Nazwa:',
                  bold: true
                },
                {
                  text: `${invoice.buyer.company_name}\n`
                },
                {
                  text: 'Nip:',
                  bold: true
                },
                {
                  text: `${invoice.buyer.nip}\n`
                },
                {
                  text: 'Address:',
                  bold: true
                },
                {
                  text: `${invoice.buyer.address}`
                }
              ],
              margin: [0, 100, 0, 0],
            },
          ]
        },
        {
          table: {
            headerRows: 1,
            widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],

            body: [
              [ 'Nazwa produktu', 'Cena jednostki', 'ilość jednostek', 'Wartość vat', 'Netto', 'Brutto' ],
              ... invoiceContents,
              contentsFooter,
            ],
          },
          margin: [0, 10],
        },
        {
          text: `Do zapłaty: ${invoice.totalBrutto} zł\n Słownie:${PdfConverterService.numberLiteral(invoice.totalBrutto)} złotych`
        },
        {
          columns: [
            {
              text: [
                {
                  text: 'Sposób płatności: ',
                  bold: true,
                },
                {
                  text: `${invoice.paymentMethod === 'transfer' ? 'Przelew' : 'gotówka'}`
                }
              ],
              margin: [0, 100],
            },
            {
              text: invoice.paymentMethod !== 'transfer' ? [] : [
                {
                  text: 'numer konta: ',
                  bold: true
                },
                {
                  text: `${invoice.accountNumber}`
                }
              ],
              margin: [0, 100],
            },
            {
              text: [
                {
                  text: 'Termin płatności: ',
                  bold: true
                },
                {
                  text: `${moment(invoice.payDate).format('MM/DD/YYYY')}`
                }
              ],
              margin: [0, 100],
            }
          ]
        },
        {
          columns: [
            {
              text: [
                {
                  text: 'Sprzedawca:\n',
                  bold: true,
                  marging: [0, 10]
                },
                {
                  text: '..................',
                },
              ]
            },
            {
              text: [
                {
                  text: 'Kupujący:\n',
                  bold: true,
                  marging: [0, 10]
                },
                {
                  text: '..................'
                },
              ]
            }
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        }
      }
    };

    const pdf = pdfMake.createPdf(documentDefinition);
    return pdf;
  }

  public static numberLiteral(value: number) {
    let result = '';

    if (value === 0) {
      result = 'zero';
    }

    let g = 0;
    while (value > 0) {
      const hundred = Math.floor((value % 1000) / 100);
      let teen = 0;
      let ten = Math.floor((value % 100) / 10);
      let single = Math.floor(value % 10);

      if (ten === 1 && single > 0) {
        teen = single;
        ten = 0;
        single = 0;
      }

      let k = 2;
      if (single === 1 && hundred + ten + teen === 0) {
        k = 0;
      }

      if (single === 2 || single === 3 || single === 4) {
        k = 1;
      }

      if (hundred + ten + teen + single > 0) {
        result = `${PdfConverterService.hundreds[hundred]}${PdfConverterService.tens[ten]}${PdfConverterService.teens[teen]}${PdfConverterService.singles[single]}${PdfConverterService.groups[g][k]}${result}`;
      }

      g++;
      value = Math.floor(value / 1000);
    }

    return result;
  }
}
