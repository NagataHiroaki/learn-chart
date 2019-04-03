import { Canvas } from './core/Canvas';
import { Line } from './core/Shape';
import { Text } from './core/Text';
import { ChartArea, ChartAreaEvent } from './ChartArea';
import {
  GlobalDispatcher,
  GlobalDispatchAction,
} from '../control/GlobalDispatcher';
import Debugger from '../debug/Debugger';

/**
 * チャートに必要な罫線と
 * 文字を描画するクラス
 */
export class ChartTable extends Canvas {
  canvas: Canvas;
  col: number;
  row: number;
  x: number;
  y: number;
  gap: number;
  chartArea: ChartArea;

  constructor(id: string) {
    super(id);
  }

  init() {
    super.init();
    GlobalDispatcher.add(this);
    this.addRenderObjs(this);
  }

  setState(
    chartArea: ChartArea,
    col: number,
    row: number,
    x: number,
    y: number,
    gap: number,
  ) {
    this.chartArea = chartArea;
    this.col = col;
    this.row = row;
    this.x = x;
    this.y = y;
    this.gap = gap;
  }

  render() {
    // 縦線を引く
    // 横線に対する文字を描く
    this.chartArea.data.forEach((item: any, index) => {
      const posX = this.x / 2 + this.x * index + this.gap;

      const day = Number(item.date.split('/').slice(-1)[0]);
      if (day === 1) {
        const text = new Text(
          this,
          item.date,
          posX,
          this.chartArea.height - this.gap + 10,
          '#333',
          '10px',
          'left',
          'top',
        );
        text.render();

        const line = new Line(
          this,
          posX,
          this.chartArea.height - this.gap,
          posX,
          this.gap,
          '#efefef',
        );

        line.render();
      }
    });
    // 横線を引く
    // 縦線に対する文字を描く
    for (let i = 0; i <= this.row; i++) {
      const posY =
        this.chartArea.height -
        this.gap -
        (this.chartArea.maxY / this.row) * this.y * i;
      const line = new Line(
        this,
        this.gap,
        posY,
        this.chartArea.width - this.gap,
        posY,
        '#efefef',
      );
      line.render();

      const textY = new Text(
        this,
        String(Math.round((this.chartArea.maxY / this.row) * i * 100) / 100),
        this.gap - 10,
        posY,
        '#333',
        '10px',
        'right',
        'middle',
      );
      textY.render();
    }
  }

  dispatch(e: GlobalDispatchAction) {
    switch (e.type) {
      case ChartAreaEvent.fetchData:
        this.setState(
          e.args[0],
          e.args[1],
          e.args[2],
          e.args[3],
          e.args[4],
          e.args[5],
        );
        break;
      case ChartAreaEvent.renderData:
        this.update();
        break;
      default:
        break;
    }
  }
}
