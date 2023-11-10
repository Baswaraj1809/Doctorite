import React, { useState } from 'react';

const UserList = ({ onUserClick }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
  ]);

  const [newUserName, setNewUserName] = useState('');

  const addUser = () => {
    if (newUserName.trim() !== '') {
      const newUser = { id: users.length + 1, name: newUserName };
      setUsers([...users, newUser]);
      setNewUserName('');
    }
  };

  const removeUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>Users</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: '10px' }}>
            <button
              onClick={() => onUserClick(user)}
              style={{
                padding: '8px',
                margin: '8px',
                border: '1px solid #3498db',
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: '#3498db',
                color: '#fff',
              }}
            >
              {user.name}
            </button>
            <button
              onClick={() => removeUser(user.id)}
              style={{
                padding: '8px',
                margin: '8px',
                border: '1px solid #e74c3c',
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: '#e74c3c',
                color: '#fff',
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Add new user"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          style={{
            padding: '8px',
            marginRight: '8px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          onClick={addUser}
          style={{
            padding: '8px',
            cursor: 'pointer',
            backgroundColor: '#2ecc71',
            color: '#fff',
            border: '1px solid #2ecc71',
            borderRadius: '5px',
          }}
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default UserList;
