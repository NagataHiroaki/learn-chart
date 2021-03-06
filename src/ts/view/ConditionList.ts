import { GlobalDispatcher } from '../control/GlobalDispatcher';
import AppModel from '../model/AppModel';

/**
 * ソート条件のリスト
 */

export enum ConditionListEvent {
  onClick = 'CONDITIONLISTEVENT_ONCLICK',
}

export class ConditionList {
  list: HTMLElement;
  item: NodeList;
  cls: string;

  constructor(obj: any) {
    this.list = obj.list;
    this.item = this.list.querySelectorAll(obj.item);
    this.cls = 'current';
  }

  init() {
    this.item.forEach(item => {
      item.addEventListener('click', e => {
        this.changeCurrent(e);
      });
    });
  }

  /**
   * 指定の条件をカレントにする
   * @param e
   */
  changeCurrent(e: Event) {
    const number = Number((e.target as HTMLButtonElement).value);
    AppModel.viewData = number;

    // カレントクラスを外す
    this.item.forEach(item => {
      (item as HTMLElement).classList.remove(this.cls);
    });

    // カレントクラスを付与する
    (e.currentTarget as HTMLElement).classList.add(this.cls);

    const e2 = {
      type: ConditionListEvent.onClick,
      args: number,
    };
    GlobalDispatcher.dispatch(e2);
  }
}
