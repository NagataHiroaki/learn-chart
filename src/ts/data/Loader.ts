import AppModel from '../model/AppModel';

/**
 * CSVと通信するクラス
 * https://uxmilk.jp/11586
 */

export class Loader {
  constructor() {}

  load(file: string, onSuccess: Function, onError: Function) {
    const req = new XMLHttpRequest();
    req.open('get', file, true);
    req.send(null);

    // 成功時
    req.onload = () => {
      onSuccess(req.responseText);
    };
    // 失敗時
    req.onerror = () => {
      onError(req.statusText);
    };
  }

  toArraryFromCsv(data: any, callback: Function) {
    let result = [];
    let tmp = data.split('\n');

    for (let i = 0; i < tmp.length; i++) {
      result[i] = tmp[i].split(',');
    }

    // 最初の行は「年月日,平均気温,最高気温,最低気温,平均風速(m/s)」
    // で、データとして不要なので削除する
    result = result.filter(function(element, index, array) {
      return index !== 0;
    });

    callback(result);
  }
}
