import type { Details, Home, List } from './types';
import pages from './pages';
import { readonly, type DeepReadonly } from 'vue';

type PageNames = keyof typeof pages;
//type ObjectType<T> = T extends 'details' ? Details : never;
type ObjectType<T> = T extends 'details'
  ? Details
  : T extends 'home'
  ? Home
  : T extends 'list'
  ? List
  : never;

const routeStore = {} as Record<PageNames, unknown>;

export function getRouteParams<T extends PageNames>(
  page?: T
): DeepReadonly<ObjectType<T>> | any {
  let p = {};
  if (page) {
    p = routeStore[page] as ObjectType<T>;
  } else {
    // 没有指定页面则取当前页面参数
    let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
    let curRoute = routes[routes.length - 1].route; // 获取当前页面路由，也就是最后一个打开的页面路由
    let pages1: any = pages;
    let tmpPage;
    Object.keys(pages1).forEach((p1) => {
      if (`/${curRoute}` === pages1[p1]) {
        tmpPage = p1;
      }
    });
    if (tmpPage) {
      p = routeStore[tmpPage] as ObjectType<T>;
    } else {
      throw new Error('未能正确获取页面');
    }
  }
  return readonly(p);
}

let navigateLock = false;
function navigate<T extends PageNames>(
  page: T,
  params?: ObjectType<T>
): Promise<any> {
  if (navigateLock) return new Promise(() => {});//必须要返回Promise 暂用空Promise代替
  const eventName = Math.floor(Math.random() * 1000) + new Date().getTime(); // 生成唯一事件名
  navigateLock = true;
  routeStore[page] = params;
  uni.navigateTo({
    url: `${pages[page]}?eventName=${eventName}`,
    complete() {
      navigateLock = false;
    }
  });

  return new Promise<any>(
    (resolve, reject) => (
      uni.$once(String(eventName), resolve),
      uni.$once(String(eventName), reject)
    )
  );
}

function redirect<T extends PageNames>(page: T, params?: ObjectType<T>) {
  routeStore[page] = params;
  uni.redirectTo({ url: pages[page] });
}

function reLaunch<T extends PageNames>(page: T, params?: ObjectType<T>) {
  routeStore[page] = params;
  uni.reLaunch({ url: pages[page] });
}

function switchTab<T extends PageNames>(page: T, params?: ObjectType<T>) {
  routeStore[page] = params;
  uni.switchTab({ url: pages[page] });
}

interface BackParams {
  /** 返回页面层级 */
  delta?: number;
  /** 返回携带的数据 */
  data?: any;
}

function back({ delta, data }: BackParams = { delta: 1, data: null }) {
  const currentRoute: any = getCurrentPages().pop();
  const eventName = currentRoute.options.eventName;
  uni.$emit(eventName, data);
  uni.navigateBack({
    delta
  });
}

const router = {
  navigate,
  redirect,
  reLaunch,
  switchTab,
  back
};

export default router;
