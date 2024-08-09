import React, { useState, useEffect } from "react";
import "../assets/scss/sidebar.scss";
import IconButton from "./UI/IconButton";
import { LuPlus } from "react-icons/lu";
import { Config } from "../config/appConfig";
import SubjectSelector from "./SubjectSelector";
import { subjects } from "../data";

const Sidebar = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  console.log({ isMobileView });
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`sidebar ${false ? "hidden" : ""}`}>
      <section className="sidebar-section">
        <h3>Create</h3>
        <div className="sidebar-item">
          <IconButton
            text="New project"
            color={Config.colors.white}
            onPress={() => console.log("Create Project")}
          >
            <LuPlus />
          </IconButton>
        </div>
        <div className="sidebar-item">
          <IconButton
            text="New post"
            color={Config.colors.white}
            onPress={() => console.log("Create Project")}
          >
            <LuPlus />
          </IconButton>
        </div>
        <div className="sidebar-item">
          <IconButton
            text="New note"
            color={Config.colors.white}
            onPress={() => console.log("Create Project")}
          >
            <LuPlus />
          </IconButton>
        </div>
      </section>
      <section className="sidebar-section">
        <h3>Filter</h3>
        <SubjectSelector subjects={subjects} onChange={console.log} />
      </section>

      <section className="sidebar-section">
        <h3>Manage</h3>
      </section>
    </div>
  );
};

export default Sidebar;
