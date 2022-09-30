export default {
  auth(to, from, next) {
    const token = window.localStorage.getItem("infoUser");

    if (!token) {
      next("/");
    }
    next();
  },
};
