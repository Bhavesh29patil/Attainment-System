import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { GreenButton } from '../../components/buttonStyles';

const ExcelFileInput = ({ onStudentDataChange, onExcelPreview }) => {


  const [studentData, setStudentData] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const students = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
      setStudentData(students);
      onStudentDataChange(students);
      onExcelPreview(students);
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the Excel file here</p>
        ) : (
          <p>Drag 'n' drop an Excel file here, or click to select one</p>
        )}
      </div>
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const AddCOWiseMarks = () => {
  const [studentData, setStudentData] = useState(null);
  const [excelPreview, setExcelPreview] = useState(null);
  const [excelPreview2, setExcelPreview2] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const params = useParams();
  const sid = params.subid;

  const handleStudentDataChange = (data) => {
    setStudentData(data);
  };

  const handleExcelPreview = (data) => {
    setExcelPreview(data);
  };

  const previewHandler = async () => {
    try {
      const uploadResponse = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/COWiseMarks/${sid}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setExcelPreview2(uploadResponse.data.students)
      // setAvg(uploadResponse.data.avg)
      console.log(uploadResponse.data.students)



    } catch (uploadError) {
      console.error('Error uploading file:', uploadError);
    }
  }

  const DisplayMarks = async () => {
    try {
      setShowPreview(true);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const addStudentsHandler = async () => {

    try {
      const formattedData = studentData.slice(1);
      const uploadResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/AddCOWiseMarks/upload/${sid}`,
        formattedData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(uploadResponse);
    } catch (uploadError) {
      console.error('Error uploading file:', uploadError);
    }
  };

  useEffect(() => {
    previewHandler();
  }, [sid]);



  return (
    <>
      <ExcelFileInput onStudentDataChange={handleStudentDataChange} onExcelPreview={handleExcelPreview} />
      {excelPreview2 && (<GreenButton onClick={DisplayMarks} style={{margin: "10px" }}>
        Preview CO-Wise Marks
      </GreenButton>
      )}

      {excelPreview2 && showPreview && (
        <div>
          <h3>Excel Data Preview:</h3>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {Object.keys(excelPreview2[0]).map((key) => (
                  !key.includes('_id') && (
                    <th key={key} style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                      {key}
                    </th>
                  )
                ))}
              </tr>
            </thead>
            <tbody>
              {excelPreview2.map((row, index) => (
                <tr key={index}>
                  {Object.entries(row).map(([key, value], cellIndex) => (
                    !key.includes('_id') && (
                      <td key={cellIndex} style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                        {typeof value === 'object' ? (
                          <ul>
                            {Object.entries(value).map(([coKey, coValue]) => (
                              !coKey.includes('_id') && (
                                <li key={coKey}>{coKey}: {coValue}</li>
                              )
                            ))}
                          </ul>
                        ) : (
                          value
                        )}
                      </td>
                    )
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {excelPreview && (
        <div>
          {console.log(excelPreview)}
          <h3>Excel Data Preview:</h3>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {excelPreview[0].map((cell, index) => (
                  <th key={index} style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelPreview.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {studentData && (
        <GreenButton onClick={addStudentsHandler}>
          Add Marks
        </GreenButton>
      )}
    </>
  );
};

export default AddCOWiseMarks;
