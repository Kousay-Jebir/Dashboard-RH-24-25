import React from 'react'
import MembersTable from '../../Components/Members/MembersTable'
import members from "../../Components/Members/members.json"
import { Box,Grid } from '@mui/material'
import SearchBar from '../../components/SearchBar'
import BorderBox from '../../components/BorderBox'
import { useState } from 'react'
import { useMemo } from 'react'

const TeamMembers = () => {

  const [data,setData] = useState(members);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter interviews based on search query and date
  const filteredData = useMemo(() => {
    return data
        .filter((interview) => {
            const lowercasedQuery = searchQuery.toLowerCase();
            return interview.Name.toLowerCase().includes(lowercasedQuery);
        })
    }, [searchQuery]);


  return (
    <Box>

            <Box mb={2} display={'flex'} flexDirection={'row-reverse'}>
              <SearchBar
                placeHolder={"Search for interview"}
                onChange={handleSearchChange}
              />
            </Box>
            <BorderBox radius={2}>
                <MembersTable Data={filteredData} />
            </BorderBox>
        </Box>
  )
}

export default TeamMembers
