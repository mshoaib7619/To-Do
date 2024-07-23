import  { useState } from 'react';
import { toast } from 'react-toastify';

function ToDoTable() {
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem('todo')) || []);

  const handleEdit = (index) => {
    // const editTodo = 
  };

  const handleDelete = (index) => {
    const updatedTodos = todo.filter((_, i) => i !== index);
    setTodo(updatedTodos);
    localStorage.setItem('todo', JSON.stringify(updatedTodos));
    toast.success("Todo deleted successfully");
  };

  const handleComplete = (index) => {
    const updatedTodos = todo.map((todo, i) =>
    i === index ? { ...todo, completed: !todo.completed } : todo);
    setTodo(updatedTodos);
    localStorage.setItem('todo', JSON.stringify(updatedTodos));
    toast.success(`Todo marked as ${updatedTodos[index].completed ? 'Complete' : 'Incomplete'}`);
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {todo.map((item, index) => (
            <tr key={index} className={item.completed ? 'completed' : ''}>
              <th scope="row">{index + 1}</th>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.date}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => handleComplete(index)}>
                  {item.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ToDoTable;
