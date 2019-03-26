import Debugger from '../debug/Debugger';
import GlobalDispatcher from '../control/GlobalDispatcher';
import AppModel from '../model/AppModel';
import { Canvas } from './core/Canvas';
import { Circle, Line } from './core/Shape';
import { Text } from './core/Text';
import { ChartTable } from './ChartTable';
import { ConditionListEvent } from './ConditionList';

export const ChartAreaEvent = {
  fetchData: 'ChartAreaEventFetchData',
  renderData: 'ChartAreaEventRenderData',
};

/**
 * チャート表示エリアのクラス
 */
export class ChartArea extends Canvas {
  data: Array<{ date: string; data: number }>;
  radius: number;
  maxY: number;
  row: number;
  denominator: number;
  gap: number;
  length: number;
  ChartTable: ChartTable;
  x: number;
  y: number;
  posX: number;
  posY: number;
  constructor(id: string) {
    super(id);
    this.data = [];
    this.maxY = 0;
    this.row = 5;
    this.radius = 3;
    this.denominator = 5;
    this.gap = 100;
    this.length = 0;
    this.ChartTable;

    this.x;
    this.y;
    this.posX;
    this.posY;
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
    const data = AppModel.data;
    this.data = [];
    this.maxY = 0;

    data.forEach((item: any, index: number) => {
      this.data.push({
        date: item[0],
        data: Number(item[type]),
      });

      if (this.maxY < item[type]) this.maxY = Number(item[type]);
    });
    // this.row = Math.ceil(this.maxY / this.denominator);
    this.length = this.data.length; // データの数=メモリの数
    this.x = (this.width - this.gap * 2) / this.length; // 1つ当たりの間隔
    this.y = (this.height - this.gap * 2) / this.maxY; // １つ当たりの高さ

    // this.ChartTable.setState(
    //   this,
    //   this.length,
    //   this.row,
    //   this.x,
    //   this.y,
    //   this.gap,
    // );
    GlobalDispatcher.dispatch({
      type: ChartAreaEvent.fetchData,
      args: [this, this.length, this.row, this.x, this.y, this.gap],
    });
  }

  /**
   * プロットを描画する
   * @param e
   */
  renderData() {
    //描画をクリア
    this.update();
    GlobalDispatcher.dispatch({
      type: ChartAreaEvent.renderData,
    });

    //描画設定開始
    // Debugger.log('--- canvasの横幅: ' + this.width + ' ---');
    // Debugger.log('--- canvasの縦幅: ' + this.height + ' ---');

    // もしデータの日付が歯抜けであれば、以下の処理で日数を求める
    // const startDay = new Date(this.data[0].date);
    // const endDay = new Date(this.data[length - 1].date);
    // const msDiff = endDay.getTime() - startDay.getTime();
    // const day = Math.floor(msDiff / (1000 * 60 * 60 * 24)) + 1;

    // Debugger.log('--- プロットの感覚: ' + x + ' ---');

    // 横線とテキスト

    this.data.forEach((item: any, index) => {
      // 間引きたいときにthis.denominatorを使用する。
      // コメントアウトすればすべてのプロットが描画される。
      if (index % this.denominator === 0) {
        this.posX = this.x / 2 + this.x * index + this.gap;

        const circle = new Circle(
          this,
          this.posX,
          this.height - item.data * this.y - this.gap,
          this.radius,
          '#000',
        );
        circle.render();
      }
    });
  }

  dispatch(e: { type: any; args: any }) {
    switch (e.type) {
      case ConditionListEvent.onClick:
        this.fetchData(e.args.target.value);
        this.renderData();
        break;
      default:
        break;
      // this.renderRules();
    }
  }
}
