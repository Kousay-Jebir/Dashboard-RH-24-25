import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material";
import data from "./MembersData.json";

const MembersByCategoryChart = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: 400,
        borderColor: theme.palette.neutral.light,
      }}
    >
        <BarChart
          borderRadius={8}
          margin={{
            left: 25,
            right: 25,
            top: 10,
            bottom: 7,
          }}
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
        
          width={270}
          height={200}
          leftAxis={{
            disableTicks: true,
      
          }}
          bottomAxis={{
            disableTicks: true,
          }}
        />
        <Stack direction="column" gap={0.5} marginInline={1} marginTop={4} marginBottom={1}>
        <Stack alignItems="center" direction="row" gap={0.7}>
          <Box
            sx={{
              bgcolor: theme.palette.green.main,
              width: 17,
              height: 17,
              borderRadius: 1,
            }}
          />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: theme.typography.meduim,
              color: theme.palette.text.main,
            }}
          >
            Pôle Projet
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" gap={0.7}>
          <Box
            sx={{
              bgcolor: theme.palette.lightBlue.main,
              width: 17,
              height: 17,
              borderRadius: 1,
            }}
          />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: theme.typography.meduim,
              color: theme.palette.text.main,
            }}
          >
            Pôle commercial
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" gap={0.7}>
          <Box
            sx={{
              bgcolor: theme.palette.purple.main,
              width: 17,
              height: 17,
              borderRadius: 1,
            }}
          />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: theme.typography.meduim,
              color: theme.palette.text.main,
            }}
          >
            Pôle marketing
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MembersByCategoryChart;
