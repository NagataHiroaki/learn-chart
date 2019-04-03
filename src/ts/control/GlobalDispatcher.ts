import { ChartAreaEvent } from '../view/ChartArea';
import { SelectIntervalEvent } from '../view/SelectInterval';
import { ConditionListEvent } from '../view/ConditionList';

/**
 * すべてのdispatcherを管理する
 */
class _GlobalDispatcher {
  dispatchItems: any;
  constructor() {
    this.dispatchItems = [];
  }

  add(item: any) {
    this.dispatchItems.push(item);
  }

  dispatch(e: any) {
    for (let i = 0; i < this.dispatchItems.length; i++) {
      this.dispatchItems[i].dispatch(e);
    }
  }

  load() {}
}

export const GlobalDispatcher = new _GlobalDispatcher();

/**
 * GlobalDispatcherで利用する型リスト
 */
type GlobalDispatchType =
  | ChartAreaEvent
  | SelectIntervalEvent
  | ConditionListEvent;

/**
 * CLASS.dispatchで使用する引数の型
 */
export interface GlobalDispatchAction {
  type: GlobalDispatchType;
  args: any; // 引数なので何がきても良い
}
