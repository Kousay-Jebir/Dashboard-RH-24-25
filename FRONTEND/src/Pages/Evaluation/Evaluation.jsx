import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, TextField, Button } from '@mui/material';
import BorderBox from '../../components/BorderBox';
import { api } from '../../service/api';

export default function Evaluation() {
  const initialData = [
    ['Coefficients', 'Department Meeting', 'General Assembly', 'Event', 'Team Building'],
    ['Projet', 10, 20, 30, 10],
    ['Dév. Commercial', 40, 50, 60, 10],
    ['Marketing', 70, 80, 90, 10],
    ['Cellule qualité', 10, 10, 10, 10]
  ];

  const [data, setData] = useState([[]]);

  // Fetch initial coefficients data from API
  useEffect(() => {
    api.getEvaluationTable()  // Call the API function to get the data
      .then(response => {
        const fetchedData = response.data;
        console.log(response)
        const updatedData = transformApiDataToTable(fetchedData);
        setData(updatedData);
      })
      .catch(error => {
        console.error('Error fetching coefficients:', error);
      });
  }, []);

  // Transform API data format to table format
  const transformApiDataToTable = (apiData) => {
    console.log(apiData)
    const tableData = [
      ['Coefficients', 'Department Meeting', 'General Assembly', 'Event', 'Team Building'],
      ['Projet', apiData['projet_departmentMeeting'], apiData['projet_generalAssembly'], apiData['projet_event'], apiData['projet_teamBuilding']],
      ['Dév. Commercial', apiData['dév.-commercial_departmentMeeting'], apiData['dév.-commercial_generalAssembly'], apiData['dév.-commercial_event'], apiData['dév.-commercial_teamBuilding']],
      ['Marketing', apiData['marketing_departmentMeeting'], apiData['marketing_generalAssembly'], apiData['marketing_event'], apiData['marketing_teamBuilding']],
      ['Cellule qualité', apiData['cellule-qualité_departmentMeeting'], apiData['cellule-qualité_generalAssembly'], apiData['cellule-qualité_event'], apiData['cellule-qualité_teamBuilding']]
    ];
    return tableData;
  };

  // Handle input changes for editing coefficients
  const handleChange = (rowIndex, colIndex, value) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = Number(value); // Ensure the value is treated as a number
    setData(newData);
  };

  // Handle saving updated coefficients
  const handleSave = () => {
    const matrixData = transformTableDataToApi(data);
    api.updateEvaluationTable(matrixData)  // Call the API function to update the data
      .then(response => {
        const updatedMatrix = response.data.matrix;  // Get the updated matrix from response.data.matrix
        const updatedTableData = transformApiDataToTable(updatedMatrix);
        setData(updatedTableData);  // Update the table data with the response
        console.log('Data updated successfully:', response);
      })
      .catch(error => {
        console.error('Error updating coefficients:', error);
      });
  };

  // Transform table data format back to API format
  const transformTableDataToApi = (tableData) => {
    const apiData = {};
    tableData.slice(1).forEach((row, rowIndex) => {
      // Format department name: lowercase the first letter and replace spaces with hyphens
      const department = row[0].toLowerCase().replace(' ', '-');
      
      row.slice(1).forEach((value, colIndex) => {
        // Format meeting types into camelCase (departmentMeeting, generalAssembly, etc.)
        const meetingType = data[0][colIndex + 1]
        .split(' ')  // Split the meeting type string by spaces
        .map((word, idx) => {
          // Lowercase the first word and capitalize the rest
          return idx === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(''); // Join back into a single string in camelCase
  
        const key = `${department}_${meetingType}`;
        apiData[key] = value;
      });
    });
    return apiData;
  };
  

  return (
    <TableContainer component={BorderBox} radius={2}>
      <Table>
        <TableHead>
          <TableRow sx={{borderBottom:'2px solid rgb(233, 234, 235)'}}>
            {data[0].map((header, index) => (
              <TableCell key={index}>{header}</TableCell> // First row: static labels (meeting types)
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(1).map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, colIndex) => (
                <TableCell key={colIndex}
                  sx={{
                    borderBottom: '2px solid rgb(233, 234, 235)',
                    fontWeight: colIndex === 0 ? '500' : 'normal' // Bold for department labels
                  }}>
                  {colIndex === 0 ? (
                    cell // Static labels for departments
                  ) : (
                    <TextField
                      value={cell}
                      onChange={(e) => handleChange(rowIndex + 1, colIndex, e.target.value)} // Adjust rowIndex for full data
                      variant="outlined"
                      size="small"
                      type="number"
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter sx={{borderBottom:'none'}}>
          <TableRow sx={{borderBottom:'none'}}>
            <TableCell colSpan={data[0].length} sx={{borderBottom:'none'}}>
              <Button variant="outlined" onClick={handleSave} disableElevation sx={{textTransform:'none'}}>
                Save Data
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
