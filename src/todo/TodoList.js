import './TodoList.css';
import DeleteIcon from '../asset/svgs/delete.svg';
import PencilIcon from '../asset/svgs/pencil.svg';
import CheckIcon from '../asset/svgs/check.svg';
function TodoList({ List, removeTodoItem, inputref, setPrevTask, setTodos }) {

    const markComplete = (e, index) => {
        e.target.closest('.todo-list').classList.toggle("disabled-div");
        let newTodo = List.map((todo, idx) => {
            if (idx === index) {
                return { task: todo.task, completed: 1 };
            }
            return { task: todo.task, completed: 1 }
        });
        setTodos([...newTodo]);
        localStorage.setItem('todoList', JSON.stringify(newTodo));
    }
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
                                            <button type="button" className='button' onClick={(event) => markComplete(event, index)} > <img className='svg' src={CheckIcon} alt="edit task" />  </button>
                                            <button type="button" className='button' onClick={(event) => editTodo(event, todo)}> <img className='svg' src={PencilIcon} alt="edit task" />  </button>
                                            <button type="button" className='button remove-disable' onClick={(event) => removeTodoItem(index)}> <img className='svg' src={DeleteIcon} alt='delete button' /></button>
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