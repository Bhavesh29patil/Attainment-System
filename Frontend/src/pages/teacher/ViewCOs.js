import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewCOs = () => {
  const [courseOutcomes, setCourseOutcomes] = useState([]);
  const params = useParams();
  const subid = params.subid;


  const [getcourseOutcomes, setgetCourseOutcomes] = useState([]);
  
   const fetchCourseOutcomes = async () => {
    try {
      // Make a GET request to retrieve course outcomes for the specific subject
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/GetCOs`, {
        params: {
          subid: subid,
        },
      });

      const data = response.data.CO;

      // Update state with the retrieved course outcomes
      setgetCourseOutcomes(data);
      
    } catch (error) {
      console.error("Error fetching course outcomes", error);
    }
  };
  fetchCourseOutcomes();


  const Temp=()=>{

    return (
      <>
        <div>
        <h3>Course Outcomes for Subject: {subid}</h3>
        <table className="course-outcomes-table">
          <thead>
            <tr>
              <th>Outcome Number</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {getcourseOutcomes?.map((co, index) => (
              <tr key={index}>
                <td>{co.outcomeNumber}</td>
                <td>{co.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      </>
    )

   
  }

  return (
    <>
      <Temp/>
    </>
  );
};

export default ViewCOs;
