import Debugger from '../debug/Debugger';
import GlobalDispatcher from '../control/GlobalDispatcher';
import AppModel from '../model/AppModel';
import { ConditionListEvent } from './ConditionList';

export const SelectIntervalEvent = {
  onChange: 'SelectIntervalEventOnChange',
};

export class SelectInterval {
  target: HTMLElement;
  constructor(target: HTMLElement) {
    this.target = target;
  }
  init() {
    this.target.addEventListener('change', e => {
      this.onChange(e);
    });

    this.setState();

    GlobalDispatcher.add(this);
  }

  onChange(e: Event) {
    // selectタグにキャスト
    const target = e.target as HTMLSelectElement;
    // Debugger.log(target.value);
    GlobalDispatcher.dispatch({
      type: SelectIntervalEvent.onChange,
      args: target.value,
    });
  }

  setState() {
    this.target.style.display =
      AppModel.viewData === undefined ? 'none' : 'block';
  }

  dispatch(e: { type: any; args: any }) {
    switch (e.type) {
      case ConditionListEvent.onClick:
        this.setState();
        break;
      default:
        break;
    }
  }
}
