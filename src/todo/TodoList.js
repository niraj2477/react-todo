import './TodoList.css';
import DeleteIcon from '../asset/svgs/delete.svg';
import PencilIcon from '../asset/svgs/pencil.svg';
import CheckIcon from '../asset/svgs/check.svg';
/**
 * 
 * @param {Object} List  List of todo tasks
 * @param {Function} removeTodoItem Function to remove todo task
 * @param {Object} inputref Reference to input field
 * @param {Function} setPrevTask Function to set to prev task
 * @param {Function} setTodos Function to update the todo
 * @returns 
 */
function TodoList({ List, removeTodoItem, inputref, setPrevTask, setTodos }) {

    /**
     * Function to mark todo task as complete
     * @param {Object} e Event object
     * @param {Number} index  Index of todo task
     */
    const markComplete = (e, index) => {
        e.target.closest('.todo-list').classList.toggle("disabled-div");
        let newTodo = List.map((todo, idx) => {
            if (todo.id === index) {
                return { id: todo.id, task: todo.task, completed: 1 };
            }
            return { id: todo.id, task: todo.task, completed: todo.completed };
        });
        setTodos([...newTodo]);
        localStorage.setItem('todoList', JSON.stringify(newTodo));
    }

    /**
     * Function to handle to onclick event for task update
     * @param {Object} e  Event object
     * @param {Object} task todo task object
     */
    const editTodo = (e, task) => {
        inputref.current.value = task.task;
        const button = document.getElementById('submit');
        button.innerHTML = 'Update';
        setPrevTask(task);
    }

    return (
        <div className='main'>
            {List.length > 0 &&
                <div className='todo-list-container' >
                    {
                        List.map((todo, index) => {
                            return (
                                <div className='list-main' key={index}>
                                    <div className={'todo-list ' + (todo.completed === 1 ? 'disabled-div' : '')} >
                                        <p>
                                            {todo.task}
                                        </p>
                                        <div className='action' >
                                            <button type="button" className='button' onClick={(event) => markComplete(event, todo.id)} > <img className='svg' src={CheckIcon} alt="edit task" />  </button>
                                            <button type="button" className='button' onClick={(event) => editTodo(event, todo)}> <img className='svg' src={PencilIcon} alt="edit task" />  </button>
                                            <button type="button" className='button remove-disable' onClick={(event) => removeTodoItem(index, todo)}> <img className='svg' src={DeleteIcon} alt='delete button' /></button>
                                        </div>

                                    </div>

                                </div>


                            );
                        })

                    }

                </div >
            }
        </div>

    );

}
export default TodoList;
