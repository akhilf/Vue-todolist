<template>
  <li class="task">
    <div className="flex-container"  v-if="isEditing">
          <div className="left-item">
            <input
                type="text"
                aria-label="Edit Task Title"
                v-model="newTitle"
            />
            <input
                type="number"
                aria-label="Edit Task Priority"
                v-model="newPriority"
            />
          </div>
          <div className="right-item save-item">
            <button className="btn" @click="handleEdit" aria-label="Save edited task">Save</button>
            <button  data-testid="cancel-task"  @click="setCancelItem" className="btn"  aria-label="Cancel task">Cancel</button>
          </div>
     </div>
     <div class="flex-container"  v-if="!isEditing">
      <div class="left-item">{{ todo.title}} (Priority: {{todo.priority}})</div>
      <div class="right-item">
          <button  data-testid="edit-task" @click="setEditItem" class="btn"  aria-label="Edit task">Edit</button>
          <button  data-testid="remove-task" @click="removeItem" class="btn" aria-label="Remove task">Remove</button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ['todo'],
  data() {
    return {
       isEditing: false,
       newTitle: this.todo.title,
       newPriority: this.todo.priority
    };
  },
  methods: {
    removeItem() {
      this.$emit('remove', this.todo.id);
    },
    handleEdit() {
      if (this.newTitle && this.newPriority) {
        this.$emit('edit', { ...this.todo, title: this.newTitle, priority: parseInt(this.newPriority) });
      }
      this.isEditing = false;
    },
    setEditItem(){
       this.isEditing = true;
    },
    setCancelItem(){
      this.isEditing = false;
    }
  }
};
</script>
<style scoped>
.task {
	background: #f4f4f4;
	margin: 5px;
	padding: 10px 20px;
	cursor: pointer;
	list-style: none;
}
.task input {
  width: 40%;
  height: 30px;
  margin: 2px;
  font-size: 12px;
}
.flex-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.left-item {
	margin-right: 20px;
}
.right-item {
	margin-left: auto;
}
.save-item{
  width:200px;
  text-align: right;
  margin-right: 5px;
}
</style>