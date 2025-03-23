import { useState , useEffect} from "react";
import ProjectList from "./components/ProjectList";
import ProjectForm from "./components/ProjectForm";
import { getProjectCount } from "./api"; // Import the API function
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [count, setCount] = useState<number>(0);

  const fetchCount = async () => {
    const projectCount = await getProjectCount();
    setCount(projectCount);
  };

  useEffect(() => {
    fetchCount(); // Fetch project count on component mount
  }, []);

  useEffect(() => {
    fetchCount(); // Update project count whenever refresh changes
  }, [refresh]);

  return (
    <div className="container">
      <h1>PROJECT MANAGER</h1>
      <div className="count">
      <h2>Total Projects: {count}</h2>
      </div>
      <ProjectForm onProjectAdded={() => setRefresh(!refresh)} />
      <ProjectList refresh={refresh} onProjectDeleted={() => setRefresh(!refresh)} />
    </div>
  );
}
export default App;