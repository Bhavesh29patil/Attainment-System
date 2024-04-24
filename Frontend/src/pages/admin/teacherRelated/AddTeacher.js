import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSubjectDetails } from "../../../redux/sclassRelated/sclassHandle";
import Popup from "../../../components/Popup";
import { registerUser } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import { CircularProgress } from "@mui/material";

const AddTeacher = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjectID = params.id;

  const { status, response, error } = useSelector((state) => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const role = "Teacher";
  const school = subjectDetails && subjectDetails.school;
  const teachSubject = subjectDetails && subjectDetails._id;
  const teachSclass =
    subjectDetails &&
    subjectDetails.sclassName &&
    subjectDetails.sclassName._id;

  const fields = {
    name,
    email,
    password,
    role,
    school,
    teachSubject,
    teachSclass,
  };



  const [options, setoptions] = useState([]);
  let found;
  const change = async(e) => {
    
    const desiredID = e.target.value;

    found = options.find((item, id) => {
      return item._id === desiredID;
    });

    found.teachSubject=subjectDetails._id;

    found.teachSclass=teachSclass;

    // await found.save();
    // if(subjectDetails && subjectDetails.sclassName &&)


    // found.teachSclass=subjectDetails.sclassName._id;
    // found.teachSclass="456";
    // foun

    
    // console.log(subjectDetails._id, subjectDetails.subName);
    // subjectDetails.sclassName 
    // console.log(subjectDetails.sclassName)
    // console.log(typeof(teachSclass));
    console.log(found);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(registerUser(fields, role));

    // /TeacherReg

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/TeacherReg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(found),
      });

      navigate("/Admin/teachers")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate("/Admin/teachers");
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  

  

 

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/Teachers`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setoptions(data.teachers);
        console.log(data.teachers, "teachers from database");
      });
  }, []);

  return (
    <div>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Teacher</span>
          <br />
          <label>Subject : {subjectDetails && subjectDetails.subName}</label>
          <label>
            Class : 
            {subjectDetails &&
              subjectDetails.sclassName &&
              subjectDetails.sclassName.sclassName}
          </label>

          {/* <label>Name</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter teacher's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />

          <label>Email</label>
          <input
            className="registerInput"
            type="email"
            placeholder="Enter teacher's email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            placeholder="Enter teacher's password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
          /> */}

          <label>Select Teacher:</label>
          <select
            // value={options.name}
            onChange={change}
          >
            {options?.map((user, id) => {
              return (
                <>
                  <option key={id} value={user._id}>
                    {user.name}
                  </option>
                </>
              );
            })}
          </select>

          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default AddTeacher;
