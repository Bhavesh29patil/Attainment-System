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

const GenerateFinalAttainment = () => {
  const [avgArray, setAvgArray] = useState([[]]);

  const [Subject,setSubject]=useState([]);

  const [Sub, setSub] = useState([]);

  const [PO, setPO] = useState();
  const [sum, setsum] = useState();
  const [sumatt, setsumatt] = useState();
  const [POPSOdirectAtt, setPOPSOdirectAtt] = useState();
  const [directAtt, setdirectAtt] = useState();
  const [indirectAtt, setindirectAtt] = useState({
    PO1: 0.82,
    PO2: 0.75,
    PO3: 0.82,
    PO4: 0.79,
    PO5: 0.82,
    PO6: 0.82,
    PO7: 0.8,
    PO8: 0.82,
    PO9: 0.83,
    PO10: 0.82,
    PO11: 0.82,
    PO12: 0.83,
    PSO1: 0.81,
    PSO2: 0.79,
    PSO3: 0.85,
  });

  const[subname,setsubname] = useState([
    {
      subName: "Operating Systems ",
      subCode: "314442",
    },
    {
      subName: "Human Computer Interaction ",
      subCode: "314444",
    },
    {
      subName: "Theory of Computation ",
      subCode: "314441",
    },
    {
      subName: "Machine Learning ",
      subCode: "314443",
    },
    {
      subName: "Design and Analysis of Algorithm ",
      subCode: "314445(A) ",
    },
    {
      subName: "Computer Networks& Security",
      subCode: "314451",
    },
    {
      subName: "Web Application Development",
      subCode: "314453",
    },
    {
      subName: "Cloud Computing",
      subCode: "314453",
    },
    {
      subName: "Data Science and Big Data Analytics",
      subCode: "314452",
    },
    {
      subName: "Artificial Intelligence",
      subCode: "314454",
    },
    {
      subName: "Software Project Management",
      subCode: "213131",
    },
    {
      subName: "Deep Learning",
      subCode: "213131",
    },
    {
      subName: "Information and Storage Retrieval",
      subCode: "31311",
    },
    {
      subName: "Elective-III Mobile Computing",
      subCode: "22313",
    },
    {
      subName: "Elective-IV Introduction to DevOps",
      subCode: "242323",
    },
    {
      subName: "Distributed Systems",
      subCode: "24232",
    },
    {
      subName: "Elective-VI Blockchain Technology",
      subCode: "42424",
    },
    {
      subName: "Elective-V Social Computing",
      subCode: "42422",
    },
    {
      subName: "Discrete Mathematics",
      subCode: "210241",
    },
    {
      subName: "Logic Design and Computer Organization",
      subCode: "214442",
    },
    {
      subName: "Data Structures and Algorithms",
      subCode: "214443",
    },
    {
      subName: "Basics of Computer Network",
      subCode: "214445",
    },
    {
      subName: "Database Management System",
      subCode: "214452",
    },
    {
      subName: "Computer Graphics",
      subCode: "214453",
    },
    {
      subName: "Software Engineering",
      subCode: "214454",
    },
    {
      subName: "Object Oriented Programming",
      subCode: "214444",
    },

  ]);

  const [finalAtt, setfinalAtt] = useState();
  const [finalPOPSOAtt, setfinalPOPSOAtt] = useState();
  const [flag,setflag] = useState(false);
  const [OverallAtt, setOverallAtt] = useState([]);
  

  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/GetFinalAttainmentData`
      );



      setAvgArray(response.data.avgArrays);
      setSubject(response.data.subjects);
      setOverallAtt(response.data.OverallAttainment);

      // OverallAttainment




      console.log(avgArray);

      // FOR COUNT
      const totalCounts = avgArray.reduce((acc, innerArray) => {
        innerArray.forEach((obj) => {
          for (let key in obj) {
            if (obj[key] > 0) {
              acc[key] = (acc[key] || 0) + 1;
            }
          }
        });
        return acc;
      }, {});
      setSub(totalCounts);
      console.log(Sub, "Pranavcount");

      //  For Sum of Mapping

      const sumofmapping = avgArray.reduce((acc, innerArray) => {
        innerArray.forEach((obj) => {
          for (let key in obj) {
            acc[key] = (acc[key] || 0) + obj[key];
          }
        });
        return acc;
      }, {});

      // console.log(sumofmapping);
      setsum(sumofmapping);
      // console.log(sum, "Pranavsum");
      setflag(true);


    } catch (error) {
      console.error("Error fetching preview data:", error);
    }
  };

  const fetchdata2 = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/GetFinalAttainmentPOs`
      );
      console.log(response.data);
      setPO(response.data);

      const sumOfFields = PO.reduce((acc, obj) => {
        for (let key in obj) {
          acc[key] = (acc[key] || 0) + obj[key];
        }
        return acc;
      }, {});

      console.log(sumOfFields);
      setsumatt(sumOfFields);

      console.log(sumatt, "sum");

      // console.log(PO, "Final");
    } catch (error) {
      console.error("Error fetching preview data:", error);
    }
  };

  const fetchdata3 = () => {
    //  4)PO-PSO-ATT
    const C76 = {};
    for (let key in sumatt) {
      C76[key] = sumatt[key] / sum[key];
    }
    console.log(C76);
    setPOPSOdirectAtt(C76);

    // 5) Direct Attachment

    const outputObject = {};
    for (let key in C76) {
      outputObject[key] = C76[key] > 1 ? 1 : C76[key];
    }
    setdirectAtt(outputObject);
  };

  const fetchdata4 = () => {
    // 6) Final Attainment

    const fAtt = {};

    for (let key in indirectAtt) {
      fAtt[key] = 0.8 * POPSOdirectAtt[key] + 0.2 * indirectAtt[key];
    }

    setfinalAtt(fAtt);
    console.log(fAtt, "finalAtt");

    let finalPo = {};

    for (let key in finalAtt) {
      finalPo[key] = finalAtt[key] > 1 ? 1 : finalAtt[key];
    }

    setfinalPOPSOAtt(finalPo);
  };


  const handleIndirectAttChange = (e) => {
    const { name, value } = e.target;
    setindirectAtt(prevState => ({
      ...prevState,
      [name]: parseFloat(value) // Convert value to float
    }));
  };

  return (
    <div>

      <h3>Indirect Attainment Values</h3>
        <table>
          <thead>
            <tr>
              <th>Indicator</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(indirectAtt).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  <input
                    type="number"
                    name={key}
                    value={value}
                    onChange={handleIndirectAttChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      




      {/*  */}
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: "10px" }}
        onClick={fetchdata}
      >
        Avg Data Table
      </Button>

      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: "10px" }}
        onClick={fetchdata2}
      >
        PO Data Table
      </Button>

       {sumatt && (
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
          onClick={fetchdata3}
        >
          Generate C75/C74
        </Button>
      )}

      {POPSOdirectAtt && (
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
          onClick={fetchdata4}
        >
          Generate Final Attainment
        </Button>
      )} 

      {flag &&(
        
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          
          <thead>
            <tr>
              {/* <th>SubCode</th> */}
              <th>Subject</th>
              <th>PO1</th>
              <th>PO2</th>
              <th>PO3</th>
              <th>PO4</th>
              <th>PO5</th>
              <th>PO6</th>
              <th>PO7</th>
              <th>PO8</th>
              <th>PO9</th>
              <th>PO10</th>
              <th>PO11</th>
              <th>PO12</th>
              <th>PSO1</th>
              <th>PSO2</th>
              <th>PSO3</th>
              <th>OverallAttainment</th>
            </tr>
          </thead>
          <tbody>

            { avgArray.map((nestedArray, index) =>
              nestedArray.map((item, subIndex) => (
                <tr key={item._id}>
                  {/* <td>C{subname[index]?.subCode}</td> */}
                  <td>{Subject[index]}</td>
                  <td>{item.PO1.toFixed(2)}</td>
                  <td>{item.PO2.toFixed(2)}</td>
                  <td>{item.PO3.toFixed(2)}</td>
                  <td>{item.PO4.toFixed(2)}</td>
                  <td>{item.PO5.toFixed(2)}</td>
                  <td>{item.PO6.toFixed(2)}</td>
                  <td>{item.PO7.toFixed(2)}</td>
                  <td>{item.PO8.toFixed(2)}</td>
                  <td>{item.PO9.toFixed(2)}</td>
                  <td>{item.PO10.toFixed(2)}</td>
                  <td>{item.PO11.toFixed(2)}</td>
                  <td>{item.PO12.toFixed(2)}</td>
                  <td>{item.PSO1.toFixed(2)}</td>
                  <td>{item.PSO2.toFixed(2)}</td>
                  <td>{item.PSO3.toFixed(2)}</td>
                  <td>{OverallAtt[index]}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {PO && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              {/* <th>SubCode</th> */}
            <th>Subject</th>
              <th>PO1</th>
              <th>PO2</th>
              <th>PO3</th>
              <th>PO4</th>
              <th>PO5</th>
              <th>PO6</th>
              <th>PO7</th>
              <th>PO8</th>
              <th>PO9</th>
              <th>PO10</th>
              <th>PO11</th>
              <th>PO12</th>
              <th>PSO1</th>
              <th>PSO2</th>
              <th>PSO3</th>
            </tr>
          </thead>
          <tbody>
            {PO.map((object, index) => (
              <tr key={index}>
                {/* <td>C{subname[index]?.subCode}</td> */}
                <td>{Subject[index]}</td>
                <td>{object.PO1?.toFixed(2)}</td>
                <td>{object.PO2?.toFixed(2)}</td>
                <td>{object.PO3?.toFixed(2)}</td>
                <td>{object.PO4?.toFixed(2)}</td>
                <td>{object.PO5?.toFixed(2)}</td>
                <td>{object.PO6?.toFixed(2)}</td>
                <td>{object.PO7?.toFixed(2)}</td>
                <td>{object.PO8?.toFixed(2)}</td>
                <td>{object.PO9?.toFixed(2)}</td>
                <td>{object.PO10?.toFixed(2)}</td>
                <td>{object.PO11?.toFixed(2)}</td>
                <td>{object.PO12?.toFixed(2)}</td>
                <td>{object.PSO1?.toFixed(2)}</td>
                <td>{object.PSO2?.toFixed(2)}</td>
                <td>{object.PSO3?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Subject Table */}

      {avgArray &&
        Sub &&
        sum &&
        sumatt &&
        POPSOdirectAtt &&
        directAtt &&
        indirectAtt &&
        finalAtt &&
        finalPOPSOAtt && (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th>_</th>
                <th>PO1</th>
                <th>PO2</th>
                <th>PO3</th>
                <th>PO4</th>
                <th>PO5</th>
                <th>PO6</th>
                <th>PO7</th>
                <th>PO8</th>
                <th>PO9</th>
                <th>PO10</th>
                <th>PO11</th>
                <th>PO12</th>
                <th>PSO1</th>
                <th>PSO2</th>
                <th>PSO3</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Subject</td>
                <td>{Sub?.PO1}</td>
                <td>{Sub?.PO2}</td>
                <td>{Sub?.PO3}</td>
                <td>{Sub?.PO4}</td>
                <td>{Sub?.PO5}</td>
                <td>{Sub?.PO6}</td>
                <td>{Sub?.PO7}</td>
                <td>{Sub?.PO8}</td>
                <td>{Sub?.PO9}</td>
                <td>{Sub?.PO10}</td>
                <td>{Sub?.PO11}</td>
                <td>{Sub?.PO12}</td>
                <td>{Sub?.PSO1}</td>
                <td>{Sub?.PSO2}</td>
                <td>{Sub?.PSO3}</td>
              </tr>

              <tr>
                <td>SumMap</td>
                <td>{sum?.PO1?.toFixed(2)}</td>
                <td>{sum?.PO2?.toFixed(2)}</td>
                <td>{sum?.PO3?.toFixed(2)}</td>
                <td>{sum?.PO4?.toFixed(2)}</td>
                <td>{sum?.PO5?.toFixed(2)}</td>
                <td>{sum?.PO6?.toFixed(2)}</td>
                <td>{sum?.PO7?.toFixed(2)}</td>
                <td>{sum?.PO8?.toFixed(2)}</td>
                <td>{sum?.PO9?.toFixed(2)}</td>
                <td>{sum?.PO10?.toFixed(2)}</td>
                <td>{sum?.PO11?.toFixed(2)}</td>
                <td>{sum?.PO12?.toFixed(2)}</td>
                <td>{sum?.PSO1?.toFixed(2)}</td>
                <td>{sum?.PSO2?.toFixed(2)}</td>
                <td>{sum?.PSO3?.toFixed(2)}</td>
              </tr>

              <tr>
                <td>SumAtt</td>
                <td>{sumatt?.PO1?.toFixed(2)}</td>
                <td>{sumatt?.PO2?.toFixed(2)}</td>
                <td>{sumatt?.PO3?.toFixed(2)}</td>
                <td>{sumatt?.PO4?.toFixed(2)}</td>
                <td>{sumatt?.PO5?.toFixed(2)}</td>
                <td>{sumatt?.PO6?.toFixed(2)}</td>
                <td>{sumatt?.PO7?.toFixed(2)}</td>
                <td>{sumatt?.PO8?.toFixed(2)}</td>
                <td>{sumatt?.PO9?.toFixed(2)}</td>
                <td>{sumatt?.PO10?.toFixed(2)}</td>
                <td>{sumatt?.PO11?.toFixed(2)}</td>
                <td>{sumatt?.PO12?.toFixed(2)}</td>
                <td>{sumatt?.PSO1?.toFixed(2)}</td>
                <td>{sumatt?.PSO2?.toFixed(2)}</td>
                <td>{sumatt?.PSO3?.toFixed(2)}</td>
              </tr>

              <tr>
                <td>PO-PSO-DirectAttainment</td>
                <td>{POPSOdirectAtt?.PO1?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PO2?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PO3?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PO4?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PO5?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PO6?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PO7?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PO8?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PO9?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PO10?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PO11?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PO12?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PSO1?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PSO2?.toFixed(2)}</td>
                <td>{POPSOdirectAtt?.PSO3?.toFixed(2)}</td>
              </tr>

              <tr>
                <td>DirectAttainment</td>
                <td>{directAtt?.PO1?.toFixed(2)}</td>
                <td>{directAtt?.PO2?.toFixed(2)}</td>
                <td>{directAtt?.PO3?.toFixed(2)}</td>
                <td>{directAtt?.PO4?.toFixed(2)}</td>
                <td>{directAtt?.PO5?.toFixed(2)}</td>
                <td>{directAtt?.PO6?.toFixed(2)}</td>
                <td>{directAtt?.PO7?.toFixed(2)}</td>
                <td>{directAtt?.PO8?.toFixed(2)}</td>
                <td>{directAtt?.PO9?.toFixed(2)}</td>
                <td>{directAtt?.PO10?.toFixed(2)}</td>
                <td>{directAtt?.PO11?.toFixed(2)}</td>
                <td>{directAtt?.PO12?.toFixed(2)}</td>
                <td>{directAtt?.PSO1?.toFixed(2)}</td>
                <td>{directAtt?.PSO2?.toFixed(2)}</td>
                <td>{directAtt?.PSO3?.toFixed(2)}</td>
              </tr>

              <tr>
                <td>InDirectAttainment</td>
                <td>{indirectAtt?.PO1?.toFixed(2)}</td>
                <td>{indirectAtt?.PO2?.toFixed(2)}</td>
                <td>{indirectAtt?.PO3?.toFixed(2)}</td>
                <td>{indirectAtt?.PO4?.toFixed(2)}</td>
                <td>{indirectAtt?.PO5?.toFixed(2)}</td>
                <td>{indirectAtt?.PO6?.toFixed(2)}</td>
                <td>{indirectAtt?.PO7?.toFixed(2)}</td>
                <td>{indirectAtt?.PO8?.toFixed(2)}</td>
                <td>{indirectAtt?.PO9?.toFixed(2)}</td>
                <td>{indirectAtt?.PO10?.toFixed(2)}</td>
                <td>{indirectAtt?.PO11?.toFixed(2)}</td>
                <td>{indirectAtt?.PO12?.toFixed(2)}</td>
                <td>{indirectAtt?.PSO1?.toFixed(2)}</td>
                <td>{indirectAtt?.PSO2?.toFixed(2)}</td>
                <td>{indirectAtt?.PSO3?.toFixed(2)}</td>
              </tr>

              <tr>
                <td>FinalAttainment</td>
                <td>{finalAtt.PO1?.toFixed(2)}</td>
                <td>{finalAtt.PO2?.toFixed(2)}</td>
                <td>{finalAtt.PO3?.toFixed(2)}</td>
                <td>{finalAtt.PO4?.toFixed(2)}</td>
                <td>{finalAtt.PO5?.toFixed(2)}</td>
                <td>{finalAtt.PO6?.toFixed(2)}</td>
                <td>{finalAtt.PO7?.toFixed(2)}</td>
                <td>{finalAtt.PO8?.toFixed(2)}</td>
                <td>{finalAtt.PO9?.toFixed(2)}</td>
                <td>{finalAtt.PO10?.toFixed(2)}</td>
                <td>{finalAtt.PO11?.toFixed(2)}</td>
                <td>{finalAtt.PO12?.toFixed(2)}</td>
                <td>{finalAtt.PSO1?.toFixed(2)}</td>
                <td>{finalAtt.PSO2?.toFixed(2)}</td>
                <td>{finalAtt.PSO3?.toFixed(2)}</td>
              </tr>

              <tr>
                <td>FinalPO-PSO-Attainment</td>
                <td>{finalPOPSOAtt.PO1?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PO2?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PO3?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PO4?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PO5?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PO6?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PO7?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PO8?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PO9?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PO10?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PO11?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PO12?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PSO1?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PSO2?.toFixed(2)}</td>
                <td>{finalPOPSOAtt.PSO3?.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        )}
      {/* sumatt */}
    </div>
  );
};

export default GenerateFinalAttainment;

// const AddTarget = () => {
//   const params = useParams();
//   const subid = params.subid; // Assuming the document ID is provided as 'subid'

//   const [targetData, setTargetData] = useState({
//     Level1UT: "",
//     Level2UT: "",
//     Level3UT: "",
//     Level1SPPU: "",
//     Level2SPPU: "",
//     Level3SPPU: "",
//     AddMarksPerCO: "",
//   });

//   const [previewData, setPreviewData] = useState([]);
//   const [showTable, setShowTable] = useState(false); // Track whether to show the table or not

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTargetData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/Subject/AddTarget/${subid}`,
//         {
//           subid: subid,
//           targetData: targetData,
//         }
//       );
//       console.log("Target data added successfully!");
//     } catch (error) {
//       console.error(
//         "Error adding target:",
//         error.response ? error.response.data : error
//       );
//     }
//   };

//   const fetchPreviewData = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/Subject/AddTarget/${subid}`
//       );

//       // Extract data from the response
//       const level1Data = {
//         level: 1,
//         UT: response.data.Level1UT,
//         SPPU: response.data.Level1SPPU,
//       };

//       const level2Data = {
//         level: 2,
//         UT: response.data.Level2UT,
//         SPPU: response.data.Level2SPPU,
//       };

//       const level3Data = {
//         level: 3,
//         UT: response.data.Level3UT,
//         SPPU: response.data.Level3SPPU,
//       };

//       // Construct the preview data array
//       const dataArray = [level1Data, level2Data, level3Data];

//       // Set preview data fetched from the database
//       setPreviewData(dataArray);
//       setShowTable(true); // Show the table after fetching the data
//     } catch (error) {
//       console.error(
//         "Error fetching preview data:",
//         error.response ? error.response.data : error
//       );
//     }
//   };

//   return (
//     <div>
//       <h2>Add Target</h2>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={5}>
//             <TextField
//               fullWidth
//               label="Level 1 UT"
//               type="number"
//               name="Level1UT"
//               value={targetData.Level1UT}
//               onChange={handleInputChange}
//               style={{ marginBottom: "8px" }}
//             />
//             <TextField
//               fullWidth
//               label="Level 2 UT"
//               type="number"
//               name="Level2UT"
//               value={targetData.Level2UT}
//               onChange={handleInputChange}
//               style={{ marginBottom: "8px" }}
//             />
//             <TextField
//               fullWidth
//               label="Level 3 UT"
//               type="number"
//               name="Level3UT"
//               value={targetData.Level3UT}
//               onChange={handleInputChange}
//               style={{ marginBottom: "8px" }}
//             />
//             <TextField
//               fullWidth
//               label="Add Marks Per CO"
//               type="number"
//               name="AddMarksPerCO"
//               value={targetData.AddMarksPerCO}
//               onChange={handleInputChange}
//               style={{ marginBottom: "8px" }}
//             />
//           </Grid>
//           <Grid item xs={5}>
//             <TextField
//               fullWidth
//               label="Level 1 SPPU"
//               type="number"
//               name="Level1SPPU"
//               value={targetData.Level1SPPU}
//               onChange={handleInputChange}
//               style={{ marginBottom: "8px" }}
//             />
//             <TextField
//               fullWidth
//               label="Level 2 SPPU"
//               type="number"
//               name="Level2SPPU"
//               value={targetData.Level2SPPU}
//               onChange={handleInputChange}
//               style={{ marginBottom: "8px" }}
//             />
//             <TextField
//               fullWidth
//               label="Level 3 SPPU"
//               type="number"
//               name="Level3SPPU"
//               value={targetData.Level3SPPU}
//               onChange={handleInputChange}
//               style={{ marginBottom: "8px" }}
//             />
//           </Grid>
//         </Grid>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           style={{ margin: "10px" }}
//         >
//           Add Target
//         </Button>
//       </form>

//       {/* Preview button */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={fetchPreviewData}
//         style={{ marginLeft: "10px" }}
//       >
//         Preview Data
//       </Button>

//       {/* Preview section */}
//       {showTable && (
//         <div>
//           <h2 style={{ textAlign: "center" }}>Preview Data</h2>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Level</TableCell>
//                   <TableCell>UT</TableCell>
//                   <TableCell>SPPU</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {previewData.map((row, index) => (
//                   <TableRow key={index}>
//                     <TableCell>Level {row.level}</TableCell>
//                     <TableCell>{row.UT}</TableCell>
//                     <TableCell>{row.SPPU}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddTarget;
