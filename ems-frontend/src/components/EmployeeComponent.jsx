import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  listEmployees,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDepartments } from "../services/DepartmentService";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments().then((response) => {
      console.log(response.data);
      setDepartments(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setDepartmentId(response.data.departmentId)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    const employee = { firstName, lastName, email, departmentId };
    if (id) {
      updateEmployee(id, employee)
        .then((response) => {
          navigator("/employees");
        })
    } else {
      createEmployee(employee).then((response) => {
        navigator("/employees");
      });
    }
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
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
                  First Name:
                </label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className="form-control"
                  onChange={handleFirstName}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="" className="form-label">
                  Last Name:
                </label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className="form-control"
                  onChange={handleLastName}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="" className="form-label">
                  Email:
                </label>
                <input
                  type="text"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className="form-control"
                  onChange={handleEmail}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="" className="form-label">
                  Select department:
                </label>
                <select
                               className={`form-control`}
                               value={departmentId}
                                onChange={(e) => setDepartmentId(e.target.value)}
                            >
                               <option value="Select Department">Select Department</option>
                                {
                                    departments.map( department => 
                                        <option key={department.id} value={department.id} > {department.departmentName}</option>
                                        )
                                }
                            </select>
              </div>
              <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
