// const requireRoute = require.context('.', false, /\.js$/) // Get js files inside routes folder
import auth from "./auth";
import main from "./main";
import profile from "./profile";
import notfound from "./notFound";
import contract from "./contract";
import payments from "./payments";
import service from "./service";
import fcoin from "./fcoin";

const routes = [
  {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
    path: "",
    component: () => import("@/layouts/main/Main.vue"),
    children: [...main, ...profile, ...contract, ...payments, ...service, ...fcoin],
  },
  // =============================================================================
  // FULL PAGE LAYOUTS
  // =============================================================================
  {
    path: "",
    component: () => import("@/layouts/full-page/FullPage.vue"),

    children: [...auth, ...notfound],
  },
];

// requireRoute.keys().forEach((fileName) => {
//   // Avoid the index.js file
//   if (fileName === './index.js') {
//     return
//   }
//   const route = requireRoute(fileName).default
//   routes.push(...route)
// })

export default routes;
