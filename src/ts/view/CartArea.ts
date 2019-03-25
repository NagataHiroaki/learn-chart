import { ConditionListEvent } from '../model/GlobalDispatchType';
import Debugger from '../debug/Debugger';
import GlobalDispatcher from '../control/GlobalDispatcher';
import AppModel from '../model/AppModel';
import { Canvas } from './core/Canvas';
import { Circle, Line } from './core/Shape';

/**
 * チャート表示エリアのクラス
 */
export class ChartArea extends Canvas {
  data: Array<object>;
  radius: number;
  maxY: number;
  row: number;
  denominator: number;
  constructor(id: string) {
    super(id);
    this.data = [];
    this.maxY = 0;
    this.row = 0;
    this.radius = 3;
    this.denominator = 5;
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
    this.row = 0;

    // すべてのプロットを描画すると気持ち悪い
    // for (let item of data) {
    //   this.data.push({
    //     date: item[0],
    //     data: Number(item[type]),
    //   });
    // if (this.maxY < item[type]) this.maxY = Number(item[type]);
    // }

    // なので、いい感じに間引く
    data.forEach((item: any, index: number) => {
      if (index % this.denominator === 0) {
        this.data.push({
          date: item[0],
          data: Number(item[type]),
        });

        if (this.maxY < item[type]) this.maxY = Number(item[type]);
      }
    });
    this.row = Math.ceil(this.maxY / this.denominator);
  }

  /**
   * プロットを描画する
   * @param e
   */
  renderData() {
    this.clear();
    const length = this.data.length;
    Debugger.log('--- canvasの横幅: ' + this.width + ' ---');
    Debugger.log('--- canvasの縦幅: ' + this.height + ' ---');
    const x = this.width / length; // 1つ当たりの間隔
    const y = this.height / this.maxY; // １つ当たりの高さ
    Debugger.log('--- プロットの感覚: ' + x + ' ---');

    this.data.forEach((item: any, index) => {
      const circle = new Circle(
        this,
        x * index,
        this.height - item.data * y - this.radius,
        this.radius,
        '#000',
      );
      circle.render();
    });
  }

  dispatch(e: { type: any; args: any }) {
    switch (e.type) {
      case ConditionListEvent.onClick:
        this.fetchData(e.args.target.value);
        this.renderData();
        this.renderRules();
    }
  }
}
