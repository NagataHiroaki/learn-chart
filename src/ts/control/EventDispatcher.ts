// /**
//  * イベント監視を行いたいコンポーネントの基となるクラス
//  */
// class EventDispatcher {
//   eventType: Object;
//   dispatchList: Object;
//   constructor() {
//     this.eventType;
//     this.dispatchList = {};
//   }

//   /**
//    * 監視対象を登録
//    * @param item 監視したいinstance
//    */
//   add(event,fn) {
//     this.dispatchList.push(item);
//   }

//   /**
//    * イベントの発生を監視対象に通知
//    * @param e
//    */
//   dispatch(e: { type: string; args: any }) {
//     const type = e.type;
//     const args = e.args;

//     for (const item of this.dispatchList) {
//       if (item.eventType) {
//         // item.eventType[eventType][type]
//       }
//     }
//   }
// }

// class EventDispatch {
//   type: string;
//   args: any;
//   constructor() {
//     this.type;
//     this.args;
//   }
// }

// let listeners = {};

// function register(event, fn) {
//   listeners[event] = listeners[event] || [];
//   listeners[event].push(fn);
// }

// function remove(event, fn) {
//   let handlers = listeners[event];

//   handlers.splice(handlers.indexOf(fn), 1);
// }

// function dispatch(event, ...args) {
//   const eventListeners = listeners[event];
//   if (eventListeners) {
//     eventListeners.forEach(event => {
//       event.apply(null, args);
//     });
//   }
// }

// function getEventHandlers(event) {
//   return listeners[event];
// }

// function clearEventHandlers(event) {
//   if (event) {
//     listeners[event] = [];
//   }
// }

// export default {
//   register,
//   remove,
//   dispatch,
//   getEventHandlers,
//   clearEventHandlers,
// };
