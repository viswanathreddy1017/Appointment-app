import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Professors = () => {
  const [professors, setProfessors] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/user/professors",
          { withCredentials: true }
        );
        setProfessors(data.professors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchProfessors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page professors">
      <h1>PROFESSORS</h1>
      <div className="banner">
        {professors && professors.length > 0 ? (
          professors.map((element) => {
            return (
              <div className="card">
                <img
                  src={element.profAvatar && element.profAvatar.url}
                  alt="professor avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                 {/* <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>*/}
                  <p>
                    Department: <span>{element.professorDepartment}</span>
                  </p>
                  <p>
                    BANNERID: <span>{element.bannerId}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Professors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Professors;