import Screen from '../../model/Screen';

/**
 * Canvasを扱うクラス
 * 描画の更新はこのクラスのみで行う
 * 描画を更新したい場合は対象に追加
 * main.canvas.addRenderObjs(this)
 * this.render(){hoge}
 */
export class Canvas {
  canvas: any;
  renderObjs: Array<any>;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;

  constructor(id: string) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.renderObjs = [];
  }

  init() {
    // Screen.addResizeObj(this);
    this.onResize();
  }

  addRenderObjs(obj: object) {
    // console.log('--- Canvas addRenderObjs ---');
    this.renderObjs.push(obj);
  }

  setArea() {
    this.width = 1000;
    this.height = 400;
    // this.width = document.body.clientWidth;
    // this.height = Math.floor(window.innerHeight - 0.5) - 400;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  onResize() {
    // console.log('--- Canvas onResize ---');

    this.setArea();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  update() {
    this.render();
  }

  render() {
    this.clear();
    for (let i = 0; i < this.renderObjs.length; i++) {
      this.renderObjs[i].render();
    }
  }
}
