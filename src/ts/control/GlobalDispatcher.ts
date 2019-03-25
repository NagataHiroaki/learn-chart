/**
 * すべてのdispatcherを管理する
 */
class GlobalDispatcher {
  dispatchItems: any;
  constructor() {
    this.dispatchItems = [];
  }

  add(item: any) {
    this.dispatchItems.push(item);
  }

  dispatch(e: any) {
    for (let i = 0; i < this.dispatchItems.length; i++) {
      this.dispatchItems[i].dispatch(e);
    }
  }

  load() {}
}

export default new GlobalDispatcher();
