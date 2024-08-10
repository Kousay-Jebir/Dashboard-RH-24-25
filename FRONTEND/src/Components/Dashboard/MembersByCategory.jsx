import React from "react";
import { Box, CardContent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material";
import data from "./MembersData.json";

const MembersByCategory = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: 400,
        border: 2,
        borderRadius: 2,
        borderColor: theme.palette.neutral.light,
      }}
    >
      <CardContent>
        <BarChart
          borderRadius={8}
          xAxis={[
            {
              id: "barCategories",
              data: data.poles.map((pole) => pole.label),
              scaleType: "band",
              categoryGapRatio: 0.4,
              colorMap: {
                type: "ordinal",
                colors: [
                  theme.palette.green.main,
                  theme.palette.lightBlue.main,
                  theme.palette.blue.main,
                ],
              },
              
            },
          ]}
          
          series={[
            {
              data: data.poles.map((pole) => pole.value ),
            },
          ]}
        
          width={450}
          height={275}
        />
      </CardContent>
    </Box>
  );
};

export default MembersByCategory;
