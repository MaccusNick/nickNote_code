import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import NotebookList from "@/components/NotebookList";
import NoteDetail from "@/components/NoteDetail";
import Trash from "@/components/Trash";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/notebooks",
      component: NotebookList
    },
    {
      path: "/note/:noteId",
      component: NoteDetail
    },
    {
      path: "/trash/:noteId",
      component: Trash
    }
  ]
});
