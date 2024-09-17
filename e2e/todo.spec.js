import { test, expect } from '@playwright/test';

test.describe('To-Do Application', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173'); 
     });
    test('should add a new todo item', async ({ page }) => {
        await page.fill('input[aria-label="New task"]', 'Buy groceries'); 
        await page.click('button[aria-label="Add new task"]'); 

        const todoText = await page.textContent('.task'); 
        expect(todoText).toContain('Buy groceries'); 
    });
    test('should clear all todos', async ({ page }) => {
        await page.fill('input[aria-label="New task"]', 'Task 1');
        await page.click('button[aria-label="Add new task"]');
        await page.fill('input[aria-label="New task"]', 'Task 2');
        await page.click('button[aria-label="Add new task"]');
        await page.click('button[aria-label="Clear all tasks"]');
    
        const todoItems = await page.$$('.task'); 
        expect(todoItems.length).toBe(0); 
    });
    test('should sort todos by priority', async ({ page }) => {
        await page.fill('input[aria-label="New task"]', 'Task 1');
        await page.fill('input[aria-label="Priority"]', '3'); 
        await page.click('button[aria-label="Add new task"]');
    
        await page.fill('input[aria-label="New task"]', 'Task 2');
        await page.fill('input[aria-label="Priority"]', '1'); 
        await page.click('button[aria-label="Add new task"]');
    
        await page.fill('input[aria-label="New task"]', 'Task 3');
        await page.fill('input[aria-label="Priority"]', '2'); ;
        await page.click('button[aria-label="Add new task"]');
    
       
        await page.click('button[aria-label="Sort tasks by priority"]');
    
        
        const todoItems = await page.$$eval('.left-item', items => items.map(item => item.textContent));
        expect(todoItems).toEqual(['Task 2 (Priority: 1)', 'Task 3 (Priority: 2)', 'Task 1 (Priority: 3)']); 
      });
      test('should remove a todo item', async ({ page }) => {
    
        await page.fill('input[aria-label="New task"]', 'Task to be removed');
        await page.click('button[aria-label="Add new task"]');
    
        await page.click('button[aria-label="Remove task"]'); 
    
        const todoItems = await page.$$eval('.task', items => items.map(item => item.textContent));
        expect(todoItems).not.toContain('Task to be removed');
      });
      test('should edit a todo item', async ({ page }) => {
    
        await page.fill('input[aria-label="New task"]', 'Old task');
        await page.click('button[aria-label="Add new task"]');
    
        await page.click('button[aria-label="Edit task"]'); 
        await page.fill('input[aria-label="Edit task title"]', 'Updated task');
        await page.click('button[aria-label="Save task"]');
    
        const todoText = await page.textContent('.task');
        expect(todoText).toContain('Updated task');
      });
      test('should display "No data available" when the todo list is empty', async ({ page }) => {
        await page.click('button[aria-label="Clear all tasks"]'); 
    
        const noDataText = await page.textContent('.todo-list ul li'); 
        expect(noDataText).toBe('No data availble'); 
      });
});