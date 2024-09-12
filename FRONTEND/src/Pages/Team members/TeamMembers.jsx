import React, { useState, useEffect, useMemo } from 'react';
import MembersTable from '../../Components/Members/MembersTable';
import Data from '../../Components/Members/members.json';
import { Box } from '@mui/material';
import SearchBar from '../../components/SearchBar';
import BorderBox from '../../components/BorderBox';

const TeamMembers = ({ department }) => {
  const [data, setData] = useState(Data);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Filter data based on the department prop
    const filteredByDepartment = department === 'all'
      ? Data
      : Data.filter(member => member.Department === department);

    // Update the state with the filtered data
    setData(filteredByDepartment);
  }, [department]);

  // Compute the final filtered data based on the search query
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    return data.filter(member =>
      member.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box>
      <Box mb={2} display={'flex'} flexDirection={'row-reverse'}>
        <SearchBar
          placeHolder={"Search for members"}
          onChange={handleSearchChange}
        />
      </Box>
      <BorderBox radius={2}>
        <MembersTable Data={filteredData} />
      </BorderBox>
    </Box>
  );
};

export default TeamMembers;

