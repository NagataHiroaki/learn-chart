import {
  GlobalDispatcher,
  GlobalDispatchAction,
} from '../control/GlobalDispatcher';
import Debugger from '../debug/Debugger';
import AppModel from '../model/AppModel';
import { ChartTable } from './ChartTable';
import { ConditionListEvent } from './ConditionList';
import { Canvas } from './core/Canvas';
import { Circle, Line } from './core/Shape';
import { SelectIntervalEvent } from './SelectInterval';
import Timeline from '../model/Timeline';

export enum ChartAreaEvent {
  fetchData = 'CHARTAREAEVENT_FETCHDATA',
  renderData = 'CHARTAREAEVENT_RENDERDATA',
}

/**
 * チャート表示エリアのクラス
 */
export class ChartArea extends Canvas {
  data: Array<{ date: string; data: number }>;
  radius: number;
  maxY: number;
  row: number;
  _denominator: number;
  gap: number;
  length: number;
  ChartTable: ChartTable;
  x: number;
  y: number;
  posX: number;
  posY: number;
  moveY: number;
  moveSpeed: number;
  protCircle: Array<Circle>;

  constructor(id: string) {
    super(id);
    this.data = [];
    this.maxY = 0;
    this.row = 5;
    this.radius = 3;
    this._denominator = 5;
    this.gap = 100;
    this.length = 0;
    this.ChartTable;

    this.moveY = 30;
    this.moveSpeed = 2;

    this.x;
    this.y;
    this.posX;
    this.posY;

    this.protCircle = [];
  }

  init() {
    GlobalDispatcher.add(this);
    super.init();
  }

  renderRules() {
    Debugger.log('--- 最大値: ' + this.maxY + ' ---');
    const line = new Line(
      this,
      0,
      this.height - 100,
      this.width,
      this.height - 100,
      '#ccc',
    );
    // line.render();
  }

  /**
   * 描画に必要なデータを取得する
   * @param type
   */
  fetchData(type: number) {
    Debugger.log('--- ChartArea fetchData ---');
    Debugger.log(type);
    const data = AppModel.rowData;
    this.data = [];
    this.maxY = 0;

    data.forEach((item: any, index: number) => {
      this.data.push({
        date: item[0],
        data: Number(item[type]),
      });

      if (this.maxY < item[type]) this.maxY = Number(item[type]);
    });

    this.length = this.data.length; // データの数=メモリの数
    this.x = (this.width - this.gap * 2) / this.length; // 1つ当たりの間隔
    this.y = (this.height - this.gap * 2) / this.maxY; // １つ当たりの高さ

    GlobalDispatcher.dispatch({
      type: ChartAreaEvent.fetchData,
      args: [this, this.length, this.row, this.x, this.y, this.gap],
    });
  }

  /**
   * 間引きの感覚を設定
   */
  setDenominator(denominator: number) {
    this._denominator = denominator;
  }

  /**
   * プロットを描画する
   * @param e
   */
  render() {
    GlobalDispatcher.dispatch({
      type: ChartAreaEvent.renderData,
    });

    this.protCircle = [];

    this.data.forEach((item: any, index) => {
      // 間引きたいときにthis._denominatorを使用する。
      // コメントアウトすればすべてのプロットが描画される。
      if (index % this._denominator === 0) {
        this.posX = this.x / 2 + this.x * index + this.gap;

        const circle = new Circle(
          this,
          this.posX,
          this.height - item.data * this.y - this.gap,
          this.radius,
          '#000',
        );
        // circle.render();
        this.protCircle.push(circle);
      }
    });
    this.moveY = 30;

    let moveToY = () => {
      Debugger.log(this.moveY);
      this.moveY = this.moveY - this.moveSpeed;
      this.clear();
      for (const circle of this.protCircle) {
        circle.y = circle.y - this.moveSpeed;
        circle.render();
      }

      if (this.moveY <= 0) Timeline.stop();
    };

    Timeline.play(() => {
      moveToY();
    });
  }

  dispatch(e: GlobalDispatchAction) {
    switch (e.type) {
      case ConditionListEvent.onClick:
        this.fetchData(e.args);
        this.update();
        break;
      case SelectIntervalEvent.onChange:
        this.setDenominator(e.args);
        this.update();
      default:
        break;
    }
  }
}
