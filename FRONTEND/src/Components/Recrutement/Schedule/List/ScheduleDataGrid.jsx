import React from "react";
import DataTable from "../../../DataTable";
import data from "./ScheduleDataGrid.json";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const columns = [
  { id: "Name", label: "Name" },
  { id: "Department", label: "Department" },
  { id: "Date", label: "Date" },
  { id: "Time", label: "Time" },
  { id: "Recruiter", label: "Recruiter" },
  { id: "Status", label: "Status" },
];

const filterDataByDateRange = (data, dateRange) => {
  if (!dateRange || dateRange.length !== 2) return data;

  const [startDate, endDate] = dateRange;
  if (!startDate || !endDate) return data;

  return data.filter(item => {
    const itemDate = dayjs(item.Date, "DD-MM-YYYY");
    return itemDate.isBetween(dayjs(startDate, "DD-MM-YYYY"), dayjs(endDate, "DD-MM-YYYY"), null, '[]');
  });
};

const ScheduleDataGrid = ({ dateRange = [] }) => {
  const filteredData = filterDataByDateRange(data, dateRange);

  return <DataTable columns={columns} rowData={filteredData} />;
};

export default ScheduleDataGrid;
