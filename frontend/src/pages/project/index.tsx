import Navbar from "../../components/Navbar";
import ProjectCard from "../../components/ProjectCard";

const Project = () => {
  return (
    <div>
      <Navbar />
      <div className="p-[30px]">
        <div className="flex justify-between">
          <h3>Project</h3>
          <button className="w-[100px] h-[40px] bg-slate-300">+ New</button>
        </div>
        <div className="flex flex-wrap">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
};

export default Project;
