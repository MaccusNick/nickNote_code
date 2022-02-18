<template>
  <div id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"
        ><i class="iconfont icon-plus"></i> 新建笔记本</a
      >
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link
            v-for="notebook in notebooks"
            :to="`/note?notebookId=${notebook.id}`"
            class="notebook"
            :key="notebook.updatedAt"
          >
            <div>
              <span class="iconfont icon-notebook"></span>{{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)"
                >编辑</span
              >
              <span class="action" @click.stop.prevent="onDelete(notebook)"
                >删除</span
              >
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import NotebookList from "@/apis/notebooks";
import { friendlyDate } from "@/helpers/util";

NotebookList.getAll().then(res => {
  console.log(res);
});

export default {
  name: "Login",
  data() {
    return {
      notebooks: []
    };
  },
  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
  },
  created() {
    NotebookList.getAll().then(res => {
      this.notebooks = res.data;
      console.log(res.data);
    });
  },
  methods: {
    onCreate() {
      this.$prompt("请输新笔记本标题", "创建笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不能为空，不超过30个字符"
      })
        .then(({ value }) => {
          return NotebookList.addNoteBook({ title: value });
        })
        .then(res => {
          console.log(res);
          res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt);

          this.notebooks.unshift(res.data);
          this.$message({
            type: "success",
            message: res.msg
          });
        });
   
    },
    onEdit(notebook) {
      let title = "";
      this.$prompt("请输新笔记本标题", "修改笔记本标题", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不能为空，不超过30个字符",
        inputValue: notebook.title
      })
        .then(({ value }) => {
          title = value;
          return NotebookList.updateNotebook(notebook.id, { title });
        })
        .then(res => {
          notebook.title = title;
          this.$message({
            type: "success",
            message: res.msg
          });
        });
    },
    onDelete(notebook) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          NotebookList.deleteNotebook(notebook.id).then(res => {
            this.notebooks.splice(this.notebooks.indexOf(notebook), 1);
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      // let isConfirm = window.confirm("确定要删除吗");
      // if (isConfirm) {
      //   NotebookList.deleteNotebook(notebook.id).then(res => {
      //     alert(res.msg);
      //     this.notebooks.splice(this.notebooks.indexOf(notebook), 1);
      //   });
      // }
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
