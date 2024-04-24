import React from "react";
import { useSelector } from "react-redux";
import { BlueButton } from "../../components/buttonStyles";
import { useNavigate } from "react-router-dom";

const TeacherSubjects = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  
  const teachSubjects = currentUser.teachSubject;
  const subIds = teachSubjects.map(obj => obj._id);
  const subNames = teachSubjects.map(obj => obj.subName);

  const subjectButtonClickHandler = (subId) => {
    navigate(`/Teacher/class/subjects/${subId}`);
  };

  return (
    <>
      <div>
        {subIds.map((subId, index) => (
          <BlueButton style={{margin: "20px" , width: "300px" , height: "50px", fontWeight: 700}}
            key={subId}
            onClick={() => subjectButtonClickHandler(subId)}
          >
            {subNames[index]}
          </BlueButton>
        ))}
      </div>
    </>
  );
};

export default TeacherSubjects;
