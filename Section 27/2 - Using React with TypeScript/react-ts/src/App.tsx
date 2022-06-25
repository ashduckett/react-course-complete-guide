// import { useState } from 'react'; 
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import TodosContextProvider from './store/todos-context';
// import Todo from './models/todo';


function App() {
  // const [todos, setTodos] = useState<Todo[]>([]);
  
  // const removeTodoHandler = (todoId: string) => {
  //   setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  // };
  
  // const addTodoHandler = (todoText: string) => {
  //   const newTodo = new Todo(todoText);

  //   setTodos((prevTodos) => {
  //     return prevTodos.concat(newTodo);
  //   });
  // };
  
  // const todos = [
  //   new Todo('Learn React'),
  //   new Todo('Learn TypeScript')
  // ];

  return (
    <TodosContextProvider>
      <NewTodo />
      <Todos />
    </TodosContextProvider>
  );
}

export default App;
