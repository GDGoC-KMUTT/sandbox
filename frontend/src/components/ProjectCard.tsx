import React from "react";

const ProjectCard = () => {
  return (
    <div className="flex flex-col justify-center gap-[10px] min-w-[300px] min-h-[150px] p-[20px] m-[20px] rounded-2xl bg-slate-200">
      <h4>Etalert</h4>
      <p>eta.scnn.me</p>
      <div>
        <div className="w-[30px] h-[30px] rounded-full bg-slate-400"></div>
      </div>
    </div>
  );
};

export default ProjectCard;
