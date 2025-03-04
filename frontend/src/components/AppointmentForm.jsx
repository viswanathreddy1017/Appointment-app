import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bannerId, setBannerId] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("SoftwareDe");
  const [professorFirstName, setProfessorFirstName] = useState("");
  const [professorLastName, setProfessorLastName] = useState("");
  const [reason, setReason] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "AdvSoftware",
    "biology",
    "communication",
    "Forensic",
    "Health Care ",
    "History",
    "Java ",
    "Math",
    "Psychology",
    "SoftwareDe"
  ];

  const [professors, setProfessors] = useState([]);
  useEffect(() => {
    const fetchProfessors = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/user/professors",
        { withCredentials: true }
      );
      setProfessors(data.professors);
      console.log(data.professors);
    };
    fetchProfessors();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          bannerId,
          gender,
          appointment_date: appointmentDate,
          department,
          professor_firstName: professorFirstName,
          professor_lastName: professorLastName,
          hasVisited: hasVisitedBool,
          reason,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setBannerId(""),
        setGender(""),
        setAppointmentDate(""),
        setDepartment(""),
        setProfessorFirstName(""),
        setProfessorLastName(""),
        setHasVisited(""),
        setReason("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
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
          </div>
          <div>
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
          </div>
          <div>
            <input
              type="number"
              placeholder="Baner ID"
              value={bannerId}
              onChange={(e) => setBannerId(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setProfessorFirstName("");
                setProfessorLastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select
              value={`${professorFirstName} ${professorLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setProfessorFirstName(firstName);
                setProfessorLastName(lastName);
              }}
              disabled={!department}
            >
              <option value="">Select Professor</option>
              {professors
                .filter((professor) => professor.professorDepartment === department)
                .map((professor, index) => (
                  <option
                    value={`${professor.firstName} ${professor.lastName}`}
                    key={index}
                  >
                    {professor.firstName} {professor.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for Appointment"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;