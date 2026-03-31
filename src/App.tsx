import { TaskProvider } from "./components/context/TaskContext.js";
import { Header, TaskFilter, TaskInput, TaskList } from "./components/index.js";
import "./styles/global.scss";

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <Header />
        <TaskFilter />
        <TaskInput />
        <TaskList />
      </div>
    </TaskProvider>
  );
}
export default App;
