import { Canvas } from './Canvas';
import Debugger from '../../debug/Debugger';

/**
 * 文字を扱うクラス
 */
export class Text {
  canvas: Canvas;
  t: string;
  x: number;
  y: number;
  c: string;
  f: string;
  ta: CanvasTextAlign;
  va: CanvasTextBaseline;

  constructor(
    canvas: Canvas,
    t: string,
    x: number,
    y: number,
    c: string,
    f: string,
    ta: CanvasTextAlign,
    va: CanvasTextBaseline,
  ) {
    this.canvas = canvas;
    this.t = t;
    this.x = x;
    this.y = y;
    this.t = t;
    this.c = c;
    this.f = f;
    this.ta = ta;
    this.va = va;
  }

  init() {
    this.canvas.addRenderObjs(this);
  }

  render() {
    // console.log('--- Circle render ---');
    this.canvas.ctx.textAlign = this.ta;
    this.canvas.ctx.textBaseline = this.va;
    this.canvas.ctx.strokeStyle = this.c;
    this.canvas.ctx.font = this.f;
    this.canvas.ctx.strokeText(this.t, this.x, this.y);
  }
}
