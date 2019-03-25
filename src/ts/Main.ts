import Debugger from './debug/Debugger';
import { ConditionList } from './view/ConditionList';
import { Loader } from './data/Loader';
import AppModel from './model/AppModel';

class Main {
  constructor() {
    Debugger.isDebug = true;
  }
  init() {
    this.load();
  }
  load() {
    //CSVを取得
    const loader = new Loader();
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

  onCompleted(data: any) {
    Debugger.log('--- CSV取得成功 ---');
    Debugger.log(data);

    // AppModelに格納
    AppModel.data = data;
    Debugger.log('--- AppModelに格納したデータ ---');
    Debugger.log(AppModel.data);

    const area = document.getElementById('js-area'); // 地図+各国を表示するエリア
    const conditionListElm = document.getElementById('js-condition-list'); // ソート条件のリスト

    const conditionList = new ConditionList({
      list: conditionListElm,
      item: 'button',
    });
    conditionList.init();
  }
}

const start = () => {
  const main = new Main();
  main.init();
};

window.addEventListener('load', start);
