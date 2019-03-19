import Debugger from './debug/Debugger';
import { ConditionList } from './view/ConditionList';

class Main {
  constructor() {
    Debugger.isDebug = true;
  }
  init() {
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
