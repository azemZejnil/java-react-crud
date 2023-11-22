import React, { useEffect, useState } from "react";
import { createDepartment, getDepartmentById, updateDepartment } from "../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentComponent = () => {
    const [departmentName, setDepartmentName] = useState("");
    const [departmentDescription, setDepartmentDescription] = useState("");
  
    const handleDepartmentName = (e) => setDepartmentName(e.target.value);
    const handleDepartmentDescription = (e) => setDepartmentDescription(e.target.value);
  
    const { id } = useParams();
    const navigator = useNavigate();
  
    useEffect(() => {
      getDepartmentById(id)
        .then((response) => {
          setDepartmentName(response.data.name);
          setDepartmentDescription(response.data.description);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [id]);
  
    function saveOrUpdateDepartment(e) {
      e.preventDefault();
      const department = { departmentName, departmentDescription };
      console.log(department);
  
      if (id) {
        updateDepartment(id, department)
          .then((response) => {
            console.log(response.data);
            navigator("/departments");
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        createDepartment(department)
          .then((response) => {
            console.log(response.data);
            navigator("/departments");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  
    function pageTitle() {
      if (id) {
        return <h2 className="text-center">Edit department</h2>;
      } else {
        return <h2 className="text-center">Add department</h2>;
      }
    }
  
    return (
      <div className="container">
        <br />
        <br />
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {pageTitle()}
            <div className="card-body">
              <form action="">
                <div className="form-group mb-2">
                  <label htmlFor="" className="form-label">
                    Department name:
                  </label>
                  <input
                    type="text"
                    name="departmentName"
                    placeholder="Enter the department name"
                    value={departmentName}
                    onChange={handleDepartmentName} 
                    className="form-control"
                  ></input>
                </div>
  
                <div className="form-group mb-2">
                  <label htmlFor="" className="form-label">
                    Department description:
                  </label>
                  <input
                    type="text"
                    name="departmentDescription"
                    placeholder="Enter the department description"
                    value={departmentDescription}
                    onChange={handleDepartmentDescription} 
                    className="form-control"
                  ></input>
                </div>
                <button
                  className="btn btn-success mb-2"
                  onClick={(e) => saveOrUpdateDepartment(e)}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DepartmentComponent;