import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue'; 
import { describe, it, expect } from 'vitest';
import AddTodo from '@/components/AddTodo.vue';

describe('App.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.exists()).toBe(true);
  });
  it('renders the To-Do List header', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.find('h1').text()).toBe('To-Do List');
  });
  it('adds a new to-do item', async () => {
    const wrapper = shallowMount(App);
    const addTodoComponent = wrapper.findComponent(AddTodo);
    await addTodoComponent.vm.$emit('add', { text: 'New Task', priority: 1 });
    expect(wrapper.vm.todos).toHaveLength(1);
    expect(wrapper.vm.todos[0].text).toBe('New Task');
  });
  it('clears the to-do list', async () => {
    const wrapper = shallowMount(App);
    wrapper.setData({ todos: [{ id: 1, text: 'Task 1', priority: 1 }] });
    await wrapper.find('button[aria-label="Clear all tasks"]').trigger('click');
    expect(wrapper.vm.todos).toHaveLength(0);
  });
  it('sorts the to-do list by priority', async () => {
    const wrapper = shallowMount(App);
    wrapper.setData({
      todos: [
        { id: 1, text: 'Task 1', priority: 2 },
        { id: 2, text: 'Task 2', priority: 1 }
      ]
    });
    await wrapper.find('button[aria-label="Sort tasks by priority"]').trigger('click');
    expect(wrapper.vm.todos[0].text).toBe('Task 2');
  });
  it('removes a to-do item', async () => {
    const wrapper = shallowMount(App);
    wrapper.setData({ todos: [{ id: 1, text: 'Task 1', priority: 1 }] });
    await wrapper.vm.removeTodo(1);
    expect(wrapper.vm.todos).toHaveLength(0);
  });
  it('edits a to-do item', async () => {
    const wrapper = shallowMount(App);
    wrapper.setData({ todos: [{ id: 1, text: 'Task 1', priority: 1 }] });
    await wrapper.vm.editTodo({ id: 1, text: 'Edited Task', priority: 1 });
    expect(wrapper.vm.todos[0].text).toBe('Edited Task');
  });
});