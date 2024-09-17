<template>
<div class='add-form'>
      <div class='form-control'>
        <label htmlFor="taskTitle">Task</label>
        <input
          id="taskTitle"
          data-testid="task-title"
          type="text"
          v-model="title"
          placeholder="Add todo item"
          aria-required="true"
          aria-label="New task"
        />
      </div>
      <p  v-if="errorMessage !== ''" class="error-msg" 
         role="alert" 
         aria-live="assertive"
        >
          {{ errorMessage }}
      </p>
      <div class='form-control'>
        <label htmlFor="taskPriority">Priority (1-5)</label>
        <input
          id="taskPriority"
          type="number"
          data-testid="task-priority"
          placeholder="Priority (1-5)"
          v-model.number="priority"
          aria-required="true"
          aria-label="Priority"
        />
      </div>
       <button class="btn" @click="addNewTodo" aria-label="Add new task">
        Add
      </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      priority: 1,
      errorMessage: ''
    };
  },
  methods: {
    addNewTodo() {
      if (this.title || !this.title.trim() === '') {
        this.errorMessage = '';
        this.$emit('add', { title: this.title, priority: this.priority });
        this.title = '';
        this.priority = 1;
      } else{
        this.errorMessage = 'Task field cannot be empty.';
      }
    }
  }
};
</script>
<style scoped>
.add-form {
	margin-bottom: 40px;
}
.form-control {
	margin: 20px 0;
}
.form-control label {
		display: block;
}
.form-control input {
		width: 94%;
		height: 40px;
		margin: 5px;
		padding: 3px 7px;
		font-size: 17px;
}
.error-msg{
  color: red;
  fontSize: 14px;
}
</style>