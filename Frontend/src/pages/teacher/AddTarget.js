import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const AddTarget = () => {
  const params = useParams();
  const subid = params.subid; // Assuming the document ID is provided as 'subid'

  const [targetData, setTargetData] = useState({
    Level1UT: "",
    Level2UT: "",
    Level3UT: "",
    Level1SPPU: "",
    Level2SPPU: "",
    Level3SPPU: "",
    AddMarksPerCO: "",
  });

  const [previewData, setPreviewData] = useState([]);
  const [showTable, setShowTable] = useState(false); // Track whether to show the table or not

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTargetData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/Subject/AddTarget/${subid}`,
        {
          subid: subid,
          targetData: targetData,
        }
      );
      console.log("Target data added successfully!");
    } catch (error) {
      console.error(
        "Error adding target:",
        error.response ? error.response.data : error
      );
    }
  };

  const fetchPreviewData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/Subject/AddTarget/${subid}`
      );

      // Extract data from the response
      const level1Data = {
        level: 1,
        UT: response.data.Level1UT,
        SPPU: response.data.Level1SPPU,
      };

      const level2Data = {
        level: 2,
        UT: response.data.Level2UT,
        SPPU: response.data.Level2SPPU,
      };

      const level3Data = {
        level: 3,
        UT: response.data.Level3UT,
        SPPU: response.data.Level3SPPU,
      };

      // Construct the preview data array
      const dataArray = [level1Data, level2Data, level3Data];

      // Set preview data fetched from the database
      setPreviewData(dataArray);
      setShowTable(true); // Show the table after fetching the data
    } catch (error) {
      console.error(
        "Error fetching preview data:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div>
      <h2>Add Target</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Level 1 UT"
              type="number"
              name="Level1UT"
              value={targetData.Level1UT}
              onChange={handleInputChange}
              style={{ marginBottom: "8px" }}
            />
            <TextField
              fullWidth
              label="Level 2 UT"
              type="number"
              name="Level2UT"
              value={targetData.Level2UT}
              onChange={handleInputChange}
              style={{ marginBottom: "8px" }}
            />
            <TextField
              fullWidth
              label="Level 3 UT"
              type="number"
              name="Level3UT"
              value={targetData.Level3UT}
              onChange={handleInputChange}
              style={{ marginBottom: "8px" }}
            />
            <TextField
              fullWidth
              label="Add Marks Per CO"
              type="number"
              name="AddMarksPerCO"
              value={targetData.AddMarksPerCO}
              onChange={handleInputChange}
              style={{ marginBottom: "8px" }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Level 1 SPPU"
              type="number"
              name="Level1SPPU"
              value={targetData.Level1SPPU}
              onChange={handleInputChange}
              style={{ marginBottom: "8px" }}
            />
            <TextField
              fullWidth
              label="Level 2 SPPU"
              type="number"
              name="Level2SPPU"
              value={targetData.Level2SPPU}
              onChange={handleInputChange}
              style={{ marginBottom: "8px" }}
            />
            <TextField
              fullWidth
              label="Level 3 SPPU"
              type="number"
              name="Level3SPPU"
              value={targetData.Level3SPPU}
              onChange={handleInputChange}
              style={{ marginBottom: "8px" }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
        >
          Add Target
        </Button>
      </form>

      {/* Preview button */}
      <Button
        variant="contained"
        color="primary"
        onClick={fetchPreviewData}
        style={{ marginLeft: "10px" }}
      >
        Preview Data
      </Button>

      {/* Preview section */}
      {showTable && (
        <div>
          <h2 style={{ textAlign: "center" }}>Preview Data</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Level</TableCell>
                  <TableCell>UT</TableCell>
                  <TableCell>SPPU</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {previewData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>Level {row.level}</TableCell>
                    <TableCell>{row.UT}</TableCell>
                    <TableCell>{row.SPPU}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default AddTarget;
