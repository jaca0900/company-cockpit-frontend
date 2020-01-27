
export class GenericListComponent<CollectionType> {
  selected: CollectionType;
  sizes: { label: string, value: number }[];
  page: number;
  maxEntries: number;
  displayData: CollectionType[];
  all: CollectionType[];
  total: CollectionType[];
  searchValue: string;

  constructor () {}

  protected init() {
    this.sizes = [
      {label: '5', value: 5},
      {label: '10', value: 10},
      {label: '15', value: 15}
    ];
    this.page = 1;
    this.maxEntries = 10;
    this.selected = <CollectionType> {};
  }

  transformObjectIntroArray (dataObj) {
    let array = Object.values(dataObj);
    let i = 0;
    while (i < array.length) {
      if (!array[i]) {
        array.splice(i, 1);
      } else if (array[i] instanceof Object) {
        array = array.concat(this.transformObjectIntroArray(array[i]));
        array.splice(i, 1);
      } else {
        i++;
      }
    }

    return array;
  }

  search (value) {
    const valRegexp = new RegExp(value || this.searchValue, 'i');

    this.all = this.total.filter(item => {

      const checkArray = this.transformObjectIntroArray(item);
      for (const val of checkArray) {
        if (val === value || valRegexp.test(<string> val)) {

          return true;
        }
      }
    });

    this.viewSimple();
  }

  viewSimple() {
    this.displayData = this.all;
  }

  pageChange(newPage: number) {
    const startIndex = (newPage - 1) * this.maxEntries;
    const endIndex = startIndex + this.maxEntries;
    this.displayData = this.all.slice(startIndex, endIndex);
  }

  setView(size: string) {
    this.maxEntries = parseInt(size, 10);
    this.pageChange(1);
    this.page = 1;
  }

  select(data: CollectionType) {
    this.selected = data;
  }
}
