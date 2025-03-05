import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewProfessor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bannerId, setBannerId] = useState("");
  //const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [professorDepartment, setProfessorDepartment] = useState("");
  const [professorAvatar, setProfessorAvatar] = useState("");
  const [professorAvatarPreview, setProfessorAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "AdvSoftware",
    "biology",
    "communication",
    "Neurology",
    "forensic",
    "health_care",
    "History",
    "Java",
    "Math",
    "psychology",
    "SoftwareDe",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfessorAvatarPreview(reader.result);
      setProfessorAvatar(file);
    };
  };

  const handleAddNewProfessor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("bannerId", bannerId);
      //formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("professorDepartment", professorDepartment);
      formData.append("professorAvatar", professorAvatar);
      await axios
        .post("https://appointment-app-yior.onrender.com/api/v1/user/professor/addnew", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setBannerId("");
          //setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page">
      <section className="container add-professor-form">
        <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">REGISTER A NEW PROFESSOR</h1>
        <form onSubmit={handleAddNewProfessor}>
          <div className="first-wrapper">
            <div>
              <img
                src={
                  professorAvatarPreview ? `${professorAvatarPreview}` : "/profHolder.jpg"
                }
                alt="Professor Avatar"
              />
              <input type="file" onChange={handleAvatar} />
            </div>
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="number"
                placeholder="BannerId"
                value={bannerId}
                onChange={(e) => setBannerId(e.target.value)}
              />
              {/*<input
                type={"date"}
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              /> */}
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={professorDepartment}
                onChange={(e) => {
                  setProfessorDepartment(e.target.value);
                }}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select>
              <button type="submit">Register New Professor</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewProfessor;