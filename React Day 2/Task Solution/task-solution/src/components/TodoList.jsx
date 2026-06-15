import { useState } from 'react';

function TodoList() {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);

  const addTask = () => {
    if (task.trim() === '') return;
    setList([...list, task]);
    setTask('');
  };

  const removeTask = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => removeTask(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;