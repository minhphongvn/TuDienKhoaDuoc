import Vue from "vue";
import VueRouter from "vue-router";
import auth from "../api/auth.api";
import store from "../store";
import Introduce from "../pages/Introduce.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Introduce",
    component: Introduce,
    beforeEnter: (to, from, next) => {
      if (!store.state.user.isAuthenticated) {
        next();
        return;
      }
      next({ name: "Admin" });
    },
  },
  {
    meta: {
      title: "Đăng nhập",
    },
    path: "/login",
    name: "Login",
    component: () => import("../pages/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.state.user.isAuthenticated) {
        next();
        return;
      }
      next({ name: "Admin" });
    },
  },
  {
    meta: {
      title: "Quên mật khẩu",
    },
    path: "/recovery",
    name: "Recovery",
    component: () => import("../pages/Recovery.vue")
  },
  {
    meta: {
      title: "Reset password",
    },
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("../pages/ResetPassword.vue")
  },
  {
    meta: {
      title: "Đăng ký",
    },
    path: "/register",
    name: "Register",
    component: () => import("../pages/Register.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.state.user.isAuthenticated) {
        next();
        return;
      }
      next({ name: "Admin" });
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../pages/Admin.vue"),
    redirect: { name: "Dashboard" },
    children: [
      {
        meta: {
          title: "Dashboard",
        },
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../views/Admin/Dashboard.vue"),
      },
      {
        meta: {
          title: "Quản lý chủ đề",
        },
        path: "subjects",
        name: "Subject",
        component: () => import("../views/Admin/Subject.vue"),
      },
      {
        meta: {
          title: "Quản lý từ vựng",
        },
        path: "words",
        name: "WordAdmin",
        component: () => import("../views/Admin/Word.vue"),
      },
      {
        meta: {
          title: "Quản lý từ vựng",
        },
        path: "words/:id",
        name: "WordById",
        component: () => import("../views/Admin/Word.vue"),
      },
      {
        meta: {
          title: "Quản lý người dùng",
        },
        path: "user-manangement",
        name: "UserManangement",
        component: () => import("../views/Admin/UserManangement.vue"),
      },
    ],
    beforeEnter: async (to, from, next) => {
      if (!store.state.user.isAuthenticated) {
        next({ name: "Login" });
        return;
      }
      if (!store.state.user.is_superuser) {
        next({ name: "HomePage" });
        return;
      }
      next();
    },
  },
  {
    meta: {
      title: "Từ điển",
    },
    path: "/medictionary",
    name: "HomePage",
    redirect: { name: "Learned" },
    component: () => import("../pages/Medictionary.vue"),
    children: [
      {
        meta: {
          title: "Các từ đã học",
        },
        path: "/",
        name: "Learned",
        // component: () => import("../views/Home/Learned.vue"),
      },
      {
        meta: {
          title: "Trang quản lý",
        },
        path: "/words",
        name: "Word",
        // component: () => import("../views/Home/Learned.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {

      if (!store.state.user.isAuthenticated) {
        next({ name: "Login" });
        return;
      }
      next();
    },
  },
];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem("awt")) {
    const data = await auth.getUser();
    store.commit("setUser", data);
    store.commit("setToken", localStorage.getItem("awt"));
  }
  next();
})

export default router;
