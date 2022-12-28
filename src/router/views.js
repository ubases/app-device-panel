export default [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/index"),
    meta: { title: "首页", keepAlive: true },
  }
];
