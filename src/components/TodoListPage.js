import React from 'react';
import TodoListComponent from './TodoListComponent';

export default function TodoListPage({ placeholder }) {
  return (
    <div>
      <TodoListComponent placeholder={placeholder} />
    </div>
  );
}
