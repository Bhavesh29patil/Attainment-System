import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GreenButton } from '../../components/buttonStyles';

const GenerateCOAttainment = () => {
    const params = useParams();
    const sid = params.subid;
    const [finalAttainmentData, setFinalAttainmentData] = useState();
  
    const generateAttainmentHandler = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/Subject/GenerateCOAttainment/${sid}`
        );
        setFinalAttainmentData(response.data.FinalAttainmentData2[0]);
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <>
        <GreenButton onClick={generateAttainmentHandler} style={{margin: "10px" }}>
          Click Here To Generate Attainment
        </GreenButton>
        {/* <div>
          {finalAttainmentData && (
            <ul>
              <h2>Final Attainment Data</h2>
              <li>
                Upcoming Target lvl1: {finalAttainmentData.UpcomingTargetlvl1}
              </li>
              <li>
                Upcoming Target lvl2: {finalAttainmentData.UpcomingTargetlvl2}
              </li>
              <li>
                Upcoming Target lvl3: {finalAttainmentData.UpcomingTargetlvl3}
              </li>
              <li>
                Final UT Attainment: {finalAttainmentData.FinalUTAttainment}
              </li>
              <li>
                Final SPPU Attainment: {finalAttainmentData.FinalSPPUAttainment}
              </li>
              <h3>
                <li>
                  Overall Attainment: {finalAttainmentData.OverallAttainment}
                </li>
              </h3>
             
            </ul>
          )}
        </div> */}
  
        {finalAttainmentData && (
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>CO 1</th>
                <th>CO 2</th>
                <th>CO 3</th>
                <th>CO 4</th>
                <th>CO 5</th>
                <th>CO 6</th>
                <th>SPPU</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Target no of students for level 1</td>
                {Object.keys(finalAttainmentData.TargetLevel1).map((key) => (
                  <td key={key}>{finalAttainmentData.TargetLevel1[key].toFixed(2)}</td>
                ))}
              </tr>
  
              <tr>
                <td>Target no of students for level 2</td>
                {Object.keys(finalAttainmentData.TargetLevel2).map((key) => (
                  <td key={key}>{finalAttainmentData.TargetLevel2[key].toFixed(2)}</td>
                ))}
              </tr>
              <tr>
                <td>Target no of students for level 3</td>
                {Object.keys(finalAttainmentData.TargetLevel3).map((key) => (
                  <td key={key}>{finalAttainmentData.TargetLevel3[key].toFixed(2)}</td>
                ))}
              </tr>
              <tr>
                <td>% of students for level 1 ({">"}40%)</td>
  
                {Object.keys(finalAttainmentData.PercentStudentLevel1).map(
                  (key) => (
                    <td key={key}>
                      {finalAttainmentData.PercentStudentLevel1[key].toFixed(2)}
                    </td>
                  )
                )}
              </tr>
              <tr>
                <td>% of students for level 2 ({">"}60%)</td>
                {Object.keys(finalAttainmentData.PercentStudentLevel2).map(
                  (key) => (
                    <td key={key}>
                      {finalAttainmentData.PercentStudentLevel2[key].toFixed(2)}
                    </td>
                  )
                )}
              </tr>
              <tr>
                <td>% of students for level 3 ({">"}66%)</td>
                {Object.keys(finalAttainmentData.PercentStudentLevel3).map(
                  (key) => (
                    <td key={key}>
                      {finalAttainmentData.PercentStudentLevel3[key].toFixed(2)}
                    </td>
                  )
                )}
              </tr>
  
              <tr>
                <td>Level 1 Att</td>
  
                {Object.keys(finalAttainmentData.Level1Att).map((key) => (
                  <td key={key}>{finalAttainmentData.Level1Att[key].toFixed(2)}</td>
                ))}
              </tr>
  
              <tr>
                <td>Level 2 Att</td>
                {Object.keys(finalAttainmentData.Level2Att).map((key) => (
                  <td key={key}>{finalAttainmentData.Level2Att[key].toFixed(2)}</td>
                ))}
              </tr>
  
              <tr>
                <td>Level 3 Att</td>
                {Object.keys(finalAttainmentData.Level3Att).map((key) => (
                  <td key={key}>{finalAttainmentData.Level3Att[key].toFixed(2)}</td>
                ))}
              </tr>
  
              {/*  */}
  
              <tr>
                <td>Level 1 Final Att</td>
  
                {Object.keys(finalAttainmentData.Level1FinalAtt).map((key) => (
                  <td key={key}>{finalAttainmentData.Level1FinalAtt[key].toFixed(2)}</td>
                ))}
              </tr>
  
              <tr>
                <td>Level 2 Final Att</td>
                {Object.keys(finalAttainmentData.Level2FinalAtt).map((key) => (
                  <td key={key}>{finalAttainmentData.Level2FinalAtt[key].toFixed(2)}</td>
                ))}
              </tr>
  
              <tr>
                <td>Level 3 Final Att</td>
                {Object.keys(finalAttainmentData.Level3FinalAtt).map((key) => (
                  <td key={key}>{finalAttainmentData.Level3FinalAtt[key].toFixed(2)}</td>
                ))}
              </tr>
  
              <tr>
                <td>UT/Asgnt attainment</td>
                {Object.keys(finalAttainmentData.UTAttainmentOfAllCO).map(
                  (key) => (
                    <td key={key}>
                      {finalAttainmentData.UTAttainmentOfAllCO[key].toFixed(2)}
                    </td>
                  )
                )}
              </tr>
  
              <tr>
                <td>
  
                  <h4> Upcoming Target lvl1</h4>
                </td>
                <td>{finalAttainmentData.UpcomingTargetlvl1.toFixed(2)}</td>
              </tr>
  
              <tr>
                <td>
  
                  <h4> Upcoming Target lvl2</h4>
                </td>
                <td>{finalAttainmentData.UpcomingTargetlvl2.toFixed(2)}</td>
              </tr>
  
              <tr>
                <td>
  
                  <h4> Upcoming Target lvl3</h4>
                </td>
                <td>{finalAttainmentData.UpcomingTargetlvl3.toFixed(2)}</td>
              </tr>
  
              <tr>
                <td>
                  <h3>Final UT Attainment</h3>
                </td>
                <td>{finalAttainmentData.FinalUTAttainment.toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <h3>Final SPPU Attainment</h3>
                </td>
                <td>{finalAttainmentData.FinalSPPUAttainment.toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <h3>Overall Attainment</h3>
                </td>
                <td>{finalAttainmentData.OverallAttainment.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </>
    );
};

export default GenerateCOAttainment;
