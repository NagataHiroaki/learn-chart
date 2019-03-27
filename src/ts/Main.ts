import Debugger from './debug/Debugger';
import { ConditionList } from './view/ConditionList';
import { Loader } from './data/Loader';
import AppModel from './model/AppModel';
import { ChartArea } from './view/ChartArea';
import Screen from './model/Screen';
import { ChartTable } from './view/ChartTable';
import { SelectInterval } from './view/SelectInterval';

class Main {
  constructor() {
    Debugger.isDebug = true;
  }

  /**
   * 読み込み時に実行
   */
  init() {
    this.load();
  }

  /**
   * データ読み込み
   */
  load() {
    //CSVを取得
    const loader = new Loader();

    loader.load(
      './data/weather.csv',
      (data: string) => {
        // 配列に変換
        let _data = loader.toArraryFromCsv(data);

        // 最初の行は「年月日,平均気温,最高気温,最低気温,平均風速(m/s)」
        // で、データとして不要なので削除する
        _data = _data.filter(function(element, index, array) {
          return index !== 0;
        });

        this.onCompleted(_data);
      },
      () => {
        Debugger.log('エラーです');
      },
    );
  }

  /**
   * データ読み込み完了時に実行
   * @param data
   */
  onCompleted(data: any) {
    Debugger.log('--- CSV取得成功 ---');
    // Debugger.log(data);

    // ベースとなるDOM
    const app = document.getElementById('app');

    // 条件の一覧
    const conditionData = [
      { value: '1', label: '平均気温' },
      { value: '2', label: '最高気温' },
      { value: '3', label: '最低気温' },
      { value: '4', label: '平均風速(m/s)' },
    ];

    // 表示する日の間隔
    const intervalData = [
      { value: '1', label: '1日' },
      { value: '3', label: '3日' },
      { value: '5', label: '5日' },
      { value: '15', label: '15日' },
      { value: '30', label: '30日' },
    ];

    // AppModelに格納
    AppModel.rowData = data;
    Debugger.log('--- AppModelに格納したデータ ---');
    Debugger.log(AppModel.rowData);

    /**
     * プロットの描画関連
     * DOMとインスタンスの生成をおこなう
     */
    let canvasElm = document.createElement('canvas');
    canvasElm.id = 'canvas';
    app.appendChild(canvasElm);

    const chartArea = new ChartArea('canvas');
    chartArea.init();

    /**
     * 表の下地の描画関連
     * DOMとインスタンスの生成をおこなう
     */
    let canvasElm2 = document.createElement('canvas');
    canvasElm2.id = 'canvas2';
    app.appendChild(canvasElm2);

    const chartTable = new ChartTable('canvas2');
    chartTable.init();

    /**
     * 条件リストの描画関連
     * DOMとインスタンスの生成をおこなう
     */
    let conditionListElm = document.createElement('ul');
    conditionListElm.id = 'js-condition-list';
    conditionListElm.className = 'condition-list';

    for (let item of conditionData) {
      let li = document.createElement('li');
      let button = document.createElement('button');
      button.type = 'button';
      button.value = item.value;
      button.innerHTML = item.label;
      li.appendChild(button);
      conditionListElm.appendChild(li);
    }

    app.appendChild(conditionListElm);
    const conditionListId = document.getElementById('js-condition-list'); // ソート条件のリスト

    const conditionList = new ConditionList({
      list: conditionListId,
      item: 'button',
    });

    conditionList.init();

    /**
     * 表示する日の描画関連
     * DOMとインスタンスの生成をおこなう
     */
    let intervalListElm = document.createElement('select');
    intervalListElm.id = 'js-interval-list';
    intervalListElm.className = 'interval-list';

    for (let item of intervalData) {
      let option = document.createElement('option');
      option.value = item.value;
      option.innerHTML = item.label;
      intervalListElm.appendChild(option);
    }

    app.appendChild(intervalListElm);
    const intervalListID = document.getElementById('js-interval-list'); // ソート条件のリスト

    const intervalList = new SelectInterval(intervalListID);
    intervalList.init();

    // ウィンドウを監視
    Screen.init();
  }
}

/**
 * 読み込み時に実行
 */
const start = () => {
  const main = new Main();
  main.init();
};

window.addEventListener('load', start);
