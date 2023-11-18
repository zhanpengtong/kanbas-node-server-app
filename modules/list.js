import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  addModule, 
  deleteModule, 
  updateModule, 
  setModule,
  setModules,
} from "./modulesReducer";
import * as client from "./client";
import { findModulesForCourse, createModule } from "./client";

function ModuleList() {
    const handleDeleteModule = (moduleId) => {
        client.deleteModule(moduleId).then((status) => {
          dispatch(deleteModule(moduleId));
        });
      };
    
    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
      };
    
    const { courseId } = useParams();
    const handleAddModule = () => {
        createModule(courseId, module).then((module) => {
        dispatch(addModule(module));
        });
    };
    useEffect(() => {
        findModulesForCourse(courseId)
        .then((modules) =>
            dispatch(setModules(modules))
        );
    }, [courseId]);
    return (
        <ul className="list-group">
        {modules
            .filter((module) => module.course === courseId)
            .map((module, index) => (
            <li key={index} className="list-group-item">
                <button
                onClick={() => handleDeleteModule(module._id)}
                >
                Delete
                </button>
                <h3>{module.name}</h3>
            </li>
            ))}
        </ul>
    );
}
export default ModuleList;
