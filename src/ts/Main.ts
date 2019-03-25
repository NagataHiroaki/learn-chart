import Debugger from './debug/Debugger';
import { ConditionList } from './view/ConditionList';
import { Loader } from './data/Loader';
import AppModel from './model/AppModel';
import { ChartArea } from './view/CartArea';
import Screen from './model/Screen';

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

    /**
     * 引数は以下の通り
     * (url,onSuccess,onError)
     */
    loader.load(
      '/data/weather.csv',
      (data: any) => {
        loader.toArraryFromCsv(data, (data: Array<Array<object>>) =>
          this.onCompleted(data),
        );
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
    Debugger.log(data);

    // AppModelに格納
    AppModel.data = data;
    Debugger.log('--- AppModelに格納したデータ ---');
    Debugger.log(AppModel.data);

    const app = document.getElementById('app');

    // canvasのDOM追加
    let canvasElm = document.createElement('canvas');
    canvasElm.id = 'canvas';
    app.appendChild(canvasElm);

    const liData = [
      { value: '1', label: '平均気温' },
      { value: '2', label: '最高気温' },
      { value: '3', label: '最低気温' },
      { value: '4', label: '平均風速(m/s)' },
    ];

    let conditionListElm = document.createElement('ul');
    conditionListElm.id = 'js-condition-list';
    conditionListElm.className = 'condition-list';
    for (let item of liData) {
      let li = document.createElement('li');
      let button = document.createElement('button');
      button.type = 'button';
      button.value = item.value;
      button.innerHTML = item.label;
      li.appendChild(button);
      conditionListElm.appendChild(li);
    }
    app.appendChild(conditionListElm);

    const chartArea = new ChartArea('canvas');
    chartArea.init();

    const conditionListId = document.getElementById('js-condition-list'); // ソート条件のリスト

    const conditionList = new ConditionList({
      list: conditionListId,
      item: 'button',
    });
    conditionList.init();

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
