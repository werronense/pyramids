export default class EventEmitter {
  listeners: Record<string, Function[]> = {};

  on(event: string, callback: Function) {
    if (!this.listeners[event]) this.listeners[event] = [];

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function) {
    this.listeners[event] = this.listeners[event]?.filter(
      (savedCallback) => savedCallback !== callback,
    );
  }

  emit(event: string) {
    this.listeners[event]?.forEach((callback) => callback());
  }
}
