/**
 * CSVと通信するクラス
 * https://uxmilk.jp/11586
 */

export class Loader {
  constructor() {}

  /**
   * データの取得
   * @param file ファイルパス
   * @param onSuccess 成功時に実行する関数
   * @param onError エラー時に実行する関数
   */
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

  /**
   * CSVを配列に変換
   * @param data 配列に変換したいCSVの文字列
   */
  toArraryFromCsv(data: string) {
    let result = [];
    let tmp = data.split('\n');

    for (let i = 0; i < tmp.length; i++) {
      result[i] = tmp[i].split(',');
    }

    return result;
  }
}
