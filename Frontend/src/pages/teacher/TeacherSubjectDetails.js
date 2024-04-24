import React from "react";
import { Button, Grid, Typography, dividerClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const TeacherSubjectDetails = () => {
  const params = useParams();
  const subid = params.subid;
  const navigate = useNavigate();

  const buttonData = [
    {
      label: "Add/View COs",
      path: `/Teacher/class/subjects/AddCOs/${subid}`,
      step: "Step 1",
    },
    // {
    //   label: "View COs",
    //   path: `/Teacher/class/subjects/ViewCOs/${subid}`,
    //   step: "Step 1",
    // },
    {
      label: "Add CO, PO Articulation Matrix",
      path: `/Teacher/class/subjects/AddCOPOArticulationMatrix/${subid}`,
      step: "Step 2",
    },
    {
      label: "Add Target",
      path: `/Teacher/class/subjects/AddTarget/${subid}`,
      step: "Step 3",
    },
    {
      label: "Add CO Wise Marks",
      path: `/Teacher/class/subjects/AddCOWiseMarks/${subid}`,
      step: "Step 4",
    },
    {
      label: "Generate CO Attainment",
      path: `/Teacher/class/subjects/GenerateCOAttainment/${subid}`,
      step: "Step 5",
    },
    {
      label: "Generate PO Attainment",
      path: `/Teacher/class/subjects/GeneratePOAttainment/${subid}`,
      step: "Step 6",
    },
  ];

  const navigateToPath = (path) => {
    navigate(path);
  };

  const buttonStyles = {
    step1: {
      backgroundColor: "#cce6ff",
      color: "#007bff",
      fontWeight: "normal",
    },
    step2: { backgroundColor: "#fff3cd", color: "#856404", fontWeight: "bold" },
    step3: {
      backgroundColor: "#d4edda",
      color: "#155724",
      fontWeight: "normal",
    },
    step4: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      fontWeight: "normal",
    },
    step5: { backgroundColor: "#f3f4f5", color: "#212529", fontWeight: "bold" },
    step6: { backgroundColor: "#f3f4f5", color: "#212529", fontWeight: "bold" },
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
        <div>
          {Object.entries(
            buttonData.reduce((acc, { step, ...rest }) => {
              if (!acc[step]) acc[step] = [];
              acc[step].push({ step, ...rest });
              return acc;
            }, {})
          ).map(([step, buttons], index) => (
            <div key={index}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6" textAlign="center">{step}:</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                {buttons.map((button, buttonIndex) => (
                  <Grid item key={buttonIndex} xs={3}>
                    <Button
                      variant="contained"
                      onClick={() => navigateToPath(button.path)}
                      style={{ ...buttonStyles[`step${step}`], width: "30vw" ,margin: '5px' }} // Adjust width as needed
                    >
                      {button.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default TeacherSubjectDetails;
