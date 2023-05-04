import { useState, useRef } from "react";
import TodoList from "./TodoList";
import './Todo.css';

function Todo() {

    const newtodo = useRef();
    const tasks = JSON.parse(localStorage.getItem("todoList") || "[]");
    const [Todos, setTodos] = useState(tasks);
    const [prevTask, setPrevTask] = useState('');

    const todoSubmit = (e) => {
        if ('' === newtodo.current.value) {
            return;
        }
        if ('Update' === document.getElementById('submit').innerHTML) {
            updateTodo(prevTask, newtodo.current.value);
            return;
        }
        let todo = { task: newtodo.current.value, completed: 0 }
        let newTodo = [...Todos, todo];
        setTodos(newTodo);
        localStorage.setItem('todoList', JSON.stringify(newTodo));
        newtodo.current.value = '';

    }
    const updateTodo = (prev, current) => {
        let newTodo = Todos.map((todo, idx) => {
            if (todo.task === prev.task) {
                return { task: current, completed: todo.completed };
            }
            return { task: todo.task, completed: todo.completed }
        });
        setTodos([...newTodo]);
        localStorage.setItem('todoList', JSON.stringify(newTodo));
        document.getElementById('submit').innerHTML = 'Add';
        newtodo.current.value = '';

    }
    const removeTodoItem = (index) => {
        if (index < 0) {
            return
        }
        let newTodo = Todos.filter((todos, idx) => idx !== index);
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
