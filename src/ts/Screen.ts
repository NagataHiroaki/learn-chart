/**
 * 画面サイズを管理
 * リサイズを検知・登録されたイベントの実行
 * Screen.addResizeObjs(this)
 * this.onResize(){hoge}
 */
class Screen {
  width: number;
  height: number;
  resizeObjs: Array < any > ;
  constructor() {
    this.width;
    this.height;

    this.resizeObjs = [];
  }

  init() {
    this.setSize();
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  addResizeObj(obj: any) {
    // console.log('--- Screen addResizeObj ---');
    this.resizeObjs.push(obj);
  }

  setSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  onResize() {
    // console.log('--- Screen onResize ---');

    this.setSize();

    for (let i = 0; i < this.resizeObjs.length; i++) {
      this.resizeObjs[i].onResize();
    }
  }
}

export default new Screen();
