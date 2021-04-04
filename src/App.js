import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import { Tasks } from "./components/Tasks";
import Addtask from "./components/Addtask";
import Footer from "./components/Footer";
import About from "./components/About";
function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // this is async function that takes data from fetchtasks and pass it to settasks
    const getTask = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTask();
  }, []);

  // this is a function that fetch the data
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks"); // Calling url
    const data = await res.json(); // Taking json data
    return data; // Printing them
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`); // Calling url
    const data = await res.json(); // Taking json data
    return data; // Printing them
  };
  const addtask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  //delete task

  const deletetask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  //toggle remainder

  const toggleRemainder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const update = { ...taskToToggle, remainder: !taskToToggle.remainder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(update),
    });

    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, remainder: !task.remainder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <Addtask onAdd={addtask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deletetask}
                  onToggle={toggleRemainder}
                />
              ) : (
                "No Tasks"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
