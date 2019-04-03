/**
 * 時間を管理
 * 定期的に実行したいイベントを追加
 * Timeline.addUpdateObjs(this)
 * this.update(){hoge}
 */
class Timeline {
  timer: number;
  updateObjs: Array<any>;
  block: boolean;
  constructor() {
    // this.timer = 0;
    // this.updateObjs = [];
    this.block = false;
  }

  // init() {
  //   this.block = true;
  //   this.update();
  // }

  // addUpdateObjs(obj: any) {
  //   this.updateObjs.push(obj);
  // }

  play(callback: Function) {
    this.block = true;
    this.update(callback);
  }

  stop() {
    this.block = false;
  }

  update(callback: Function) {
    if (this.block === false) return;
    // for (let i = 0; i < this.updateObjs.length; i++) {
    //   this.updateObjs[i].update();
    // }
    callback();

    requestAnimationFrame(this.update.bind(this, callback));
    // this.timer++;
  }
}

export default new Timeline();
