// 生のデータ
var rowData;

class AppModel {
  _rowData: Array<Array<object>>; //CSVから取得したデータ
  _viewData: number; // 描画中のデータ
  constructor() {
    this._rowData;
    this._viewData;
  }

  // 使ってみたかったgetter
  get rowData(): Array<Array<object>> {
    return this._rowData;
  }

  // 使ってみたかったsetter
  set rowData(args: Array<Array<object>>) {
    this._rowData = args;
  }

  // 使ってみたかったgetter
  get viewData(): number {
    return this._viewData;
  }

  // 使ってみたかったsetter
  set viewData(args: number) {
    this._viewData = args;
  }
}

export default new AppModel();
