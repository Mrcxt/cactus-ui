import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const getFileName = (path) => path.replace(/(.*\/)*([^.]+).*/gi, "$2");

let views = [];
const modules = import.meta.glob("../view/**/**.vue");

for (const path in modules) {
  const name = getFileName(path);
  views.push({
    path: `/${name}`,
    name,
    component: modules[path],
  });
}

const router = createRouter({
  history: createWebHistory(),
  routes: [...views],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
});

export default router;
