<template>
  <section class="real-app">
    <input type="text"
           class="add-input"
           autofocus
           placeholder="接下去要做什么?"
           @keyup.enter="addTodo"
    >
    <item :todo="todo" v-for="todo in filteredTodos" :key="todo.id" @del="deleteTodo"/>
    <Tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllTodos"
    />
  </section>
</template>

<script>
import Item from "./item.vue";
import Tabs from "./tabs.vue";

let id = 0
export default {
  name: "todo",
  components: {Tabs, Item},
  methods: {
    addTodo(e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = '';
    },
    toggleFilter(state) {
      this.filter = state;
    },
    deleteTodo(id) {
      console.log("hello o")
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    clearAllTodos() {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  },
  data() {
    return {
      filter: 'all',
      todos: []
    }
  },

  computed: {
    filteredTodos() {
      if (this.filter === 'all') {
        return this.todos
      }

      const completed = this.filter === 'completed';

      return this.todos.filter(todo => completed === todo.completed)


    }
  }
}
</script>

<style scoped lang="stylus">
.real-app {
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}

.add-input {
  position relative
  margin 0
  width 100%
  font-size 24px
  font-family inherit
  font-weight inherit
  line-height 1.4em
  outline none
  color inherit
  border 1px solid #999
  box-sizing border-box
  padding 16px 16px 16px 60px

}

</style>
