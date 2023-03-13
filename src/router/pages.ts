// 主包
const mainPackage = {
  home: '/pages/index/index'
};

// 分包
const subPackage = {
  list: '/pages/index/list',
  details: '/pages/index/details'
};

const pages = {
  ...mainPackage,
  ...subPackage
};

export default pages;
