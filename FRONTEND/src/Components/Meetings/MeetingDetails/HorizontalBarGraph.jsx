import { Box, Grid } from "@mui/material";

export default function HorizontalBarGraph({stats,colors}){

    const mapStatsToPercentages = (stats)=>{
        const newStats = {}
        const sum = Object.values(stats).reduce((acc,val)=> acc+val,0)
        Object.entries(stats).forEach((stat)=>{
            console.log(stat)
            const key = stat[0];
            const newValue = stat[1] / sum
            newStats[key] = newValue
        })
        return newStats;
    }
    const newStats = mapStatsToPercentages(stats);
    return (
        <Grid container spacing={0.5}>
            <Grid item xs={12*newStats.present}><Box sx={{bgcolor:colors[0],height:25}}></Box></Grid>
            <Grid item xs={12*newStats.justifiedAbsence}><Box sx={{bgcolor:colors[1],height:25}}></Box></Grid>
            <Grid item xs={12*newStats.unjustifiedAbsence}><Box sx={{bgcolor:colors[2],height:25}}></Box></Grid>
        </Grid>
    );
}