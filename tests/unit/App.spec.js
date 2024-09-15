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
});