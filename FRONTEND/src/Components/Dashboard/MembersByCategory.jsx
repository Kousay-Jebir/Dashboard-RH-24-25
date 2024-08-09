import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material";

const MembersByCategory = () => {
  const theme = useTheme();

  return (
    <Card sx={{border: 2 , borderRadius:2 , borderColor: theme.palette.neutral.light , boxShadow: 0}} >
      <CardContent>

        <BarChart
          borderRadius={8}
          xAxis={[
            {
              id: "barCategories",
              data: ["pôle projet", "Pôle commercial", "Pôle marketing"],
              scaleType: "band",
              categoryGapRatio: 0.4,
              colorMap: {
                type: "ordinal",
                colors: [theme.palette.green.main,
                  theme.palette.lightBlue.main,
                  theme.palette.blue.main],
              },
            },
          ]}
          series={[
            {
              data: [54, 32, 14],
            },
          ]}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'middle' },
              padding: 0,
            },
          }}
          width={350}
          height={275}
          
        />
      </CardContent>
    </Card>
  );
};

export default MembersByCategory;
