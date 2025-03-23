import { useState } from "react";
import { addProject } from "../api";

const ProjectForm = ({ onProjectAdded }: { onProjectAdded: () => void }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 3) {
      setError("Project name must be at least 3 characters.");
      return;
    }

    try {
      await addProject(name);
      setName(""); // Clear input
      setError("");
      onProjectAdded(); // Refresh project list
    } catch (err) {
      setError("Error adding project. Name may be a duplicate.");
    }
  };

  return (
    <div className="container1">
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />
        <button type="submit">Add</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProjectForm;
