/*
 * デバッグコンソール用クラス(Singleton)
 */
class Debugger {
  isDebug:boolean;

  constructor() {
    this.isDebug = false;
  }

  log(msg:any) {
    if (this.isDebug) {
      console.log(msg);
    }
  }
}

export default new Debugger();
