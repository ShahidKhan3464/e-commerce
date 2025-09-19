const KEY_USER = 'ecom_user';
const KEY_TOKEN = 'ecom_token';

const authStorage = {
  getToken: () => localStorage.getItem(KEY_TOKEN),
  setToken: (t) => localStorage.setItem(KEY_TOKEN, t),
  setUser: (u) => localStorage.setItem(KEY_USER, JSON.stringify(u)),
  getUser: () => {
    const v = localStorage.getItem(KEY_USER);
    return v ? JSON.parse(v) : null;
  },
  clear: () => {
    localStorage.removeItem(KEY_TOKEN);
    localStorage.removeItem(KEY_USER);
  }
};

export default authStorage;
