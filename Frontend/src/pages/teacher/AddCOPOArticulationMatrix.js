import React, { useState, useEffect} from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { useTable } from 'react-table';
import { GreenButton } from '../../components/buttonStyles';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ExcelFileInput = ({ onExcelDataChange }) => {
  const [excelData, setExcelData] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      setExcelData(excelData);
      onExcelDataChange(excelData);
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const columns = React.useMemo(
    () =>
      excelData
        ? Object.keys(excelData[0]).map((key) => ({
          Header: key,
          accessor: key,
        }))
        : [],
    [excelData]
  );

  const data = React.useMemo(() => excelData || [], [excelData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

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

      {excelData && (
        <>
          <div>
            <h3>Excel Data Preview:</h3>
            <table
              {...getTableProps()}
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '20px',
              }}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    style={{ borderBottom: '1px solid #ddd' }}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        style={{ padding: '10px', textAlign: 'left' }}
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      style={{ borderBottom: '1px solid #ddd' }}
                    >
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          style={{ padding: '10px', textAlign: 'left' }}
                        >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Removed GreenButton here */}
        </>
      )}
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

const AddCOPOArticulationMatrix = () => {
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);
  const [excelData, setExcelData] = useState(null);
  const [excelData2, setExcelData2] = useState(null);
  const [avg, setAvg] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate()
  const params = useParams();
  const sid = params.subid;

  const handleExcelDataChange = (data) => {
    setExcelData(data);
  };

  const previewHandler = async () => {
    try {
      const uploadResponse = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/COPOArticulationMatrix/${sid}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setExcelData2(uploadResponse.data.data)
      setAvg(uploadResponse.data.avg)
      console.log(uploadResponse.data.data)



    } catch (uploadError) {
      console.error('Error uploading file:', uploadError);
    }
  }

  const DisplayMatrix = async () => {
    try {
      setShowPreview(true);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const atainmentSubmithandler = async () => {
    try {
      const uploadResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/AddCOPOArticulationMatrix/upload/${sid}`,
        excelData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(uploadResponse.status)
    } catch (uploadError) {
      console.error('Error uploading file:', uploadError);
    }
  };

  useEffect(() => {
    previewHandler();
  }, [sid]);

  return (
    <>
      <ExcelFileInput onExcelDataChange={handleExcelDataChange} />
      {excelData2 && (<GreenButton onClick={DisplayMatrix}>
        Preview CO-PO Articulation Matrix
      </GreenButton>
      )}

      {excelData && (
        <GreenButton onClick={atainmentSubmithandler} style={{margin: "10px" }}>
          Submit Articulation Matrix
        </GreenButton>
      )}

      {excelData2 && showPreview && (
        <div>
          <h3>CO-PO Articulation Matrix Preview:</h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '20px',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                {Object.keys(excelData2[0]).map((header, index) => {
                  if (header !== '_id') {
                    return (
                      <th key={index} style={{ padding: '10px', textAlign: 'left' }}>
                        {header}
                      </th>
                    );
                  }
                  return null;
                })}
              </tr>
            </thead>
            <tbody>
              {excelData2.map((row, rowIndex) => (
                <tr key={rowIndex} style={{ borderBottom: '1px solid #ddd' }}>
                  {Object.entries(row).map(([key, value], colIndex) => {
                    if (key !== '_id') {
                      return (
                        <td key={colIndex} style={{ padding: '10px', textAlign: 'left' }}>
                          {value}
                        </td>
                      );
                    }
                    return null;
                  })}
                </tr>
              ))}
              {avg.map((row, rowIndex) => (
                <tr key={rowIndex} style={{ borderBottom: '1px solid #ddd' }}>
                  {Object.entries(row).map(([key, value], colIndex) => {
                    if (key !== '_id') {
                      const isDecimal = value % 1 !== 0;
                      const roundedValue = isDecimal ? parseFloat(value).toFixed(2) : value;
                      if (key !== 'CO') {
                        return (
                          <td key={colIndex} style={{ padding: '10px', textAlign: 'left' }}>
                            {roundedValue}
                          </td>
                        );
                      } else {
                        return (
                          <td key={colIndex} style={{ padding: '10px', textAlign: 'left' }}>
                            AVG
                          </td>
                        );
                      }
                    }
                    return null;
                  })}
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      )}

    </>
  );
};

export default AddCOPOArticulationMatrix;
