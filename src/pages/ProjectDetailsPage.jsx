import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import { API_URL } from "../config/api";
import AddTask from "../components/AddTask";


function ProjectDetailsPage() {

    const [project, setProject] = useState(null);

    const { projectId } = useParams();

    const navigate = useNavigate();

    const getProject = () => {
        axios.get(`${API_URL}/projects/${projectId}?_embed=tasks`)
            .then((response) => {
                setProject(response.data);
            })
            .catch((error) => console.log("Error getting project details from the API...", error));
    };

    const deleteProject = () => {
        axios.delete(`${API_URL}/projects/${projectId}`)
            .then( response => {
                navigate("/projects");
            })
            .catch((error) => console.log("Error deleting project...", error));
    }

    useEffect(() => {
        getProject();
    }, []);


    if (project === null) {
        return <Loader />;
    }

    return (
        <div className="ProjectDetailsPage">

            {/* project details */}
            {project && (
                <>
                    <h1>{project.title}</h1>
                    <p>{project.description}</p>
                </>
            )}

            {/* form to create new tasks */}
            <AddTask callbackToRefresh={getProject} projectId={projectId} />

            {/* list of tasks */}
            <div className="card-list">
                {project &&
                    project.tasks.map((task) => {
                        return (
                            <li className="TaskCard card" key={task.id}>
                                <h3>{task.title}</h3>
                                <h4>Description:</h4>
                                <p>{task.description}</p>
                            </li>)
                    })}
            </div>

            <Link to="/projects">
                <button>Back to projects</button>
            </Link>

            <Link to={`/projects/edit/${projectId}`}>
                <button>Edit</button>
            </Link>

            <button onClick={deleteProject}>Delete</button>

        </div>
    );
}

export default ProjectDetailsPage;
