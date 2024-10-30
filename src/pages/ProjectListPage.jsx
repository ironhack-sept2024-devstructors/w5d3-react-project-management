
import { useEffect, useState } from "react";
import axios from "axios";

import Loader from "../components/Loader";

import { API_URL } from "../config/api";

function ProjectListPage() {

    const [projects, setProjects] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/projects/`)
            .then(response => {
                setProjects(response.data);
            })
            .catch(e => console.log("Error getting projects from the API...", e));

    }, []);


    if (projects === null) {
        return <Loader />;
    }

    return (
        <div className="ProjectListPage">
            {projects && projects.map(projectDetails => {
                return (
                    <div className="card" key={projectDetails.id}>
                        <h3>{projectDetails.title}</h3>
                    </div>
                );
            })}
        </div>
    )
}

export default ProjectListPage;