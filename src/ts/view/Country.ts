/**
 * 国のクラス
 */
export class Country {
  data: Object;
  constructor() {
    this.data = {}; // 国の情報を格納
  }

  init() {}

  /**
   * 上位5件に入っているなら表示
   */
  show() {
    // 位置はx座標とy座標を画像サイズに合わせて縮小させて表示する
  }

  /**
   * 上位5件に入っていないなら非表示
   */
  hide() {}

  /**
   * 元々上位5件に入っていて順位の変動があるだけ
   */
  update() {}
}
