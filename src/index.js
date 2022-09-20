const local = new Proxy(
  {
    _clear() {
      localStorage.clear();
    },
  },
  {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    },
    deleteProperty(target, key) {
      Reflect.deleteProperty(target, key);
      localStorage.removeItem(key);
      return true;
    },
  }
);

for (const key in localStorage) {
  if (
    key !== "getItem" &&
    key !== "setItem" &&
    key !== "clear" &&
    key !== "removeItem" &&
    key !== "key"
  ) {
    local[key] = JSON.parse(localStorage[key])
  }
}

export { local };
