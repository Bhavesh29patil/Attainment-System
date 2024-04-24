import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GreenButton } from '../../components/buttonStyles';

const GeneratePOAttainment = () => {
    const [attainmentData, setAttainmentData] = useState({});
    const params = useParams();
    const sid = params.subid;

    const generateAttainmentHandler = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Subject/GeneratePOAttainment/${sid}`);
            setAttainmentData(response.data.processedData);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <GreenButton onClick={generateAttainmentHandler} style={{margin: "10px" }}>
                Click Here To Generate PO Attainment
            </GreenButton>
            <div style={{margin: "10px" }}>
                <h2>PO Attainment Data:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Metric</th>
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
                            <td>Target no of students for level 1</td>
                            <td>{parseFloat(attainmentData.PO1).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PO2).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PO3).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PO4).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PO5).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PO6).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PO7).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PO8).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PO9).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PO10).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PO11).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PO12).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PSO1).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PSO2).toFixed(2)}</td>
                            <td>{parseFloat(attainmentData.PSO3).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GeneratePOAttainment;
