import React, { useState, useEffect } from 'react';

const TodoList = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [percentages, setPercentages] = useState({ completed: 0, notStarted: 0 });

  useEffect(() => {
    setPercentages(calculatePercentages());
  }, [todos]);

  const calculatePercentages = () => {
    const totalTasks = todos.length;
    const completedTasks = todos.filter((todo) => todo.completed).length;
    const notStartedTasks = todos.filter((todo) => !todo.completed).length;

    return {
      completed: totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100,
      notStarted: totalTasks === 0 ? 0 : (notStartedTasks / totalTasks) * 100,
    };
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();

      recognition.onresult = (event) => {
        const voiceText = event.results[0][0].transcript;
        setNewTask(voiceText);
      };

      recognition.start();
    } else {
      console.log('Speech recognition not supported in this browser.');
    }
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTodo = { id: todos.length + 1, userId: user.id, title: newTask, completed: false };
      setTodos([...todos, newTodo]);
      setNewTask('');
    }
  };

  const editTask = (taskId, newTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === taskId ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
    setEditingTaskId(null);
  };

  const deleteTask = (taskId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== taskId);
    setTodos(updatedTodos);
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === taskId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>{user.name}'s Todos</h2>
      <p style={{ color: '#555', fontSize: '14px', margin: '10px 0' }}>
        Completed: {percentages.completed.toFixed(2)}% | Not Started: {percentages.notStarted.toFixed(2)}%
      </p>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
         {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px',
              border: '1px solid #ccc',
              margin: '8px 0',
              borderRadius: '5px',
              backgroundColor: todo.completed ? '#d4edda' : 'inherit',
            }}
          >
            {editingTaskId === todo.id ? (
              <input
                type="text"
                value={todo.title}
                onChange={(e) => editTask(todo.id, e.target.value)}
                style={{ flex: '1', marginRight: '8px', padding: '8px' }}
              />
            ) : (
              <span
                style={{
                  flex: '1',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  fontSize: '16px',
                }}
              >
                {todo.title}
              </span>
            )}
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTaskStatus(todo.id)}
                style={{ marginRight: '8px' }}
              />
              <button
                onClick={() => setEditingTaskId(todo.id)}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  backgroundColor: '#3498db',
                  color: '#fff',
                  border: '1px solid #3498db',
                  borderRadius: '5px',
                  marginRight: '4px',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(todo.id)}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  backgroundColor: '#e74c3c',
                  color: '#fff',
                  border: '1px solid #e74c3c',
                  borderRadius: '5px',
                }}
              >
                Delete
              </button>
             </div>
           </li>
         ))}
       </ul>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            padding: '8px',
            marginRight: '8px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '8px',
            cursor: 'pointer',
            backgroundColor: '#2ecc71',
            color: '#fff',
            border: '1px solid #2ecc71',
            borderRadius: '5px',
          }}
        >
          Add Task
        </button>
        <button
          onClick={handleVoiceInput}
          style={{
            padding: '8px',
            cursor: 'pointer',
            backgroundColor: '#3498db',
            color: '#fff',
            border: '1px solid #3498db',
            borderRadius: '5px',
            marginLeft: '8px',
          }}
        >
          Add Task (Voice)
        </button>
      </div>
    </div>
  );
};

export default TodoList;
