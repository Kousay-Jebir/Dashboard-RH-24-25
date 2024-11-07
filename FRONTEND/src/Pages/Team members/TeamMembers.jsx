import React, { useState, useEffect, useMemo } from 'react';
import MembersTable from '../../Components/Members/MembersTable';
import { Box } from '@mui/material';
import SearchBar from '../../components/SearchBar';
import BorderBox from '../../components/BorderBox';
import { api } from '../../service/api';
import useApi from '../../service/useApi';

const TeamMembers = ({ department }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Using the custom useApi hook to fetch the member data
  const { data, loading, error, refetch } = useApi(api.getMember, []);

  // Handling the case when data is not available yet
  const members = data.data || [];
  console.log(members)

  const filteredData = members
    .filter(member => {
      // Filter by department if it's not 'all'
      if (department && department !== 'all' && member.interview_department !== department) {
        return false;
      }
      return true;
    })
    .filter(member => {
      // Filter by search query
      if (searchQuery && !(member.member_name + " " + member.candidat_lastName).toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });

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
        {/* Render members table with filtered data */}
        <MembersTable Data={filteredData} loading={loading} error={error} />
      </BorderBox>
    </Box>
  );
};

export default TeamMembers;
