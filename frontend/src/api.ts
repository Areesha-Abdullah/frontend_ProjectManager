import axios from "axios";
const API_URL = "http://localhost:5000/api/projects";

export const getProjects = async()=>{
    const response = await axios.get(API_URL);
    return response.data;

}
export const deleteAllProjects = async()=>{
  await axios.delete(API_URL);
}

export const addProject = async (name: string) => {
    const response = await axios.post(API_URL, { name });
    return response.data;
  };

  export const deleteProject = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  };

  export const getProjectCount = async () => {
    const response = await axios.get(`${API_URL}/count`);
    return response.data.count;
  };

  