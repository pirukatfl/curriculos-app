import Guard from "./../services/middleware";
const routes = [
  {
    path: "/",
    redirect: "login",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/home",
        component: () => import("src/pages/ProfileView.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/search-collaborators",
        component: () => import("src/pages/LookingForCollaborators.vue"),
        beforeEnter: Guard.auth,
      },
    ],
  },
  {
    path: "/login",
    component: () => import("src/pages/LoginView.vue"),
  },
  {
    path: "/search-collaborators/:id",
    component: () => import("src/pages/SeeCollaborator"),
    beforeEnter: Guard.auth,
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
