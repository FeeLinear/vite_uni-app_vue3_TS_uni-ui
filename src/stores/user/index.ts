import { defineStore } from 'pinia';
import type { RootState } from './types';
export const useUserStore = defineStore('user', {
  state: (): RootState => ({
    userInfo: {
      id: '',
      name: ''
    },
    token: ''
  }),
  getters: {
    // 示例返回大写字符
    capName(state) {
      return state.userInfo.name.toUpperCase();
    }
  },
  persist: {
    key: 'user',
    storage: {
      setItem: uni.setStorageSync,
      getItem: uni.getStorageSync
    },
    beforeRestore: (ctx) => {
      console.log(`即将恢复 '${ctx.store.$id}'`);
    },
    afterRestore: (ctx) => {
      console.log(`刚刚恢复完 '${ctx.store.$id}'`);
    }
  },
  actions: {
    async setUserInfo() {
      // 这里可以发起请求
      //const userInfo = await getUserInfo();
      this.userInfo = { name: '飞流1', id: '12' };
      this.token = 'token11111';
    },
  }
});
