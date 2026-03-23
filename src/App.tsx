import "./App.css";
import { TaskProvider } from "./components/context/TaskContext.js";
import { TaskFilter, TaskInput, TaskList } from "./components/index.js";

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <TaskFilter />
        <TaskInput />
        <TaskList />
      </div>
    </TaskProvider>
  );
}
export default App;
