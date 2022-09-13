const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/IndexPage.vue') }
  //   ]
  // },
  {
    path: "/",
    component: () => import("src/pages/LoginView.vue"),
  },
  {
    path: "/home",
    component: () => import("src/pages/ProfileView.vue"),
  },
  {
    path: "/search-collaborators",
    component: () => import("src/pages/LookingForCollaborators.vue"),
  },
  {
    path: "/search-collaborators/:id",
    component: () => import("src/pages/SeeCollaborator"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
