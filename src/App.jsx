import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ProjectListPage from "./pages/ProjectListPage"
import CreateProjectPage from "./pages/CreateProjectPage"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/create" element={<CreateProjectPage />} />
        <Route path="/*" element={<h2>Page not found</h2>} />
      </Routes>
    </>
  )
}

export default App
