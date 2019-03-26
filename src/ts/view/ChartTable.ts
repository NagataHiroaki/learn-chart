import { Canvas } from './core/Canvas';
import { Line } from './core/Shape';
import { Text } from './core/Text';
import { ChartArea, ChartAreaEvent } from './ChartArea';
import GlobalDispatcher from '../control/GlobalDispatcher';
import Debugger from '../debug/Debugger';

/**
 * チャートに必要な罫線と
 * 文字を描画するクラス
 */
export class ChartTable extends Canvas {
  canvas: ChartArea;
  col: number;
  row: number;
  x: number;
  y: number;
  gap: number;

  constructor(id: string) {
    super(id);
  }

  init() {
    super.init();
    GlobalDispatcher.add(this);
    this.addRenderObjs(this);
  }

  setState(
    canvas: ChartArea,
    col: number,
    row: number,
    x: number,
    y: number,
    gap: number,
  ) {
    this.canvas = canvas;
    this.col = col;
    this.row = row;
    this.x = x;
    this.y = y;
    this.gap = gap;
  }

  render() {
    // 何故ここに書かないと消えない？
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 縦線を引く
    // 横線に対する文字を描く
    this.canvas.data.forEach((item: any, index) => {
      const posX = this.x / 2 + this.x * index + this.gap;

      const day = Number(item.date.split('/').slice(-1)[0]);
      if (day === 1) {
        const text = new Text(
          this.canvas,
          item.date,
          posX,
          this.canvas.height - this.gap + 10,
          '#333',
          '10px',
          'left',
          'top',
        );
        text.render();

        const line = new Line(
          this.canvas,
          posX,
          this.canvas.height - this.gap,
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
        this.canvas.height -
        this.gap -
        (this.canvas.maxY / this.row) * this.y * i;
      const line = new Line(
        this.canvas,
        this.gap,
        posY,
        this.canvas.width - this.gap,
        posY,
        '#efefef',
      );
      line.render();

      const textY = new Text(
        this.canvas,
        String(Math.round((this.canvas.maxY / this.row) * i * 100) / 100),
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

  dispatch(e: { type: any; args: any }) {
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
