import { useState, useRef } from "react";
import TodoList from "./TodoList";
import './Todo.css';
/** 
* Todo function that handles the todo operations & display todo list
* @return {JSX} Return jsx object of todo list
*/
function Todo() {

    /**
     * Reference variable to reference input field.
     */
    const newtodo = useRef();
    const tasks = JSON.parse(localStorage.getItem("todoList") || "[]");
    /**
     * Local State variable that holds the todo tasks list.
     */
    const [Todos, setTodos] = useState(tasks);
    /**
     * Local State variable that holds previous todo tasks while updating task.
     */
    const [prevTask, setPrevTask] = useState('');

    /**
    * Function that handles submit event for  task to be saved or updated.
    * @param {Object} e Event object
    */
    const todoSubmit = (e) => {
        let task = newtodo.current.value.trim();
        if ('' === task) {
            alert('Please enter a task');
            if ('' !== prevTask) {
                newtodo.current.value = prevTask.task;

            } else {
                newtodo.current.value = '';
            }
            return;
        }
        if ('Update' === document.getElementById('submit').innerHTML) {
            updateTodo(prevTask, task);
            return;
        }
        /**
         * @param {number} id Randomly genrated id for the task
         */
        const id = Math.floor((Math.random() * 1000000) + 1);
        let todo = { id, task: task, completed: 0 }
        let newTodo = [...Todos, todo];
        setTodos(newTodo);
        localStorage.setItem('todoList', JSON.stringify(newTodo));
        newtodo.current.value = '';

    }
    /**
     * Function that handles updation of the todo task
     * @param {Object} prev Object of todo task to be updated
     * @param {Object} current Object of current todo task to be updated
     */
    const updateTodo = (prev, current) => {
        let newTodo = Todos.map((todo, idx) => {
            if (todo.id === prev.id) {
                return { id: todo.id, task: current, completed: todo.completed };
            }
            return { id: todo.id, task: todo.task, completed: todo.completed }
        });
        setTodos([...newTodo]);
        setPrevTask('');
        localStorage.setItem('todoList', JSON.stringify(newTodo));
        document.getElementById('submit').innerHTML = 'Add';
        newtodo.current.value = '';

    }
    /**
     * Function that removes todo task from list.
     * @param {number} index Index of the task.
     * @param {Object} task  Object of task to remove
     * @returns 
     */
    const removeTodoItem = (index, task) => {
        if (index < 0) {
            return
        }
        let newTodo = Todos.filter((todos, idx) => todos.id !== task.id);
        setTodos([...newTodo]);
        localStorage.setItem('todoList', JSON.stringify(newTodo));
    }
    return (
        <div className="todo-container">

            <h3 className="heading" > Todo App </h3>

            <TodoList List={Todos} removeTodoItem={removeTodoItem} inputref={newtodo} setPrevTask={setPrevTask} setTodos={setTodos} />
            <div className="add-container">
                <input type="text" ref={newtodo} placeholder="Add new task in your list" />
                <button className="button button-primary" onClick={todoSubmit} id="submit" > Add </button>
            </div>


        </div>

    );
}

export default Todo;
