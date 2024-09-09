import React from 'react';
import DataTable2 from '../DataTable2';
import Data from './members.json';

const columns = [
  { id: "Name", label: "Name" },
  { id: "E-mail address", label: "E-mail" },
  { id: "Department", label: "Department" },
  { id: "Address", label: "Address" },
  { id: "City", label: "City" },
  { id: "Field", label: "Field" },
  { id: "Year", label: "Year" },
  { id: "Phone number", label: "Phone Number" },
  { id: "Score", label: "Score" },
];

const filteredData = Data.filter(member => member.Department === "Dév. Commercial");

const DevCoTable = () => {
  return <DataTable2 columns={columns} rowData={filteredData} />;
};

export default DevCoTable;
