import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AddCOs = () => {
  const params = useParams();
  const subid = params.subid;

  const [courseOutcome, setCourseOutcome] = useState({
    outcomeNumber: "",
    description: "",
  });

  const [getcourseOutcomes, setgetCourseOutcomes] = useState([]);

  const handleInputChange = (key, value) => {
    setCourseOutcome((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDeleteCO = async (coIndex) => {
    try {
      const updatedCourseOutcomes = [...getcourseOutcomes];
      updatedCourseOutcomes.splice(coIndex, 1);

      await axios.delete(`${process.env.REACT_APP_BASE_URL}/AddCOs`, {
        data: {
          subid: subid,
          CO: getcourseOutcomes[coIndex],
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setgetCourseOutcomes(updatedCourseOutcomes);
    } catch (error) {
      console.error("Error deleting course outcome", error);
    }
  };

  const handleAddCO = async () => {
    setgetCourseOutcomes((prev) => [...prev, courseOutcome]);
    setCourseOutcome({ outcomeNumber: "", description: "" });

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/AddCOs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subid: subid,
          CO: courseOutcome,
        }),
      });
    } catch (error) {
      console.error("Error adding Course Outcomes", error);
    }
  };

  const fetchCourseOutcomes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/GetCOs`,
        {
          params: {
            subid: subid,
          },
        }
      );

      const data = response.data.CO;
      setgetCourseOutcomes(data);
    } catch (error) {
      console.error("Error fetching course outcomes", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchCourseOutcomes();
  };

  useEffect(() => {
    fetchCourseOutcomes();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        <TextField
          label="Course Outcome Number"
          variant="outlined"
          value={courseOutcome.outcomeNumber}
          onChange={(e) => handleInputChange("outcomeNumber", e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={courseOutcome.description}
          style={{ width: "500px", marginLeft: 5, marginRight: "10px" }}
          onChange={(e) => handleInputChange("description", e.target.value)}
          // style={{  }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCO}
          style={{ marginRight: "5px", marginTop: "10px",marginLeft:"60px" }}
        >
          Add CO
        </Button>
        {/* <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginLeft: "8px", marginTop: "10px" }}
        >
          View
        </Button> */}
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "150px" }}>Outcome Number</TableCell>
              <TableCell style={{ width: "400px" }}>Description</TableCell>
              <TableCell style={{ width: "150px" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getcourseOutcomes.map((co, index) => (
              <TableRow key={index}>
                <TableCell>{co.outcomeNumber}</TableCell>
                <TableCell>{co.description}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteCO(index)}
                    variant="contained"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      marginRight: 10,
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "darkred")
                    }
                    onMouseOut={(e) => (e.target.style.backgroundColor = "red")}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AddCOs;
