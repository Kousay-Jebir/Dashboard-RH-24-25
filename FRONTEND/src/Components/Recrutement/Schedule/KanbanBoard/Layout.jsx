import { Grid } from "@mui/material";
import InterviewStatus from "./InterviewStatus";
import RecruitementInterviewCard from "./RecruitementInterviewCard";
import InterviewsData from './KanbanBoardData.json'

export default function Layout() {
    return(
        <Grid container xs={12} sx={{overflow:'scroll'}} spacing={2}>
            <Grid item xs={4}>
                <InterviewStatus/>
                {InterviewsData.map((interview, index) => (
        <RecruitementInterviewCard key={index} interview={interview} />
      ))}
            </Grid>

            <Grid item xs={4}>
                <InterviewStatus/>
                {InterviewsData.map((interview, index) => (
        <RecruitementInterviewCard key={index} interview={interview} />
      ))}
            </Grid>

            <Grid item xs={4}>
                <InterviewStatus/>
                {InterviewsData.map((interview, index) => (
        <RecruitementInterviewCard key={index} interview={interview} />
      ))}
            </Grid>
        </Grid> 
    )
}