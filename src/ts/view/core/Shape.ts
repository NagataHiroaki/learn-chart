import { Canvas } from './Canvas';

/**
 * 円を扱うクラス
 */
export class Circle {
  canvas: Canvas;
  x: number;
  y: number;
  r: number;
  c: string;

  constructor(canvas: Canvas, x: number, y: number, r: number, c: string) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
  }

  init() {
    this.canvas.addRenderObjs(this);
  }

  render() {
    // console.log('--- Circle render ---');
    this.canvas.ctx.beginPath();
    this.canvas.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    if (this.c) {
      this.canvas.ctx.fillStyle = this.c;
      this.canvas.ctx.fill();
    } else {
      this.canvas.ctx.stroke();
    }
  }
}

export const rectType = {
  fill: 'fill',
  stroke: 'stroke',
  clear: 'clear',
};

/**
 * 矩形を扱うクラス
 */
export class Rect {
  canvas: Canvas;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  c: string;
  type: string;

  constructor(
    canvas: Canvas,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    c: string,
    type: string,
  ) {
    this.canvas = canvas;
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.c = c;
    this.type = type;
  }

  init() {
    this.canvas.addRenderObjs(this);
  }

  render() {
    // console.log('--- Rect render ---');
    this.canvas.ctx.beginPath();

    switch (this.type) {
      case rectType.fill:
        this.canvas.ctx.fillStyle = this.c;
        this.canvas.ctx.fillRect(this.x1, this.y1, this.x2, this.y2);
        this.canvas.ctx.fill();
        break;
      case rectType.stroke:
        this.canvas.ctx.strokeStyle = this.c;
        this.canvas.ctx.strokeRect(this.x1, this.y1, this.x2, this.y2);
        this.canvas.ctx.closePath();
        break;
      default:
        break;
    }
  }
}

/**
 * 直線を扱うクラス
 */
export class Line {
  canvas: Canvas;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  c: string;

  constructor(
    canvas: Canvas,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    c: string,
  ) {
    this.canvas = canvas;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.c = c;
  }

  init() {
    this.canvas.addRenderObjs(this);
  }

  render() {
    // console.log('--- Rect render ---');
    this.canvas.ctx.beginPath();
    this.canvas.ctx.strokeStyle = this.c;
    this.canvas.ctx.moveTo(this.x1, this.y1);
    this.canvas.ctx.lineTo(this.x2, this.y2);
    this.canvas.ctx.lineWidth = 1;
    this.canvas.ctx.closePath();
    this.canvas.ctx.stroke();
  }
}
