<template>
  <main  class="container"  aria-label="To-do Application">
    <header>
      <h1>To-Do List</h1>
    </header>
    <add-todo @add="addTodo" />
    <button @click="clearList" class="btn" aria-label="Clear all tasks">Clear List</button>
    <button @click="sortByPriority" class="btn" aria-label="Sort tasks by priority">Sort by Priority</button>
    
    <div class="todo-list"> 
      <ul role="list" aria-labelledby="todo-list-heading" v-if="todos.length > 0">
        <todo-item
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @remove="removeTodo"
          @edit="editTodo"
        />
      </ul>
      <ul role="list" aria-labelledby="todo-list-heading"  v-else>
        <li>No data availble</li>
      </ul>
    </div>
  </main>
</template>

<script>
import AddTodo from './components/AddTodo.vue';
import TodoItem from './components/TodoItem.vue';

export default {
  name: 'App',
  components: {
    AddTodo,
    TodoItem
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos')) || []
    };
  },
  methods: {
    addTodo(newTodo) {
      this.todos.push({ ...newTodo, id: Date.now() });
      this.saveToLocalStorage();
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveToLocalStorage();
    },
    clearList() {
      this.todos = [];
      localStorage.removeItem('todos');
    },
    editTodo(editedTodo) {
      const index = this.todos.findIndex(todo => todo.id === editedTodo.id);
      this.todos.splice(index, 1, editedTodo);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    sortByPriority() {
      this.todos.sort((a, b) => a.priority - b.priority);
    }
  }
};
</script>

<style scoped>
body {
	margin: 0;
}
.container {
	max-width: 500px;
	margin: 30px auto;
	overflow: auto;
	min-height: 300px;
	border: 1px solid steelblue;
	padding: 30px;
	border-radius: 5px;
}
.todo-list {
  margin-top: 20px;
}
.todo-list ul {
		padding: 0px;
}
.todo-list li {
  list-style: none;
	padding-left: 10px;
}
button {
  margin: 10px;
}
</style>