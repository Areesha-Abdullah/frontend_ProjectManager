import { useEffect, useState } from "react";
import { getProjects, deleteProject, deleteAllProjects } from "../api";

interface Project { 
    id: number;
    name: string;
}

const ProjectList = ({ refresh, onProjectDeleted }: { refresh: boolean; onProjectDeleted: () => void }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    
    useEffect(()=>{
        fetchProjects();
    },[refresh]);

    const fetchProjects = async()=>{
        try{
            const data = await getProjects();
            setProjects(data);
        } catch(error){
           console.error("Error fetching projects:" , error)
        }
    };

    const handleDelete = async (id: number) => {
        await deleteProject(id);
        fetchProjects();
        onProjectDeleted(); // Update project count
    };

    const handleDeleteAll = async () => {
      await deleteAllProjects();
      fetchProjects();
      onProjectDeleted(); // Update project count
  };

  return (
    <div className="container2">
      
      {projects.length > 0 ? (
        <>
          <ul>
          <h2>Projects List</h2>
            {projects.map((project) => (
              <li key={project.id}>
                {project.name}{" "}
                <button onClick={() => handleDelete(project.id)} className="delete-btn">Delete</button>
              </li>
            ))}
          </ul>
          <button onClick={handleDeleteAll} className="delete-all-btn">
            Delete All Projects
          </button>
        </>
      ) : (
        <p>No projects available.</p>
      )}
    </div>
);
};

export default ProjectList;
