/**
 * storageUtils 提供了对 localStorage 的封装方法，方便存储、获取和删除字段。
 *
 * @param {string} key - 存储项的键。
 * @param {any} value - 存储的值。
 * @param {number} expiretime - 过期时间
 */
const storageUtils = {
  /**
   * 将指定的值存储到 localStorage 中，并设置过期时间。
   * 如果未提供过期时间，则默认为 7 天。
   */
  setItem(key: string, value: any, expiretime?: number) {
    const ttl = expiretime
      ? expiretime
      : new Date().getTime() + 1000 * 60 * 60 * 24 * 7;
    const item = {
      value,
      expiry: ttl,
    };
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (err) {
      console.error("saving to localstorage failed", err);
    }
  },
  /**
   * 从 localStorage 中获取指定键的值。
   */
  getItem(key: string) {
    try {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) return null;
      const item = JSON.parse(itemStr);
      if (!item.expiry || new Date().getTime() < item.expiry) {
        return item.value;
      }
      localStorage.removeItem(key);
      return null;
    } catch (err) {
      console.error("get value from localstorage failed", err);
      return null;
    }
  },
  /**
   * 删除 localStorage 中指定的键值对。
   */
  removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("remove from localstorage failed", err);
    }
  },
};
export default storageUtils;
