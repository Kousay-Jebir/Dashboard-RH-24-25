import React from "react";
import MembersTable from "../../Components/Members/MembersTable";
import Data from "../../Components/Members/members.json"

const TeamMembers = ({department}) => {

  const filteredData = department === "all" ? Data : Data.filter(member => member.Department === department);
  
  return <MembersTable data={filteredData} />;
};

export default TeamMembers;
