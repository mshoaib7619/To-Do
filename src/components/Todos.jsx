import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Todos() {
  const [todo, setTodo] = useState({ title: "", description: "", date: "" });
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todo')) || []);
  const [editTodo, setEditTodo] = useState(null)
  const [search, setSearch] = useState("")
  const [filteredTodos, setFilteredTodos] = useState(todos);


  const handleOnChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
        e.preventDefault();
          if (editTodo !== null) {
            const updatedTodos = todos.map((t, index) => (
              index === editTodo ? { ...todo } : t
            ));
            setTodos(updatedTodos);
            setEditTodo(null);
            toast.success("Todo updated successfully");
          } else {
          const newTodo = [...todos, todo];
          setTodos(newTodo);
          toast.success("Todo added successfully");
          setTodo({ title: "", description: "", date: "" });
        }
      }


      useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todos));
        const filtered = todos.filter(todo =>
          todo.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredTodos(filtered);
      }, [todos, search]);

  const handleDelete =(index)=>{
    const updateTodo = todos.filter((_,i) =>i !==index)
     setTodos(updateTodo)
     toast.success("Todo Delete Successfully")
      }

  const handleEdit =(index)=>{
    setEditTodo(index)
    setTodo(todos[index])
  }

  const handleComplete = (index)=>{
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    toast.success(`Todo marked as ${updatedTodos[index].completed ? 'Complete' : 'Incomplete'}`);
  }

  const handleSearch =(e)=>{
    setSearch(e.target.value)
  }

  return (
    <>
      <div className="todo-container">
        <h2 className="todo-heading">To-Do</h2>
        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="todo-title">Title:</label>
            <input
              type="text"
              id="todo-title"
              name="title"
              value={todo.title}
              onChange={handleOnChange}
              placeholder="Enter Todo Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="todo-description">Description:</label>
            <input
              type="text"
              id="todo-description"
              name="description"
              value={todo.description}
              onChange={handleOnChange}
              placeholder="Enter Todo Description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="todo-date">Date:</label>
            <input
              type="date"
              id="todo-date"
              name="date"
              value={todo.date}
              onChange={handleOnChange}
            />
          </div>
          <button type="submit" className="todo-button">
           Add
          </button>
        </form>
      </div>


  <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Sr.No</th>
      <th scope="col">Title:  <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search by title"
                /></th>
      <th scope="col">Description</th>
      <th scope="col">Date</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredTodos.map((item, index) => (
      <tr key={index} className={item.completed ? 'completed' : ''}>
        <th scope="row">{index + 1}</th>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{item.date}</td>
        <td>
          <button className="todo-button edit-button" onClick={() => handleEdit(index)}>Edit</button>
          <button className="todo-button delete-button" onClick={() => handleDelete(index)}>Delete</button>
          <button className="todo-button complete-button" onClick={() => handleComplete(index)}>
            {item.completed ? 'Mark To Incomplete' : 'Mark To Complete'}
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </>
  );
}

export default Todos;
