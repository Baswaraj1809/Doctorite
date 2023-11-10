import React, { useState } from 'react';
import UserList from './UserList';
import TodoList from './TodoList';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <UserList onUserClick={handleUserClick} />
      {selectedUser && <TodoList user={selectedUser} />}
    </div>
  );
};

export default App;
