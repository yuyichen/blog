export default [
  {
    name: "首页",
    path: "/",
    component: "home",
  },
  {
    name: "文章列表",
    path: "/posts",
    component: "post",
  },
  {
    name: "文章详情",
    path: "/post/:id",
    component: "post/detail",
  },
  {
    name: "关于",
    path: "/about",
    component: "about",
  },
  {
    name: "404",
    path: "*",
    component: "404",
  },
];
