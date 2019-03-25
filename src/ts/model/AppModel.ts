// 生のデータ
var rowData;

class AppModel {
  _rowData: Array<Array<object>>;
  constructor() {
    this._rowData; //CSVから取得したデータ
  }

  // 使ってみたかったgetter
  get data(): any {
    return this._rowData;
  }

  // 使ってみたかったsetter
  set data(args: any) {
    this._rowData = args;
  }
}

export default new AppModel();
