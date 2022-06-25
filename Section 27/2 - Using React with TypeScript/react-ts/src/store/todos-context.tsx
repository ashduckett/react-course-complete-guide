import Todo from "../models/todo";
import React, { useState } from 'react';

type TodosContextObj = {
    items: Todo[],
    addTodo: (text: string) => void,
    removeTodo: (id: string) => void
};

type Props = { children: React.ReactNode };

export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: () => {},
    removeTodo: (id: string) => {} 
});

const TodosContextProvider:React.FC<Props> = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);
  
    const removeTodoHandler = (todoId: string) => {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    };
    
    const addTodoHandler = (todoText: string) => {
      const newTodo = new Todo(todoText);
  
      setTodos((prevTodos) => {
        return prevTodos.concat(newTodo);
      });
    };


    const contextValue: TodosContextObj = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler
    };

    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    );
};

export default TodosContextProvider;