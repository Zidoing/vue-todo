import VueRouter from "vue-router";

import routes from "./routes";


export default () => {
  return new VueRouter({
    routes,
    mode: "history",
    linkActiveClass: "active-link",
    linkExactActiveClass: "exact-active-link",
    scrollBehavior(to, from, savePosition) {
      if (savePosition) {
        return savePosition;
      } else {
        return {x: 0, y: 0}
      }
    },
    parseQuery(query) {

    },
    stringifyQuery(obj) {

    },
    fallback: true
  })
};
